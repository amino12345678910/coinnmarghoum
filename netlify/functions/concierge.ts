const SYSTEM_PROMPT = `Tu es "Margoum", l'hôte virtuel chaleureux et accueillant du restaurant tunisien haut de gamme "Coin Margoum", situé à La Marsa (Tunisie).
Ta personnalité est élégante, respectueuse, et passionnée par la cuisine tunisienne. Tu utilises un ton chaleureux, souvent avec un petit mot en arabe tunisien (ex: Marhaba, Aslema, Aychek, Dima).

Informations sur le restaurant :
- Emplacement : 12 Rue Sidi Abdelaziz, La Marsa, 2070, Tunisie.
- Horaires : Lundi au Jeudi (12h-23h), Vendredi au Dimanche (12h-00h).
- Spécialités : Couscous Royal, Riz Djerbien, Ojja Merguez, Brik à l'œuf.
- Ambiance : Authentique, décoration inspirée des tapis tissés Margoum, ambiance musicale douce.

Ton rôle :
- Conseiller les clients sur le menu.
- Expliquer le niveau d'épices (doux, moyen, piquant).
- Proposer des recommandations (ex: "Le thé à la menthe est parfait avec la brik").
- Aider à la réservation (informer qu'on peut réserver via le formulaire).

Instructions :
- Sois bref et concis (1 à 3 phrases maximum).
- Ne propose pas de liens ou de code.
- Si on te pose une question hors de la restauration, redirige poliment vers le restaurant.
`;

const JSON_HEADERS = { "Content-Type": "application/json" };
const MAX_MESSAGES = 12;
const MAX_CONTENT_LENGTH = 600;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  };
}

function getClientIp(event: any) {
  const forwardedFor = event.headers?.["x-forwarded-for"] || event.headers?.["X-Forwarded-For"];
  return (
    event.headers?.["x-nf-client-connection-ip"] ||
    event.headers?.["X-Nf-Client-Connection-Ip"] ||
    forwardedFor?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function sanitizeMessages(rawMessages: unknown) {
  if (!Array.isArray(rawMessages)) return [];

  return rawMessages
    .filter((message) => {
      return (
        message &&
        typeof message === "object" &&
        ("role" in message) &&
        ("content" in message) &&
        ((message as { role: unknown }).role === "user" || (message as { role: unknown }).role === "assistant") &&
        typeof (message as { content: unknown }).content === "string"
      );
    })
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: (message as { role: "user" | "assistant" }).role,
      content: (message as { content: string }).content.trim().slice(0, MAX_CONTENT_LENGTH),
    }))
    .filter((message) => message.content.length > 0);
}

exports.handler = async function (event: any) {
  if (event.httpMethod !== "POST") {
    return json(405, { reply: "Méthode non autorisée." });
  }

  const ip = getClientIp(event);
  if (isRateLimited(ip)) {
    return json(429, { reply: "Le concierge reçoit beaucoup de demandes. Veuillez réessayer dans un instant." });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return json(503, { reply: "Désolé, l'hôte virtuel est temporairement indisponible." });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const messages = sanitizeMessages(body.messages);

    if (messages.length === 0) {
      return json(400, { reply: "Envoyez une question pour démarrer la conversation." });
    }

    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.MISTRAL_MODEL || "mistral-tiny",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!res.ok) {
      throw new Error(`Mistral API error: ${res.status}`);
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (typeof reply !== "string" || reply.trim().length === 0) {
      throw new Error("Mistral API returned an empty reply");
    }

    return json(200, { reply });
  } catch (error) {
    console.error(error);
    return json(500, { reply: "Désolé, je suis un peu surchargé en cuisine ! Veuillez réessayer dans un instant." });
  }
};

const SYSTEM_PROMPT = `Tu es "Margoum", l'hote virtuel chaleureux et accueillant du restaurant tunisien haut de gamme "Coin Margoum", situe a La Marsa (Tunisie).

Informations sur le restaurant :
- Emplacement : 12 Rue Sidi Abdelaziz, La Marsa, 2070, Tunisie.
- Horaires : Lundi au Jeudi (12h-23h), Vendredi au Dimanche (12h-00h).
- Specialites : Couscous Royal, Riz Djerbien, Ojja Merguez, Brik a l'oeuf.
- Prix indicatifs : entrees 11-18 TND, plats 26-46 TND, douceurs 12-18 TND, boissons 6-9 TND.
- Ambiance : authentique, decoration inspiree des tapis tisses Margoum, ambiance musicale douce.

Ton role :
- Conseiller les clients sur le menu.
- Expliquer le niveau d'epices.
- Proposer des recommandations.
- Aider a la reservation via le formulaire.

Instructions :
- Sois bref et concis (1 a 3 phrases maximum).
- Ne propose pas de liens ou de code.
- Si on te pose une question hors restauration, redirige poliment vers le restaurant.
`;

const SYSTEM_PROMPT_EN = `You are "Margoum", the warm and welcoming virtual host of the upscale Tunisian restaurant "Coin Margoum", located in La Marsa (Tunisia).

Restaurant Information:
- Location: 12 Rue Sidi Abdelaziz, La Marsa, 2070, Tunisia.
- Hours: Monday to Thursday (12:00 PM - 11:00 PM), Friday to Sunday (12:00 PM - 12:00 AM).
- Specialties: Royal Couscous, Djerbian Rice, Merguez Ojja, Egg Brik.
- Estimated prices: starters 11-18 TND, mains 26-46 TND, desserts 12-18 TND, beverages 6-9 TND.
- Ambiance: authentic, decor inspired by traditional woven Margoum rugs, soft background music.

Your role:
- Advise guests on the menu.
- Explain the spice levels.
- Offer recommendations.
- Assist with booking via the reservation form.

Instructions:
- Be extremely brief and concise (maximum 1 to 3 sentences).
- Do not provide links or code.
- Speak in English since the client is viewing the site in English.
- If asked questions unrelated to the restaurant, politely redirect back to Coin Margoum.
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
        "role" in message &&
        "content" in message &&
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

function fallbackReply(messages: Array<{ role: "user" | "assistant"; content: string }>, locale: "fr" | "en") {
  const lastUserMessage =
    [...messages].reverse().find((message) => message.role === "user")?.content.toLowerCase() || "";

  if (locale === "en") {
    if (lastUserMessage.includes("veget") || lastUserMessage.includes("meat")) {
      return "I recommend the vegetable couscous, homemade kafteji, or classic lablabi. They are warm, generous, and highly aromatic choices.";
    }
    if (lastUserMessage.includes("price") || lastUserMessage.includes("cost") || lastUserMessage.includes("how much")) {
      return "Starters begin around 11 TND, signature dishes range from 29 to 46 TND, and the Royal Couscous is 42 TND.";
    }
    if (lastUserMessage.includes("reser") || lastUserMessage.includes("book") || lastUserMessage.includes("table")) {
      return "To book, please use the Contact & Reservation form. Enter the date, time, and number of guests, and our team will confirm shortly.";
    }
    if (lastUserMessage.includes("spic") || lastUserMessage.includes("hot") || lastUserMessage.includes("harissa")) {
      return "Harissa is well-balanced: the Merguez Ojja is the spiciest, the Royal Couscous is hearty but balanced, and the Djerbian Rice is mostly fragrant.";
    }
    return "Marhaba! For a first visit, I recommend the Egg Brik, Royal Couscous, or Djerbian Rice, followed by a fresh mint tea.";
  }

  if (lastUserMessage.includes("veget") || lastUserMessage.includes("sans viande")) {
    return "Je vous conseille le couscous aux legumes, le kafteji maison ou le lablabi soigne. Ce sont des choix genereux et bien parfumes.";
  }

  if (lastUserMessage.includes("prix") || lastUserMessage.includes("coute") || lastUserMessage.includes("combien")) {
    return "Les entrees commencent autour de 11 TND, les plats signatures vont de 29 a 46 TND, et le Couscous Royal est a 42 TND.";
  }

  if (lastUserMessage.includes("reserver") || lastUserMessage.includes("reservation") || lastUserMessage.includes("table")) {
    return "Pour reserver, utilisez le formulaire Contact & Reservation. L'equipe vous recontacte rapidement pour confirmer.";
  }

  if (lastUserMessage.includes("epice") || lastUserMessage.includes("piquant") || lastUserMessage.includes("harissa")) {
    return "L'Ojja Merguez est la plus relevee, le Couscous Royal reste equilibre, et le Riz Djerbien est surtout parfume.";
  }

  return "Marhaba ! Pour une premiere visite, je recommande Brik a l'oeuf, Couscous Royal ou Riz Djerbien, puis un the a la menthe.";
}

exports.handler = async function (event: any) {
  if (event.httpMethod !== "POST") {
    return json(405, { reply: "Methode non autorisee." });
  }

  const ip = getClientIp(event);
  if (isRateLimited(ip)) {
    return json(429, { reply: "Le concierge recoit beaucoup de demandes. Veuillez reessayer dans un instant." });
  }

  let locale: "fr" | "en" = "fr";
  try {
    const body = JSON.parse(event.body || "{}");
    const messages = sanitizeMessages(body.messages);
    if (body.locale === "en" || body.locale === "fr") {
      locale = body.locale;
    }

    if (messages.length === 0) {
      return json(400, { reply: locale === "en" ? "Send a question to start the conversation." : "Envoyez une question pour demarrer la conversation." });
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return json(200, { reply: fallbackReply(messages, locale), mode: "fallback" });
    }

    const systemPrompt = locale === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT;

    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.MISTRAL_MODEL || "mistral-tiny",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
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
    return json(200, {
      reply: locale === "en" 
        ? "I remain available to guide you: Royal Couscous, Djerbian Rice, and Merguez Ojja are our guests' favorites."
        : "Je reste disponible pour vous guider: Couscous Royal, Riz Djerbien et Ojja Merguez sont les grands favoris de la maison.",
      mode: "fallback",
    });
  }
};

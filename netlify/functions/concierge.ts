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
- Aider à la réservation (informer qu'on peut réserver via le formulaire ou WhatsApp).

Instructions :
- Sois bref et concis (1 à 3 phrases maximum).
- Ne propose pas de liens ou de code.
- Si on te pose une question hors de la restauration, redirige poliment vers le restaurant.
`;

exports.handler = async function (event: any) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const messages = body.messages || [];

    const apiKey = process.env.MISTRAL_API_KEY || "WrxVMFzYyzU5k8Jr2JSDAhMWdFo0NYXC";

    if (!apiKey) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: "Désolé, l'hôte virtuel est en maintenance (API Key manquante). Contactez-nous sur WhatsApp pour réserver !" })
      };
    }

    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content }))
        ],
        temperature: 0.7,
        max_tokens: 150,
      })
    });

    if (!res.ok) {
      throw new Error("Mistral API error");
    }

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Désolé, je suis un peu surchargé en cuisine ! Veuillez réessayer dans un instant." })
    };
  }
};

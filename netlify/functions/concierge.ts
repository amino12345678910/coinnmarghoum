const SYSTEM_PROMPT = `
Vous êtes Margoum, l'hôte chaleureux et virtuel du restaurant tunisien "Coin Margoum" à La Marsa.
Votre rôle est d'accueillir les clients, de recommander des plats, d'expliquer les ingrédients, et d'offrir une assistance pour les réservations.

INFORMATIONS SUR LE RESTAURANT:
- Adresse: 12 Rue Sidi Abdelaziz, La Marsa, 2070, Tunisie
- Horaires: Lun-Jeu (12h-23h), Ven-Dim (12h-00h)
- Téléphone: +216 22 000 000

MENU SIGNATURE:
1. Couscous Royal: Semoule fine, bouillon aux sept épices, légumes, viandes braisées.
2. Brik à l'Œuf: Malsouqa croustillante, œuf coulant, thon, persil, câpres.
3. Riz Djerbien: Cuit à la vapeur, blettes, pois chiches, viande marinée.
4. Ojja Merguez: Œufs pochés, sauce tomate piquante à l'harissa, merguez grillées.

TON ET STYLE:
- Chaleureux, poétique, très poli, accueillant (utilisation du vouvoiement).
- Utilisez des expressions tunisiennes légères si approprié (ex: "Marhaba").
- Ne donnez que des réponses courtes et concises, idéales pour un chat widget.
- Si le client veut réserver, suggérez-lui d'utiliser le formulaire de réservation sur le site ou de nous contacter sur WhatsApp.
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(event: any, context: any) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const messages = body.messages || [];
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // TODO: Set your API Key here via Environment Variables in Netlify Dashboard
    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      // GRACEFUL FALLBACK: No API Key, use local FAQ map
      return { 
        statusCode: 200, 
        body: JSON.stringify({ reply: getFallbackResponse(lastUserMessage) }) 
      };
    }

    // TODO: Implement actual fetch to OpenAI/Anthropic using the apiKey
    // Example:
    // const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //   headers: { Authorization: \`Bearer \${apiKey}\` },
    //   body: JSON.stringify({ model: "gpt-4o", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages] })
    // })
    
    return { 
      statusCode: 200, 
      body: JSON.stringify({ reply: "L'intégration LLM est prête à être activée avec votre clé API." }) 
    };

  } catch (error) {
    console.error("Concierge API Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Une erreur s'est produite." }) };
  }
}

function getFallbackResponse(message: string) {
  const msg = message.toLowerCase();
  if (msg.includes("recommand") || msg.includes("plat")) {
    return "Marhaba ! Je vous recommande vivement notre Couscous Royal, mijoté aux sept épices, ou notre succulente Ojja Merguez si vous aimez les plats légèrement piquants. Que préférez-vous ?";
  }
  if (msg.includes("végétarien") || msg.includes("vegan") || msg.includes("légumes")) {
    return "Bien sûr ! Nous pouvons préparer notre Couscous ou notre Brik sans viande, mettant en valeur les légumes frais de saison et nos épices tunisiennes.";
  }
  if (msg.includes("réserv") || msg.includes("table")) {
    return "C'est un plaisir de vous recevoir. Vous pouvez utiliser le formulaire de réservation situé juste en bas de la page, ou nous contacter directement via le bouton WhatsApp.";
  }
  if (msg.includes("horaire") || msg.includes("ouvert") || msg.includes("heure")) {
    return "Nous sommes ouverts du lundi au jeudi de 12h à 23h, et du vendredi au dimanche jusqu'à minuit. Au plaisir de vous voir !";
  }
  if (msg.includes("adresse") || msg.includes("où") || msg.includes("localiser")) {
    return "Nous sommes situés au 12 Rue Sidi Abdelaziz, en plein cœur de La Marsa, Tunisie.";
  }
  return "Marhaba ! Je suis Margoum, votre hôte. Comment puis-je vous aider aujourd'hui ? (Mode hors-ligne: configurez la clé API pour discuter librement !)";
}

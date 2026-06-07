export const siteConfig = {
  name: "Coin Margoum",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://coinmargoum.com",
  address: {
    street: "12 Rue Sidi Abdelaziz",
    city: "La Marsa",
    postalCode: "2070",
    country: "Tunisie",
    countryCode: "TN",
    latitude: 36.88856,
    longitude: 10.323565,
  },
  phoneE164: process.env.NEXT_PUBLIC_RESTAURANT_PHONE_E164 || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    tripadvisor: process.env.NEXT_PUBLIC_TRIPADVISOR_URL || "",
  },
};

export function getPhoneHref() {
  return siteConfig.phoneE164 ? `tel:${siteConfig.phoneE164}` : null;
}

export function getWhatsAppUrl() {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
  return number ? `https://wa.me/${number}` : null;
}

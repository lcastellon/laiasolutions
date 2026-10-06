export const WHATSAPP_NUMBER = "522229067324";
export const WHATSAPP_DISPLAY = "+52 222 906 7324";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const QUOTE_SERVICES = [
  "Landing page profesional",
  "Punto de venta",
  "Software especializado",
  "Desarrollo de aplicaciones",
  "Automatización de procesos",
  "Integración de herramientas",
  "Otro proyecto",
];

export function buildQuoteUrl(details: {
  name: string;
  business: string;
  contact: string;
  service: string;
  description: string;
}) {
  const message = [
    "Hola, LAIA. Me gustaría solicitar una cotización.",
    "",
    `Nombre: ${details.name.trim()}`,
    `Negocio: ${details.business.trim() || "No especificado"}`,
    `Correo o teléfono: ${details.contact.trim()}`,
    `Servicio: ${details.service.trim()}`,
    "",
    "Descripción del proyecto:",
    details.description.trim(),
  ].join("\n");
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

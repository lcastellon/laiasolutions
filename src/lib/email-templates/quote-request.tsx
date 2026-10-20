import { Body, Container, Head, Heading, Html, Preview, Text, Hr } from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  business?: string;
  contact?: string;
  service?: string;
  description?: string;
}

function QuoteRequest({ name, business, contact, service, description }: Props) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Nueva solicitud de cotización para LAIA</Preview>
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif", color: "#132A4F" }}>
        <Container style={{ padding: "32px 24px", maxWidth: "600px" }}>
          <Heading>LAIA Soluciones Digitales</Heading>
          <Text>Nueva solicitud de cotización</Text>
          <Hr />
          <Text><strong>Nombre:</strong> {name || "No especificado"}</Text>
          <Text><strong>Negocio:</strong> {business || "No especificado"}</Text>
          <Text><strong>Correo o teléfono:</strong> {contact || "No especificado"}</Text>
          <Text><strong>Servicio:</strong> {service || "No especificado"}</Text>
          <Text><strong>Descripción del proyecto:</strong></Text>
          <Text style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{description || "No especificado"}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: QuoteRequest,
  subject: "Nueva solicitud de cotización | LAIA",
  displayName: "Solicitud de cotización",
  to: "lcastellonh2400@alumno.ipn.mx",
  previewData: { name: "Cliente de ejemplo", business: "Negocio de ejemplo", contact: "cliente@example.com", service: "Landing page profesional", description: "Necesito una página para mi negocio." },
} satisfies TemplateEntry;
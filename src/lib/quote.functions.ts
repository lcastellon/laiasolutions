import { createServerFn } from "@tanstack/react-start";
import { EmailAPIError } from "@lovable.dev/email-js";
import { z } from "zod";
import { quoteSchema } from "./quote-schema";

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    const { sendTemplateEmail } = await import("./email-templates/send-email");
    try {
      // Lovable's managed sender enforces durable workspace/domain rate limits.
      // Recipient and template are fixed here, never supplied by the visitor.
      const result = await sendTemplateEmail("quote-request", "", {
        templateData: { name: data.name, business: data.business, contact: data.contact, service: data.service, description: data.description },
        idempotencyKey: `quote-request-${data.submissionId}`,
        ...(z.string().email().safeParse(data.contact).success ? { replyTo: data.contact } : {}),
      });
      return result.sent
        ? { ok: true, message: "Recibimos tu solicitud. Nos comunicaremos contigo para conocer tu proyecto." }
        : { ok: false, message: "No pudimos enviar tu solicitud. Por favor, escríbenos por WhatsApp." };
    } catch (error) {
      if (error instanceof EmailAPIError) {
        if (error.status === 429) return { ok: false, message: "Hay muchas solicitudes en este momento. Intenta más tarde o escríbenos por WhatsApp." };
        if (error.code === "domain_not_verified" || error.code === "emails_disabled") return { ok: false, message: "El envío por correo aún no está disponible. Por favor, escríbenos por WhatsApp." };
      }
      return { ok: false, message: "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp." };
    }
  });
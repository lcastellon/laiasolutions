import { describe, expect, test } from "bun:test";
import { quoteSchema } from "./quote-schema";
import { template } from "./email-templates/quote-request";

const request = { submissionId: "2fe6020e-56f2-42a9-bd31-f722d8b3d9ab", name: "Cliente", business: "Negocio", contact: "cliente@example.com", service: "Landing page profesional", description: "Necesito una página para mi negocio", website: "" };

describe("Quote delivery", () => {
  test("sends only to the chosen recipient", () => {
    expect(template.to).toBe("lcastellonh2400@alumno.ipn.mx");
  });
  test("accepts contact requests and rejects empty required information", () => {
    expect(quoteSchema.safeParse(request).success).toBe(true);
    expect(quoteSchema.safeParse({ ...request, contact: " " }).success).toBe(false);
  });
  test("rejects automated honeypot input", () => {
    expect(quoteSchema.safeParse({ ...request, website: "spam" }).success).toBe(false);
  });
});
import { describe, it as test } from "node:test";
import { strict as assert } from "node:assert";
import { quoteSchema } from "./quote-schema";
import { template } from "./email-templates/quote-request";

const request = { submissionId: "2fe6020e-56f2-42a9-bd31-f722d8b3d9ab", name: "Cliente", business: "Negocio", contact: "cliente@example.com", service: "Landing page profesional", description: "Necesito una página para mi negocio", website: "" };

describe("Quote delivery", () => {
  test("sends only to the chosen recipient", () => {
    assert.equal(template.to, "lcastellonh2400@alumno.ipn.mx");
  });
  test("accepts contact requests and rejects empty required information", () => {
    assert.equal(quoteSchema.safeParse(request).success, true);
    assert.equal(quoteSchema.safeParse({ ...request, contact: " " }).success, false);
  });
  test("rejects automated honeypot input", () => {
    assert.equal(quoteSchema.safeParse({ ...request, website: "spam" }).success, false);
  });
});
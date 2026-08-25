import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output, NoObjectGeneratedError } from "ai";

import type { Database } from "@/integrations/supabase/types";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
} from "./ai-gateway";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const ChatInput = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
});

export type AgentMessage = z.infer<typeof MessageSchema>;

export const AgentLeadSchema = z.object({
  name: z.string().max(200),
  business_type: z.string().max(300),
  problem: z.string().max(2000),
  recommended_solution: z.string().max(2000),
  tools: z.string().max(1000),
  urgency: z.string().max(200),
  contact: z.string().max(300),
  conversation_summary: z.string().max(8000),
});

export type AgentLead = z.infer<typeof AgentLeadSchema>;

export const AgentReplySchema = z.object({
  reply: z.string().min(1).max(4000),
  status: z.enum(["asking", "done"]),
  lead: AgentLeadSchema.nullable(),
});

export type AgentReply = z.infer<typeof AgentReplySchema>;

// Schema estricto y sin límites de longitud para el structured output del modelo.
// Los límites se indican en el prompt y se aplican al guardar el lead.
const AgentReplyOutputSchema = z.object({
  reply: z.string().min(1),
  status: z.enum(["asking", "done"]),
  lead: z
    .object({
      name: z.string(),
      business_type: z.string(),
      problem: z.string(),
      recommended_solution: z.string(),
      tools: z.string(),
      urgency: z.string(),
      contact: z.string(),
      conversation_summary: z.string(),
    })
    .nullable(),
});

const SYSTEM_PROMPT = `Eres el "Agente Diagnóstico LAIA", el asistente de LAIA (Laboratorio de Inteligencia Artificial).
LAIA crea agentes de IA, chatbots, automatizaciones, aplicaciones web y landing pages para negocios.

Tu objetivo: conversar en español (tono cálido, claro y profesional, sin tecnicismos innecesarios),
diagnosticar qué proceso quiere automatizar la persona y proponer una solución inicial.

Reglas de la conversación:
- Haz UNA sola pregunta por mensaje, de forma progresiva. Mensajes cortos (máximo 4 líneas).
- Orden sugerido: 1) tipo de negocio, 2) problema o proceso que consume más tiempo,
  3) cómo lo hacen hoy y qué herramientas usan, 4) qué tan urgente es resolverlo,
  5) nombre, 6) correo o WhatsApp para enviarle la propuesta.
- No pidas todos los datos de golpe. No repitas preguntas ya respondidas.
- Cuando ya tengas negocio, problema, urgencia, nombre y contacto, entrega el resumen final
  en formato markdown con estos apartados: **Tipo de negocio**, **Problema principal**,
  **Solución recomendada**, **Herramientas sugeridas**, **Nivel de urgencia**, **Siguiente paso**.
  En ese mensaje final usa status "done".
- Respeta estos límites de longitud para cada campo del lead:
  name: 200 caracteres, business_type: 300, problem: 2000, recommended_solution: 2000,
  tools: 1000, urgency: 200, contact: 300, conversation_summary: 8000, reply: 4000.

Responde SIEMPRE usando la estructura esperada:
- reply: tu mensaje para la persona (markdown permitido).
- status: "asking" mientras estés preguntando, "done" cuando entregues el resumen final.
- lead: null mientras estés preguntando; cuando status sea "done", incluye la información recopilada.`;

function clampLead(lead: AgentLead): AgentLead {
  return {
    name: lead.name.slice(0, 200),
    business_type: lead.business_type.slice(0, 300),
    problem: lead.problem.slice(0, 2000),
    recommended_solution: lead.recommended_solution.slice(0, 2000),
    tools: lead.tools.slice(0, 1000),
    urgency: lead.urgency.slice(0, 200),
    contact: lead.contact.slice(0, 300),
    conversation_summary: lead.conversation_summary.slice(0, 8000),
  };
}

export const chatWithAgent = createServerFn({ method: "POST" })
  .validator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Falta la configuración de IA en el servidor.");

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: {
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
      fetch: runIdFetch.fetch,
    });

    try {
      const result = streamText({
        model: lovable.responses("openai/gpt-4o-mini"),
        system: SYSTEM_PROMPT,
        messages: data.messages,
        output: Output.object({
          schema: AgentReplyOutputSchema,
        }),
        providerOptions: {
          openai: {
            store: false,
          },
        },
      });

      const output = await result.output;
      const validated = AgentReplySchema.parse(output);
      const response = await result.response;

      if (validated.status === "done" && validated.lead) {
        return Response.json(
          { ...validated, lead: clampLead(validated.lead) },
          { headers: getLovableAiGatewayResponseHeaders(response.headers) },
        );
      }

      return Response.json(validated, {
        headers: getLovableAiGatewayResponseHeaders(response.headers),
      });
    } catch (error) {
      console.error("Lovable AI Gateway agent error", error);

      if (NoObjectGeneratedError.isInstance(error)) {
        return Response.json(
          {
            reply:
              "No pude armar una respuesta estructurada. ¿Podrías reformular tu mensaje?",
            status: "asking" as const,
            lead: null,
          },
          { status: 200 },
        );
      }

      throw new Error("No pudimos generar la respuesta del agente. Intenta de nuevo en unos segundos.");
    }
  });

const LeadInput = z.object({
  name: z.string().max(200).optional().default(""),
  business_type: z.string().max(300).optional().default(""),
  problem: z.string().max(2000).optional().default(""),
  recommended_solution: z.string().max(2000).optional().default(""),
  tools: z.string().max(1000).optional().default(""),
  urgency: z.string().max(200).optional().default(""),
  contact: z.string().max(300).optional().default(""),
  conversation_summary: z.string().max(8000).optional().default(""),
});

export const saveLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => LeadInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await supabase.from("laia_leads").insert(data);
    if (error) {
      console.error("No se pudo guardar el lead", error);
      throw new Error("No pudimos guardar tus datos. Escríbenos por WhatsApp.");
    }
    return { ok: true };
  });

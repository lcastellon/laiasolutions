import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText, Output } from "ai";

import type { Database } from "@/integrations/supabase/types";

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

const AgentReplySchema = z.object({
  reply: z.string().min(1).max(4000),
  status: z.enum(["asking", "done"]),
  lead: AgentLeadSchema.nullable(),
});

export type AgentReply = z.infer<typeof AgentReplySchema>;

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

Responde SIEMPRE usando la estructura esperada:
- reply: tu mensaje para la persona (markdown permitido).
- status: "asking" mientras estés preguntando, "done" cuando entregues el resumen final.
- lead: null mientras estés preguntando; cuando status sea "done", incluye la información recopilada.`;

export const chatWithAgent = createServerFn({ method: "POST" })
  .validator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }): Promise<AgentReply> => {
    const key = process.env["OPENAI_API_KEY"];
    if (!key) throw new Error("Falta la configuración de IA en el servidor.");

    const openai = createOpenAI({ apiKey: key });

    try {
      const { output } = await generateText({
        model: openai("gpt-4o-mini"),
        output: Output.object({
          schema: AgentReplySchema,
        }),
        system: SYSTEM_PROMPT,
        messages: data.messages,
      });

      return output;
    } catch (error) {
      console.error("OpenAI agent error", error);
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

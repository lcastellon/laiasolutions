import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const ChatInput = z.object({
  messages: z.array(MessageSchema).min(1).max(40),
});

export type AgentMessage = z.infer<typeof MessageSchema>;

export type AgentLead = {
  name: string;
  business_type: string;
  problem: string;
  recommended_solution: string;
  tools: string;
  urgency: string;
  contact: string;
  conversation_summary: string;
};

export type AgentReply = {
  reply: string;
  status: "asking" | "done";
  lead: AgentLead | null;
};

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

Responde SIEMPRE con un objeto JSON válido con esta forma exacta:
{
  "reply": "tu mensaje para la persona (markdown permitido)",
  "status": "asking" | "done",
  "lead": null | {
    "name": "",
    "business_type": "",
    "problem": "",
    "recommended_solution": "",
    "tools": "",
    "urgency": "",
    "contact": "",
    "conversation_summary": ""
  }
}
Usa "lead" solo cuando status sea "done", con la información recopilada.`;

export const chatWithAgent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }): Promise<AgentReply> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Falta la configuración de IA en el servidor.");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Lovable AI gateway error", response.status, detail);
      if (response.status === 429) {
        throw new Error("Hay muchas consultas en este momento. Intenta de nuevo en unos segundos.");
      }
      if (response.status === 402 || response.status === 403) {
        throw new Error("El agente no está disponible temporalmente. Escríbenos por WhatsApp.");
      }
      throw new Error("No pudimos generar la respuesta del agente.");
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = payload.choices?.[0]?.message?.content ?? "";

    try {
      const parsed = JSON.parse(raw) as Partial<AgentReply>;
      return {
        reply: parsed.reply?.trim() || "¿Podrías contarme un poco más?",
        status: parsed.status === "done" ? "done" : "asking",
        lead: parsed.status === "done" && parsed.lead ? (parsed.lead as AgentLead) : null,
      };
    } catch {
      return { reply: raw || "¿Podrías contarme un poco más?", status: "asking", lead: null };
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
  .inputValidator((input: unknown) => LeadInput.parse(input))
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

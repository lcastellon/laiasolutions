import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, Send, Sparkles, X, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LaiaMark } from "@/components/laia/Logo";
import { chatWithAgent, saveLead, type AgentMessage } from "@/lib/laia-agent.functions";

const OPEN_EVENT = "laia:open-chat";

export function openLaiaChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}

const GREETING: AgentMessage = {
  role: "assistant",
  content:
    "¡Hola! Soy el **Agente Diagnóstico LAIA**. En pocas preguntas entiendo tu negocio y te propongo una solución con IA.\n\nPara empezar: ¿a qué se dedica tu negocio?",
};

const SUGGESTIONS = [
  "Quiero automatizar la atención por WhatsApp",
  "Necesito una landing page que capte clientes",
  "Paso demasiado tiempo respondiendo correos",
];

function ChatBubble({ message }: { message: AgentMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={isUser ? "flex justify-end" : "flex gap-3"}>
      {!isUser && (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <LaiaMark className="h-5 w-5" />
        </span>
      )}
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground"
            : "max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-2.5 text-sm leading-relaxed text-foreground"
        }
      >
        <div className="space-y-2 [&_a]:underline [&_li]:ml-4 [&_li]:list-disc [&_strong]:font-semibold">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export function DiagnosticChatPanel() {
  const [messages, setMessages] = useState<AgentMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const runAgent = useServerFn(chatWithAgent);
  const persistLead = useServerFn(saveLead);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const next: AgentMessage[] = [...messages, { role: "user", content: trimmed }];
      setMessages(next);
      setInput("");
      setError(null);
      setLoading(true);

      try {
        const result = await runAgent({ data: { messages: next } });
        setMessages([...next, { role: "assistant", content: result.reply }]);

        if (result.status === "done" && result.lead) {
          try {
            await persistLead({ data: result.lead });
            setSaved(true);
          } catch (saveError) {
            console.error(saveError);
          }
        }
      } catch (agentError) {
        setError(
          agentError instanceof Error
            ? agentError.message
            : "Algo salió mal. Intenta de nuevo en un momento.",
        );
      } finally {
        setLoading(false);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    },
    [loading, messages, persistLead, runAgent],
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-1 py-4">
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}

        {loading && (
          <div className="flex items-center gap-2 pl-11 text-sm text-muted-foreground">
            <span className="flex gap-1">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-secondary"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </span>
            Analizando tu caso…
          </div>
        )}

        {saved && (
          <div className="flex items-start gap-2 rounded-xl border border-laia-mint/40 bg-laia-mint/10 px-4 py-3 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-laia-mint" />
            Guardamos tu diagnóstico. Un especialista de LAIA te contactará muy pronto.
          </div>
        )}

        {error && (
          <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      {messages.length === 1 && !loading && (
        <div className="flex flex-wrap gap-2 pb-3">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void send(suggestion)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-secondary/40 hover:text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void send(input);
        }}
        className="flex items-end gap-2 border-t border-border pt-3"
      >
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void send(input);
            }
          }}
          placeholder="Escribe tu respuesta…"
          rows={1}
          className="max-h-32 min-h-11 resize-none rounded-xl"
          aria-label="Mensaje para el Agente Diagnóstico LAIA"
        />
        <Button type="submit" size="icon" className="h-11 w-11 shrink-0" disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
    </div>
  );
}

export function LaiaChatWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl transition-all hover:scale-[1.03] hover:bg-primary/90 sm:bottom-8 sm:right-8"
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        Hablar con LAIA
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[85vh] max-h-[720px] w-[calc(100vw-1.5rem)] max-w-lg flex-col gap-0 overflow-hidden rounded-3xl p-0 sm:w-full">
          <DialogHeader className="space-y-1 border-b border-border bg-muted/40 px-5 py-4 text-left">
            <DialogTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-secondary" />
              Agente Diagnóstico LAIA
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Cuéntame tu proceso y te propongo una solución con IA en minutos.
            </p>
          </DialogHeader>
          <div className="min-h-0 flex-1 px-5 pb-5">
            <DiagnosticChatPanel />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

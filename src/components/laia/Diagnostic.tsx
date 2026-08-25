import { MessageCircle, Sparkles, Clock, Target, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { openLaiaChat } from "@/components/laia/DiagnosticChat";

const outputs = [
  { icon: Target, label: "Tipo de negocio y problema principal" },
  { icon: Sparkles, label: "Solución recomendada con IA" },
  { icon: Wrench, label: "Herramientas sugeridas" },
  { icon: Clock, label: "Nivel de urgencia y siguiente paso" },
];

export function Diagnostic() {
  return (
    <section id="diagnostico" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 rounded-[2rem] border border-border bg-card p-8 shadow-sm sm:p-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
              <Sparkles className="h-4 w-4" />
              Agente Diagnóstico LAIA
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Diagnostica tu idea con nuestro agente
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Conversa unos minutos con nuestro agente de IA: te hará preguntas sencillas sobre tu
              negocio y generará una propuesta inicial de automatización a tu medida.
            </p>

            <Button size="lg" className="mt-8 gap-2" onClick={openLaiaChat}>
              <MessageCircle className="h-4 w-4" />
              Hablar con LAIA
            </Button>
          </div>

          <ul className="space-y-3">
            {outputs.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background px-4 py-3.5 text-sm font-medium text-foreground"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

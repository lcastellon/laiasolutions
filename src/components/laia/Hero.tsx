import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/laia-hero.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-hero px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-laia-mint opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-laia-mint" />
              </span>
              Soluciones digitales con inteligencia artificial
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Laia <span className="text-gradient">Soluciones digitales</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              En LAIA diseñamos soluciones inteligentes: automatizamos procesos, creamos asistentes
              de IA, aplicaciones web y landing pages que trabajan contigo y para ti.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <a href="#contacto">
                  Quiero una consulta
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="#servicios">
                  <Play className="h-4 w-4" />
                  Ver servicios
                </a>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-secondary to-laia-violet text-xs font-medium text-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p>+50 empresas ya automatizan con LAIA</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-laia-electric/20 via-laia-mint/10 to-laia-coral/10 blur-3xl" />
            <img
              src={heroImage}
              alt="Ilustración abstracta de automatización e inteligencia artificial"
              width={1440}
              height={900}
              className="relative rounded-2xl border border-border/50 bg-card shadow-2xl"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

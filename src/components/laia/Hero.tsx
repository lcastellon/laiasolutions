import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroImage from "@/assets/laia-hero.png";

const clients = [
  { name: "Lourher", url: "https://lourher.com" },
  { name: "Salúva Coffee", url: "https://saluvacoffee.com" },
  { name: "The Move Club", url: "https://themoveclub.lovable.app" },
  { name: "Moss Genomics", url: "https://mossgenomics.lovable.app" },
];

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
              Tecnología a la medida de tu negocio
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              LAIA <span className="text-gradient">Soluciones Digitales</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              En LAIA diseñamos soluciones inteligentes: landing pages profesionales, puntos de venta
              para tu negocio, software especializado y aplicaciones. Automatizamos procesos
              para que trabajes de forma más eficiente.
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
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-laia-electric/20 via-laia-mint/10 to-laia-coral/10 blur-3xl" />
            <img
              src={heroImage}
              alt="Ilustración abstracta de tecnología y automatización"
              width={1440}
              height={900}
              className="relative rounded-2xl border border-border/50 bg-card shadow-2xl"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="mt-14 border-t border-border/60 pt-8 sm:mt-16">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Nuestros clientes</h2>
          <Carousel
            opts={{ align: "start", loop: true }}
            aria-label="Nuestros clientes"
            className="mt-5 min-w-0 pb-14"
          >
            <CarouselContent className="-ml-5">
            {clients.map((client) => (
              <CarouselItem
                key={client.url}
                aria-label={client.name}
                className="basis-[85%] pl-5 sm:basis-1/2 lg:basis-1/3"
              >
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar ${client.name} (abre en una nueva pestaña)`}
                className="group block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-laia-electric/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laia-electric focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <span aria-hidden="true" className="absolute inset-0 grid place-items-center px-2 text-center text-sm font-semibold text-primary">
                    {client.name}
                  </span>
                  <img
                    src={`https://image.thum.io/get/width/800/crop/450/noanimate/${client.url}`}
                    alt={`Vista del sitio de ${client.name}`}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="relative h-full w-full object-cover object-top transition-transform group-hover:scale-105"
                    onError={(event) => { event.currentTarget.hidden = true; }}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-4">
                  <span className="text-base font-semibold text-foreground">{client.name}</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-laia-electric" />
                </div>
              </a>
              </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious
              aria-label="Cliente anterior"
              className="bottom-0 left-auto right-12 top-auto h-10 w-10 translate-y-0"
            />
            <CarouselNext
              aria-label="Cliente siguiente"
              className="bottom-0 right-0 top-auto h-10 w-10 translate-y-0"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

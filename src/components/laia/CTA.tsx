import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="contacto" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-laia-deep to-laia-electric p-8 text-center text-primary-foreground shadow-2xl sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-laia-mint/20 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Calendar className="h-4 w-4" />
              Consulta inicial gratuita
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              ¿Tienes una idea o un proceso que quieres automatizar?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
              Cuéntanos qué necesitas y te ayudamos a convertirlo en una solución digital clara, útil
              y escalable.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="gap-2 bg-white text-primary hover:bg-white/90"
                asChild
              >
                <a href="https://wa.me/PLACEHOLDER_WHATSAPP" target="_blank" rel="noopener noreferrer">
                  Agendar una llamada
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                asChild
              >
                <a href="mailto:PLACEHOLDER_EMAIL">Enviar correo</a>
              </Button>
            </div>

            <p className="mt-4 text-sm text-white/70">
              WhatsApp: <span className="font-medium">PLACEHOLDER_PHONE</span> · Correo:{" "}
              <span className="font-medium">PLACEHOLDER_EMAIL</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

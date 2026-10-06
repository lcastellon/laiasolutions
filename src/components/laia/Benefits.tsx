import { Clock, Zap, Repeat, Smile, Lightbulb, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Ahorrar tiempo",
    description: "Delega tareas operativas en sistemas inteligentes que trabajan sin pausa.",
  },
  {
    icon: Zap,
    title: "Agilizar tus ventas",
    description: "Registra ventas y consulta información de productos desde un punto de venta adaptado a tu negocio.",
  },
  {
    icon: Repeat,
    title: "Reducir tareas repetitivas",
    description: "Automatiza procesos manuales y libera a tu equipo para tareas de mayor valor.",
  },
  {
    icon: Smile,
    title: "Mejorar la experiencia del cliente",
    description: "Ofrece páginas y aplicaciones claras, rápidas y fáciles de usar.",
  },
  {
    icon: Lightbulb,
    title: "Convertir ideas en productos digitales",
    description: "Transformamos conceptos en aplicaciones funcionales listas para usar y escalar.",
  },
  {
    icon: BarChart3,
    title: "Tener más control de tu negocio",
    description: "Consulta ventas, inventarios e información de tu operación para tomar decisiones con mayor claridad.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl lg:sticky lg:top-32">
            <span className="text-sm font-semibold uppercase tracking-wider text-laia-coral">
              Beneficios
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              ¿Por qué tu negocio necesita una solución con LAIA?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              La tecnología te ayuda a organizar tu operación, reducir tareas manuales y dedicar
              más tiempo a las decisiones que hacen crecer tu negocio.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-laia-mint/40 hover:shadow-md"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-laia-mint/20 to-laia-mint/5 text-laia-mint">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { ClipboardList, Compass, Code, HeartHandshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Diagnóstico del negocio",
    description:
      "Conocemos tu operación, identificamos procesos repetitivos y oportunidades donde una solución digital puede generar mayor impacto.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Diseño de la solución",
    description:
      "Definimos la arquitectura, herramientas, flujos y experiencia de usuario para que la solución sea clara y funcional.",
  },
  {
    number: "03",
    icon: Code,
    title: "Desarrollo e integración",
    description:
      "Construimos e integramos la solución con tus sistemas actuales, probando cada parte para asegurar calidad y rendimiento.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Acompañamiento y mejora continua",
    description:
      "Te acompañamos en el lanzamiento, capacitamos a tu equipo y mejoramos la solución con base en resultados reales.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-laia-mint/5 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-laia-mint">
            Cómo trabajamos
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Un proceso simple, transparente y enfocado en resultados
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -top-3 left-6 inline-flex h-6 items-center justify-center rounded-full bg-laia-deep px-3 text-xs font-bold text-white">
                {step.number}
              </div>
              <div className="mt-4 grid h-12 w-12 place-items-center rounded-xl bg-muted">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

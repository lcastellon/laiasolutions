import { Users, Building2, Briefcase, Stethoscope, GraduationCap, Sparkles } from "lucide-react";

const clientTypes = [
  { icon: Briefcase, label: "Emprendedores" },
  { icon: Users, label: "Consultores" },
  { icon: Building2, label: "Negocios locales" },
  { icon: Stethoscope, label: "Clínicas" },
  { icon: GraduationCap, label: "Escuelas" },
  { icon: Sparkles, label: "Marcas personales" },
];

export function Clients() {
  return (
    <section id="clientes" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-laia-violet/5 via-transparent to-laia-coral/5" />
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-laia-violet">
          Para quién es LAIA
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Soluciones digitales para todo tipo de negocios
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          LAIA trabaja con emprendedores, consultores, negocios locales, clínicas, despachos,
          escuelas, marcas personales y empresas que quieren digitalizar su operación sin complicarse.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {clientTypes.map((type) => (
            <div
              key={type.label}
              className="flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-laia-violet/40 hover:shadow-md"
            >
              <type.icon className="h-4 w-4 text-laia-electric" />
              {type.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

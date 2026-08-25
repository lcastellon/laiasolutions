import { createFileRoute, Link } from "@tanstack/react-router";

import { LaiaLogo, LaiaMark } from "@/components/laia/Logo";

export const Route = createFileRoute("/marca")({
  component: Marca,
  head: () => ({
    meta: [
      { title: "Identidad de marca LAIA | Logo y variantes" },
      {
        name: "description",
        content:
          "Logo de LAIA, Laboratorio de Inteligencia Artificial: versión horizontal, isotipo, variante clara y variante oscura sobre fondo blanco y azul profundo.",
      },
      { property: "og:title", content: "Identidad de marca LAIA | Logo y variantes" },
      {
        property: "og:description",
        content:
          "Isotipo abstracto, versión horizontal y variantes clara y oscura del logo de LAIA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const swatches = [
  { name: "Azul profundo", hex: "#132A4F" },
  { name: "Azul eléctrico", hex: "#3B82F6" },
  { name: "Verde menta", hex: "#64D6C4" },
  { name: "Marfil", hex: "#FAFAF7" },
];

function Panel({
  title,
  dark = false,
  children,
}: {
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border p-6">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      <div
        className="mt-4 grid min-h-40 place-items-center rounded-xl p-8"
        style={{ backgroundColor: dark ? "#132A4F" : "#FAFAF7" }}
      >
        {children}
      </div>
    </div>
  );
}

function Marca() {
  return (
    <div className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver al inicio
        </Link>

        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight text-foreground">
          Identidad LAIA
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Isotipo abstracto: un módulo geométrico suave que contiene la “L” de LAIA conectada a un
          nodo de inteligencia. Minimalista, cálido y legible desde un favicon hasta una
          presentación.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Panel title="Horizontal · color · fondo marfil">
            <LaiaLogo tone="color" showTagline id="m1" className="scale-125" />
          </Panel>
          <Panel title="Horizontal · clara · fondo azul profundo" dark>
            <LaiaLogo tone="light" showTagline id="m2" className="scale-125" />
          </Panel>
          <Panel title="Horizontal · monocromo oscuro">
            <LaiaLogo tone="dark" id="m3" className="scale-125" />
          </Panel>
          <Panel title="Isotipo · color / clara / oscura">
            <div className="flex items-center gap-8">
              <LaiaMark tone="color" id="m4" className="h-16 w-16" />
              <LaiaMark tone="dark" id="m5" className="h-16 w-16" />
              <span className="grid h-16 w-16 place-items-center rounded-xl" style={{ backgroundColor: "#132A4F" }}>
                <LaiaMark tone="light" id="m6" className="h-11 w-11" />
              </span>
            </div>
          </Panel>
          <Panel title="Tamaños mínimos · favicon">
            <div className="flex items-end gap-6">
              <LaiaMark id="m7" className="h-4 w-4" />
              <LaiaMark id="m8" className="h-6 w-6" />
              <LaiaMark id="m9" className="h-8 w-8" />
              <LaiaMark id="m10" className="h-12 w-12" />
            </div>
          </Panel>
          <Panel title="Paleta">
            <div className="flex flex-wrap justify-center gap-4">
              {swatches.map((s) => (
                <div key={s.hex} className="text-center">
                  <span
                    className="block h-14 w-14 rounded-xl border border-border"
                    style={{ backgroundColor: s.hex }}
                  />
                  <span className="mt-2 block text-[0.65rem] text-muted-foreground">{s.hex}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

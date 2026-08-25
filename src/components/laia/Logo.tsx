import { cn } from "@/lib/utils";

type Tone = "color" | "light" | "dark";

const palette: Record<Tone, { from: string; to: string; node: string; text: string; sub: string }> = {
  // Full color: deep blue -> electric blue with mint node
  color: { from: "#132A4F", to: "#3B82F6", node: "#64D6C4", text: "#132A4F", sub: "#3B82F6" },
  // Light version: for deep blue / dark backgrounds
  light: { from: "#FAFAF7", to: "#FAFAF7", node: "#64D6C4", text: "#FAFAF7", sub: "#64D6C4" },
  // Dark version: single-ink for white / light backgrounds
  dark: { from: "#132A4F", to: "#132A4F", node: "#132A4F", text: "#132A4F", sub: "#132A4F" },
};

interface MarkProps {
  tone?: Tone;
  className?: string;
  id?: string;
}

/** Isotipo: contenedor geométrico suave + "L" de LAIA conectada a un nodo de IA. */
export function LaiaMark({ tone = "color", className, id = "laia" }: MarkProps) {
  const c = palette[tone];
  const gradientId = `${id}-mark-gradient`;

  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label="LAIA"
      className={cn("h-10 w-10", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor={c.from} />
          <stop offset="1" stopColor={c.to} />
        </linearGradient>
      </defs>

      {/* Contenedor modular de esquinas suaves */}
      <rect
        x="2.25"
        y="2.25"
        width="35.5"
        height="35.5"
        rx="11.5"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
      />

      {/* Conexión neuronal sutil */}
      <path
        d="M13 20.5 L25.5 13.5"
        stroke={c.node}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* "L" de LAIA */}
      <path
        d="M13 10.5 V27 H25.5"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Nodo / chispa de inteligencia */}
      <circle cx="25.8" cy="13.2" r="3.4" fill={c.node} />
    </svg>
  );
}

interface LogoProps extends MarkProps {
  /** Muestra el nombre completo debajo del wordmark. */
  showTagline?: boolean;
  markClassName?: string;
}

/** Versión horizontal: isotipo + texto. */
export function LaiaLogo({
  tone = "color",
  showTagline = false,
  className,
  markClassName,
  id = "laia-h",
}: LogoProps) {
  const c = palette[tone];

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LaiaMark tone={tone} id={id} className={cn("h-9 w-9 shrink-0", markClassName)} />
      <span className="flex flex-col leading-none">
        <span
          className="font-heading text-xl font-bold tracking-[0.14em]"
          style={{ color: c.text }}
        >
          LAIA
        </span>
        {showTagline && (
          <span
            className="mt-1 text-[0.5rem] font-medium uppercase tracking-[0.18em] sm:text-[0.55rem]"
            style={{ color: c.sub }}
          >
            Laboratorio de Inteligencia Artificial
          </span>
        )}
      </span>
    </span>
  );
}

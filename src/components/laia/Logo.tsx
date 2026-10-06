import { cn } from "@/lib/utils";

type Tone = "color" | "light" | "dark";

const palette: Record<Tone, { stroke: string; accent: string; dot: string; text: string; sub: string }> = {
  color: { stroke: "#132A4F", accent: "#64D6C4", dot: "#3B82F6", text: "#132A4F", sub: "#3B82F6" },
  light: { stroke: "#FAFAF7", accent: "#64D6C4", dot: "#3B82F6", text: "#FAFAF7", sub: "#64D6C4" },
  dark: { stroke: "#132A4F", accent: "#132A4F", dot: "#132A4F", text: "#132A4F", sub: "#132A4F" },
};

interface MarkProps {
  tone?: Tone;
  className?: string;
  id?: string;
}

/** Trazo continuo, línea menta sólida y punto azul central, recreados en vector desde el logo original. */
export function LaiaMark({ tone = "color", className, id = "laia" }: MarkProps) {
  const c = palette[tone];

  return (
    <svg
      id={id}
      viewBox="0 0 240 144"
      role="img"
      aria-label="LAIA Soluciones Digitales"
      className={cn("h-10 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 16 C17 54 14 119 32 122 C51 130 62 61 82 61 C103 61 108 122 128 122 C148 122 158 61 178 61 C199 61 201 122 222 122"
        stroke={c.stroke}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M128 52 V80" stroke={c.accent} strokeWidth="13" strokeLinecap="round" />
      <circle cx="128" cy="92" r="6.5" fill={c.dot} />
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
      <LaiaMark tone={tone} id={id} className={cn("h-9 w-[3.75rem] shrink-0", markClassName)} />
      <span className="flex flex-col leading-none">
        <span
          className="font-heading text-xl font-bold tracking-[0.14em]"
          style={{ color: c.text }}
        >
          LAIA
        </span>
        {showTagline && (
          <span
            className="mt-1 text-[0.5rem] font-medium tracking-[0.18em] sm:text-[0.55rem]"
            style={{ color: c.sub }}
          >
            Soluciones Digitales
          </span>
        )}
      </span>
    </span>
  );
}

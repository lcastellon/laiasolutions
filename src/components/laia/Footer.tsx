import { Mail, Phone, Linkedin, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LaiaLogo } from "@/components/laia/Logo";

const footerLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Contacto", href: "#contacto" },
];

const socialLinks = [
  { icon: Instagram, href: "PLACEHOLDER_INSTAGRAM", label: "Instagram" },
  { icon: Linkedin, href: "PLACEHOLDER_LINKEDIN", label: "LinkedIn" },
  { icon: Twitter, href: "PLACEHOLDER_TWITTER", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center" aria-label="Laia Soluciones digitales">
              <LaiaLogo showTagline id="laia-footer" />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Landing pages, puntos de venta, software especializado, aplicaciones y automatización
              de procesos para hacer más eficiente la operación de tu negocio.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-laia-electric hover:text-laia-electric"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Links
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-laia-mint" />
                <span>PLACEHOLDER_PHONE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-laia-coral" />
                <span>PLACEHOLDER_EMAIL</span>
              </li>
            </ul>
            <Button className="mt-6 w-full gap-2" asChild>
              <a href="https://wa.me/PLACEHOLDER_WHATSAPP" target="_blank" rel="noopener noreferrer">
                <Phone className="h-4 w-4" />
                Escríbenos por WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Laia Soluciones digitales. Todos los derechos reservados.</p>
          <p>
            Diseñado con cuidado en{" "}
            <span className="text-laia-electric">México</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}

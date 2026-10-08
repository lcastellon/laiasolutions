import type { FormEvent } from "react";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildQuoteUrl, QUOTE_SERVICES, WHATSAPP_URL } from "@/lib/contact";

const fieldClass = "mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-laia-electric";
const labelClass = "block text-sm font-medium text-foreground";

export function CTA() {
  function requestQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const get = (key: string) => String(fields.get(key) || "").trim();
    // Navigation opens WhatsApp with a draft. The visitor confirms sending there.
    window.location.assign(buildQuoteUrl({
      name: get("name"),
      business: get("business"),
      contact: get("contact"),
      service: get("service"),
      description: get("description"),
    }));
  }

  return (
    <section id="contacto" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-laia-deep to-laia-electric p-6 text-primary-foreground shadow-2xl sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-laia-mint/20 blur-3xl" />
          <div className="relative grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="lg:pt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
                <Calendar aria-hidden="true" className="h-4 w-4" />
                Consulta inicial gratuita
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Cuéntanos tu proyecto
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/90">
                Solicita una cotización para tu landing page, punto de venta, software,
                aplicación o automatización. Te ayudamos a encontrar una solución a la medida.
              </p>
              <Button size="lg" className="mt-8 gap-2 bg-white text-primary hover:bg-white/90" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" className="h-5 w-5" />
                  Escríbenos por WhatsApp
                </a>
              </Button>
            </div>

            <form onSubmit={requestQuote} className="rounded-2xl bg-card p-5 text-card-foreground shadow-lg sm:p-7">
              <h3 className="text-xl font-bold text-foreground">Pide tu cotización</h3>
              <p id="quote-help" className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Completa los datos. Abriremos WhatsApp con tu solicitud lista para que la envíes.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label htmlFor="quote-name" className={labelClass}>
                  Nombre *
                  <input id="quote-name" name="name" autoComplete="name" required maxLength={120} placeholder="Tu nombre" className={fieldClass} />
                </label>
                <label htmlFor="quote-business" className={labelClass}>
                  Negocio o empresa
                  <input id="quote-business" name="business" autoComplete="organization" maxLength={160} placeholder="Nombre de tu negocio" className={fieldClass} />
                </label>
                <label htmlFor="quote-contact" className={`${labelClass} sm:col-span-2`}>
                  Correo o teléfono *
                  <input id="quote-contact" name="contact" required maxLength={160} placeholder="Cómo podemos contactarte" className={fieldClass} />
                </label>
                <label htmlFor="quote-service" className={`${labelClass} sm:col-span-2`}>
                  Servicio de interés *
                  <select id="quote-service" name="service" required defaultValue="" className={fieldClass}>
                    <option value="" disabled>Selecciona un servicio</option>
                    {QUOTE_SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                </label>
                <label htmlFor="quote-description" className={`${labelClass} sm:col-span-2`}>
                  Cuéntanos qué necesitas *
                  <textarea id="quote-description" name="description" required maxLength={2500} rows={4} placeholder="Describe tu idea, las funciones que necesitas y tus tiempos estimados." className={`${fieldClass} resize-y`} />
                </label>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">* Campos obligatorios</p>
              <Button type="submit" size="lg" aria-describedby="quote-help" className="mt-5 w-full gap-2">
                Continuar en WhatsApp
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

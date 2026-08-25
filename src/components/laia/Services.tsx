import { Bot, MessageSquare, Globe, Layout, Workflow, Plug } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
  {
    icon: Bot,
    title: "Agentes de IA personalizados",
    description:
      "Creamos asistentes inteligentes que entienden tu negocio, toman decisiones y ejecutan tareas específicas para tu equipo.",
    color: "bg-laia-electric/10 text-laia-electric",
  },
  {
    icon: MessageSquare,
    title: "Chatbots para atención y ventas",
    description:
      "Atención al cliente disponible 24/7, respuestas instantáneas y conversaciones que convierten visitantes en compradores.",
    color: "bg-laia-violet/10 text-laia-violet",
  },
  {
    icon: Globe,
    title: "Aplicaciones web a medida",
    description:
      "Desarrollamos herramientas digitales funcionales, escalables y fáciles de usar, adaptadas a los procesos de tu empresa.",
    color: "bg-laia-mint/10 text-laia-mint",
  },
  {
    icon: Layout,
    title: "Landing pages profesionales",
    description:
      "Páginas de alta conversión, rápidas, con diseño moderno y optimizadas para captar clientes potenciales desde el primer clic.",
    color: "bg-laia-coral/10 text-laia-coral",
  },
  {
    icon: Workflow,
    title: "Automatización de procesos",
    description:
      "Eliminamos tareas repetitivas conectando herramientas y flujos de trabajo para que tu equipo enfoque su tiempo en lo importante.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Plug,
    title: "Integración con herramientas digitales",
    description:
      "Conectamos CRMs, ERPs, plataformas de marketing, WhatsApp y cualquier sistema que ya uses en tu operación diaria.",
    color: "bg-secondary/10 text-secondary",
  },
];

export function Services() {
  return (
    <section id="servicios" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-laia-electric">
            Servicios
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Todo lo que necesitas para digitalizar y automatizar tu negocio
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Desde la idea hasta la implementación: diseñamos soluciones que se adaptan a tu
            operación, presupuesto y objetivos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="card-hover group border-border/60 bg-card/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${service.color} transition-transform group-hover:scale-110`}
                >
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

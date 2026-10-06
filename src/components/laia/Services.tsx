import { Monitor, ShoppingCart, Globe, Layout, Workflow, Plug } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
  {
    icon: Layout,
    title: "Landing pages profesionales",
    description:
      "Páginas rápidas, con diseño profesional y adaptadas a celulares, pensadas para presentar tu negocio y captar clientes potenciales.",
    color: "bg-laia-coral/10 text-laia-coral",
  },
  {
    icon: ShoppingCart,
    title: "Puntos de venta para tu negocio",
    description:
      "Sistemas para registrar ventas, gestionar inventarios y llevar el control de tu operación desde un solo lugar.",
    color: "bg-laia-violet/10 text-laia-violet",
  },
  {
    icon: Monitor,
    title: "Software especializado",
    description:
      "Diseñamos software a medida para las necesidades de tu negocio, con herramientas que se adaptan a tu forma de trabajar.",
    color: "bg-laia-electric/10 text-laia-electric",
  },
  {
    icon: Globe,
    title: "Desarrollo de aplicaciones",
    description:
      "Creamos aplicaciones funcionales, fáciles de usar y adaptadas a tus objetivos y a las necesidades de tus usuarios.",
    color: "bg-laia-mint/10 text-laia-mint",
  },
  {
    icon: Workflow,
    title: "Automatización de procesos",
    description:
      "Reducimos tareas repetitivas conectando herramientas y flujos de trabajo para que tu equipo enfoque su tiempo en lo importante.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Plug,
    title: "Integración con herramientas digitales",
    description:
      "Conectamos las herramientas que usas en tu operación para facilitar el intercambio de información y reducir capturas manuales.",
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

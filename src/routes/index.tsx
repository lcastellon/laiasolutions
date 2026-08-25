import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/laia/Navbar";
import { Hero } from "@/components/laia/Hero";
import { Services } from "@/components/laia/Services";
import { Process } from "@/components/laia/Process";
import { Benefits } from "@/components/laia/Benefits";
import { Clients } from "@/components/laia/Clients";
import { CTA } from "@/components/laia/CTA";
import { Footer } from "@/components/laia/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "LAIA | Laboratorio y Agentes de IA para tu negocio" },
      {
        name: "description",
        content:
          "En LAIA diseñamos soluciones inteligentes: automatizamos procesos, creamos asistentes de IA, aplicaciones web y landing pages que trabajan contigo y para ti.",
      },
      {
        property: "og:title",
        content: "LAIA | Laboratorio y Agentes de IA para tu negocio",
      },
      {
        property: "og:description",
        content:
          "Diseñamos soluciones inteligentes: automatización, chatbots, aplicaciones web y landing pages con inteligencia artificial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "LAIA | Laboratorio y Agentes de IA para tu negocio",
      },
      {
        name: "twitter:description",
        content:
          "Diseñamos soluciones inteligentes: automatización, chatbots, aplicaciones web y landing pages con inteligencia artificial.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Benefits />
        <Clients />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

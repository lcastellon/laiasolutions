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
      { title: "Laia Soluciones digitales" },
      {
        name: "description",
        content:
          "En Laia diseñamos soluciones inteligentes: landing pages profesionales, puntos de venta para tu negocio, software especializado, aplicaciones y automatización de procesos.",
      },
      {
        property: "og:title",
        content: "Laia Soluciones digitales",
      },
      {
        property: "og:description",
        content:
          "Landing pages profesionales, puntos de venta, software especializado, aplicaciones y automatización de procesos para tu negocio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Laia Soluciones digitales",
      },
      {
        name: "twitter:description",
        content:
          "Landing pages profesionales, puntos de venta, software especializado, aplicaciones y automatización de procesos para tu negocio.",
      },
      { property: "og:image", content: "https://laiasolutions.lovable.app/og-laia.png" },
      { name: "twitter:image", content: "https://laiasolutions.lovable.app/og-laia.png" },
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

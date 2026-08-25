import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, LogOut, RefreshCw, ShieldCheck, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LaiaLogo } from "@/components/laia/Logo";
import { listLeads, claimAdminAccess, type LaiaLead } from "@/lib/laia-leads.functions";

export const Route = createFileRoute("/_authenticated/leads")({
  component: LeadsPage,
  head: () => ({
    meta: [
      { title: "Diagnósticos recibidos | LAIA" },
      {
        name: "description",
        content: "Panel privado de LAIA con los diagnósticos que dejan los clientes en el chat.",
      },
      { property: "og:title", content: "Diagnósticos recibidos | LAIA" },
      {
        property: "og:description",
        content: "Panel privado de LAIA con los diagnósticos de clientes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="whitespace-pre-line text-sm text-foreground">{value}</p>
    </div>
  );
}

function LeadsPage() {
  const navigate = useNavigate();
  const fetchLeads = useServerFn(listLeads);
  const claimAdmin = useServerFn(claimAdminAccess);

  const [leads, setLeads] = useState<LaiaLead[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchLeads({ data: undefined });
      setIsAdmin(result.isAdmin);
      setLeads(result.leads);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No pudimos cargar los diagnósticos.");
    } finally {
      setLoading(false);
    }
  }, [fetchLeads]);

  useEffect(() => {
    void load();
  }, [load]);

  const activate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await claimAdmin({ data: undefined });
      if (!result.granted) {
        setError("Ya existe un administrador. Pide acceso al administrador actual.");
        setLoading(false);
        return;
      }
      await load();
    } catch (claimError) {
      setError(claimError instanceof Error ? claimError.message : "No pudimos activar tu acceso.");
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/">
            <LaiaLogo className="h-8" />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => void load()} disabled={loading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualizar
            </Button>
            <Button variant="outline" size="sm" onClick={() => void signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        <div className="mb-8 space-y-2">
          <h1 className="font-heading text-2xl font-semibold sm:text-3xl">Diagnósticos recibidos</h1>
          <p className="text-sm text-muted-foreground">
            Aquí llegan las conversaciones completadas en el Agente Diagnóstico LAIA, con los datos de
            contacto del cliente.
          </p>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Cargando…
          </div>
        )}

        {!loading && !isAdmin && (
          <div className="rounded-3xl border border-border bg-card p-7">
            <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              Activa tu acceso de administrador
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tu cuenta aún no tiene permisos para ver los diagnósticos. Si eres el dueño del sitio,
              actívalos ahora (solo funciona si todavía no hay ningún administrador).
            </p>
            <Button className="mt-5" onClick={() => void activate()}>
              Activar mi acceso
            </Button>
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {!loading && isAdmin && leads.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center">
            <Inbox className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Todavía no hay diagnósticos. Cuando un cliente complete el chat, aparecerá aquí.
            </p>
          </div>
        )}

        {!loading && isAdmin && leads.length > 0 && (
          <ul className="space-y-4">
            {leads.map((lead) => (
              <li key={lead.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-heading text-lg font-semibold">
                    {lead.name || "Sin nombre"}
                    {lead.business_type ? (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        {lead.business_type}
                      </span>
                    ) : null}
                  </h2>
                  <time className="text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString("es-MX")}
                  </time>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Contacto" value={lead.contact} />
                  <Field label="Urgencia" value={lead.urgency} />
                  <Field label="Problema" value={lead.problem} />
                  <Field label="Solución recomendada" value={lead.recommended_solution} />
                  <Field label="Herramientas sugeridas" value={lead.tools} />
                  <Field label="Resumen" value={lead.conversation_summary} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type LaiaLead = {
  id: string;
  created_at: string;
  name: string | null;
  business_type: string | null;
  problem: string | null;
  recommended_solution: string | null;
  tools: string | null;
  urgency: string | null;
  contact: string | null;
  conversation_summary: string | null;
};

export const listLeads = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ isAdmin: boolean; leads: LaiaLead[] }> => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });

    if (!isAdmin) return { isAdmin: false, leads: [] };

    const { data, error } = await context.supabase
      .from("laia_leads")
      .select(
        "id, created_at, name, business_type, problem, recommended_solution, tools, urgency, contact, conversation_summary",
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("No se pudieron leer los leads", error);
      throw new Error("No pudimos cargar los diagnósticos.");
    }

    return { isAdmin: true, leads: (data ?? []) as LaiaLead[] };
  });

/**
 * Otorga el rol de administrador al primer usuario que reclama el panel.
 * Si ya existe un administrador, no hace nada.
 */
export const claimAdminAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ granted: boolean }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if (countError) {
      console.error("No se pudo verificar administradores", countError);
      throw new Error("No pudimos verificar los permisos.");
    }

    if ((count ?? 0) > 0) return { granted: false };

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });

    if (error) {
      console.error("No se pudo asignar el rol admin", error);
      throw new Error("No pudimos activar tu acceso.");
    }

    return { granted: true };
  });

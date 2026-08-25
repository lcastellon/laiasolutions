import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { LaiaLogo } from "@/components/laia/Logo";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Acceso al panel LAIA" },
      {
        name: "description",
        content:
          "Área privada de LAIA: inicia sesión para revisar los diagnósticos que dejan los clientes en el Agente Diagnóstico.",
      },
      { property: "og:title", content: "Acceso al panel LAIA" },
      {
        property: "og:description",
        content: "Inicia sesión para revisar los diagnósticos de clientes de LAIA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/leads` },
        });
        if (signUpError) throw signUpError;
        if (data.session) {
          navigate({ to: "/leads" });
          return;
        }
        setMessage("Revisa tu correo para confirmar la cuenta y luego inicia sesión.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate({ to: "/leads" });
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "No pudimos completar la acción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-muted/30 px-5 py-16">
      <Link to="/">
        <LaiaLogo className="h-10" />
      </Link>

      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-7 shadow-sm">
        <div className="mb-6 space-y-1.5">
          <h1 className="flex items-center gap-2 font-heading text-xl font-semibold">
            <Lock className="h-4 w-4 text-secondary" />
            Panel privado
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "signin"
              ? "Inicia sesión para ver los diagnósticos de tus clientes."
              : "Crea tu cuenta de administrador de LAIA."}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Correo</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-xl border border-laia-mint/40 bg-laia-mint/10 px-3 py-2 text-sm text-foreground">
              {message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Entrar" : "Crear cuenta"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setMessage(null);
          }}
          className="mt-5 w-full text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {mode === "signin" ? "No tengo cuenta — crear una" : "Ya tengo cuenta — iniciar sesión"}
        </button>
      </div>
    </div>
  );
}

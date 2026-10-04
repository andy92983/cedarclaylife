"use client";

import { useState } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SITE } from "@/lib/site";

const NEXT_PATH_KEY = "cedarclay_auth_next";

type Props = {
  redirectPath: string;
  title?: string;
  description?: string;
};

export function AuthPanel({
  redirectPath,
  title = "Sign in to view orders",
  description = "We'll email you a magic link. Use the same email you used on your pre-order.",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  if (!isSupabaseConfigured()) {
    return (
      <p className="rounded-xl border border-clay-200 bg-clay-50 px-4 py-3 text-sm text-clay-800">
        Order tracking is not configured yet. Please check back soon, or{" "}
        <a href="/contact" className="font-semibold underline">
          contact us
        </a>
        .
      </p>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Sign-in is unavailable.");
      setStatus("error");
      return;
    }

    // Keep redirect URL exact (no query string) so Supabase allow-list matches.
    // Otherwise GoTrue falls back to the project Site URL (oristrade.com).
    try {
      localStorage.setItem(NEXT_PATH_KEY, redirectPath || "/orders");
    } catch {
      // ignore private mode failures
    }

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : `${SITE.domain}/auth/callback`;

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });

    if (signInError) {
      setError(signInError.message);
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-sage-200 bg-sage-50/80 px-5 py-6 text-sm text-cedar-800">
        <p className="font-display text-lg text-bark">Check your email</p>
        <p className="mt-2">
          We sent a sign-in link to <span className="font-semibold">{email}</span>.
        </p>
        <p className="mt-3 rounded-lg border border-clay-200 bg-clay-50/80 px-3 py-2.5 text-clay-900">
          Look for an email from{" "}
          <span className="font-semibold">OrisTrade</span> (our sign-in system). Check your{" "}
          <span className="font-semibold">Spam</span> or{" "}
          <span className="font-semibold">Junk</span> folder if you don&apos;t see it within a few
          minutes.
        </p>
        <p className="mt-3 text-cedar-700">
          Open the link on this device. It should take you to{" "}
          <span className="font-semibold">cedarclaylife.com</span> to view your orders.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-bark">{title}</h2>
        <p className="mt-2 text-sm text-cedar-600">{description}</p>
      </div>
      <div>
        <label htmlFor="auth-email" className="block text-sm font-medium text-bark">
          Email
        </label>
        <input
          id="auth-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "sending"}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          placeholder="you@example.com"
        />
      </div>
      {status === "error" && error && (
        <p className="text-sm text-clay-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex rounded-full bg-cedar-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cedar-700 disabled:opacity-60"
      >
        {status === "sending" ? "Sending link…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}

export { NEXT_PATH_KEY };

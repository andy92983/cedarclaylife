"use client";

import { useState } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SITE } from "@/lib/site";

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

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`
        : `${SITE.domain}/auth/callback?next=${encodeURIComponent(redirectPath)}`;

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
          We sent a sign-in link to <span className="font-semibold">{email}</span>. Open it on
          this device to view your orders.
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

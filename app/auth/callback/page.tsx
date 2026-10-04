"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Sign-in is not configured.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const next = params.get("next") || "/orders";
    const code = params.get("code");

    async function finish() {
      if (code) {
        const { error } = await supabase!.auth.exchangeCodeForSession(code);
        if (error) {
          setMessage(error.message);
          return;
        }
      } else {
        // Hash-based links (older magic link flow)
        const { data } = await supabase!.auth.getSession();
        if (!data.session) {
          setMessage("Could not complete sign-in. Request a new link from the orders page.");
          return;
        }
      }

      router.replace(next);
    }

    void finish();
  }, [router]);

  return (
    <section className="section-padding">
      <div className="container-narrow text-center">
        <p className="font-display text-2xl text-bark">{message}</p>
      </div>
    </section>
  );
}

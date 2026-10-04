"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthPanel } from "@/components/orders/AuthPanel";
import { OrdersList } from "@/components/orders/OrdersList";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  PREORDERS_TABLE,
  type Preorder,
  type PreorderEditFields,
} from "@/lib/supabase/types";

export function MyOrdersClient() {
  const [session, setSession] = useState<Session | null>(null);
  const [orders, setOrders] = useState<Preorder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function loadOrders() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabase
      .from(PREORDERS_TABLE)
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setOrders([]);
    } else {
      setOrders((data as Preorder[]) ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!session) {
      setOrders([]);
      return;
    }
    void loadOrders();
  }, [session]);

  async function saveCustomerEdit(id: string, fields: PreorderEditFields) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) throw new Error("Not signed in.");

    const order = orders.find((o) => o.id === id);
    const subtotal = order ? order.unit_price_usd * fields.quantity : undefined;

    const { error: updateError } = await supabase
      .from(PREORDERS_TABLE)
      .update({
        quantity: fields.quantity,
        customer_phone: fields.customer_phone.trim() || null,
        shipping_address: fields.shipping_address.trim(),
        notes: fields.notes.trim() || null,
        ...(subtotal !== undefined ? { subtotal_usd: subtotal } : {}),
      })
      .eq("id", id);

    if (updateError) throw new Error(updateError.message);
    await loadOrders();
  }

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    setSession(null);
    setOrders([]);
  }

  if (!isSupabaseConfigured()) {
    return <AuthPanel redirectPath="/orders" />;
  }

  if (loading && !session) {
    return <p className="text-sm text-cedar-600">Loading…</p>;
  }

  if (!session) {
    return <AuthPanel redirectPath="/orders" />;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-cedar-700">
          Signed in as <span className="font-semibold text-bark">{session.user.email}</span>
        </p>
        <button
          type="button"
          onClick={signOut}
          className="text-sm font-semibold text-cedar-600 underline-offset-4 hover:underline"
        >
          Sign out
        </button>
      </div>
      {error && (
        <p className="mb-4 text-sm text-clay-600" role="alert">
          {error}
        </p>
      )}
      {loading ? (
        <p className="text-sm text-cedar-600">Loading your orders…</p>
      ) : (
        <OrdersList
          orders={orders}
          emptyMessage="No pre-orders found for this email yet. Submit one on the Pre-Order page — use this same email so they show up here."
          onCustomerSave={saveCustomerEdit}
        />
      )}
    </div>
  );
}

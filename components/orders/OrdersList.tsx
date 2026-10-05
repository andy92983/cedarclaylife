"use client";

import { useState } from "react";
import {
  canCustomerCancel,
  canCustomerEdit,
  formatStatus,
  isNonRefundable,
  type Preorder,
  type PreorderEditFields,
  type PreorderStatus,
  PREORDER_STATUSES,
} from "@/lib/supabase/types";

type Props = {
  orders: Preorder[];
  emptyMessage: string;
  showCustomer?: boolean;
  onStatusChange?: (id: string, status: PreorderStatus) => Promise<void>;
  onCustomerSave?: (id: string, fields: PreorderEditFields) => Promise<void>;
  onCustomerCancel?: (id: string) => Promise<void>;
};

export function OrdersList({
  orders,
  emptyMessage,
  showCustomer = false,
  onStatusChange,
  onCustomerSave,
  onCustomerCancel,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<PreorderEditFields | null>(null);
  const [editError, setEditError] = useState("");

  if (orders.length === 0) {
    return <p className="text-sm text-cedar-600">{emptyMessage}</p>;
  }

  function startEdit(order: Preorder) {
    setEditingId(order.id);
    setEditError("");
    setDraft({
      quantity: order.quantity,
      customer_phone: order.customer_phone || "",
      shipping_address: order.shipping_address,
      notes: order.notes || "",
    });
  }

  async function saveEdit(id: string) {
    if (!onCustomerSave || !draft) return;
    setSavingId(id);
    setEditError("");
    try {
      await onCustomerSave(id, draft);
      setEditingId(null);
      setDraft(null);
    } catch (e) {
      setEditError(e instanceof Error ? e.message : "Could not save changes.");
    } finally {
      setSavingId(null);
    }
  }

  async function cancelOrder(id: string) {
    if (!onCustomerCancel) return;
    const ok = window.confirm(
      "Cancel this order? If you already paid, we will contact you about a refund. Once an order is in Shipping or later, it cannot be cancelled or refunded."
    );
    if (!ok) return;

    setCancellingId(id);
    setEditError("");
    try {
      await onCustomerCancel(id);
      setEditingId(null);
      setDraft(null);
    } catch (e) {
      setEditError(e instanceof Error ? e.message : "Could not cancel order.");
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <ul className="space-y-4">
      {orders.map((order) => {
        const editing = editingId === order.id && draft;
        const editable = Boolean(onCustomerSave && canCustomerEdit(order.status));
        const cancellable = Boolean(onCustomerCancel && canCustomerCancel(order.status));
        const locked = isNonRefundable(order.status);

        return (
          <li key={order.id} className="card-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl text-bark">{order.product_name}</p>
                <p className="mt-1 text-xs text-cedar-500">
                  {new Date(order.created_at).toLocaleString()} · Qty {order.quantity} · $
                  {order.subtotal_usd} est.
                </p>
              </div>
              {onStatusChange ? (
                <select
                  value={
                    PREORDER_STATUSES.includes(order.status as PreorderStatus)
                      ? order.status
                      : "processing"
                  }
                  onChange={(e) => onStatusChange(order.id, e.target.value as PreorderStatus)}
                  className="rounded-lg border border-cedar-200 bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-cedar-800"
                  aria-label={`Status for ${order.product_name}`}
                >
                  {PREORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {formatStatus(status)}
                    </option>
                  ))}
                </select>
              ) : (
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    order.status === "cancelled"
                      ? "bg-clay-100 text-clay-700"
                      : "bg-sage-100 text-sage-700"
                  }`}
                >
                  {formatStatus(order.status)}
                </span>
              )}
            </div>

            {showCustomer && (
              <div className="mt-3 space-y-1 text-sm text-cedar-700">
                <p>
                  <span className="font-semibold text-bark">{order.customer_name}</span> ·{" "}
                  <a href={`mailto:${order.customer_email}`} className="underline">
                    {order.customer_email}
                  </a>
                  {order.customer_phone ? ` · ${order.customer_phone}` : ""}
                </p>
                <p className="whitespace-pre-line text-xs text-cedar-600">{order.shipping_address}</p>
                {order.notes && (
                  <p className="text-xs text-cedar-600">
                    <span className="font-semibold text-bark">Notes:</span> {order.notes}
                  </p>
                )}
              </div>
            )}

            {!showCustomer && !editing && (
              <div className="mt-3 space-y-1 text-sm text-cedar-700">
                {order.customer_phone && (
                  <p className="text-xs text-cedar-600">Phone: {order.customer_phone}</p>
                )}
                <p className="whitespace-pre-line text-xs text-cedar-600">{order.shipping_address}</p>
                {order.notes && (
                  <p className="text-xs text-cedar-600">
                    <span className="font-semibold text-bark">Your notes:</span> {order.notes}
                  </p>
                )}
              </div>
            )}

            {!showCustomer && locked && (
              <p className="mt-3 rounded-lg border border-clay-200 bg-clay-50/80 px-3 py-2 text-xs text-clay-800">
                This order is <span className="font-semibold">non-refundable</span> and cannot be
                cancelled. Because of the nature of our handmade products, once an order moves to
                Shipping, Shipped, Delivered, or Completed, we cannot accept cancellations or refunds.
              </p>
            )}

            {!showCustomer && order.status === "cancelled" && (
              <p className="mt-3 rounded-lg border border-sage-200 bg-sage-50/80 px-3 py-2 text-xs text-cedar-800">
                This order was cancelled. If you had already paid, we&apos;ll contact you about a
                refund.
              </p>
            )}

            {!showCustomer && editing && draft && (
              <div className="mt-4 space-y-3 border-t border-cedar-100 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-bark">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={draft.quantity}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        quantity: Math.min(20, Math.max(1, Number(e.target.value) || 1)),
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-bark">Phone</label>
                  <input
                    type="tel"
                    value={draft.customer_phone}
                    onChange={(e) => setDraft({ ...draft, customer_phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-bark">Shipping address</label>
                  <textarea
                    rows={3}
                    value={draft.shipping_address}
                    onChange={(e) => setDraft({ ...draft, shipping_address: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-bark">Notes</label>
                  <textarea
                    rows={2}
                    value={draft.notes}
                    onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-3 py-2 text-sm"
                  />
                </div>
                {editError && (
                  <p className="text-xs text-clay-600" role="alert">
                    {editError}
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={savingId === order.id}
                    onClick={() => void saveEdit(order.id)}
                    className="rounded-full bg-cedar-600 px-4 py-2 text-xs font-semibold text-white hover:bg-cedar-700 disabled:opacity-60"
                  >
                    {savingId === order.id ? "Saving…" : "Save changes"}
                  </button>
                  <button
                    type="button"
                    disabled={savingId === order.id}
                    onClick={() => {
                      setEditingId(null);
                      setDraft(null);
                      setEditError("");
                    }}
                    className="text-xs font-semibold text-cedar-600 underline-offset-4 hover:underline"
                  >
                    Cancel edit
                  </button>
                </div>
              </div>
            )}

            {!showCustomer && !editing && (editable || cancellable) && (
              <div className="mt-4 space-y-2 border-t border-cedar-100 pt-4">
                <p className="text-[11px] text-cedar-600">
                  You can edit or cancel while status is <span className="font-semibold">Processing</span>.
                  If you already paid and cancel now, we&apos;ll arrange a refund. Orders become{" "}
                  <span className="font-semibold">non-refundable</span> once they move to Shipping or
                  later.
                </p>
                <div className="flex flex-wrap gap-3">
                  {editable && (
                    <button
                      type="button"
                      onClick={() => startEdit(order)}
                      className="rounded-full border border-cedar-300 px-4 py-2 text-xs font-semibold text-cedar-800 hover:bg-cedar-50"
                    >
                      Edit order
                    </button>
                  )}
                  {cancellable && (
                    <button
                      type="button"
                      disabled={cancellingId === order.id}
                      onClick={() => void cancelOrder(order.id)}
                      className="rounded-full border border-clay-300 px-4 py-2 text-xs font-semibold text-clay-800 hover:bg-clay-50 disabled:opacity-60"
                    >
                      {cancellingId === order.id ? "Cancelling…" : "Cancel order"}
                    </button>
                  )}
                </div>
                {editError && (
                  <p className="text-xs text-clay-600" role="alert">
                    {editError}
                  </p>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

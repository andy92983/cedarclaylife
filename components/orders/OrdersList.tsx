"use client";

import { formatStatus, type Preorder, type PreorderStatus, PREORDER_STATUSES } from "@/lib/supabase/types";

type Props = {
  orders: Preorder[];
  emptyMessage: string;
  showCustomer?: boolean;
  onStatusChange?: (id: string, status: PreorderStatus) => Promise<void>;
};

export function OrdersList({
  orders,
  emptyMessage,
  showCustomer = false,
  onStatusChange,
}: Props) {
  if (orders.length === 0) {
    return <p className="text-sm text-cedar-600">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-4">
      {orders.map((order) => (
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
                value={order.status}
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
              <span className="rounded-full bg-sage-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-sage-700">
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

          {!showCustomer && order.notes && (
            <p className="mt-2 text-xs text-cedar-600">
              <span className="font-semibold text-bark">Your notes:</span> {order.notes}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

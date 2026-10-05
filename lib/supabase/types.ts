export type PreorderStatus =
  | "processing"
  | "shipping"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled";

export type Preorder = {
  id: string;
  created_at: string;
  updated_at: string;
  status: PreorderStatus;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price_usd: number;
  subtotal_usd: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  notes: string | null;
};

export type PreorderEditFields = {
  quantity: number;
  customer_phone: string;
  shipping_address: string;
  notes: string;
};

/** Admin-selectable statuses (includes cancelled). */
export const PREORDER_STATUSES: PreorderStatus[] = [
  "processing",
  "shipping",
  "shipped",
  "delivered",
  "completed",
  "cancelled",
];

/** Admin UI lives in OrisTrade Journal — not on this site. */
export const ORISTRADE_ADMIN_ORDERS_URL =
  "https://journal.oristrade.com/admin/cedarclay-orders";

export function formatStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

/** Customer may edit or cancel only while processing. */
export function canCustomerEdit(status: string): boolean {
  return status === "processing";
}

export function canCustomerCancel(status: string): boolean {
  return status === "processing";
}

export function isNonRefundable(status: string): boolean {
  return ["shipping", "shipped", "delivered", "completed"].includes(status);
}

/** Supabase table in the OrisTrade project */
export const PREORDERS_TABLE = "cedarclay_preorders";

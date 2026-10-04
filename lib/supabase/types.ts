export type PreorderStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "shipped"
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

export const PREORDER_STATUSES: PreorderStatus[] = [
  "pending",
  "confirmed",
  "paid",
  "shipped",
  "cancelled",
];

/** Admin UI lives in OrisTrade Journal — not on this site. */
export const ORISTRADE_ADMIN_ORDERS_URL =
  "https://journal.oristrade.com/admin/cedarclay-orders";

export function formatStatus(status: PreorderStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

/** Supabase table in the OrisTrade project */
export const PREORDERS_TABLE = "cedarclay_preorders";

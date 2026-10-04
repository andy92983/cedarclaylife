"use client";

import { useState } from "react";
import {
  formatOnlinePrice,
  formatProductPrice,
  shippableProducts,
} from "@/lib/products";

type Status = "idle" | "sending" | "success" | "error";

export function PreOrderForm({ initialProductId }: { initialProductId?: string }) {
  const products = shippableProducts();
  const defaultId =
    initialProductId && products.some((p) => p.id === initialProductId)
      ? initialProductId
      : products[0]?.id ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [productId, setProductId] = useState(defaultId);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result: { error?: string; ok?: boolean } = {};
      try {
        result = await res.json();
      } catch {
        // Empty/non-JSON body — still treat HTTP success as saved
      }

      if (!res.ok) {
        setErrorMessage(
          typeof result.error === "string"
            ? result.error
            : "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setProductId(defaultId);
    } catch {
      setErrorMessage(
        "Your pre-order may still have been received — check your email or My Orders. If nothing appears, try again or contact us."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-sage-200 bg-sage-50/80 px-6 py-8 text-center">
        <p className="font-display text-xl text-bark">Pre-order received</p>
        <p className="mt-2 text-sm text-cedar-700">
          Thank you — we&apos;ll contact you to confirm availability, shipping, and how to pay.
          No payment was taken on this website. Track this order anytime on{" "}
          <a href="/orders" className="font-semibold underline">
            My Orders
          </a>{" "}
          with the same email.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-cedar-600 underline-offset-4 hover:underline"
        >
          Submit another pre-order
        </button>
      </div>
    );
  }

  const selected = products.find((p) => p.id === productId);

  return (
    <form className="space-y-4" onSubmit={handleSubmit} aria-label="Pre-order form">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div>
        <label htmlFor="preorder-product" className="block text-sm font-medium text-bark">
          Product
        </label>
        <select
          id="preorder-product"
          name="productId"
          required
          disabled={status === "sending"}
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {formatOnlinePrice(p.price)} online
            </option>
          ))}
        </select>
        {selected && (
          <p className="mt-1 text-xs text-cedar-500">
            Booth: {formatProductPrice(selected)} · packaging sizes may vary
          </p>
        )}
      </div>

      <div>
        <label htmlFor="preorder-qty" className="block text-sm font-medium text-bark">
          Quantity
        </label>
        <input
          id="preorder-qty"
          name="quantity"
          type="number"
          min={1}
          max={20}
          defaultValue={1}
          required
          disabled={status === "sending"}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="preorder-name" className="block text-sm font-medium text-bark">
          Name
        </label>
        <input
          id="preorder-name"
          name="name"
          type="text"
          required
          disabled={status === "sending"}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="preorder-email" className="block text-sm font-medium text-bark">
          Email
        </label>
        <input
          id="preorder-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={status === "sending"}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="preorder-phone" className="block text-sm font-medium text-bark">
          Phone <span className="font-normal text-cedar-500">(optional)</span>
        </label>
        <input
          id="preorder-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={status === "sending"}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          placeholder="(920) 555-0100"
        />
      </div>

      <div>
        <label htmlFor="preorder-address" className="block text-sm font-medium text-bark">
          Shipping address
        </label>
        <textarea
          id="preorder-address"
          name="address"
          required
          rows={3}
          disabled={status === "sending"}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          placeholder="Street, city, state, ZIP"
        />
      </div>

      <div>
        <label htmlFor="preorder-notes" className="block text-sm font-medium text-bark">
          Notes <span className="font-normal text-cedar-500">(optional)</span>
        </label>
        <textarea
          id="preorder-notes"
          name="notes"
          rows={3}
          disabled={status === "sending"}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          placeholder="Questions, preferred pickup, etc."
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-clay-600" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center rounded-full bg-cedar-600 px-6 py-4 text-sm font-semibold text-white hover:bg-cedar-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Submit pre-order"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";

const INTERESTS = [
  "Studio classes",
  "Products",
  "Trail visit",
  "General inquiry",
] as const;

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json().catch(() => ({}));

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
    } catch {
      setErrorMessage("Could not send. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-8 rounded-xl border border-sage-200 bg-sage-50/80 px-6 py-8 text-center">
        <p className="font-display text-xl text-bark">Message sent</p>
        <p className="mt-2 text-sm text-cedar-700">
          Thank you — we&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-cedar-600 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit} aria-label="Contact form">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-bark">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          disabled={status === "sending"}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-bark">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          disabled={status === "sending"}
          autoComplete="email"
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="contact-interest" className="block text-sm font-medium text-bark">
          I&apos;m interested in
        </label>
        <select
          id="contact-interest"
          name="interest"
          disabled={status === "sending"}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          defaultValue="General inquiry"
        >
          {INTERESTS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-bark">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          disabled={status === "sending"}
          rows={4}
          className="mt-1 w-full rounded-xl border border-cedar-200 bg-cream px-4 py-3 text-sm disabled:opacity-60"
          placeholder="Tell us a little about what you're looking for..."
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
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

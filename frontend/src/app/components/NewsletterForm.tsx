"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const subscribe = useMutation(api.leads.subscribeNewsletter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const result = await subscribe({ email });
      setStatus("success");
      setMessage(result.message);
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="email"
        placeholder="Enter your email here"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="w-full h-15 px-6 rounded-lg border-none focus:ring-2 focus:ring-[#0C8B51] transition-all"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`main-btn main-btn-2 absolute right-0 top-0 h-full px-8 rounded-lg transition-all ${
          status === "loading" ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {status === "loading" ? "Subscribing..." : "Subscribe now"}
      </button>

      {status === "success" && (
        <p className="absolute -bottom-8 left-0 text-green-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
          <i className="fas fa-check-circle mr-2"></i> {message}
        </p>
      )}
      {status === "error" && (
        <p className="absolute -bottom-8 left-0 text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
          <i className="fas fa-exclamation-circle mr-2"></i> {message}
        </p>
      )}
    </form>
  );
}

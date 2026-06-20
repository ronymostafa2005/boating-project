"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {t("name")}
          </label>
          <input id="name" name="name" required className="input-luxury" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            {t("email")}
          </label>
          <input id="email" name="email" type="email" required className="input-luxury" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            {t("phone")}
          </label>
          <input id="phone" name="phone" type="tel" required className="input-luxury" />
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            {t("message")}
          </label>
          <textarea id="message" name="message" rows={5} required className="input-luxury resize-none" />
        </div>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "..." : t("submit")}
        </Button>
        {status === "success" && (
          <p className="text-sm text-green-400">{t("success")}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">{t("error")}</p>
        )}
      </form>
      <WhatsAppCTA text={t("whatsapp")} />
    </div>
  );
}

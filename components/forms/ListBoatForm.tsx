"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function ListBoatForm() {
  const t = useTranslations("listBoat");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/list-boat", {
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
    <form onSubmit={handleSubmit} className="card-luxury space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {t("name")}
          </label>
          <input id="name" name="name" required className="input-luxury" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            {t("phone")}
          </label>
          <input id="phone" name="phone" type="tel" required className="input-luxury" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          {t("email")}
        </label>
        <input id="email" name="email" type="email" required className="input-luxury" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="boatType" className="mb-2 block text-sm font-medium">
            {t("boatType")}
          </label>
          <select id="boatType" name="boatType" required className="input-luxury">
            <option value="yacht">Yacht</option>
            <option value="boat">Boat</option>
            <option value="speedboat">Speedboat</option>
            <option value="catamaran">Catamaran</option>
          </select>
        </div>
        <div>
          <label htmlFor="capacity" className="mb-2 block text-sm font-medium">
            {t("capacity")}
          </label>
          <input id="capacity" name="capacity" type="number" min="1" required className="input-luxury" />
        </div>
      </div>
      <div>
        <label htmlFor="marina" className="mb-2 block text-sm font-medium">
          {t("marina")}
        </label>
        <input id="marina" name="marina" required className="input-luxury" />
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
  );
}

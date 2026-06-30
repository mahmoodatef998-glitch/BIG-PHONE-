import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Condition } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCondition(condition: Condition | string): string {
  const map: Record<string, string> = {
    "brand-new": "Brand New",
    "refurbished-grade-a": "Grade A Refurbished",
    "refurbished-grade-b": "Grade B Refurbished",
    "certified-refurbished": "Certified Refurbished",
    "big-deal": "Big Deal",
    "super-sale": "Super Sale",
  };
  return map[condition] ?? condition;
}

export function getConditionBadgeClass(condition: string): string {
  const map: Record<string, string> = {
    "brand-new": "badge-new",
    "refurbished-grade-a": "badge-grade-a",
    "refurbished-grade-b": "badge-grade-b",
    "certified-refurbished": "badge-certified",
    "big-deal": "badge-big-deal",
    "super-sale": "badge-super-sale",
  };
  return map[condition] ?? "badge-grade-a";
}

export function getStockStatus(qty: number): { label: string; className: string } {
  if (qty === 0) return { label: "Out of Stock", className: "text-red-600 bg-red-50" };
  if (qty <= 10) return { label: `${qty} units`, className: "text-orange-600 bg-orange-50" };
  return { label: `${qty}+ units`, className: "text-green-700 bg-green-50" };
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

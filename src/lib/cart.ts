import { useSyncExternalStore } from "react";

export type CartItem = { id: string; qty: number };

const STORAGE_KEY = "tcs_cart_v1";
let state: CartItem[] = loadInitial();
const listeners = new Set<() => void>();

function loadInitial(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const getSnapshot = () => state;
const getServerSnapshot = (): CartItem[] => [];

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const cart = {
  add(id: string, qty = 1) {
    const existing = state.find((i) => i.id === id);
    state = existing
      ? state.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      : [...state, { id, qty }];
    emit();
  },
  remove(id: string) {
    state = state.filter((i) => i.id !== id);
    emit();
  },
  setQty(id: string, qty: number) {
    if (qty <= 0) return cart.remove(id);
    state = state.map((i) => (i.id === id ? { ...i, qty } : i));
    emit();
  },
  clear() {
    state = [];
    emit();
  },
};

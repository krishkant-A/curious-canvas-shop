import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, cart } from "@/lib/cart";
import { findProduct } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — The Curiosity Shop" },
      { name: "description", content: "Review the curiosities you've gathered." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const detailed = useMemo(
    () =>
      items
        .map((i) => ({ ...i, product: findProduct(i.id) }))
        .filter((i): i is { id: string; qty: number; product: NonNullable<ReturnType<typeof findProduct>> } => Boolean(i.product)),
    [items],
  );
  const subtotal = detailed.reduce((s, i) => s + i.qty * i.product.price, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  if (detailed.length === 0) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <div className="rounded-full bg-secondary p-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-4xl italic font-bold">Your cart is empty</h1>
        <p className="mt-3 max-w-md font-serif text-muted-foreground">
          Wander back in and gather a few curiosities.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
        >
          Back to the shop
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-4xl italic font-bold sm:text-5xl">Your cart</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {detailed.length} {detailed.length === 1 ? "item" : "items"}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-border rounded-3xl border border-border bg-card">
          {detailed.map((i) => (
            <li key={i.id} className="flex gap-4 p-4 sm:gap-6 sm:p-6">
              <Link
                to="/product/$id"
                params={{ id: i.id }}
                className="aspect-square w-24 shrink-0 overflow-hidden rounded-2xl bg-secondary sm:w-32"
              >
                <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <p className="text-xs text-muted-foreground">{i.product.seller}</p>
                <Link to="/product/$id" params={{ id: i.id }} className="font-serif text-base hover:underline sm:text-lg">
                  {i.product.name}
                </Link>
                <p className="mt-1 text-sm font-semibold">${i.product.price}</p>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      onClick={() => cart.setQty(i.id, i.qty - 1)}
                      className="p-2 hover:bg-secondary"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-8 text-center text-sm">{i.qty}</span>
                    <button
                      onClick={() => cart.setQty(i.id, i.qty + 1)}
                      className="p-2 hover:bg-secondary"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => cart.remove(i.id)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right text-sm font-semibold">
                ${(i.qty * i.product.price).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
            </div>
            {subtotal < 75 && (
              <p className="text-xs text-muted-foreground">
                Add ${(75 - subtotal).toFixed(2)} more for free shipping.
              </p>
            )}
            <div className="my-3 border-t border-border" />
            <div className="flex justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>
          <button className="mt-6 w-full rounded-full bg-foreground py-3 text-sm font-medium text-background transition hover:opacity-90">
            Checkout
          </button>
          <button
            onClick={() => cart.clear()}
            className="mt-2 w-full rounded-full py-2 text-xs text-muted-foreground hover:text-destructive"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </section>
  );
}

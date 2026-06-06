import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductCard";
import { byCategory } from "@/data/products";

export const Route = createFileRoute("/bestsellers")({
  head: () => ({
    meta: [
      { title: "Bestsellers — The Curiosity Shop" },
      { name: "description", content: "The most-loved curiosities in the shop." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Bestsellers</p>
        <h1 className="mt-2 font-display text-4xl italic font-bold sm:text-5xl">Shop favorites</h1>
        <p className="mt-2 max-w-xl font-serif text-muted-foreground">
          The pieces our community keeps coming back to.
        </p>
      </header>
      <ProductGrid items={byCategory("bestsellers")} />
    </section>
  ),
});

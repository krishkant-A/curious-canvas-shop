import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductCard";
import { byCategory } from "@/data/products";

export const Route = createFileRoute("/trending")({
  head: () => ({
    meta: [
      { title: "Trending Now — The Curiosity Shop" },
      { name: "description", content: "What's catching everyone's eye this week." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Trending now</p>
        <h1 className="mt-2 font-display text-4xl italic font-bold sm:text-5xl">Loved this week</h1>
        <p className="mt-2 max-w-xl font-serif text-muted-foreground">
          The curiosities flying off the shelves right now.
        </p>
      </header>
      <ProductGrid items={byCategory("trending")} />
    </section>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ProductGrid } from "@/components/ProductCard";
import { products } from "@/data/products";

const search = z.object({ q: z.string().optional().default("") });

export const Route = createFileRoute("/search")({
  validateSearch: search,
  head: () => ({ meta: [{ title: "Search — The Curiosity Shop" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const term = q.toLowerCase().trim();
  const results = term
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.seller.toLowerCase().includes(term),
      )
    : products;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Search</p>
      <h1 className="mt-2 font-display text-4xl italic font-bold sm:text-5xl">
        {term ? `Results for "${q}"` : "Browse everything"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "item" : "items"}
      </p>
      <div className="mt-8">
        {results.length === 0 ? (
          <p className="font-serif text-muted-foreground">No curiosities matched your search.</p>
        ) : (
          <ProductGrid items={results} />
        )}
      </div>
    </section>
  );
}

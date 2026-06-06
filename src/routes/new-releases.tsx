import { createFileRoute } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductCard";
import { byCategory } from "@/data/products";

export const Route = createFileRoute("/new-releases")({
  head: () => ({
    meta: [
      { title: "New Releases — The Curiosity Shop" },
      { name: "description", content: "Freshly arrived curiosities from independent makers." },
    ],
  }),
  component: () => (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">New releases</p>
        <h1 className="mt-2 font-display text-4xl italic font-bold sm:text-5xl">Freshly arrived</h1>
        <p className="mt-2 max-w-xl font-serif text-muted-foreground">
          The newest pieces from our makers — just in.
        </p>
      </header>
      <ProductGrid items={byCategory("new")} />
    </section>
  ),
});

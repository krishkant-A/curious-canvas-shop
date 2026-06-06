import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductGrid } from "@/components/ProductCard";
import { byCategory, products } from "@/data/products";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Curiosity Shop — Rare, handmade & wonderfully odd" },
      { name: "description", content: "Shop curated curiosities: vintage, handmade, and trending finds from independent sellers." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 4);
  const trending = byCategory("trending").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> A curated marketplace
            </span>
            <h1 className="font-display text-5xl italic font-bold leading-[1.05] tracking-tight sm:text-7xl">
              Rare, handmade & wonderfully odd.
            </h1>
            <p className="max-w-lg font-serif text-lg text-muted-foreground">
              A little shop full of things you didn't know you needed —
              gathered from independent makers, collectors, and unusual minds.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/bestsellers"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
              >
                Shop bestsellers <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/new-releases"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
              >
                See what's new
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {featured.map((p, i) => (
              <Link
                key={p.id}
                to="/product/$id"
                params={{ id: p.id }}
                className={`relative overflow-hidden rounded-3xl border border-border bg-card ${
                  i === 0 ? "aspect-[3/4] -rotate-2" : i === 1 ? "mt-8 aspect-square rotate-1" : i === 2 ? "aspect-square -rotate-1" : "mt-6 aspect-[3/4] rotate-2"
                } transition hover:rotate-0 hover:scale-[1.02]`}
              >
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                <div className="absolute bottom-2 left-2 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  ${p.price}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6 py-6 text-sm text-muted-foreground">
          {["Vintage", "Handmade", "Oddities", "Apothecary", "Botanical", "Paper Goods", "Home", "Wearables"].map((c) => (
            <span key={c} className="rounded-full border border-border bg-background px-4 py-1.5 hover:text-foreground">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Trending now</p>
            <h2 className="mt-2 font-display text-3xl italic font-bold sm:text-4xl">Loved this week</h2>
          </div>
          <Link to="/trending" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
            View all →
          </Link>
        </div>
        <ProductGrid items={trending} />
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Bestsellers</p>
            <h2 className="mt-2 font-display text-3xl italic font-bold sm:text-4xl">The shop favorites</h2>
          </div>
          <Link to="/bestsellers" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
            View all →
          </Link>
        </div>
        <ProductGrid items={byCategory("bestsellers").slice(0, 8)} />
      </section>
    </div>
  );
}

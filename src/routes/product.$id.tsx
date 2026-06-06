import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, ShoppingBag, Truck, Shield, ArrowLeft } from "lucide-react";
import { findProduct, products } from "@/data/products";
import { ProductGrid } from "@/components/ProductCard";
import { cart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — The Curiosity Shop` },
          { name: "description", content: `${loaderData.product.name} by ${loaderData.product.seller}.` },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <h1 className="font-display text-4xl italic font-bold">Not found</h1>
      <p className="mt-3 text-muted-foreground">This curiosity has wandered off.</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm text-background">
        Back to the shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <article className="mx-auto max-w-7xl px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border bg-secondary">
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        </div>

        <div className="flex flex-col">
          {product.tag && (
            <span className="self-start rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent-foreground">
              {product.tag}
            </span>
          )}
          <p className="mt-4 text-sm text-muted-foreground">{product.seller}</p>
          <h1 className="mt-1 font-display text-4xl italic font-bold leading-tight sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-foreground text-foreground" />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <p className="mt-6 text-3xl font-semibold tracking-tight">${product.price}</p>

          <p className="mt-6 max-w-prose font-serif text-base text-muted-foreground">
            A one-of-a-kind piece from our independent maker. Each item is sourced
            and inspected by hand — small variations are part of the charm.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => cart.add(product.id)}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
            <Link
              to="/cart"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary"
            >
              Go to cart
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3">
              <Truck className="h-4 w-4" /> Free shipping over $75
            </li>
            <li className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3">
              <Shield className="h-4 w-4" /> 30-day returns
            </li>
          </ul>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 font-display text-2xl italic font-bold sm:text-3xl">You might also like</h2>
        <ProductGrid items={related} />
      </section>
    </article>
  );
}

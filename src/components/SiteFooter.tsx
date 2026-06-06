export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl italic font-bold">The Curiosity Shop</p>
          <p className="mt-3 text-sm text-muted-foreground">
            A curated marketplace for rare, handmade, and wonderfully odd things.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Bestsellers</li>
            <li>New Releases</li>
            <li>Trending Now</li>
            <li>Gift Cards</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground">Help</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact us</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground">The Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Our story</li>
            <li>Sellers</li>
            <li>Journal</li>
            <li>Press</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Curiosity Shop — Made with care.
      </div>
    </footer>
  );
}

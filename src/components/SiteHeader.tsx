import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";

const navItems = [
  { to: "/bestsellers", label: "Bestsellers" },
  { to: "/new-releases", label: "New Releases" },
  { to: "/trending", label: "Trending Now" },
] as const;

export function SiteHeader() {
  const cartItems = useCart();
  const totalQty = useMemo(() => cartItems.reduce((s, i) => s + i.qty, 0), [cartItems]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    navigate({ to: "/search", search: { q: term } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="shrink-0 select-none">
          <span className="font-display text-2xl italic font-bold tracking-tight text-foreground sm:text-3xl">
            The Curiosity Shop
          </span>
        </Link>

        <form
          onSubmit={onSearch}
          className="ml-auto hidden flex-1 max-w-2xl items-center md:flex"
        >
          <div className="group flex w-full items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2.5 transition focus-within:border-foreground/40 focus-within:bg-background">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search curious things…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
            >
              Search
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-4 md:gap-2">
          <button
            type="button"
            aria-label="Account"
            className="hidden items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-foreground transition hover:bg-secondary md:inline-flex"
          >
            <User className="h-4 w-4" />
            <span className="hidden lg:inline">Account</span>
          </button>
          <button
            aria-label="Account"
            className="rounded-full p-2 hover:bg-secondary md:hidden"
          >
            <User className="h-5 w-5" />
          </button>
          <button
            className="rounded-full p-2 hover:bg-secondary md:hidden"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={onSearch} className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search curious things…"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </form>
      </div>

      {/* Menu bar */}
      <div className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
          <nav
            className={`flex flex-1 items-center gap-1 overflow-x-auto py-2 ${
              mobileOpen ? "" : "max-md:hidden"
            }`}
          >
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                pathname === "/" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
                  pathname === n.to
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-foreground transition hover:bg-secondary"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {totalQty > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-foreground px-1 text-[10px] font-semibold text-background sm:static sm:h-5 sm:min-w-5 sm:rounded-full sm:bg-foreground sm:text-background">
                {totalQty}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

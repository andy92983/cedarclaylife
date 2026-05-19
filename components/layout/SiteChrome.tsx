import Link from "next/link";
import { formatAddress, NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconPaths: Record<string, string> = {
  home: "M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6",
  body: "M12 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM8.25 15.75A4.5 4.5 0 0112 13.5a4.5 4.5 0 013.75 2.25",
  health: "M4.5 12.75l6 6 9-13.5",
  create: "M12 6v12m6-6H6",
  land: "M3 18l6-6 4 4 8-8",
  faith: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z",
};

export function PillarIcon({ name, className }: { name: string; className?: string }) {
  const d = iconPaths[name] ?? iconPaths.create;
  return (
    <svg
      className={cn("h-6 w-6", className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)}>
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cedar-500 to-clay-500 text-sm font-display font-semibold text-white shadow-md transition-transform group-hover:scale-105"
        aria-hidden
      >
        C&C
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-bark">
        Cedar & Clay
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-cedar-200/50 bg-cream/90 backdrop-blur-md">
      <div className="container-wide flex items-center justify-between px-5 py-4 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-cedar-700 transition-colors hover:bg-cedar-100 hover:text-bark"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden rounded-full bg-cedar-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cedar-700 md:inline-flex"
        >
          Visit Us
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative md:hidden">
      <summary className="cursor-pointer list-none rounded-lg border border-cedar-200 px-3 py-2 text-sm font-medium text-cedar-700">
        Menu
      </summary>
      <nav
        className="absolute right-0 top-full mt-2 min-w-[200px] rounded-xl border border-cedar-200 bg-white p-2 shadow-lg"
        aria-label="Mobile"
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-lg px-3 py-2 text-sm text-cedar-700 hover:bg-cedar-50"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mt-1 block rounded-lg bg-cedar-600 px-3 py-2 text-center text-sm font-semibold text-white"
        >
          Visit Us
        </Link>
      </nav>
    </details>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-cedar-200 bg-cedar-900 text-cedar-100">
      <div className="section-padding container-wide">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo className="[&_.font-display]:text-white [&_.text-bark]:text-white" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cedar-200">
              {SITE.name} — handmade products, creative studio classes, and {SITE.acres} acres
              of trails in Redgranite, Wisconsin. Whole-person wellness rooted in biblical wisdom.
            </p>
            <p className="mt-4 font-display text-lg italic text-clay-200">
              &ldquo;{SITE.verse.text}&rdquo;
            </p>
            <p className="mt-1 text-sm text-cedar-300">— {SITE.verse.reference}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cedar-300">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cedar-200 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cedar-300">
              Connect
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-cedar-200">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/\D/g, "")}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li>{formatAddress()}</li>
              <li className="text-cedar-300">cedarclaylife.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-cedar-700 pt-8 text-xs text-cedar-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Faith-rooted wellness · Handmade with intention</p>
        </div>
      </div>
    </footer>
  );
}

import { site, navLinks } from "@/data/site";
import { getCurrentYear } from "@/lib/years";
import VisitCounter from "./VisitCounter";

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer>
      <div className="mx-auto max-w-6xl px-6 pb-10">
        <div className="glass flex flex-col gap-8 rounded-[2rem] px-6 py-8 md:flex-row md:items-end md:justify-between md:px-10">
          <div>
            <p className="font-display text-2xl font-semibold">{site.name}</p>
            <p className="mt-1 text-sm text-muted">{site.role}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-fg">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-2">
            <VisitCounter variant="footer" />
            <p className="text-sm text-muted">
              © {year} {site.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { site } from "@/data/site";
import { getCurrentYear } from "@/lib/years";

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer>
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted">
        © {year} {site.name}
      </div>
    </footer>
  );
}

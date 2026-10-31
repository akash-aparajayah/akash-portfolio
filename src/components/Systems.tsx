import Section from "./Section";

export default function Systems() {
  return (
    <Section
      id="systems"
      title="Systems"
      intro="How I think about backend structure, shown on the multi-tenant project."
    >
      <div className="glass-soft overflow-x-auto rounded-2xl p-4 md:p-6">
        <svg
          viewBox="0 0 720 300"
          role="img"
          aria-label="Clients send requests to one API. The API finds the tenant and routes each request to the database in the tenant's region."
          className="mx-auto min-w-[560px] max-w-full"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10z" className="fill-accent" />
            </marker>
          </defs>

          <rect x="20" y="110" width="110" height="60" rx="14" className="fill-bg/40 stroke-line" strokeWidth="1.5" />
          <text x="75" y="145" textAnchor="middle" fontSize="14" className="fill-fg">
            Clients
          </text>

          <rect x="190" y="90" width="170" height="100" rx="16" className="fill-accent/15 stroke-accent" strokeWidth="2" />
          <text x="275" y="128" textAnchor="middle" fontSize="15" fontWeight="600" className="fill-fg">
            API
          </text>
          <text x="275" y="150" textAnchor="middle" fontSize="12" className="fill-muted">
            finds the tenant
          </text>
          <text x="275" y="168" textAnchor="middle" fontSize="12" className="fill-muted">
            picks the region
          </text>

          <rect x="470" y="30" width="230" height="90" rx="16" className="fill-bg/40 stroke-line" strokeWidth="1.5" />
          <text x="585" y="68" textAnchor="middle" fontSize="14" className="fill-fg">
            Region: India
          </text>
          <text x="585" y="92" textAnchor="middle" fontSize="12" className="fill-muted">
            PostgreSQL, tenants A and B
          </text>

          <rect x="470" y="180" width="230" height="90" rx="16" className="fill-bg/40 stroke-line" strokeWidth="1.5" />
          <text x="585" y="218" textAnchor="middle" fontSize="14" className="fill-fg">
            Region: Europe
          </text>
          <text x="585" y="242" textAnchor="middle" fontSize="12" className="fill-muted">
            PostgreSQL, tenant C
          </text>

          <path
            d="M130 140 L190 140"
            className="stroke-accent"
            fill="none"
            strokeWidth="1.75"
            markerEnd="url(#arrow)"
          />
          <path
            d="M360 140 L415 140 L415 75 L470 75"
            className="stroke-accent"
            fill="none"
            strokeWidth="1.75"
            markerEnd="url(#arrow)"
          />
          <path
            d="M360 140 L415 140 L415 225 L470 225"
            className="stroke-accent"
            fill="none"
            strokeWidth="1.75"
            markerEnd="url(#arrow)"
          />
        </svg>
      </div>

      <ul className="mt-8 grid gap-6 text-[15px] leading-relaxed sm:grid-cols-3">
        <li>
          <p className="font-medium">One codebase</p>
          <p className="mt-1 text-muted">Every region runs the same code and the same migrations.</p>
        </li>
        <li>
          <p className="font-medium">Tenant at the edge</p>
          <p className="mt-1 text-muted">The API resolves the tenant first, so business logic stays simple.</p>
        </li>
        <li>
          <p className="font-medium">Data stays local</p>
          <p className="mt-1 text-muted">Each customer&apos;s data lives in its own region.</p>
        </li>
      </ul>
    </Section>
  );
}

import { site } from "@/content";

/**
 * A capability map, not a claim that every project uses this exact topology.
 * Each label is taken from the résumé; the connected layout communicates how
 * Abdllah works across product, backend, data, automation, and delivery.
 */
export function SystemMap() {
  return (
    <aside className="system-panel" aria-labelledby="system-map-title">
      <div className="system-profile">
        <div>
          <h2 id="system-map-title" className="display text-[1rem]">
            Working across the stack
          </h2>
          <p className="mono mt-1 text-[0.6875rem] text-fg-faint">
            Software · Cloud · Automation
          </p>
        </div>
        <span className="system-status" aria-label="Open to co-op opportunities">
          <span aria-hidden className="system-status-dot" />
          Open
        </span>
      </div>

      <div className="system-canvas">
        <svg
          viewBox="0 0 560 290"
          role="img"
          aria-labelledby="stack-title stack-description"
          className="h-auto w-full"
        >
          <title id="stack-title">Connected technical capabilities</title>
          <desc id="stack-description">
            React interfaces connect to REST APIs, Supabase and PostgreSQL,
            with Python automation and cloud delivery supporting the system.
          </desc>

          <g className="system-connections">
            <path d="M146 51H217" />
            <path className="system-route" d="M343 51H414" />
            <path d="M477 72V145" />
            <path d="M414 166L343 241" />
            <path className="system-route" d="M217 241H146" />
            <path d="M83 220V72" />
            <path d="M280 72V220" />
          </g>

          <g className="system-junctions" aria-hidden>
            <circle cx="181" cy="51" r="3" />
            <circle cx="379" cy="51" r="3" />
            <circle cx="477" cy="109" r="3" />
            <circle cx="379" cy="203" r="3" />
            <circle cx="181" cy="241" r="3" />
            <circle cx="83" cy="146" r="3" />
            <circle cx="280" cy="146" r="4" className="system-junction-live" />
          </g>

          <g className="system-nodes">
            <g transform="translate(20 30)">
              <rect width="126" height="42" rx="5" />
              <text x="63" y="26" textAnchor="middle">React UI</text>
            </g>
            <g transform="translate(217 30)">
              <rect width="126" height="42" rx="5" />
              <text x="63" y="26" textAnchor="middle">REST APIs</text>
            </g>
            <g transform="translate(414 30)">
              <rect width="126" height="42" rx="5" />
              <text x="63" y="26" textAnchor="middle">Supabase</text>
            </g>
            <g transform="translate(414 145)">
              <rect width="126" height="42" rx="5" />
              <text x="63" y="26" textAnchor="middle">PostgreSQL</text>
            </g>
            <g transform="translate(217 220)">
              <rect width="126" height="42" rx="5" />
              <text x="63" y="26" textAnchor="middle">Python</text>
            </g>
            <g transform="translate(20 220)">
              <rect width="126" height="42" rx="5" />
              <text x="63" y="26" textAnchor="middle">Cloud delivery</text>
            </g>
          </g>
        </svg>
      </div>

      <ul className="system-mobile-grid" aria-label="Technical capabilities">
        <li>React UI</li>
        <li>REST APIs</li>
        <li>Supabase</li>
        <li>PostgreSQL</li>
        <li>Python</li>
        <li>Cloud delivery</li>
      </ul>

      <div className="system-footer mono">
        <span>Connected capability map</span>
        <span>{site.location}</span>
      </div>
    </aside>
  );
}

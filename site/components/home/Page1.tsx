import type { ReactNode } from "react";

interface Feature {
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  icon: ReactNode;
  span?: string;
}

const features: Feature[] = [
  {
    eyebrow: "Compression Core",
    title: "Delta-engineered payloads",
    desc: "Generate ultra-light OTA packages so users pull only what actually changed.",
    bullets: [
      "Native package and hot update flows live in one platform.",
      "Engineered for high-frequency JS and asset iteration.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 7h7l-3 5h10l-7 5 3-5H5l7-5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    eyebrow: "Release Pipeline",
    title: "CLI to dashboard in one straight line",
    desc: "Move from build output to live rollout without stitching together separate delivery systems.",
    bullets: [
      "API Token workflows fit naturally into CI/CD pipelines.",
      "Promote releases with version and channel awareness.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 8h16M4 16h10M16 16l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    eyebrow: "Production Safety",
    title: "Guard rails for live production traffic",
    desc: "Keep releases under control with rollback strategy, dashboard visibility, and operational traceability.",
    bullets: [
      "Progressive activation is easier when the console owns the lifecycle.",
      "Observability is built around real release operations, not demos.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
        <path d="m12 3 7 4v5c0 4.5-2.7 7.8-7 9-4.3-1.2-7-4.5-7-9V7l7-4Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m9.5 12 1.8 1.8 3.2-3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    span: "md:col-span-2",
  },
];

const signalRows = [
  { label: "Global edge availability", value: "24 / 7", progress: 96 },
  { label: "Automation coverage", value: "CI ready", progress: 88 },
  { label: "Rollback confidence", value: "High", progress: 91 },
  { label: "Patch payload efficiency", value: "Tiny", progress: 94 },
];

const tags = [
  "Global CDN",
  "API Token",
  "Gray rollout ready",
  "Self-host friendly",
  "Native package registry",
  "Fast rollback posture",
];

function Page1() {
  return (
    <section className="relative overflow-hidden bg-[#eef7ff] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-sky-700/85">
            Core Capabilities
          </p>
          <h2 className="cresc-display mt-5 text-4xl text-slate-950 sm:text-5xl">
            An OTA platform built for real production pressure.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Every layer is tuned for teams that need to ship fast without
            surrendering control. Cresc keeps delivery lean, visible, and easy
            to automate.
          </p>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`group rounded-[28px] border border-sky-100 bg-white/94 p-7 backdrop-blur-xl shadow-[0_14px_32px_rgba(148,163,184,0.12)] transition duration-300 hover:-translate-y-1 hover:border-sky-300 ${feature.span ?? ""}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-600">
                  {feature.icon}
                </div>

                <p className="mt-6 text-xs uppercase tracking-[0.35em] text-slate-500">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  {feature.desc}
                </p>

                <div className="mt-6 space-y-3">
                  {feature.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_14px_rgba(14,165,233,0.35)]" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="cresc-panel rounded-[28px] p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-700/85">
              Platform Metrics
            </p>
            <h3 className="cresc-display mt-4 text-3xl text-slate-950">
              Release metrics
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              The platform posture stays readable even when release cadence
              increases: packaging, distribution, activation, and fallback all
              remain in one view.
            </p>

            <div className="mt-8 space-y-5">
              {signalRows.map((row) => (
                <div key={row.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
                    <span>{row.label}</span>
                    <span className="cresc-display text-sky-700">{row.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-sky-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500"
                      style={{ width: `${row.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[22px] border border-sky-100 bg-white/88 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Query ceiling
                </p>
                <p className="mt-3 cresc-display text-2xl text-slate-950">
                  1M / day
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  High-throughput plans are available for heavier client update
                  traffic.
                </p>
              </div>

              <div className="rounded-[22px] border border-sky-100 bg-white/88 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Operation mode
                </p>
                <p className="mt-3 cresc-display text-2xl text-slate-950">
                  Human + CI
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Use the admin console for oversight and the CLI for repeatable
                  automation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-sky-100 bg-white/92 px-4 py-2 text-sm text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page1;

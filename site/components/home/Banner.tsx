import GitHubButton from "./GitHubButton";
import logo from "../../pages/public/images/logo.svg";
import ParticleNetwork from "./ParticleNetwork";

const featurePills = [
  "KB-size delta patches",
  "Crash-safe rollback",
  "Global edge delivery",
];

const stats = [
  {
    label: "Average package shape",
    value: "KB-level",
    detail: "Delta payloads generated with the built-in diff pipeline.",
  },
  {
    label: "Release orchestration",
    value: "3-step",
    detail: "Upload native base, bundle OTA, and activate in minutes.",
  },
  {
    label: "Release safety",
    value: "Protected",
    detail: "Version gating, rollback strategy, and dashboard visibility.",
  },
];

const telemetry = [
  {
    title: "Delta Core",
    value: "bsdiff / hdiff",
    detail: "Optimized for tiny React Native patch payloads.",
  },
  {
    title: "Distribution",
    value: "Global CDN",
    detail: "Fast pull from the nearest edge node.",
  },
  {
    title: "Activation",
    value: "Version-aware",
    detail: "Route releases by app version and target audience.",
  },
  {
    title: "Recovery",
    value: "Rollback ready",
    detail: "Built to recover quickly from bad deployments.",
  },
];

const systemBars = [
  { label: "Patch stream integrity", value: "98%", progress: 98 },
  { label: "Edge sync readiness", value: "94%", progress: 94 },
  { label: "Release automation coverage", value: "89%", progress: 89 },
];

function Banner() {
  return (
    <section className="cresc-grid relative overflow-hidden bg-[#f7fbff] pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      <div className="cresc-hero-aurora absolute -left-24 top-[-12rem] h-[28rem] w-[28rem] rounded-full" />
      <div className="cresc-hero-aurora cresc-hero-aurora-alt absolute bottom-[-16rem] right-[-6rem] h-[30rem] w-[30rem] rounded-full" />

      <div className="absolute inset-0 z-0 opacity-45">
        <ParticleNetwork />
      </div>

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(37,99,235,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.34),rgba(240,249,255,0.88))]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:px-8">
        <div className="relative">
          <div className="inline-flex items-center rounded-full border border-sky-200 bg-white/85 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-sky-700 shadow-[0_12px_28px_rgba(148,163,184,0.12)]">
            Reliable React Native OTA updates
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-200 bg-white/90 shadow-[0_16px_34px_rgba(148,163,184,0.16)] backdrop-blur">
              <div className="absolute inset-2 rounded-xl bg-sky-100 blur-xl" />
              <img src={logo} className="relative h-10 w-10" alt="Cresc Logo" />
            </div>
            <div>
              <p className="cresc-display text-sm uppercase tracking-[0.45em] text-sky-700/90">
                Cresc OTA release platform
              </p>
              <p className="mt-2 text-sm text-slate-600">
                React Native OTA built for teams shipping continuously.
              </p>
            </div>
          </div>

          <h1 className="cresc-display mt-8 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[0.02em] text-slate-950 sm:text-6xl lg:text-7xl">
            Manage hot updates with a faster, clearer release workflow.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            Cresc gives teams a reliable way to ship over-the-air updates:
            tiny diff packages, global distribution, controlled rollout, and
            self-host friendly tooling for serious React Native releases.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://admin.cresc.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-sky-300/40 bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-4 text-base font-semibold text-white shadow-[0_10px_40px_rgba(14,165,233,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(14,165,233,0.45)]"
            >
              Open Dashboard
            </a>
            <a
              href="/docs/getting-started"
              className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white/92 px-7 py-4 text-base font-semibold text-slate-900 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-sky-400 hover:text-sky-700"
            >
              Read Integration Docs
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {featurePills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full border border-sky-100 bg-white/92 px-4 py-2 text-sm text-slate-700 backdrop-blur"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Open source backbone
            </span>
            <GitHubButton
              type="stargazers"
              namespace="reactnativecn"
              repo="react-native-update"
            />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[24px] border border-sky-100 bg-white/94 p-5 backdrop-blur-xl shadow-[0_14px_32px_rgba(148,163,184,0.12)]"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-3 cresc-display text-2xl text-sky-700">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="cresc-orbit absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/70" />

          <div className="cresc-panel relative overflow-hidden rounded-[32px] p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/90 to-transparent" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-sky-700/85">
                  Release Overview
                </p>
                <h2 className="cresc-display mt-3 text-2xl text-slate-950">
                  Delivery status
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Monitor the full patch lifecycle from build ingestion to edge
                  activation.
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.85)]" />
                healthy
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {telemetry.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-sky-100 bg-white/88 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {item.title}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              {systemBars.map((bar) => (
                <div key={bar.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-700">
                    <span>{bar.label}</span>
                    <span className="cresc-display text-sky-700">{bar.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-sky-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 shadow-[0_0_22px_rgba(56,189,248,0.6)]"
                      style={{ width: `${bar.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="cresc-scan-panel mt-8 rounded-[28px] border border-sky-400/10 bg-[#050a16]/90 p-5 font-mono text-sm text-slate-300">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-slate-300/75">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                release.sh
              </div>

              <div className="mt-5 space-y-3">
                <p>
                  <span className="text-sky-300">$</span>{" "}
                  cresc uploadIpa ios-release.ipa
                </p>
                <p>
                  <span className="text-sky-300">$</span>{" "}
                  cresc bundle --platform ios --channel production
                </p>
                <p>
                  <span className="text-sky-300">$</span>{" "}
                  cresc bundle --platform android --channel production
                </p>
                <p className="text-emerald-300">
                  &gt; delta packages generated and ready for activation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;

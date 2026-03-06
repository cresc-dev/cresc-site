const workflowSteps = [
  {
    id: "01",
    title: "Ingest the native baseline",
    desc: "Upload the app package once so Cresc has the reference build for delta generation.",
  },
  {
    id: "02",
    title: "Generate OTA payloads",
    desc: "Bundle JavaScript and assets, then let the platform produce the compact patch artifacts.",
  },
  {
    id: "03",
    title: "Activate with confidence",
    desc: "Route versions, verify release status, and recover quickly if issues appear in production.",
  },
];

const releaseNodes = [
  { label: "iOS base package", value: "ready" },
  { label: "Android bundle", value: "processing" },
  { label: "CDN delivery", value: "available" },
  { label: "API automation", value: "enabled" },
];

function Page2() {
  return (
    <section className="relative overflow-hidden bg-[#f7fbff] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(56,189,248,0.12),transparent_22%),radial-gradient(circle_at_85%_65%,rgba(14,165,233,0.12),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-sky-700/85">
              Release Workflow
            </p>
            <h2 className="cresc-display mt-5 text-4xl text-slate-950 sm:text-5xl">
              From local build output to live traffic in three clean moves.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              You do not need a fragile patchwork of scripts and manual release
              steps. Cresc keeps the operational path readable from the first
              upload to the last edge activation.
            </p>

            <div className="mt-10 space-y-4">
              {workflowSteps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-[24px] border border-sky-100 bg-white/94 p-5 backdrop-blur-xl shadow-[0_14px_32px_rgba(148,163,184,0.12)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="cresc-display flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-700">
                      {step.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-sky-100 bg-white/94 p-6 shadow-[0_14px_32px_rgba(148,163,184,0.12)]">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Current status
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {releaseNodes.map((node) => (
                  <div
                    key={node.label}
                    className="rounded-2xl border border-sky-100 bg-white px-4 py-4"
                  >
                    <p className="text-sm text-slate-600">{node.label}</p>
                    <p className="mt-2 cresc-display text-lg text-sky-700">
                      {node.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="cresc-panel cresc-scan-panel overflow-hidden rounded-[32px] p-0">
              <div className="flex items-center gap-2 border-b border-slate-800/80 bg-slate-950/90 px-5 py-4">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs uppercase tracking-[0.35em] text-slate-300/75">
                  publish commands
                </span>
              </div>

              <div className="space-y-4 px-6 py-6 font-mono text-sm text-slate-300 sm:px-8 sm:py-8">
                <p className="text-slate-300/75"># install the CLI once</p>
                <p>
                  <span className="text-sky-300">$</span> npm i -g
                  react-native-update-cli
                </p>

                <p className="pt-2 text-slate-300/75">
                  # upload native packages to establish the baseline
                </p>
                <p>
                  <span className="text-sky-300">$</span> cresc uploadIpa
                  ios-release.ipa
                </p>
                <p>
                  <span className="text-sky-300">$</span> cresc uploadApk
                  android-release.apk
                </p>

                <p className="pt-2 text-slate-300/75">
                  # generate and publish OTA bundles
                </p>
                <p>
                  <span className="text-sky-300">$</span> cresc bundle
                  --platform ios --channel production
                </p>
                <p>
                  <span className="text-sky-300">$</span> cresc bundle
                  --platform android --channel production
                </p>

                <p className="pt-2 text-emerald-300">
                  &gt; packages uploaded, distribution ready
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-sky-100 bg-white/94 p-6 backdrop-blur-xl shadow-[0_14px_32px_rgba(148,163,184,0.12)]">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Common usage
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sky-100 bg-white p-4">
                  <p className="text-sm text-slate-500">Use case</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    Fast mobile iteration
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-white p-4">
                  <p className="text-sm text-slate-500">Control model</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    Dashboard + CLI
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-white p-4">
                  <p className="text-sm text-slate-500">Deployment style</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    Continuous release
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cresc-panel mt-16 rounded-[32px] p-8 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-700/85">
                Get Started
              </p>
              <h3 className="cresc-display mt-4 text-3xl text-slate-950 sm:text-4xl">
                Start using Cresc today.
              </h3>
              <p className="mt-5 text-base leading-7 text-slate-700">
                Open the admin console to create your workspace, or jump into
                the integration docs if you want to wire the SDK and CLI first.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://admin.cresc.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-sky-300/40 bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-4 text-base font-semibold text-white shadow-[0_10px_40px_rgba(14,165,233,0.3)] transition duration-300 hover:-translate-y-1"
              >
                Open Dashboard
              </a>
              <a
                href="/docs/getting-started"
                className="inline-flex items-center justify-center rounded-2xl border border-sky-200 bg-white/92 px-7 py-4 text-base font-semibold text-slate-900 transition duration-300 hover:-translate-y-1 hover:border-sky-400 hover:text-sky-700"
              >
                View Docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page2;

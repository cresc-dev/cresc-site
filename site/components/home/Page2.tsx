const workflowSteps = [
  {
    id: "I",
    title: "Install the CLI",
    desc: "Connect your project to the publishing workflow with the Cresc command-line tool.",
  },
  {
    id: "II",
    title: "Upload the baseline package",
    desc: "Give Cresc the native build it compares against before later updates are published.",
  },
  {
    id: "III",
    title: "Publish the update",
    desc: "Bundle JavaScript and assets, then release the update through the dashboard or your CI flow.",
  },
];

function Page2() {
  return (
    <section className="cresc-section cresc-section-alt relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(150,108,63,0.12),transparent_26%),radial-gradient(circle_at_84%_68%,rgba(122,59,46,0.08),transparent_24%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#8b5a3c]">
              In Practice
            </p>
            <h2 className="cresc-display mt-5 text-4xl text-[#2d1d15] sm:text-5xl">
              Three steps, kept in time.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f483c]">
              Install the CLI, upload the baseline, and publish the update with
              the same steady rhythm each time the app changes.
            </p>

            <div className="mt-10 space-y-5">
              {workflowSteps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-[28px] border border-[#ddcdb3] bg-[#fffaf4] p-6 shadow-[0_18px_40px_rgba(113,88,67,0.08)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="cresc-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6c0a0] bg-[#f5ecdf] text-[#7a3b2e]">
                      {step.id}
                    </div>
                    <div>
                      <h3 className="cresc-display text-3xl text-[#2d1d15]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-[#5f483c]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cresc-manuscript rounded-[34px] border border-[#ddcdb3] p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-[#8b5a3c]">
              First release
            </p>
            <div className="mt-6 rounded-[24px] border border-[#d6c0a0] bg-[#f9f2e8] p-6">
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-8 text-[#4e382d]">
{`npm i -g react-native-update-cli

cresc uploadIpa ios-release.ipa
cresc uploadApk android-release.apk

cresc bundle --platform ios
cresc bundle --platform android`}
              </pre>
            </div>

            <p className="mt-8 text-lg leading-8 text-[#5f483c]">
              After the first baseline is in place, the dashboard and CLI can
              carry the rest of the release cycle with much less effort.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://admin.cresc.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#7a3b2e] bg-[#7a3b2e] px-7 py-4 text-base font-semibold text-[#fffaf4] transition duration-300 hover:-translate-y-1 hover:bg-[#6a3025]"
              >
                Open Dashboard
              </a>
              <a
                href="/docs/getting-started"
                className="inline-flex items-center justify-center rounded-full border border-[#c8b28f] bg-[#fffaf2] px-7 py-4 text-base font-semibold text-[#3f2b21] transition duration-300 hover:-translate-y-1 hover:border-[#7a3b2e] hover:text-[#7a3b2e]"
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

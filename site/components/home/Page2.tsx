import { useEffect, useRef, useState } from "react";

const workflowSteps = [
  {
    id: "1",
    title: "Install the CLI",
    desc: "Connect your project to the publishing workflow with the Cresc command-line tool.",
  },
  {
    id: "2",
    title: "Upload the baseline package",
    desc: "Give Cresc the native build it compares against before later updates are published.",
  },
  {
    id: "3",
    title: "Publish the update",
    desc: "Bundle JavaScript and assets, then release the update through the dashboard or your CI flow.",
  },
];

const terminalTranscript = [
  {
    prompt: "release@studio",
    cwd: "~/crescendo-app",
    command: "npm i -g react-native-update-cli",
    result: "added 1 package in 2s",
  },
  {
    prompt: "release@studio",
    cwd: "~/crescendo-app",
    command: "cresc uploadIpa ios-release.ipa",
    result: "baseline uploaded for iOS",
  },
  {
    prompt: "release@studio",
    cwd: "~/crescendo-app",
    command: "cresc uploadApk android-release.apk",
    result: "baseline uploaded for Android",
  },
  {
    prompt: "release@studio",
    cwd: "~/crescendo-app",
    command: "cresc bundle --platform ios",
    result: "incremental patch ready",
  },
];

function Page2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState<typeof terminalTranscript>([]);
  const terminalScreenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentEntry = terminalTranscript[activeIndex];

    if (!currentEntry) {
      return;
    }

    const isFirstBeat =
      activeIndex === 0 && typedLength === 0 && showResult === false;

    const timeout = window.setTimeout(() => {
      if (typedLength < currentEntry.command.length) {
        setTypedLength((current) => current + 1);
        return;
      }

      if (!showResult) {
        setShowResult(true);
        return;
      }

      const nextIndex = (activeIndex + 1) % terminalTranscript.length;

      setHistory((current) =>
        nextIndex === 0 ? [] : [...current, currentEntry].slice(-3),
      );
      setActiveIndex(nextIndex);

      setTypedLength(0);
      setShowResult(false);
    }, isFirstBeat ? 460 : typedLength < currentEntry.command.length ? 38 : showResult ? 980 : 440);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, showResult, typedLength]);

  useEffect(() => {
    const node = terminalScreenRef.current;

    if (!node) {
      return;
    }

    node.scrollTop = node.scrollHeight;
  }, [activeIndex, showResult, typedLength]);

  const completedEntries = history;
  const activeEntry = terminalTranscript[activeIndex];
  const typedCommand = activeEntry?.command.slice(0, typedLength) ?? "";

  return (
    <section className="cresc-section relative overflow-hidden py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
              In Practice
            </p>
            <h2 className="cresc-display mt-4 text-3xl leading-tight text-[#1c1917] sm:text-[2.6rem]">
              Ship OTA updates in three steps.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#57534e]">
              Install the CLI, upload the baseline build, and publish the next
              delta update through the dashboard or CI whenever the app changes.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {workflowSteps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-2xl border border-[#e7e5e1] bg-white px-6 py-5 shadow-[0_1px_2px_rgba(28,25,23,0.04)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="cresc-display flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f0d9bd] bg-[#fdf6ec] text-sm text-[#b45309]">
                      {step.id}
                    </div>
                    <div>
                      <h3 className="cresc-display text-xl text-[#1c1917]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-base leading-7 text-[#57534e]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="cresc-frame flex h-full flex-col rounded-3xl p-6 sm:p-8">
            <div className="cresc-terminal overflow-hidden rounded-2xl">
              <div className="cresc-terminal__chrome flex items-center px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="mx-auto text-xs font-medium tracking-wide text-[#8b8f98]">
                  cresc — release
                </span>
              </div>

              <div
                ref={terminalScreenRef}
                className="cresc-terminal__screen px-5 py-5 text-[0.9rem] leading-7 sm:px-6"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#6f7480]">
                  <span>first release</span>
                  <span className="h-1 w-1 rounded-full bg-[#3f434c]" />
                  <span>production lane</span>
                </div>

                <div className="space-y-4">
                  {completedEntries.map((entry) => (
                    <div key={entry.command} className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#e6e8ec]">
                        <span className="text-[#7ee0a3]">{entry.prompt}</span>
                        <span className="text-[#8b8f98]">{entry.cwd}</span>
                        <span className="text-[#e8a03e]">$</span>
                        <span className="text-[#f5f6f8]">{entry.command}</span>
                      </div>
                      <div className="pl-0 text-[#9aa0aa] sm:pl-[9.4rem]">
                        {entry.result}
                      </div>
                    </div>
                  ))}

                  {activeEntry && (
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#e6e8ec]">
                        <span className="text-[#7ee0a3]">{activeEntry.prompt}</span>
                        <span className="text-[#8b8f98]">{activeEntry.cwd}</span>
                        <span className="text-[#e8a03e]">$</span>
                        <span className="flex items-center gap-1 text-[#f5f6f8]">
                          <span>{typedCommand}</span>
                          <span className="cresc-terminal__cursor h-4.5 w-2 rounded-[2px] bg-[#d9dce2]" />
                        </span>
                      </div>
                      {showResult && (
                        <div className="cresc-terminal__result pl-0 text-[#9aa0aa] sm:pl-[9.4rem]">
                          {activeEntry.result}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <p className="text-base leading-7 text-[#57534e]">
                Once the baseline is uploaded, the dashboard and CLI can handle
                the rest of the OTA release cycle with much less effort.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://admin.cresc.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[#1c1917] px-6 py-3 text-base font-semibold text-white shadow-sm transition duration-200 hover:bg-[#372f2b] hover:shadow-md"
                >
                  Open Dashboard
                </a>
                <a
                  href="/docs/getting-started"
                  className="inline-flex items-center justify-center rounded-xl border border-[#d6d3cd] bg-white px-6 py-3 text-base font-semibold text-[#1c1917] transition duration-200 hover:border-[#b45309] hover:text-[#b45309]"
                >
                  View Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page2;

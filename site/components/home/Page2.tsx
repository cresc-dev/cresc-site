import { useEffect, useRef, useState } from "react";

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
    <section className="cresc-section cresc-section-alt relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(150,108,63,0.12),transparent_26%),radial-gradient(circle_at_84%_68%,rgba(122,59,46,0.08),transparent_24%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col">
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

            <div className="mt-10 flex flex-col gap-4">
              {workflowSteps.map((step) => (
                <div
                  key={step.id}
                  className="rounded-[28px] border border-[#ddcdb3] bg-[#fffaf4] px-6 py-5 shadow-[0_18px_40px_rgba(113,88,67,0.08)]"
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

          <div className="cresc-manuscript flex h-full flex-col rounded-[34px] border border-[#ddcdb3] p-8 sm:p-10">
            <div className="cresc-terminal overflow-hidden rounded-[24px] border border-[#6f5240]">
              <div className="cresc-terminal__chrome flex items-center px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d7a978]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#b86f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8d4e40]" />
                </div>
              </div>

              <div
                ref={terminalScreenRef}
                className="cresc-terminal__screen px-5 py-5 font-mono text-[0.95rem] leading-8 sm:px-6"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[0.76rem] uppercase tracking-[0.24em] text-[#b89d85]">
                  <span>first release</span>
                  <span className="h-1 w-1 rounded-full bg-[#6e5443]" />
                  <span>production lane</span>
                </div>

                <div className="space-y-4">
                  {completedEntries.map((entry) => (
                    <div key={entry.command} className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#efe2d2]">
                        <span className="text-[#ccab88]">{entry.prompt}</span>
                        <span className="text-[#8d7462]">{entry.cwd}</span>
                        <span className="text-[#c6a374]">$</span>
                        <span className="text-[#fff7ec]">{entry.command}</span>
                      </div>
                      <div className="pl-0 text-[#b79f8c] sm:pl-[9.4rem]">
                        {entry.result}
                      </div>
                    </div>
                  ))}

                  {activeEntry && (
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#efe2d2]">
                        <span className="text-[#ccab88]">{activeEntry.prompt}</span>
                        <span className="text-[#8d7462]">{activeEntry.cwd}</span>
                        <span className="text-[#c6a374]">$</span>
                        <span className="flex items-center gap-1 text-[#fff7ec]">
                          <span>{typedCommand}</span>
                          <span className="cresc-terminal__cursor h-5 w-2 rounded-[2px] bg-[#e8d2bb]" />
                        </span>
                      </div>
                      {showResult && (
                        <div className="cresc-terminal__result pl-0 text-[#b79f8c] sm:pl-[9.4rem]">
                          {activeEntry.result}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <p className="text-lg leading-8 text-[#5f483c]">
                After the first baseline is in place, the dashboard and CLI can
                carry the rest of the release cycle with much less effort.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
      </div>
    </section>
  );
}

export default Page2;

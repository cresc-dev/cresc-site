import logo from "../../pages/public/images/logo.svg";

const notes = [
  {
    title: "Measured cadence",
    detail: "Publish in smaller, deliberate steps instead of treating every release as a full reset.",
  },
  {
    title: "Light variations",
    detail: "Diff-based delivery keeps each update closer to a new phrase than a whole score.",
  },
  {
    title: "Reliable return",
    detail: "Rollback stays close at hand whenever a release needs to settle back into place.",
  },
];

function Banner() {
  return (
    <section className="cresc-hero cresc-grid relative overflow-hidden pt-28 pb-24 sm:pt-32 lg:pt-36 lg:pb-28">
      <div className="cresc-hero-aurora absolute -left-24 top-[-12rem] h-[28rem] w-[28rem] rounded-full" />
      <div className="cresc-hero-aurora cresc-hero-aurora-alt absolute bottom-[-16rem] right-[-6rem] h-[30rem] w-[30rem] rounded-full" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(170,128,77,0.12),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(118,33,33,0.1),transparent_28%),linear-gradient(180deg,rgba(255,251,245,0.74),rgba(242,231,213,0.92))]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-center lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.45em] text-[#7a3b2e]">
            Cresc OTA
          </p>
          <h1 className="cresc-display mt-6 text-5xl leading-[0.94] text-[#2d1d15] sm:text-6xl lg:text-7xl">
            A steadier cadence for React Native updates.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-[#5f483c]">
            Named for the gradual rise in music, Cresc treats over-the-air
            publishing the same way: smaller packages, deliberate rollout, and
            recovery kept within reach when a change needs to be revised.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://admin.cresc.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#7a3b2e] bg-[#7a3b2e] px-8 py-4 text-base font-semibold text-[#fffaf4] transition duration-300 hover:-translate-y-1 hover:bg-[#6a3025]"
            >
              Open Dashboard
            </a>
            <a
              href="/docs/getting-started"
              className="inline-flex items-center justify-center rounded-full border border-[#c8b28f] bg-[#fffaf2] px-8 py-4 text-base font-semibold text-[#3f2b21] transition duration-300 hover:-translate-y-1 hover:border-[#7a3b2e] hover:text-[#7a3b2e]"
            >
              Read Documentation
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-[#6f5748]">
            <span className="cresc-line h-px w-16 bg-[#d6c0a0]" />
            <a
              href="https://github.com/reactnativecn/react-native-update"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#7a3b2e]"
            >
              Open-source on GitHub
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-[#a37d58] sm:block" />
            <span>Self-host friendly</span>
          </div>
        </div>

        <div className="cresc-frame cresc-score-lines relative rounded-[36px] p-8 sm:p-10">
          <div className="flex items-center gap-5">
            <div className="cresc-medallion flex h-20 w-20 items-center justify-center rounded-full">
              <img src={logo} className="h-11 w-11" alt="Cresc Logo" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8b5a3c]">
                Named for crescendo
              </p>
              <h2 className="cresc-display mt-3 text-3xl text-[#2d1d15]">
                Composed for careful release work.
              </h2>
            </div>
          </div>

          <p className="mt-8 text-base leading-8 text-[#5f483c]">
            The first native release establishes the full picture. After that,
            Cresc can deliver only the missing detail and let the device
            complete the scene locally.
          </p>

          <div className="mt-8 space-y-4">
            {notes.map((note) => (
              <div
                key={note.title}
                className="rounded-[22px] border border-[#ddcdb3] bg-[#fffaf4] p-5"
              >
                <p className="cresc-display text-2xl text-[#6e3428]">
                  {note.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#6a5245]">
                  {note.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;

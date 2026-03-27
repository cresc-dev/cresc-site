import logo from "../../pages/public/images/logo.svg";

function Banner() {
  return (
    <section className="cresc-hero cresc-grid relative overflow-hidden pt-28 pb-24 sm:pt-32 lg:pt-36 lg:pb-28">
      <div className="cresc-hero-aurora absolute -left-24 top-[-12rem] h-[28rem] w-[28rem] rounded-full" />
      <div className="cresc-hero-aurora cresc-hero-aurora-alt absolute bottom-[-16rem] right-[-6rem] h-[30rem] w-[30rem] rounded-full" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(170,128,77,0.14),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(118,33,33,0.1),transparent_28%),repeating-linear-gradient(180deg,rgba(137,98,66,0.04)_0,rgba(137,98,66,0.04)_1px,transparent_1px,transparent_34px),linear-gradient(180deg,rgba(255,251,245,0.8),rgba(242,231,213,0.95))]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.06fr)_460px] lg:items-center lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.45em] text-[#7a3b2e]">
            React Native OTA Updates
          </p>
          <h1 className="cresc-display mt-6 text-5xl leading-[0.94] text-[#2d1d15] sm:text-6xl lg:text-7xl">
            React Native OTA updates with smaller patches and safer rollouts.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-[#5f483c]">
            Cresc is a CodePush and App Center alternative for teams that need
            delta patches, rollback protection, CI-friendly publishing, and an
            AI-first integration path through the official Skill across React
            Native, Expo, Hermes, and Harmony builds.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/docs/skills"
              className="inline-flex items-center justify-center rounded-full border border-[#7a3b2e] bg-[#7a3b2e] px-8 py-4 text-base font-semibold text-[#fffaf4] transition duration-300 hover:-translate-y-1 hover:bg-[#6a3025]"
            >
              Install AI Skill
            </a>
            <a
              href="/docs/getting-started"
              className="inline-flex items-center justify-center rounded-full border border-[#c8b28f] bg-[#fffaf2] px-8 py-4 text-base font-semibold text-[#3f2b21] transition duration-300 hover:-translate-y-1 hover:border-[#7a3b2e] hover:text-[#7a3b2e]"
            >
              View Manual Setup
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
            <span>Delta patches</span>
            <span className="hidden h-1 w-1 rounded-full bg-[#a37d58] sm:block" />
            <span>Self-host friendly</span>
            <span className="hidden h-1 w-1 rounded-full bg-[#a37d58] sm:block" />
            <span>App Center migration</span>
          </div>
        </div>

        <div className="cresc-frame cresc-score-lines relative rounded-[40px] px-8 py-8 sm:px-10 sm:py-10">
          <p className="text-center text-xs uppercase tracking-[0.38em] text-[#8b5a3c]">
            Named for crescendo
          </p>

          <div className="mt-6 border-t border-[#ddcdb3] pt-6">
            <div className="grid gap-6 sm:grid-cols-[68px_minmax(0,1fr)] sm:items-start">
              <img
                src={logo}
                className="cresc-bare-logo h-16 w-16 sm:h-[4.4rem] sm:w-[4.4rem]"
                alt="Cresc Logo"
              />

              <div>
                <h2 className="cresc-display text-5xl leading-[0.92] text-[#2d1d15] sm:text-6xl">
                  Built for release teams that need OTA updates to stay boring.
                </h2>
                <p className="mt-6 text-base leading-8 text-[#5f483c]">
                  The native build becomes the baseline. Every later React
                  Native update ships only the changed business logic, keeping
                  downloads smaller and emergency fixes much faster.
                </p>
              </div>
            </div>

            <div className="mt-7 rounded-[24px] border border-[#ddcdb3] bg-[#fffaf4]/84 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.32em] text-[#8b5a3c]">
                CodePush replacement, without the dead end
              </p>
              <p className="mt-3 text-sm leading-7 text-[#6a5245]">
                Cresc keeps the original release as the base and turns later OTA
                releases into measured diffs instead of full-bundle repeats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;

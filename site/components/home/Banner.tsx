import logo from "../../pages/public/images/logo.svg";

function Banner() {
  return (
    <section className="cresc-hero cresc-grid relative overflow-hidden pt-24 pb-20 sm:pt-28 lg:pt-32 lg:pb-24">
      <div className="cresc-hero-aurora absolute -left-24 top-[-12rem] h-[28rem] w-[28rem] rounded-full" />
      <div className="cresc-hero-aurora cresc-hero-aurora-alt absolute bottom-[-16rem] right-[-6rem] h-[30rem] w-[30rem] rounded-full" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.06fr)_460px] lg:items-center lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e7e5e1] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#b45309]">
            React Native OTA Updates
          </p>
          <h1 className="cresc-display mt-6 text-5xl leading-[1.04] text-[#1c1917] sm:text-6xl lg:text-[4.25rem]">
            OTA updates with smaller patches and safer rollouts.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#57534e]">
            Cresc is a CodePush and App Center alternative for teams that need
            delta patches, rollback protection, CI-friendly publishing, and an
            AI-first integration path through the official Skill across React
            Native, Expo, Hermes, and Harmony builds.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/docs/skills"
              className="inline-flex items-center justify-center rounded-xl bg-[#1c1917] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition duration-200 hover:bg-[#372f2b] hover:shadow-md"
            >
              Install AI Skill
            </a>
            <a
              href="/docs/getting-started"
              className="inline-flex items-center justify-center rounded-xl border border-[#d6d3cd] bg-white px-7 py-3.5 text-base font-semibold text-[#1c1917] transition duration-200 hover:border-[#b45309] hover:text-[#b45309]"
            >
              View Manual Setup
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-[#57534e]">
            <span className="h-px w-16 bg-[#d6d3cd]" />
            <a
              href="https://github.com/reactnativecn/react-native-update"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-[#b45309]"
            >
              Open-source on GitHub
            </a>
            <span className="hidden h-1 w-1 rounded-full bg-[#a8a29e] sm:block" />
            <span>Delta patches</span>
            <span className="hidden h-1 w-1 rounded-full bg-[#a8a29e] sm:block" />
            <span>Self-host friendly</span>
            <span className="hidden h-1 w-1 rounded-full bg-[#a8a29e] sm:block" />
            <span>App Center migration</span>
          </div>
        </div>

        <div className="cresc-frame relative rounded-3xl px-8 py-8 sm:px-10 sm:py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#b45309]">
            Named for crescendo
          </p>

          <div className="mt-6 border-t border-[#eceae5] pt-6">
            <div className="grid gap-6 sm:grid-cols-[68px_minmax(0,1fr)] sm:items-start">
              <img
                src={logo}
                className="cresc-bare-logo h-16 w-16 sm:h-[4.4rem] sm:w-[4.4rem]"
                alt="Cresc Logo"
              />

              <div>
                <h2 className="cresc-display text-3xl leading-[1.1] text-[#1c1917] sm:text-4xl">
                  Built for release teams that need OTA updates to stay boring.
                </h2>
                <p className="mt-5 text-base leading-7 text-[#57534e]">
                  The native build becomes the baseline. Every later React
                  Native update ships only the changed business logic, keeping
                  downloads smaller and emergency fixes much faster.
                </p>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-[#eceae5] bg-[#f6f5f2] px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b45309]">
                CodePush replacement, without the dead end
              </p>
              <p className="mt-2.5 text-sm leading-6 text-[#57534e]">
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

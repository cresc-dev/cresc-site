const landingCards = [
  {
    eyebrow: "Migration",
    title: "Replacing CodePush or App Center",
    desc: "See the migration path, rollout model, and why Cresc fits React Native teams that still need OTA updates after App Center's retirement.",
    href: "/codepush-alternative",
    cta: "Open Migration Guide",
  },
  {
    eyebrow: "Comparison",
    title: "Expo Updates vs Cresc",
    desc: "Compare bundle size, delta delivery, self-hosting flexibility, and when each workflow makes sense.",
    href: "/expo-updates-vs-cresc",
    cta: "Compare Options",
  },
  {
    eyebrow: "Overview",
    title: "React Native OTA updates",
    desc: "Get the practical overview: what OTA updates can change, what still needs a native release, and how Cresc fits the release pipeline.",
    href: "/react-native-ota-updates",
    cta: "Read The Guide",
  },
  {
    eyebrow: "Automation",
    title: "Debug releases from your AI client",
    desc: "Connect Cresc to Claude Desktop, an IDE or your own agent over MCP and ask why a device never got the update — read-only, scoped per app.",
    href: "/docs/mcp",
    cta: "See MCP Server",
  },
];

function Page3() {
  return (
    <section className="cresc-section-alt relative overflow-hidden py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
            Search Paths
          </p>
          <h2 className="cresc-display mt-4 text-3xl leading-tight text-[#1c1917] sm:text-[2.6rem]">
            Start from the question your team already has.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#57534e]">
            Cresc is easiest to evaluate when the page matches the rollout or
            migration problem you are solving right now. Pick the path that
            fits your release workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {landingCards.map((card) => (
            <article
              key={card.href}
              className="cresc-frame group flex h-full flex-col rounded-2xl p-7 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_44px_-16px_rgba(28,25,23,0.18)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b45309]">
                {card.eyebrow}
              </p>
              <h3 className="cresc-display mt-4 text-2xl leading-snug text-[#1c1917]">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-7 text-[#57534e]">
                {card.desc}
              </p>
              <a
                href={card.href}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#1c1917] transition-colors group-hover:text-[#b45309]"
              >
                {card.cta} <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page3;

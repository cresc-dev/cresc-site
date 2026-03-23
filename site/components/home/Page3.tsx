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
];

function Page3() {
  return (
    <section className="cresc-section relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(150,108,63,0.1),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(122,59,46,0.08),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-[#8b5a3c]">
            Search Paths
          </p>
          <h2 className="cresc-display mt-5 text-4xl text-[#2d1d15] sm:text-5xl">
            Start from the question your team already has.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5f483c]">
            Cresc is easiest to evaluate when the page matches the rollout or
            migration problem you are solving right now. Pick the path that
            fits your release workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {landingCards.map((card) => (
            <article
              key={card.href}
              className="cresc-manuscript flex h-full flex-col rounded-[30px] p-7"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-[#8b5a3c]">
                {card.eyebrow}
              </p>
              <h3 className="cresc-display mt-5 text-[2rem] leading-[1.04] text-[#2d1d15]">
                {card.title}
              </h3>
              <p className="mt-4 flex-1 text-base leading-8 text-[#5f483c]">
                {card.desc}
              </p>
              <a
                href={card.href}
                className="mt-8 inline-flex items-center justify-center rounded-full border border-[#7a3b2e] bg-[#fffaf2] px-6 py-3 text-sm font-semibold text-[#3f2b21] transition duration-300 hover:-translate-y-1 hover:border-[#7a3b2e] hover:text-[#7a3b2e]"
              >
                {card.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page3;

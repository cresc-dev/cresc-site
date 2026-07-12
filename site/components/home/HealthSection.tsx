import type { ReactNode } from "react";

interface HealthPointProps {
  index: string;
  title: string;
  children: ReactNode;
}

function HealthPoint({ index, title, children }: HealthPointProps) {
  return (
    <div className="border-t border-[#c9b28f]/70 pt-4">
      <div className="flex items-baseline gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a07742]">
          {index}
        </span>
        <h3 className="text-lg font-semibold text-[#3f291f]">{title}</h3>
      </div>
      <p className="mt-2 text-[15px] leading-7 text-[#6c5142]">{children}</p>
    </div>
  );
}

function HealthSection() {
  return (
    <section className="cresc-section-alt relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8c6239]">
              Release protection
            </p>
            <h2 className="cresc-display mt-5 text-4xl leading-[1.05] text-[#2d1d15] sm:text-5xl">
              Catch risky updates early. Stop them before they spread.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#6c5142]">
              Cresc watches every rollout, surfaces risk quickly, and can pause
              an unhealthy release before more users are affected.
            </p>

            <div className="mt-9 space-y-6">
              <HealthPoint index="I" title="See risk clearly">
                Know at a glance whether a release is healthy.
              </HealthPoint>
              <HealthPoint index="II" title="React sooner">
                Catch warning signs before they become widespread.
              </HealthPoint>
              <HealthPoint index="III" title="Limit the impact">
                Pause risky updates automatically and protect more users.
              </HealthPoint>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/docs/api"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7a3b2e] transition-colors hover:text-[#52271f]"
              >
                Explore version health <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <figure className="cresc-manuscript relative overflow-hidden rounded-[2rem] p-3 sm:p-4">
            <img
              src="/images/version-health-dashboard.png"
              alt="Cresc version health dashboard grouped by OTA version and native package"
              className="relative w-full rounded-[1.35rem] border border-[#8f735f]/35"
              loading="lazy"
            />
            <figcaption className="sr-only">
              Cresc Admin version health dashboard with local sample data
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default HealthSection;

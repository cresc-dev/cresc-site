import type { ReactNode } from "react";

interface HealthPointProps {
  index: string;
  title: string;
  children: ReactNode;
}

function HealthPoint({ index, title, children }: HealthPointProps) {
  return (
    <div className="border-t border-[#e7e5e1] pt-4">
      <div className="flex items-baseline gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b45309]">
          {index}
        </span>
        <h3 className="cresc-display text-lg text-[#1c1917]">{title}</h3>
      </div>
      <p className="mt-2 text-[15px] leading-7 text-[#57534e]">{children}</p>
    </div>
  );
}

function HealthSection() {
  return (
    <section className="cresc-section-alt relative overflow-hidden py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
              Release protection
            </p>
            <h2 className="cresc-display mt-4 text-3xl leading-tight text-[#1c1917] sm:text-[2.6rem]">
              Catch risky updates early. Stop them before they spread.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#57534e]">
              Cresc watches every rollout, surfaces risk quickly, and can pause
              an unhealthy release before more users are affected.
            </p>

            <div className="mt-9 space-y-6">
              <HealthPoint index="01" title="See risk clearly">
                Know at a glance whether a release is healthy.
              </HealthPoint>
              <HealthPoint index="02" title="React sooner">
                Catch warning signs before they become widespread.
              </HealthPoint>
              <HealthPoint index="03" title="Limit the impact">
                Pause risky updates automatically and protect more users.
              </HealthPoint>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/docs/api"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] transition-colors hover:text-[#78350f]"
              >
                Explore version health <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <figure className="cresc-frame relative overflow-hidden rounded-2xl p-2.5 sm:p-3">
            <img
              src="/images/version-health-dashboard.png"
              alt="Cresc version health dashboard grouped by OTA version and native package"
              className="relative w-full rounded-xl border border-[#e7e5e1]"
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

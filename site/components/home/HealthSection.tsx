import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

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

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

const SLIDES: Slide[] = [
  {
    src: "/images/version-health-dashboard.png",
    alt: "Cresc version health dashboard grouped by OTA version and native package",
    caption:
      "Version health: downloads, patches, startups and rollbacks per OTA version",
  },
  {
    src: "/images/error-symbolication.png",
    alt: "Cresc error details with the stack trace restored to original source lines and the surrounding source context",
    caption:
      "Error details: stacks restored to your source, with the throwing line in context",
  },
];

const SLIDE_INTERVAL = 6000;

function HealthCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [paused]);

  return (
    <figure
      className="cresc-frame relative overflow-hidden rounded-2xl p-2.5 sm:p-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Cresc console screenshots"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#e7e5e1] bg-white">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-4 px-1.5 pb-0.5">
        <span className="text-xs leading-5 text-[#78716c]">
          {SLIDES[index].caption}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1}: ${slide.caption}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-[#b45309]"
                  : "w-1.5 bg-[#d6d3d1] hover:bg-[#a8a29e]"
              }`}
            />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}

function HealthSection() {
  return (
    <section className="cresc-section-alt relative overflow-hidden py-24 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b45309]">
              Release protection
            </p>
            <h2 className="cresc-display mt-4 text-3xl leading-tight text-[#1c1917] sm:text-[2.6rem]">
              Catch risky updates early. Stop them before they spread.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#57534e]">
              Cresc watches every rollout, surfaces risk quickly, and can pause
              an unhealthy release before more users are affected — and when
              something does break, it hands you the stack trace in your own
              source code.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="/docs/api"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] transition-colors hover:text-[#78350f]"
              >
                Explore version health <span aria-hidden="true">→</span>
              </a>
              <a
                href="/docs/errors"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] transition-colors hover:text-[#78350f]"
              >
                See JS error monitoring <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <HealthCarousel />
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          <HealthPoint index="01" title="See risk clearly">
            Know at a glance whether a release is healthy.
          </HealthPoint>
          <HealthPoint index="02" title="React sooner">
            Catch warning signs before they become widespread.
          </HealthPoint>
          <HealthPoint index="03" title="Limit the impact">
            Pause risky updates automatically and protect more users.
          </HealthPoint>
          <HealthPoint index="04" title="Crash reporting, free">
            JS errors symbolicated back to your source — Sentry-style, with no
            extra service or bill.
          </HealthPoint>
        </div>
      </div>
    </section>
  );
}

export default HealthSection;

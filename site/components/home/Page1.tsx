import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

const movements = [
  {
    label: "Movement I",
    title: "Set the full base package",
    desc: "The first release carries the full picture the device needs before later over-the-air changes begin to arrive.",
  },
  {
    label: "Movement II",
    title: "Send only the new detail",
    desc: "When the app changes, Cresc prepares a smaller patch instead of shipping the entire bundle again.",
  },
  {
    label: "Movement III",
    title: "Complete the picture on device",
    desc: "The client combines what it already has with the new patch, so the finished release appears with much less transfer.",
  },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function PortraitFigure({ progress }: { progress: number }) {
  const pearlProgress = clamp((progress - 0.28) / 0.72, 0, 1);
  const pearlTranslateX = (1 - pearlProgress) * 78;
  const pearlTranslateY = (1 - pearlProgress) * 104;
  const hookOpacity = clamp((progress - 0.55) / 0.32, 0, 1);
  const haloOpacity = 0.08 + pearlProgress * 0.24;
  const guideOpacity = 0.18 + pearlProgress * 0.32;

  return (
    <svg
      viewBox="0 0 520 640"
      className="h-full w-full"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="cresc-stage-bg" x1="80" y1="50" x2="430" y2="610">
          <stop stopColor="#231812" />
          <stop offset="1" stopColor="#17100d" />
        </linearGradient>
        <linearGradient
          id="cresc-headscarf-blue"
          x1="150"
          y1="125"
          x2="340"
          y2="270"
        >
          <stop stopColor="#739EDD" />
          <stop offset="1" stopColor="#345FA8" />
        </linearGradient>
        <linearGradient id="cresc-gold-cloth" x1="280" y1="70" x2="430" y2="400">
          <stop stopColor="#F0C65B" />
          <stop offset="1" stopColor="#D29C34" />
        </linearGradient>
        <linearGradient id="cresc-coat" x1="145" y1="330" x2="320" y2="470">
          <stop stopColor="#B9773D" />
          <stop offset="1" stopColor="#8C5834" />
        </linearGradient>
        <linearGradient id="cresc-coat-shadow" x1="320" y1="280" x2="395" y2="470">
          <stop stopColor="#785239" />
          <stop offset="1" stopColor="#5D4030" />
        </linearGradient>
        <linearGradient id="cresc-skin" x1="174" y1="150" x2="300" y2="330">
          <stop stopColor="#E4C295" />
          <stop offset="1" stopColor="#D2A77F" />
        </linearGradient>
        <linearGradient id="cresc-neck" x1="240" y1="180" x2="340" y2="320">
          <stop stopColor="#B89282" />
          <stop offset="1" stopColor="#9B7260" />
        </linearGradient>
        <radialGradient id="cresc-pearl-fill" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(326 290) rotate(57.5) scale(30)">
          <stop stopColor="#FFFDF9" />
          <stop offset="0.56" stopColor="#F2E7D7" />
          <stop offset="1" stopColor="#C8A778" />
        </radialGradient>
        <radialGradient id="cresc-pearl-halo" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(324 292) rotate(90) scale(44)">
          <stop stopColor="#F4E7BD" />
          <stop offset="1" stopColor="#F4E7BD" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="20" y="20" width="480" height="600" rx="48" fill="url(#cresc-stage-bg)" />
      <rect
        x="20"
        y="20"
        width="480"
        height="600"
        rx="48"
        stroke="#4D362A"
        strokeOpacity="0.75"
        strokeWidth="2"
      />

      {[88, 110, 132, 154, 176, 392, 414, 436, 458, 480].map((y) => (
        <line
          key={y}
          x1="48"
          x2="472"
          y1={y}
          y2={y}
          stroke="#5D4436"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      ))}

      <path
        d="M121 477C182 447 258 443 410 478"
        stroke="#6A4B38"
        strokeOpacity="0.42"
        strokeWidth="10"
        strokeLinecap="round"
      />

      <polygon points="272,82 344,78 438,343 381,397" fill="url(#cresc-gold-cloth)" />
      <polygon points="190,150 272,82 341,201 246,152" fill="url(#cresc-headscarf-blue)" />
      <polygon points="272,82 355,132 343,231 341,201" fill="#345FA8" />
      <polygon points="176,171 246,171 274,322 208,319" fill="url(#cresc-skin)" />
      <polygon points="246,171 343,231 274,322" fill="url(#cresc-neck)" />
      <polygon points="124,483 206,334 310,286 353,483" fill="url(#cresc-coat)" />
      <polygon points="310,286 353,483 396,482 343,270" fill="url(#cresc-coat-shadow)" />

      <circle
        cx="325"
        cy="292"
        r="44"
        fill="url(#cresc-pearl-halo)"
        opacity={haloOpacity}
      />

      <path
        d="M403 394C388 357 363 323 333 293"
        fill="none"
        stroke="#D8C19C"
        strokeOpacity={guideOpacity}
        strokeWidth="3"
        strokeDasharray="8 11"
        strokeLinecap="round"
        strokeDashoffset={64 - pearlProgress * 64}
      />

      <path
        d="M318 245C325 255 329 266 329 278"
        fill="none"
        stroke="#C49A62"
        strokeOpacity={hookOpacity}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="329"
        y1="278"
        x2="329"
        y2="285"
        stroke="#C49A62"
        strokeOpacity={hookOpacity}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <g
        transform={`translate(${pearlTranslateX} ${pearlTranslateY})`}
        opacity={0.22 + pearlProgress * 0.78}
      >
        <ellipse
          cx="329"
          cy="298"
          rx="15"
          ry="18"
          fill="url(#cresc-pearl-fill)"
          stroke="#B98E5B"
          strokeWidth="1.4"
        />
        <circle cx="323" cy="291" r="4.5" fill="#FFFFFF" fillOpacity="0.9" />
      </g>
    </svg>
  );
}

function Page1() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useEffectEvent(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const travelled = viewportHeight * 0.68 - rect.top;
    const total = rect.height + viewportHeight * 0.18;
    const nextProgress = clamp(travelled / total, 0, 1);

    setProgress((current) =>
      Math.abs(current - nextProgress) > 0.003 ? nextProgress : current,
    );
  });

  useEffect(() => {
    let rafId = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        updateProgress();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const thresholds = [0, 0.36, 0.72];
  const activeIndex = progress < thresholds[1] ? 0 : progress < thresholds[2] ? 1 : 2;
  const completion = `${Math.round(progress * 100)}%`;
  const meterWidth = `${16 + progress * 84}%`;
  const status =
    progress < thresholds[1]
      ? "Base package present"
      : progress < thresholds[2]
        ? "Incremental patch in motion"
        : "Portrait completed on device";

  return (
    <section
      ref={sectionRef}
      className="cresc-section relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,132,84,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(122,59,46,0.08),transparent_30%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[#8b5a3c]">
            Incremental Delivery
          </p>
          <h2 className="cresc-display mt-5 text-4xl text-[#2d1d15] sm:text-5xl">
            Add the missing detail, not the whole canvas.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5f483c]">
            Like a variation added to an existing score, each Cresc update
            arrives as a measured addition to what the device already holds.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="self-start lg:sticky lg:top-28">
            <div className="cresc-frame cresc-score-lines rounded-[38px] p-5 sm:p-6">
              <div className="cresc-stage-panel relative overflow-hidden rounded-[30px] p-4 sm:p-6">
                <PortraitFigure progress={progress} />
              </div>

              <div className="mt-6 rounded-[24px] border border-[#ddcdb3] bg-[#fffaf4] p-5 sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#8b5a3c]">
                      Current state
                    </p>
                    <p className="mt-2 text-lg text-[#5f483c]">{status}</p>
                  </div>
                  <p className="cresc-display text-4xl text-[#7a3b2e]">
                    {completion}
                  </p>
                </div>

                <div className="mt-5 h-2 rounded-full bg-[#eadcc7]">
                  <span
                    className="block h-full rounded-full bg-[linear-gradient(90deg,#c9a36e,#7a3b2e)] transition-[width] duration-300"
                    style={{ width: meterWidth }}
                  />
                </div>

                <p className="mt-4 text-sm leading-7 text-[#6a5245]">
                  The device already holds the full portrait. The scroll only
                  introduces the pearl, mirroring how Cresc sends the missing
                  patch instead of re-sending the whole release.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:space-y-16">
            {movements.map((movement, index) => {
              const isActive = activeIndex === index;
              const isReached = progress >= thresholds[index];

              return (
                <article
                  key={movement.label}
                  className={`cresc-score-card flex min-h-[20rem] items-center rounded-[32px] border px-7 py-8 sm:px-8 lg:min-h-[24rem] ${
                    isActive
                      ? "border-[#c89a6a] bg-[#fff9f1] shadow-[0_22px_48px_rgba(113,88,67,0.1)]"
                      : isReached
                        ? "border-[#ddcdb3] bg-[#fffaf4]"
                        : "border-[#e7dbc9] bg-[#fcf7f0]"
                  }`}
                >
                  <div className="max-w-lg">
                    <p className="text-xs uppercase tracking-[0.36em] text-[#8b5a3c]">
                      {movement.label}
                    </p>
                    <h3 className="cresc-display mt-5 text-4xl text-[#2d1d15]">
                      {movement.title}
                    </h3>
                    <p className="mt-5 text-lg leading-8 text-[#5f483c]">
                      {movement.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page1;

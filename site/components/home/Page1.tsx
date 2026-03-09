import {
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const movements = [
  {
    label: "Movement I",
    title: "Hold the full base",
    desc: "The first release stays on device as the complete base, so later patches can remain much smaller.",
  },
  {
    label: "Movement II",
    title: "Drop only the new pearl",
    desc: "When something changes, Cresc lifts just the missing part instead of repeating the whole bundle.",
  },
  {
    label: "Movement III",
    title: "Set it in place locally",
    desc: "The client clicks the new patch into the existing base, then confirms the update in place.",
  },
];

interface Point {
  x: number;
  y: number;
}

interface MotionPoints {
  start: Point;
  lift: Point;
  midpoint: Point;
  hover: Point;
  target: Point;
}

interface PathStop {
  t: number;
  point: Point;
}

const PORTRAIT_VIEWBOX = {
  width: 520,
  height: 640,
} as const;

const PORTRAIT_PEARL = {
  x: 323,
  y: 357,
} as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const lerp = (start: number, end: number, amount: number) =>
  start + (end - start) * amount;

const mixPoint = (start: Point, end: Point, amount: number): Point => ({
  x: lerp(start.x, end.x, amount),
  y: lerp(start.y, end.y, amount),
});

const interpolatePath = (progress: number, stops: PathStop[]): Point => {
  if (stops.length === 0) {
    return { x: 0, y: 0 };
  }

  if (progress <= stops[0].t) {
    return stops[0].point;
  }

  for (let index = 1; index < stops.length; index += 1) {
    const previous = stops[index - 1];
    const current = stops[index];

    if (progress <= current.t) {
      const segmentProgress = clamp(
        (progress - previous.t) / (current.t - previous.t),
        0,
        1,
      );

      return mixPoint(previous.point, current.point, segmentProgress);
    }
  }

  return stops[stops.length - 1].point;
};

const getPearlPoint = (progress: number, points: MotionPoints): Point =>
  interpolatePath(progress, [
    { t: 0, point: points.start },
    { t: 0.16, point: points.lift },
    { t: 0.48, point: points.midpoint },
    { t: 0.72, point: points.hover },
    { t: 0.88, point: points.target },
    { t: 1, point: points.target },
  ]);

const getPearlScale = (progress: number) =>
  lerp(0.28, 1, clamp(progress / 0.32, 0, 1));

const getRevealProgress = (
  progress: number,
  start: number,
  end: number,
) => clamp((progress - start) / (end - start), 0, 1);

const easeOutCubic = (value: number) =>
  1 - Math.pow(1 - clamp(value, 0, 1), 3);

function PortraitFigure({ progress }: { progress: number }) {
  const placeholderPulse = 1 + (1 - clamp(progress / 0.22, 0, 1)) * 0.05;
  const placeholderOpacity = 1 - clamp((progress - 0.74) / 0.16, 0, 1);
  const hookOpacity = clamp((progress - 0.78) / 0.18, 0, 1);
  const pearlOpacity = clamp((progress - 0.94) / 0.05, 0, 1);
  const expression = easeOutCubic(clamp((progress - 0.95) / 0.05, 0, 1));
  const cheekGlow = 0.03 + expression * 0.08;
  const mouthLift = expression * 1.6;
  const eyeGlow = 0.08 + expression * 0.16;

  return (
    <svg
      viewBox={`0 0 ${PORTRAIT_VIEWBOX.width} ${PORTRAIT_VIEWBOX.height}`}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <radialGradient
          id="cresc-pearl-fill"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${PORTRAIT_PEARL.x} ${PORTRAIT_PEARL.y}) rotate(57.5) scale(30)`}
        >
          <stop stopColor="#FFFDF9" />
          <stop offset="0.56" stopColor="#F2E7D7" />
          <stop offset="1" stopColor="#C8A778" />
        </radialGradient>
      </defs>

      <rect
        x="1"
        y="1"
        width={PORTRAIT_VIEWBOX.width - 2}
        height={PORTRAIT_VIEWBOX.height - 2}
        rx="41"
        fill="none"
        stroke="#4D362A"
        strokeOpacity="0.55"
        strokeWidth="2"
      />

      <g
        opacity="0.95"
        transform={`translate(${PORTRAIT_PEARL.x} ${PORTRAIT_PEARL.y})`}
      >
        <ellipse cx="0" cy="0" rx="18" ry="20" fill="#644a3e" fillOpacity="0.78" />
      </g>

      <g
        transform={`translate(${PORTRAIT_PEARL.x} ${PORTRAIT_PEARL.y}) scale(${placeholderPulse})`}
      >
        <path
          d="M-12 -52C-4 -41 0 -28 0 -15"
          fill="none"
          stroke="#E4CFAB"
          strokeOpacity={placeholderOpacity * 0.84}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5 8"
        />
        <circle
          cx="0"
          cy="0"
          r="16"
          fill="none"
          stroke="#EAD9B6"
          strokeOpacity={placeholderOpacity}
          strokeWidth="3"
          strokeDasharray="5 8"
        />
      </g>

      <g transform={`translate(${PORTRAIT_PEARL.x} ${PORTRAIT_PEARL.y})`}>
        <path
          d="M-10 -48C-3 -38 0 -27 0 -15"
          fill="none"
          stroke="#C49A62"
          strokeOpacity={hookOpacity}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="-15"
          x2="0"
          y2="-8"
          stroke="#C49A62"
          strokeOpacity={hookOpacity}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      <g opacity={pearlOpacity}>
        <circle
          cx={PORTRAIT_PEARL.x}
          cy={PORTRAIT_PEARL.y}
          r="16"
          fill="url(#cresc-pearl-fill)"
          stroke="#B98E5B"
          strokeWidth="1.4"
        />
        <circle
          cx={PORTRAIT_PEARL.x - 5.4}
          cy={PORTRAIT_PEARL.y - 6.8}
          r="4.2"
          fill="#FFFFFF"
          fillOpacity="0.92"
        />
      </g>
    </svg>
  );
}

function Page1() {
  const sectionRef = useRef<HTMLElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [motionPoints, setMotionPoints] = useState<MotionPoints | null>(null);
  const [sequenceTop, setSequenceTop] = useState(88);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionHoldHeight, setCompletionHoldHeight] = useState<number | null>(null);
  const [isMobileLocked, setIsMobileLocked] = useState(false);
  const isCompletedRef = useRef(false);
  const completionAnchorRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const mobileLockScrollYRef = useRef(0);
  const isStageCenteredRef = useRef(false);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const completeSequence = useEffectEvent(
    (isDesktop: boolean, stickyTop?: number, sequenceHeight?: number) => {
      completionAnchorRef.current = isDesktop ? stickyTop ?? null : null;
      isCompletedRef.current = true;
      setCompletionHoldHeight(isDesktop ? sequenceHeight ?? null : null);
      setIsCompleted(true);
      setIsMobileLocked(false);
      progressRef.current = 1;
      setProgress(1);
    },
  );

  const measureMotionPoints = useEffectEvent(() => {
    const stage = stageRef.current;
    const navLink = document.querySelector(
      ".rp-nav__title__link",
    ) as HTMLElement | null;
    const navLogo = navLink?.querySelector("img") as HTMLElement | null;

    if (!stage || !navLink) {
      return null;
    }

    const stageRect = stage.getBoundingClientRect();
    const logoRect = (navLogo ?? navLink).getBoundingClientRect();
    const logoSize = Math.min(logoRect.width, logoRect.height);
    const start = {
      x: navLogo
        ? logoRect.left + logoRect.width * (88 / 108)
        : logoRect.left + logoSize * 0.48,
      y: navLogo
        ? logoRect.top + logoRect.height * (54 / 108)
        : logoRect.top + logoRect.height * 0.5,
    };

    return {
      start,
      lift: {
        x: start.x + 6,
        y: start.y - 48,
      },
      midpoint: {
        x: stageRect.left + stageRect.width * 0.34,
        y: stageRect.top - Math.min(68, stageRect.height * 0.12),
      },
      hover: {
        x: stageRect.left + stageRect.width * 0.58,
        y: stageRect.top + stageRect.height * 0.18,
      },
      target: {
        x:
          stageRect.left +
          stageRect.width * (PORTRAIT_PEARL.x / PORTRAIT_VIEWBOX.width),
        y:
          stageRect.top +
          stageRect.height * (PORTRAIT_PEARL.y / PORTRAIT_VIEWBOX.height),
      },
    } satisfies MotionPoints;
  });

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    let observer: IntersectionObserver | null = null;

    const updateObserver = () => {
      observer?.disconnect();

      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const bandTop = Math.round(viewportHeight * 0.42);
      const bandBottom = Math.round(viewportHeight * 0.58);
      const bottomMargin = Math.max(viewportHeight - bandBottom, 0);

      observer = new IntersectionObserver(
        ([entry]) => {
          isStageCenteredRef.current = entry.isIntersecting;
        },
        {
          root: null,
          rootMargin: `-${bandTop}px 0px -${bottomMargin}px 0px`,
          threshold: 0,
        },
      );

      observer.observe(stage);
    };

    updateObserver();
    window.addEventListener("resize", updateObserver);
    window.visualViewport?.addEventListener("resize", updateObserver);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateObserver);
      window.visualViewport?.removeEventListener("resize", updateObserver);
    };
  }, []);

  const updateAnimation = useEffectEvent(() => {
    const section = sectionRef.current;
    const sequence = sequenceRef.current;
    const sticky = stickyRef.current;
    const stage = stageRef.current;
    const nextPoints = measureMotionPoints();

    if (nextPoints) {
      setMotionPoints(nextPoints);
    }

    if (!section || !sequence || !sticky || !stage) {
      return;
    }

    const sequenceRect = sequence.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const stickyRect = sticky.getBoundingClientRect();
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const nextSequenceTop = Math.max(
      88,
      viewportHeight * 0.5 - stickyRect.height * 0.5,
    );

    if (isDesktop) {
      setSequenceTop((current) =>
        Math.abs(current - nextSequenceTop) > 1 ? nextSequenceTop : current,
      );
    }

    const stageRect = stage.getBoundingClientRect();
    const isSequenceActive =
      progressRef.current > 0.001 || isStageCenteredRef.current;
    const nextProgress = isDesktop
      ? isSequenceActive
        ? clamp(
            (nextSequenceTop - sequenceRect.top) /
              Math.max(sequenceRect.height - stickyRect.height, 1),
            0,
            1,
          )
        : 0
      : progressRef.current;

    if (isCompletedRef.current) {
      if (isDesktop && completionHoldHeight === null) {
        setCompletionHoldHeight(sequenceRect.height);
      }
      if (!isCompleted) {
        setIsCompleted(true);
      }
      setProgress((current) => (current < 1 ? 1 : current));
      return;
    }

    if (nextProgress >= 0.999) {
      completeSequence(isDesktop, stickyRect.top, sequenceRect.height);
      return;
    }

    setProgress((current) =>
      Math.abs(current - nextProgress) > 0.002 ? nextProgress : current,
    );
  });

  const consumeMobileScroll = useEffectEvent((deltaY: number) => {
    if (window.matchMedia("(min-width: 1024px)").matches || isCompletedRef.current) {
      return false;
    }

    const stage = stageRef.current;

    if (!stage) {
      return false;
    }

    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const stageRect = stage.getBoundingClientRect();
    const inLockZone =
      progressRef.current > 0.001 ||
      isStageCenteredRef.current;

    if (!inLockZone) {
      return false;
    }

    const current = progressRef.current;

    if (deltaY < 0 && current <= 0.001) {
      return false;
    }

    const scrubSpan = Math.max(stageRect.height * 1.55, viewportHeight * 1.08);
    const next = clamp(current + deltaY / scrubSpan, 0, 1);

    if (next >= 0.999) {
      completeSequence(false);
      return true;
    }

    if (next <= 0.001) {
      if (current > 0.001) {
        setIsMobileLocked(false);
        progressRef.current = 0;
        setProgress(0);
        return true;
      }

      return false;
    }

    if (Math.abs(next - current) > 0.001) {
      if (!isMobileLocked) {
        setIsMobileLocked(true);
      }
      progressRef.current = next;
      setProgress(next);
    }

    return true;
  });

  useLayoutEffect(() => {
    if (
      !isCompleted ||
      completionHoldHeight === null ||
      completionAnchorRef.current === null
    ) {
      return;
    }

    const sticky = stickyRef.current;

    if (!sticky) {
      completionAnchorRef.current = null;
      setCompletionHoldHeight(null);
      return;
    }

    const delta = sticky.getBoundingClientRect().top - completionAnchorRef.current;

    if (Math.abs(delta) > 1) {
      window.scrollBy(0, delta);
    }

    completionAnchorRef.current = null;
    setCompletionHoldHeight(null);
  }, [completionHoldHeight, isCompleted]);

  useEffect(() => {
    let rafId = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        updateAnimation();
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

  useEffect(() => {
    if (!isMobileLocked) {
      return;
    }

    const body = document.body;
    const html = document.documentElement;
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overscrollBehavior: html.style.overscrollBehavior,
    };
    const scrollY = window.scrollY;

    mobileLockScrollYRef.current = scrollY;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    html.style.overscrollBehavior = "none";

    return () => {
      body.style.overflow = previous.overflow;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      html.style.overscrollBehavior = previous.overscrollBehavior;
      window.scrollTo(0, mobileLockScrollYRef.current);
    };
  }, [isMobileLocked]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (consumeMobileScroll(event.deltaY)) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touchY = event.touches[0]?.clientY;

      if (touchY === undefined) {
        return;
      }

      if (touchStartYRef.current === null) {
        touchStartYRef.current = touchY;
        return;
      }

      const deltaY = touchStartYRef.current - touchY;
      const isConsumed = consumeMobileScroll(deltaY);

      if (isConsumed) {
        event.preventDefault();
      }

      touchStartYRef.current = touchY;
    };

    const resetTouch = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", resetTouch);
    window.addEventListener("touchcancel", resetTouch);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", resetTouch);
      window.removeEventListener("touchcancel", resetTouch);
    };
  }, []);

  const pearlPoint = motionPoints ? getPearlPoint(progress, motionPoints) : null;
  const pearlOpacity =
    clamp(progress / 0.05, 0, 1) * (1 - clamp((progress - 0.95) / 0.05, 0, 1));
  const pearlScale = getPearlScale(progress);
  const toastReveal = easeOutCubic(getRevealProgress(progress, 0.955, 0.998));
  const activeIndex = progress < 0.43 ? 0 : progress < 0.66 ? 1 : 2;
  const completedSequenceStyle =
    isCompleted && completionHoldHeight !== null
      ? {
          minHeight: `${completionHoldHeight}px`,
        }
      : undefined;

  return (
    <section
      ref={sectionRef}
      className="cresc-section relative py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,132,84,0.12),transparent_28%),repeating-linear-gradient(180deg,rgba(137,98,66,0.035)_0,rgba(137,98,66,0.035)_1px,transparent_1px,transparent_34px),radial-gradient(circle_at_bottom_right,rgba(122,59,46,0.08),transparent_30%)]" />

      {pearlPoint && pearlOpacity > 0.01 && (
        <div
          className="pointer-events-none fixed z-[90]"
          style={{
            left: pearlPoint.x,
            top: pearlPoint.y,
            opacity: pearlOpacity,
            transform: `translate(-50%, -50%) scale(${pearlScale})`,
            willChange: "left, top, opacity, transform",
          }}
        >
          <div className="cresc-pearl-shell relative h-9 w-9 rounded-full border border-[#c6a374] bg-[radial-gradient(circle_at_30%_30%,#fffefb_0,#f2e4cf_56%,#d0ae7a_100%)] shadow-[0_10px_28px_rgba(244,231,189,0.28),0_12px_24px_rgba(71,44,24,0.24)]">
            <span className="absolute left-[0.4rem] top-[0.32rem] h-2.5 w-2.5 rounded-full bg-white/95" />
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[#8b5a3c]">
            Incremental Delivery
          </p>
          <h2 className="cresc-display mt-5 text-4xl text-[#2d1d15] sm:text-5xl">
            Add the missing detail, not the whole canvas.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5f483c]">
            The missing change is carried into the existing app and set in
            place locally, instead of replacing the whole package.
          </p>
        </div>

        <div
          ref={sequenceRef}
          className={`relative mt-16 ${isCompleted ? "" : "lg:min-h-[250vh]"}`}
          style={completedSequenceStyle}
        >
          <div
            ref={stickyRef}
            className={`grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.9fr)] lg:items-stretch ${
              isCompleted ? "" : "lg:sticky"
            }`}
            style={isCompleted ? undefined : { top: `${sequenceTop}px` }}
          >
            <div className="self-start">
              <div className="cresc-frame cresc-score-lines rounded-[38px] p-5 sm:p-6">
                <div className="cresc-stage-panel relative overflow-hidden rounded-[30px] p-4 sm:p-6">
                  <div
                    ref={stageRef}
                    className="relative aspect-[13/16] overflow-hidden rounded-[26px] bg-[#09070f]"
                  >
                    <img
                      src="/images/girl-with-pearl-earring.webp"
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full object-cover"
                    />
                    <PortraitFigure progress={progress} />
                  </div>

                  <div
                    className="pointer-events-none absolute bottom-14 left-1/2 flex items-center gap-2 rounded-full border border-[#d6c0a0] bg-[linear-gradient(180deg,rgba(255,249,239,0.96),rgba(244,234,220,0.92))] px-4 py-2 text-sm text-[#4d3528] shadow-[0_16px_30px_rgba(71,44,24,0.18)]"
                    style={{
                      opacity: toastReveal,
                      transform: `translate(-50%, ${(1 - toastReveal) * 34}px) scale(${0.96 + toastReveal * 0.04})`,
                      filter: `blur(${(1 - toastReveal) * 8}px)`,
                    }}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-[#7a3b2e]" />
                    <span className="font-medium tracking-[0.06em]">
                      App Updated!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:h-full lg:self-stretch lg:justify-between">
              {movements.map((movement, index) => {
                const reveal = easeOutCubic(
                  getRevealProgress(
                    progress,
                    0.22 + index * 0.21,
                    0.42 + index * 0.21,
                  ),
                );
                const isActive = index === activeIndex;

                return (
                  <article
                    key={movement.label}
                    className={`cresc-score-card flex min-h-[9.75rem] flex-col justify-center rounded-[28px] border px-6 py-5 lg:min-h-0 lg:flex-1 lg:px-7 ${
                      isActive
                        ? "border-[#c89a6a] bg-[#fff9f1] shadow-[0_20px_44px_rgba(113,88,67,0.1)]"
                        : "border-[#ddcdb3] bg-[#fffaf4]"
                    } ${reveal > 0.02 ? "" : "pointer-events-none"}`}
                    style={{
                      opacity: reveal,
                      transform: `translateY(${(1 - reveal) * 64}px) scale(${0.955 + reveal * 0.045})`,
                      filter: `blur(${(1 - reveal) * 12}px)`,
                    }}
                  >
                    <p className="text-xs uppercase tracking-[0.36em] text-[#8b5a3c]">
                      {movement.label}
                    </p>
                    <h3 className="cresc-display mt-3 text-[2rem] leading-[1.02] text-[#2d1d15] lg:text-[2.15rem]">
                      {movement.title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-6 text-[#5f483c]">
                      {movement.desc}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page1;

import { useEffect, useRef, useState } from "react";
import GitHubButton from "./GitHubButton";

interface BannerProps {
  isMobile?: boolean;
}

/** Chapters of the launch film (seconds), mirrored by the rail under it. */
const chapters = [
  { id: "ship", label: "Ship in one command", start: 12, end: 20 },
  { id: "delta", label: "3.4 KB delta updates", start: 20, end: 28 },
  { id: "hermes", label: "Built for Hermes", start: 28, end: 34 },
  { id: "rollout", label: "Rollouts & rollback", start: 34, end: 42 },
  { id: "rescue", label: "Cold-start recovery", start: 42, end: 48 },
  { id: "mcp", label: "MCP debugging", start: 48, end: 54 },
];

type LaunchPlayer = {
  seek(time: number): void;
  setVisible(visible: boolean): void;
  subscribe(listener: (time: number, playing: boolean) => void): () => void;
};

function ChapterRail({ player }: { player: LaunchPlayer | null }) {
  const [active, setActive] = useState(-1);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);

  // The film reports its clock every frame; progress is written straight to
  // the DOM and React only re-renders when the active chapter changes.
  useEffect(() => {
    if (!player) return;
    let last = -2;
    return player.subscribe((t) => {
      let current = -1;
      chapters.forEach((c, i) => {
        const k = Math.min(1, Math.max(0, (t - c.start) / (c.end - c.start)));
        const fill = fills.current[i];
        if (fill) fill.style.transform = `scaleX(${k})`;
        if (t >= c.start && t < c.end) current = i;
      });
      if (current !== last) {
        last = current;
        setActive(current);
      }
    });
  }, [player]);

  return (
    <ol className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-5">
      {chapters.map((c, i) => (
        <li key={c.id}>
          <button
            type="button"
            onClick={() => player?.seek(c.start)}
            aria-current={active === i ? "step" : undefined}
            className="group w-full text-left"
          >
            <span className="block h-[3px] rounded-full bg-stone-900/10 overflow-hidden">
              <span
                ref={(el) => {
                  fills.current[i] = el;
                }}
                className="block h-full w-full origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#d97706,#b45309)]"
              />
            </span>
            <span className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-xs text-stone-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-sm transition-colors duration-300 ${
                  active === i
                    ? "text-stone-900 font-semibold"
                    : "text-stone-500 group-hover:text-stone-800"
                }`}
              >
                {c.label}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}

/**
 * The launch film is the animation page itself (public/launch/), rendered live in a
 * same-origin frame: it plays muted on its own, and its own controls turn on the
 * Web Audio soundtrack (the click has to land inside the frame to unlock audio).
 */
function LaunchFilm() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [player, setPlayer] = useState<LaunchPlayer | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const attach = () => {
      const win = frame.contentWindow as (Window & { launchPlayer?: LaunchPlayer }) | null;
      if (win?.launchPlayer) setPlayer(win.launchPlayer);
    };
    attach(); // the frame may have finished loading before hydration
    frame.addEventListener("load", attach);
    return () => frame.removeEventListener("load", attach);
  }, []);

  // Stop rendering (and the soundtrack) while the film is scrolled out of view.
  useEffect(() => {
    const frame = frameRef.current;
    if (!player || !frame || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => player.setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [player]);

  return (
    <div className="cresc-launch-stage relative mt-14 sm:mt-16 lg:mt-20 mx-auto max-w-[1180px]">
      <div className="cresc-launch-glow" aria-hidden="true" />
      <div className="cresc-launch-frame relative rounded-[18px] sm:rounded-[28px] p-[5px] sm:p-[7px]">
        <div className="relative overflow-hidden rounded-[13px] sm:rounded-[21px] bg-[#05060a] aspect-video">
          <iframe
            ref={frameRef}
            src="/launch/index.html"
            title="Cresc launch film: one-command releases, 3.4 KB delta updates, staged rollouts with crash rollback, native cold-start recovery, and MCP debugging"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
      <ChapterRail player={player} />
    </div>
  );
}

function Banner(_props: BannerProps) {
  return (
    <section className="cresc-launch-hero relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-28">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-7 sm:mb-9">
            <a
              href="/docs/skills"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md px-4 py-1.5 text-sm text-stone-200 hover:border-amber-400/50 hover:text-white transition-all duration-300"
            >
              <span className="relative flex w-2 h-2">
                <span className="cresc-live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              </span>
              <span>Official Skill Live · One-Prompt Setup with AI</span>
              <span className="text-amber-300 group-hover:translate-x-0.5 transition-transform duration-300">
                →
              </span>
            </a>
            <a
              href="/codepush-alternative"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-1.5 text-sm text-stone-300 hover:border-amber-400/50 hover:text-white transition-all duration-300"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              CodePush & Expo Updates Alternative
            </a>
          </div>

          <h1 className="cresc-hero-title text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[5.25rem] font-extrabold tracking-tight">
            Ship at the speed of{" "}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(100deg,#ffffff_0%,#fde68a_40%,#f59e0b_95%)]">
              thought.
            </span>
          </h1>

          <p className="mt-6 sm:mt-7 text-lg sm:text-xl text-stone-300 leading-relaxed max-w-2xl mx-auto">
            Cresc delivers over-the-air updates for React Native. Fix the code
            and reach every device in seconds — no app store review queue, and a
            one-line change ships as a 3.4 KB patch.
          </p>

          <div className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/docs/skills" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-[15px] rounded-full text-base font-bold text-[#1c1917] bg-white hover:bg-stone-100 shadow-[0_8px_32px_rgba(255,255,255,0.18)] hover:shadow-[0_12px_44px_rgba(255,255,255,0.28)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Install AI Skill
              </button>
            </a>
            <a href="/docs/getting-started" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-[15px] rounded-full text-base font-semibold text-white border border-white/20 bg-white/[0.04] backdrop-blur-md hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                5-Min Quickstart
              </button>
            </a>
            <div className="cresc-gh-dark scale-125 sm:ml-3 mt-2 sm:mt-0">
              <GitHubButton
                type="stargazers"
                namespace="reactnativecn"
                repo="react-native-update"
              />
            </div>
          </div>
        </div>

        <LaunchFilm />
      </div>
    </section>
  );
}

export default Banner;

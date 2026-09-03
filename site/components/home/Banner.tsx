import { useEffect, useState } from "react";
import GitHubButton from "./GitHubButton";

interface BannerProps {
  isMobile?: boolean;
}

const heroSlides = [
  {
    id: "speed",
    tag: "Instant Rollout",
    highlight: "Instantly to Your Users",
    description:
      "Cresc delivers React Native OTA updates directly to devices. Ship bug fixes and product improvements in seconds without waiting on app store reviews.",
    stats: [
      { value: "0 sec", label: "App Store Review" },
      { value: "Global", label: "CDN Distribution" },
      { value: "Auto", label: "Rollback Protection" },
    ],
  },
  {
    id: "patch",
    tag: "Delta Patches",
    highlight: "With 90% Smaller Patches",
    description:
      "Powered by intelligent HDiff differential patching, Cresc generates micro-updates of only a few KBs for lightning-fast background downloads on any network.",
    stats: [
      { value: "42 KB", label: "Average Patch Size" },
      { value: "90%+", label: "Bandwidth Saved" },
      { value: "Silent", label: "Background Updates" },
    ],
  },
  {
    id: "safety",
    tag: "Rollback Safety",
    highlight: "With Zero Downtime Risk",
    description:
      "Automated health monitoring detects native exceptions instantly and safely reverts users to the last known good release with zero downtime.",
    stats: [
      { value: "100%", label: "Automatic Rollback" },
      { value: "Phased", label: "Gradual Rollouts" },
      { value: "1-Click", label: "Emergency Pause" },
    ],
  },
  {
    id: "ai",
    tag: "AI Workflow",
    highlight: "Automated with AI Agents",
    description:
      "Empowered by official Skills and MCP tools, AI agents inspect your codebase, build differential patches, and publish releases automatically.",
    stats: [
      { value: "1 Prompt", label: "AI-Assisted Setup" },
      { value: "12+ Tools", label: "Official MCP Suite" },
      { value: "Dual-OS", label: "iOS & Android" },
    ],
  },
];

function Banner(_props: BannerProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = heroSlides[activeSlide];

  return (
    <section
      className="relative overflow-hidden min-h-[90vh] lg:min-h-[96vh] flex items-center bg-[#04070f]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Fullscreen Immersive Background Video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-loop/pushy-hero-loop-poster.jpg"
          className="cresc-hero-bg-video"
        >
          <source
            src="/hero-loop/pushy-hero-loop-av1.mp4"
            type='video/mp4; codecs="av01.0.05M.08"'
          />
          <source
            src="/hero-loop/pushy-hero-loop.webm"
            type="video/webm; codecs=vp9"
          />
          <source
            src="/hero-loop/pushy-hero-loop.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ultra-light lateral protection gradient - ensures text contrast while keeping video bright and vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#04070f]/80 via-[#04070f]/40 to-transparent" />

        {/* Bottom subtle edge fade into page background */}
        <div
          className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#fdfdfc]"
          aria-hidden="true"
        />
      </div>

      {/* 2. Hero Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-12 lg:gap-10">
          {/* ---- Left: copy & CTAs ---- */}
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
              <a
                href="/docs/skills"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/45 backdrop-blur-md px-4 py-1.5 text-sm text-slate-100 hover:border-blue-400/60 hover:text-white transition-all duration-300 shadow-xl"
              >
                <span className="relative flex w-2 h-2">
                  <span className="cresc-live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                </span>
                <span>Official Skill Live · One-Prompt Setup with AI</span>
                <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform duration-300">
                  →
                </span>
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-4 py-1.5 text-sm text-slate-200 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                CodePush & App Center Alternative
              </span>
            </div>

            {/* Headline with dynamic highlight replacement */}
            <h1 className="cresc-hero-title text-[2.75rem] leading-[1.12] sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              Ship Every Release
              <br />
              <span
                key={activeSlide}
                className="cresc-slide-text bg-clip-text text-transparent bg-[linear-gradient(100deg,#38bdf8_0%,#818cf8_50%,#c084fc_100%)]"
              >
                {current.highlight}
              </span>
            </h1>

            {/* Description dynamic replacement */}
            <p
              key={`desc-${activeSlide}`}
              className="cresc-slide-text text-lg sm:text-xl text-slate-100 leading-relaxed max-w-xl mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] font-normal min-h-[3.8rem]"
            >
              {current.description}
            </p>

            {/* Interactive Highlight Slide Tabs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10">
              {heroSlides.map((slide, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`group relative flex items-center px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 text-white border border-white/40 shadow-lg backdrop-blur-md"
                        : "bg-black/35 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-sm"
                    }`}
                  >
                    {slide.tag}
                  </button>
                );
              })}
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
              <a href="/docs/skills" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="pushy-btn-primary w-full sm:w-auto px-8 py-[15px] rounded-full text-base font-bold text-white bg-[linear-gradient(100deg,#2563eb,#4f46e5)] shadow-[0_8px_32px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_44px_rgba(79,70,229,0.55)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Install AI Skill
                </button>
              </a>
              <a href="/docs/getting-started" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-8 py-[15px] rounded-full text-base font-semibold text-white border border-white/20 bg-black/45 backdrop-blur-md hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 shadow-xl"
                >
                  5-Min Quickstart
                </button>
              </a>
              <div className="cresc-gh-dark scale-125 origin-left sm:ml-3 mt-2 sm:mt-0">
                <GitHubButton
                  type="stargazers"
                  namespace="reactnativecn"
                  repo="react-native-update"
                />
              </div>
            </div>

            {/* Stats Row linked to current slide */}
            <dl
              key={`stats-${activeSlide}`}
              className="cresc-slide-grid grid grid-cols-3 gap-6 border-t border-white/15 pt-8 max-w-xl w-full"
            >
              {current.stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl sm:text-[1.7rem] font-extrabold tracking-tight text-white drop-shadow truncate">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-sm text-slate-300 truncate">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---- Right: Clean, unblocked view of the video scene with discreet corner status ---- */}
          <div className="hidden lg:flex flex-col justify-end items-end h-full min-h-[380px] pointer-events-none">
            <div className="pointer-events-auto rounded-full border border-white/20 bg-black/45 backdrop-blur-md px-4 py-2 text-xs font-medium text-slate-200 shadow-xl flex items-center gap-2 mb-4 hover:border-white/40 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-400 cresc-live-dot" />
              <span>Production Ready · iOS & Android</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;

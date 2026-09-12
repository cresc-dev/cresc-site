import { useState } from "react";
import "./analytics.scss";

const views = [
  {
    id: "overview",
    label: "Overview",
    title: "Your rollout, in perspective.",
    body: "Read daily traffic and active-device trends alongside update outcomes. Separate up-to-date clients, delta delivery, full bundles and paused releases at a glance.",
    details: [
      "Traffic and active devices",
      "7, 14 or 35-day windows",
      "Update outcomes at a glance",
    ],
    caption: "Atlas Travel · iOS · Analytics overview",
  },
  {
    id: "versions",
    label: "Version funnel",
    title: "From served to running.",
    body: "Follow downloads, activations and rollbacks for each OTA version. Expand native-package details and time-to-activation distributions to see how a rollout progresses.",
    details: [
      "OTA version × native package",
      "Cumulative activation rate",
      "Download and activation lag",
    ],
    caption: "Atlas Travel · 4.8.2 · Funnel and activation timing",
  },
  {
    id: "traffic",
    label: "Traffic",
    title: "Know the shape of your audience.",
    body: "Find busy hours and inspect native packages, network categories, request hosts and IPv4 / IPv6. Regional rankings reveal where update checks originate.",
    details: [
      "Hourly traffic patterns",
      "Package and network breakdowns",
      "Regional volume and share",
    ],
    caption: "Atlas Travel · Network mix and regional reach",
  },
  {
    id: "failures",
    label: "Failures",
    title: "Turn a failed update into a lead.",
    body: "Group failures by timeout, network, storage, integrity checks and patch errors. Trace affected releases and compare OS versions to narrow your investigation.",
    details: [
      "Reasons and affected versions",
      "OS-version comparisons",
      "Failure and rollback rates",
    ],
    caption: "Atlas Travel · Failure reasons and OS diagnostics",
  },
];

export default function AnalyticsSection() {
  const [selected, setSelected] = useState(0);
  const view = views[selected];
  return (
    <section
      id="analytics"
      className="analytics-section cresc-analytics"
      aria-labelledby="analytics-heading"
    >
      <div className="analytics-container">
        <header className="analytics-heading">
          <div>
            <p className="analytics-eyebrow">Release intelligence</p>
            <h2 id="analytics-heading">
              See what happens
              <br />
              after you ship.
            </h2>
          </div>
          <div className="analytics-intro">
            <p>
              Did your update reach users? Did it activate? Where did it fail?
              Follow each release from delivery to adoption, with the detail to
              decide what comes next.
            </p>
            <a href="/docs/analytics">
              Read the analytics guide <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>
        <div
          className="analytics-picker"
          role="group"
          aria-label="Choose an analytics view"
        >
          {views.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === index}
              aria-controls="analytics-preview"
              onClick={() => setSelected(index)}
            >
              <span className="analytics-index" aria-hidden="true">
                0{index + 1}
              </span>
              {item.label}
              <span className="analytics-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
        <div id="analytics-preview" className="analytics-preview">
          <div className="analytics-context" aria-live="polite">
            <div>
              <p className="analytics-eyebrow">0{selected + 1} / 04</p>
              <h3>{view.title}</h3>
              <p>{view.body}</p>
            </div>
            <ul>
              {view.details.map((detail) => (
                <li key={detail}>
                  <span aria-hidden="true">＋</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
          <figure>
            <div className="analytics-frame-bar">
              <span className="analytics-dot" aria-hidden="true" />
              <span>Cresc / {view.caption}</span>
              <a
                href={`/images/analytics/${view.id}.webp`}
                target="_blank"
                rel="noreferrer"
                aria-label={`View original screenshot: ${view.caption}`}
              >
                View original screenshot <span aria-hidden="true">↗</span>
              </a>
            </div>
            <a
              className="analytics-image-link"
              href={`/images/analytics/${view.id}.webp`}
              target="_blank"
              rel="noreferrer"
              aria-label={`View original screenshot: ${view.caption}`}
            >
              <img
                key={view.id}
                src={`/images/analytics/${view.id}.webp`}
                alt={view.caption}
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
              />
            </a>
            <figcaption>
              <span>
                Real console screenshots · Fictional apps and sample data
              </span>
              <a href="https://admin.cresc.dev/#/realtime-metrics">
                Explore the console <span aria-hidden="true">→</span>
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

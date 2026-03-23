export const homeSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cresc",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "iOS, Android, HarmonyOS",
  url: "https://cresc.dev/",
  description:
    "React Native OTA updates with delta patches, rollback safety, CI/CD publishing, and migration support for CodePush or App Center.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Cresc pricing",
  url: "https://cresc.dev/pricing",
  description:
    "Pricing plans for Cresc React Native OTA updates, including free and paid tiers.",
};

export const codepushFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Cresc a replacement for CodePush after App Center retirement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Cresc covers the same core React Native OTA workflow while focusing on delta patches, rollback safety, CI/CD publishing, and self-hosting flexibility.",
      },
    },
    {
      "@type": "Question",
      name: "What changes still require a native release?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Changes under ios/ or android/, native dependency upgrades, and anything that requires recompilation still needs a new store build. JavaScript logic and bundled assets can be shipped through OTA.",
      },
    },
    {
      "@type": "Question",
      name: "Can teams migrate gradually?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Teams can integrate Cresc, upload their current baseline build, and move their next OTA release onto Cresc without redesigning the rest of the release process.",
      },
    },
  ],
};

export const expoComparisonSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When should I choose Cresc over Expo Updates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose Cresc when delta patch size, self-hosting flexibility, or migration from legacy OTA workflows matters more than staying entirely inside the Expo service model.",
      },
    },
    {
      "@type": "Question",
      name: "Can Cresc still work with Expo-based apps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Cresc documents an Expo integration path and is a fit for teams using Expo who want a different OTA workflow.",
      },
    },
  ],
};

export const reactNativeOtaSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a React Native OTA update?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A React Native OTA update ships JavaScript and supported assets to users without requiring a full app-store resubmission for every change.",
      },
    },
    {
      "@type": "Question",
      name: "What cannot be changed with OTA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Native code, native dependency changes, and any modification that requires recompilation still needs a new build distributed through the store or other native release channels.",
      },
    },
  ],
};

export const expoPricingSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Cresc cheaper than Expo at the entry tier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Expo Starter and Cresc Standard are both priced at 19 USD per month in the March 23, 2026 comparison. The bigger difference appears at production scale and in how usage overages are billed.",
      },
    },
    {
      "@type": "Question",
      name: "Why can Cresc be cheaper at scale?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cresc uses fixed monthly tiers with included CDN delivery, while Expo EAS Update uses plan pricing plus usage-based billing for monthly active users and edge bandwidth beyond plan limits.",
      },
    },
  ],
};

export const codepushChecklistSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "CodePush migration checklist for Cresc",
  step: [
    { "@type": "HowToStep", name: "Audit your current CodePush usage" },
    { "@type": "HowToStep", name: "Integrate Cresc in the app" },
    { "@type": "HowToStep", name: "Upload the exact production baseline build" },
    { "@type": "HowToStep", name: "Connect the release workflow" },
    { "@type": "HowToStep", name: "Run a staged OTA release" },
    { "@type": "HowToStep", name: "Validate rollback and monitoring" },
  ],
};

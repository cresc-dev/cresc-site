import { quotas } from "../components/pricing/quota";

const organization = {
  "@type": "Organization",
  "@id": "https://cresc.dev/#organization",
  name: "Cresc",
  alternateName: "Cresc React Native OTA",
  url: "https://cresc.dev/",
  logo: {
    "@type": "ImageObject",
    url: "https://cresc.dev/images/logo-512.png",
    width: 512,
    height: 512,
  },
  email: "hi@cresc.dev",
  sameAs: [
    "https://github.com/cresc-dev",
    "https://github.com/reactnativecn/react-native-update",
    "https://github.com/reactnativecn/react-native-update-cli",
    "https://www.npmjs.com/package/react-native-update",
    "https://www.npmjs.com/package/react-native-update-cli",
  ],
};

export const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": "https://cresc.dev/#website",
      name: "Cresc",
      alternateName: "Cresc React Native OTA",
      url: "https://cresc.dev/",
      publisher: { "@id": "https://cresc.dev/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Cresc",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "iOS, Android, HarmonyOS",
      url: "https://cresc.dev/",
      image: "https://cresc.dev/images/og-cover.png",
      description:
        "React Native OTA updates with delta patches, release risk monitoring, automatic protection, CI/CD publishing, and migration support for CodePush and Expo Updates.",
      publisher: { "@id": "https://cresc.dev/#organization" },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "0",
        highPrice: String(quotas.ultra.monthlyPrice),
        priceCurrency: "USD",
        offerCount: Object.keys(quotas).length,
        url: "https://cresc.dev/pricing",
      },
    },
  ],
};

export const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Cresc pricing",
  url: "https://cresc.dev/pricing",
  description:
    "Pricing plans for Cresc React Native OTA updates, including free and paid tiers.",
  itemListElement: Object.values(quotas).map((plan) => ({
    "@type": "Offer",
    name: `Cresc ${plan.title}`,
    description: `Up to ${plan.app} apps and ${plan.pv.toLocaleString("en-US")} daily update checks.`,
    price: String(plan.monthlyPrice),
    priceCurrency: "USD",
    url: "https://cresc.dev/pricing",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(plan.monthlyPrice),
      priceCurrency: "USD",
      unitCode: "MON",
    },
  })),
};

export const codepushChecklistSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "CodePush & Expo Updates migration checklist for Cresc",
  description:
    "Step-by-step checklist for migrating a React Native app from retired App Center CodePush or Expo EAS Update to Cresc.",
  step: [
    {
      "@type": "HowToStep",
      name: "Audit your current OTA workflow and costs",
      text: "Inventory apps, channels, release cadence, CI jobs, and current EAS Update MAU or bandwidth bills.",
    },
    {
      "@type": "HowToStep",
      name: "Integrate Cresc in the app",
      text: "Remove react-native-code-push or expo-updates, install react-native-update, configure the native bundle URL (automatic on Expo SDK 50+), and wrap the root component with UpdateProvider.",
    },
    {
      "@type": "HowToStep",
      name: "Upload the exact production baseline build",
      text: "Ship a native build with Cresc integrated and upload that exact IPA, APK, or AAB with cresc uploadIpa, uploadApk, or uploadAab.",
    },
    {
      "@type": "HowToStep",
      name: "Recreate the release workflow in CI",
      text: "Configure CRESC_API_TOKEN in CI and publish updates with cresc bundle targeting matching native package versions.",
    },
    {
      "@type": "HowToStep",
      name: "Test a real OTA release end to end",
      text: "Verify QR test previews or staged rollouts, delta patch download, version switching, and automatic rollback on failure.",
    },
    {
      "@type": "HowToStep",
      name: "Watch the first production rollout closely",
      text: "Monitor delivery, activation funnel, rollback rate, and symbolicated JS errors in the Cresc console.",
    },
    {
      "@type": "HowToStep",
      name: "Remove the old operational dependency",
      text: "Retire legacy CodePush or EAS Update keys, scripts, and subscriptions once production adoption is verified.",
    },
  ],
};


# CodePush migration checklist for Cresc

Use this checklist if your React Native team is moving away from CodePush or App Center and wants the cleanest path onto Cresc.

## 1. Audit your current OTA workflow

Write down:

- which apps still use CodePush or App Center
- which channels or rollout groups exist
- how often you publish JavaScript updates
- which CI jobs publish or promote releases today

## 2. Integrate Cresc in the app

- install the SDK
- wire the native bundle URL
- confirm a release build can boot with Cresc enabled

Start here: [Installation & Config](/docs/getting-started.md)

## 3. Upload the exact baseline build

Before publishing OTA patches, upload the exact APK or IPA that matches the build users actually install. Cresc uses that build as the baseline for later delta comparisons.

## 4. Recreate the release workflow

Move the old publishing path onto Cresc:

- CLI login or API token
- build artifact upload
- OTA package build
- release or promote step in CI

See: [Publishing Hot Updates](/docs/publish.md) and [API Token](/docs/api-token.md)

## 5. Test a real OTA release end to end

- publish a small JavaScript-only change
- verify the update prompt or silent strategy
- verify the switch version behavior
- verify rollback on failure

## 6. Watch the first production rollout closely

Track:

- update adoption
- rollback events
- app-open check behavior
- package size and release cadence

## 7. Remove the old operational dependency

Once Cresc is working in production:

- remove old OTA credentials from CI
- document the new workflow
- point engineers to the Cresc dashboard and docs

## Quick links

- [CodePush alternative](/codepush-alternative.md)
- [React Native OTA updates](/react-native-ota-updates.md)
- [Expo pricing vs Cresc](/expo-pricing-vs-cresc.md)

### Contact Us

- [Email hi@cresc.dev](mailto:hi@cresc.dev)
- [GitHub Discussions](https://github.com/reactnativecn/react-native-update/discussions)

### Terms & Policies

- [User Agreement](https://cresc.dev/policy/)
- [Privacy Policy](https://cresc.dev/policy/#privacy)

### Help & Support

- [FAQ](/docs/faq)
- [CodePush Alternative](/codepush-alternative)
- [CodePush Migration](/codepush-migration-checklist)
- [Expo Updates vs Cresc](/expo-updates-vs-cresc)
- [GitHub Issues](https://github.com/reactnativecn/react-native-update/issues)

### Links

- [React Native OTA Guide](/react-native-ota-updates)
- [Expo Pricing vs Cresc](/expo-pricing-vs-cresc)
- [llms.txt](/llms.txt)
- [llms-full.txt](/llms-full.txt)
- [React Native](https://reactnative.dev/)
- [ReactJS](https://react.dev/)

© 2026 CHARMLOT PTE. LTD.


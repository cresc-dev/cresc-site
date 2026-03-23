
# React Native OTA updates with Cresc

React Native OTA updates let teams ship JavaScript and bundled asset changes without waiting for a full app-store release every time. Cresc adds a release workflow around that model with delta patch delivery, rollback protection, and CI-friendly publishing.

## What an OTA update can change

- JavaScript business logic.
- UI logic implemented in JavaScript.
- Assets bundled through JavaScript imports or `require`.

## What still needs a native release

- Any file or behavior changed under `ios/` or `android/`.
- Native module additions, removals, or upgrades.
- App capabilities that only exist after recompilation.

## How Cresc handles OTA delivery

1. Your native app build becomes the baseline package.
2. Cresc compares later updates against that baseline.
3. Users download the smaller delta patch instead of a full repeated bundle.
4. If the release fails, rollback remains available.

## Why teams choose Cresc for OTA

- Smaller update payloads through delta patches.
- Faster release loops for JavaScript fixes.
- Rollback support when something goes wrong after release.
- CLI and dashboard workflows that fit engineering teams instead of marketing sites.
- A clear migration story for CodePush and App Center users.

## Best practices

- Keep a copy of the exact APK or IPA you upload as the baseline.
- Treat native changes and JavaScript changes as two separate release decisions.
- Test rollback behavior before relying on OTA for urgent fixes.
- Use CI/CD to make baseline upload and patch publishing repeatable.

## Next steps

- [Install Cresc](/docs/getting-started.md)
- [Integrate the SDK](/docs/integration.md)
- [Publish an update](/docs/publish.md)
- [Compare pricing](/pricing.md)

## FAQ

### What is a React Native OTA update?

It is an update to JavaScript and supported assets that the app can fetch after installation, without requiring a full native store submission for every change.

### Can OTA replace native releases forever?

No. Native code and native dependency changes still require a normal build and distribution cycle.

### Why use Cresc instead of rolling my own?

Cresc gives you the release workflow around OTA updates: baseline upload, delta patch generation, rollout control, rollback behavior, and CI-friendly tooling.

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


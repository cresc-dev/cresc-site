
# Cresc as a CodePush and App Center alternative

If your React Native team still needs over-the-air updates after App Center's retirement, Cresc is the practical replacement path: keep the OTA workflow, move to smaller delta patches, and keep rollback and CI/CD automation in reach.

## Why teams look for a replacement

- App Center and CodePush are no longer the long-term path for React Native OTA workflows.
- Teams still need to fix JavaScript bugs quickly without waiting for full store review cycles.
- Full-bundle update systems often waste bandwidth compared with delta delivery.
- Release engineers still need CI-friendly publishing, rollback behavior, and auditability.

## What Cresc gives you

- Delta OTA updates instead of shipping the full bundle on every change.
- Rollback support when a release fails after download.
- CLI and dashboard flows that fit existing CI/CD release pipelines.
- Self-host-friendly architecture for teams that want more control.
- Support across React Native, Expo-based workflows, Hermes, and Harmony integrations.

## Cresc vs legacy CodePush and App Center

| Capability                       | Cresc | Legacy CodePush / App Center          |
| -------------------------------- | ----- | ------------------------------------- |
| OTA updates for React Native     | Yes   | Historically yes                      |
| Delta patch delivery             | Yes   | Limited / older workflow expectations |
| Active migration path today      | Yes   | No                                    |
| Self-host friendly               | Yes   | No practical long-term path           |
| CLI + dashboard publishing       | Yes   | Yes                                   |
| Rollback support                 | Yes   | Yes                                   |
| Harmony-focused workflow support | Yes   | No                                    |

## Migration path in four steps

1. Install the Cresc CLI and integrate the SDK into your app.
2. Upload the production APK or IPA that matches the build users actually have installed.
3. Connect the app in your CI or release workflow.
4. Publish the next JavaScript update through Cresc and validate rollback plus adoption behavior.

Start here:

- [Installation and configuration](/docs/getting-started.md)
- [Code integration](/docs/integration.md)
- [Publishing hot updates](/docs/publish.md)

## Who should choose Cresc

Choose Cresc if your team needs at least one of these:

- A CodePush replacement that is still actively maintained.
- Smaller OTA downloads than full-bundle update systems.
- More control over hosting, observability, and release mechanics.
- A migration path that keeps your existing React Native release workflow recognizable.

## FAQ

### Is Cresc a direct replacement for CodePush?

Yes for the core OTA use case. You still upload a native baseline, publish JavaScript updates, and control rollout behavior, but Cresc is built around its own SDK, CLI, and dashboard instead of the old App Center service.

### What still requires a native release?

Native code changes, native dependency changes, and anything that modifies files under `ios/` or `android/` still requires a new compiled build. JavaScript and bundled assets are good OTA candidates.

### Can I migrate without redoing the whole app?

Usually yes. The migration work is mostly SDK integration, baseline upload, and release-process updates. The app does not need a full architecture rewrite.

### Where should I start?

If you want the fastest route, go to [Getting Started](/docs/getting-started.md) and [register a Cresc account](https://admin.cresc.dev/#/register).

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


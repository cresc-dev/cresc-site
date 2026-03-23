
React Native OTA Updates

# React Native OTA updates with smaller patches and safer rollouts.

Cresc is a CodePush and App Center alternative for teams that need delta patches, rollback protection, CI-friendly publishing, and a clear path across React Native, Expo, Hermes, and Harmony builds.

[Start Free](https://admin.cresc.dev/#/register)[Migrate From CodePush](/codepush-alternative)[Open-source on GitHub](https://github.com/reactnativecn/react-native-update)Delta patchesSelf-host friendlyApp Center migrationNamed for crescendo

![Cresc Logo](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4IiBoZWlnaHQ9IjEwOCIgdmlld0JveD0iMCAwIDEwOCAxMDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImNyZXNjX3N0cm9rZSIgeDE9IjE2IiB5MT0iMTgiIHgyPSI5MCIgeTI9IjkwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNEN0I1N0MiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjU1IiBzdG9wLWNvbG9yPSIjQTg2QTQyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzZFMzQyOCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iY3Jlc2NfcGVhcmwiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoODQgNTApIHJvdGF0ZSg1Ni4zMSkgc2NhbGUoMTguNjAxMSkiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRkZGREY5Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC41NiIgc3RvcC1jb2xvcj0iI0YwRTFDQSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNDN0EwNzIiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoCiAgICBkPSJNIDg4IDI1IEEgNDAgNDAgMCAxIDAgODggODMiCiAgICBzdHJva2U9InVybCgjY3Jlc2Nfc3Ryb2tlKSIKICAgIHN0cm9rZS13aWR0aD0iMTgiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICA8cGF0aAogICAgZD0iTSA4NiAzMSBBIDMyIDMyIDAgMSAwIDg2IDc3IgogICAgc3Ryb2tlPSIjRjRFNkNEIgogICAgc3Ryb2tlLW9wYWNpdHk9IjAuMjgiCiAgICBzdHJva2Utd2lkdGg9IjQiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICA8Y2lyY2xlIGN4PSI4OCIgY3k9IjU0IiByPSIxMCIgZmlsbD0idXJsKCNjcmVzY19wZWFybCkiIHN0cm9rZT0iI0I2ODY1NyIgc3Ryb2tlLXdpZHRoPSIxLjYiIC8+CiAgPGNpcmNsZSBjeD0iODQuMiIgY3k9IjQ5LjMiIHI9IjIuOCIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1vcGFjaXR5PSIwLjg4IiAvPgo8L3N2Zz4K)## Built for release teams that need OTA updates to stay boring.

The native build becomes the baseline. Every later React Native update ships only the changed business logic, keeping downloads smaller and emergency fixes much faster.

CodePush replacement, without the dead end

Cresc keeps the original release as the base and turns later OTA releases into measured diffs instead of full-bundle repeats.

Incremental Delivery

## React Native OTA updates should ship the delta, not the whole bundle.

Cresc keeps the installed build as the base, then carries only the missing JavaScript and asset changes into place locally.

![](/images/girl-with-pearl-earring.webp)App Updated!Movement I

### Hold the full base

The first native release stays on device as the baseline, so later React Native OTA patches can remain much smaller.

Movement II

### Drop only the new pearl

When something changes, Cresc ships only the delta instead of repeating the whole JavaScript bundle.

Movement III

### Set it in place locally

The client applies the patch against the installed baseline and confirms the update in place.

In Practice

## Ship React Native OTA updates in three steps.

Install the CLI, upload the baseline build, and publish the next delta update through the dashboard or CI whenever the app changes.

I### Install the CLI

Connect your project to the publishing workflow with the Cresc command-line tool.

II### Upload the baseline package

Give Cresc the native build it compares against before later updates are published.

III### Publish the update

Bundle JavaScript and assets, then release the update through the dashboard or your CI flow.

first releaseproduction lanerelease@studio~/crescendo-app$Once the baseline is uploaded, the dashboard and CLI can handle the rest of the OTA release cycle with much less effort.

[Open Dashboard](https://admin.cresc.dev)[View Docs](/docs/getting-started)Search Paths

## Start from the question your team already has.

Cresc is easiest to evaluate when the page matches the rollout or migration problem you are solving right now. Pick the path that fits your release workflow.

Migration

### Replacing CodePush or App Center

See the migration path, rollout model, and why Cresc fits React Native teams that still need OTA updates after App Center's retirement.

[Open Migration Guide](/codepush-alternative)Comparison

### Expo Updates vs Cresc

Compare bundle size, delta delivery, self-hosting flexibility, and when each workflow makes sense.

[Compare Options](/expo-updates-vs-cresc)Overview

### React Native OTA updates

Get the practical overview: what OTA updates can change, what still needs a native release, and how Cresc fits the release pipeline.

[Read The Guide](/react-native-ota-updates)### Contact Us

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


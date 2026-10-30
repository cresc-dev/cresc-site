---
title: Changelog
seoTitle: "react-native-update Changelog: Cresc SDK & CLI Releases"
description: "Release history of react-native-update, the Cresc React Native OTA SDK, and its CLI: new features, platform support, behavior changes and upgrade notes."
---

# Changelog

Notable releases of the Cresc client SDK ([`react-native-update`](https://github.com/reactnativecn/react-native-update/releases)) and CLI ([`react-native-update-cli`](https://github.com/reactnativecn/react-native-update-cli/releases)). Full notes for every version, including fixes not listed here, are on GitHub Releases.

:::tip Upgrading the SDK
The SDK contains native code. After upgrading `react-native-update`, rebuild your app (run `pod install` on iOS) and [upload the new native package](/docs/publish#publishing-native-baseline-version) before publishing OTA updates against it.
:::

## SDK: react-native-update

### v10.62.1 (2026-10-19)

- Ships compiled type declarations (`lib/typescript/*.d.ts`) instead of TypeScript sources, so your app's `tsc` no longer type-checks the SDK and `skipLibCheck` works again. JS only.

### v10.62.0 (2026-10-18)

- One on-disk state format shared by Android, iOS and HarmonyOS, with a one-time, resumable migration from the old layout on first launch. The device uuid (and so its gradual-rollout bucket) is kept.
- iOS stores update state in its own `NSUserDefaults` suites, so clearing the app's standard defaults (common on logout) no longer wipes update state.

### v10.61.0 (2026-10-17)

- `prepareBundle` on Android and HarmonyOS accepts a timeout.
- The native cold-start flow runs on an IO-free C++ engine.
- Activation, persistence and error codes are unified across the three platforms.

### v10.60.0 (2026-10-13)

- `bundleSha256` is required in install records.
- Fixes Expo detection on Android inside pnpm workspaces.

### v10.59.0 (2026-09-28)

- **Breaking for native host code**: native host APIs are renamed (`PushyRuntime`, `prepareBundle` and related). The old names have no aliases; see [Native Configuration and Updates](/docs/native-api).
- Sources are type-checked against React Native 0.87.

### v10.58.0 (2026-09-26)

- Apple TV support via react-native-tvos.
- The pod's deployment target follows React Native's.

### v10.57.0 (2026-09-19)

- Native configuration and update-check APIs on Android, iOS and HarmonyOS ([Native Configuration and Updates](/docs/native-api)).
- Expo SDK 57 support. v10.57.1 fixes builds with Xcode 27.

### v10.56.0 (2026-09-04)

- Audit fixes across the JS, Android, iOS, HarmonyOS and C++ layers.
- Fixes restart after `switchVersion` on iOS with `use_frameworks!` or bridgeless mode.

### v10.55.0 (2026-08-31)

- [JS error reporting](/docs/errors).

### v10.54.0 (2026-08-30)

- Security hardening.

### v10.53.0 (2026-08-20)

- Android APK installs use `PackageInstaller`.
- Types for newer React Native versions.

### v10.51.0 – v10.52.x (2026-08-12)

- Native cold-start update check, crash-moment rescue on Android and iOS, and resumable downloads.

### v10.50.0 (2026-08-03)

- Patch copy sources are verified by CRC on all platforms.

### v10.49.0 (2026-07-30)

- Computes and reports a bundle hash.
- Fixes builds on React Native below 0.68.

### v10.48.0 (2026-07-08)

- `resetToPackagedBundle` on all platforms.
- Client support for the Hermes bytecode transform and HDIFF13 streaming patches, which make one-line fixes ship in a few KB.
- **Breaking for custom servers**: the capability field changes from `hbcT=1` to `diffV=2`.

### v10.47.0 (2026-07-07)

- Reports update lifecycle events to the update server.

### v10.45.0 (2026-07-05)

- Fixes lost progress events in Android bridgeless mode.
- Timeouts can abort fetches.
- Locking around iOS state access.

### v10.44.0 (2026-07-04)

- HarmonyOS patch application and cleanup move off the UI thread.

### v10.43.0 (2026-07-02)

- Download progress percentage and download retries.
- A `beforeReload` hook.
- HarmonyOS fixes, including RNOH 0.72 and 0.77+ support and an in-memory soft reload.

### v10.41.0 (2026-06-09)

- Android matches AAB package resources by CRC32 content.

### v10.40.0 (2026-04-24)

- Bundle hash to identify the built-in bundle's content.

### v10.38.0 (2026-03-24)

- A shared C++ patch core for all three platforms.
- HarmonyOS ships as a prebuilt HAR.
- Non-numeric version names.

### Earlier

- **v10.35.0** (2025-10-24): Expo SDK 54. **v10.31.0** (2025-09-17): React Native 0.81 on Android, `currentVersionInfo`, and a single download across multiple versions. **v10.30.0** (2025-08-28): Expo SDK 53.
- **v10.19.3** (2024-12): first HarmonyOS support ([HarmonyOS guide](/docs/harmony)).
- **v9.0.0** (2023-09-02): React Native New Architecture (TurboModules) support.

## CLI: react-native-update-cli

### v2.29.x (2026-10)

- Hermes bytecode v99 (React Native 0.88).
- Large files upload in parallel chunks.
- `parse*` commands print JSON.

### v2.24.0 (2026-08-31)

- Global installs update themselves in the background.

### v2.23.0 (2026-08-30)

- Source maps are archived on publish, with a new `symbolicate` command; `--sourcemap` is on by default.

### v2.22.0 (2026-08-21)

- Hermes delta mode: fetches the base bytecode from the server, caches it by sha256 and verifies by disassembly.

### v2.20.0 – v2.21.0 (2026-07)

- Uploads slimmed native packages.
- Records the bundle hash when uploading native packages.

### v2.17.0 – v2.18.0 (2026-07-08)

- Hermes bytecode transform for smaller patches.
- Global `--config`, `--appId` and `--appKey` options.
- Large bundles prefer streaming single-format diffs.

### v2.15.0 (2026-06-09)

- Batch bind and batch delete.

### v2.11.0 (2026-05-13)

- React Native 0.85.

### v2.7.0 (2026-01-17)

- [API key](/docs/api-token) authentication for CI.

### v2.2.0 – v2.6.0 (2025-09 – 2026-01)

- Android AAB native packages.
- `install` and `deleteVersion` commands.

### v2.0.0 (2025-07-30)

- Modular rewrite.

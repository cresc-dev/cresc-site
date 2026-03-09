# FAQ

If this page does not answer your question, open a thread in [GitHub Discussions](https://github.com/reactnativecn/react-native-update/discussions), report a bug in [GitHub Issues](https://github.com/reactnativecn/react-native-update/issues), or email us at [hi@cresc.dev](mailto:hi@cresc.dev).

### Business Questions

#### Can hot-updated apps pass App Store reviews?

You might have heard mixed information, but extensive practical experience shows that hot updates currently successfully pass App Store and other app market reviews. The only caveat: **do not publish hot updates while your app is under review**, and ensure reviewers do not see update pop-ups or download prompts. If you follow this rule, you will pass smoothly.

***

#### Does Cresc support global deployments?

Yes. Cresc is designed for globally distributed apps and delivers updates through international CDN routing.

***

#### What can be hot updated? What cannot?

App modifications fall into two categories:

- **Cannot be hot-updated** — Native modifications, i.e., changes requiring compilation to take effect:
  - Any modifications, additions, or deletions inside the `ios/` or `android/` folders.
  - Updating or modifying third-party native modules.
- **Can be hot-updated** — Non-native modifications, i.e., changes requiring no compilation that take effect upon reload:
  - JS code modifications, including pure-JS third-party libraries.
  - Assets that can be `require/import`ed within JS code, such as images.

_Note: Even though assets can be hot updated, downloaded update assets are served via the `file://` protocol. Certain third-party modules might not support reading from `file://` URIs._

***

#### The update downloads successfully, but after restarting it rolls back. What happened?

If an update succeeds but rolls back on reboot, it usually means one of two things:

- You didn't correctly [configure bundleUrl](/docs/getting-started.md#configuring-bundle-url) during setup.
- (Only on Cresc v9 or lower) You didn't correctly call `markSuccess()`. In v10+, the SDK handles this automatically.

If you are absolutely sure both steps were executed perfectly, please leave us feedback in our [Issues section](https://github.com/reactnativecn/react-native-update/issues).

***

#### Error: "Hot update paused, reason: Build timestamp mismatch."

Every time you compile a native package, a timestamp (`buildTime`) is injected into it (viewable using `cresc parseIpa` or `cresc parseApk`). If you distribute this package to users and want them to receive OTA updates, you must first upload the native package to the Cresc server. The server records this version number and build time for subsequent comparisons.

For example, suppose I compile and upload `v1.0` (`Package 1A`). Later, for some reason, I rebuild without changing the version string (`Package 1B`), but I don't upload it. These two packages have the same version string but different build timestamps. Three scenarios might follow:

1. I forgot I uploaded `1A`, `1B` has no actual changes, and no users have installed it yet. Throw away `1B` and let users install `1A`.
2. I distributed `1B` to some users without uploading it. Users on `1A` get updates, while `1B` users get paused updates due to a mismatch. To fix this, you either force `1B` users to reinstall `1A`, or publish a strictly higher version string (e.g. `1.1`), upload it to Cresc, and delete `v1.0` records. This causes both groups to receive a mandatory native upgrade prompt.
3. I know I uploaded `1A`, but I made native changes and built `1B`. Uploading `1B` now triggers a version conflict because `1.0` already exists. Therefore, you must **increment the native version**, **upload** it to the server first, and **then** distribute it to users.

Remember: Whenever compiling native releases: 1) increment the version string, 2) upload to Cresc servers. Only then can OTA updates function normally.

:::info
If you use the `Premium` tier or above, you can enable `"Ignore Build Timestamp"` in the dashboard's App Settings. This ignores timestamp comparisons entirely, checking only the version string. It opens more tolerant update flows for teams managing many distribution channels, though it may consume extra traffic bandwidth.
:::

***

### Billing Questions

#### Which plan should I choose?

Start with `Free` if you want to verify the workflow end to end. Choose `Standard` or `Premium` for smaller production apps, and move to `Pro`, `Max`, or `Ultra` as your daily checks, package counts, and app count grow.

`Ignore Build Timestamp` is currently available on `Premium` and higher tiers.

***

#### Can I trial a paid version first to evaluate its effectiveness?

If you need evaluation capacity beyond the published quotas, email [hi@cresc.dev](mailto:hi@cresc.dev) with your expected app count, daily checks, and rollout timeline.

***

#### How are quotas calculated specifically?

Quotas measure four domains:

1. Number of creatable Apps (iOS and Android count separately).
2. Number and size of Native Packages (Calculated per app). Native packages refer to the baseline APK/IPA uploaded by `cresc uploadIpa/uploadApk`.
3. Number and size of Update Packages (Calculated per app). Update packages refer to `.ppk` binaries generated via `cresc bundle`. _Note: this is not what users download. Users download incremental diffs, which are vastly smaller._
4. Total Daily Update Check Quota (Aggregated across ALL apps under your account). The system increments this metric every time a user opens your app and polls checking for updates. If this limit is exceeded during the day, the API stops returning updates until resetting at midnight.

> Refer to [Best Practices](/docs/bestpractice.md#optimizing-native-and-hot-update-package-size) for advice on mitigating limits safely.

Limits #2 and #3 apply to individual applications independently, while #4 aggregates under the account total. See our [Pricing Table](/pricing.md) for authoritative info subject to operational variations. Locked-in accounts avoid fluctuating costs upon timely renewal.

***

#### If I hit my quota, does the system break?

If you hit application, Native Package, or Update Package caps, you will be blocked from new creating/uploading actions. However, existing end-users will still request and download existing patches normally without any interruption. You must either upgrade your tier, or prune old apps/packages to free up storage slots.
If Native/Update sizes exceed MB limit metrics, the upload will fail. Upgrade your tier, or practice strict asset [Optimization](/docs/bestpractice.md#optimizing-native-and-hot-update-package-size).
If Total Daily Checks hit their cap, the API refuses queries and returns an empty payload response, leaving apps stuck on previous states until midnight resets quotas. Either upgrade tiers or adjust built-in update schedules.

***

#### Can I upgrade just a single limit item independently?

If you only need to raise one specific limit without moving to the next public tier, email [hi@cresc.dev](mailto:hi@cresc.dev) with your required limits and expected traffic profile.

***

#### After a paid plan expires unrenewed, do my existing apps continue functioning?

After expiration, accounts degrade automatically into the Free Plan tier limitations. If preexisting data exceeds free caps, you won't be authorized to launch new updates or bind properties unless excess data is wiped out down below threshold limits. Users holding old patches won't mysteriously lose access, however.

***

#### How do I receive dedicated human technical support?

For product questions and implementation guidance, use [GitHub Discussions](https://github.com/reactnativecn/react-native-update/discussions). For bug reports, use [GitHub Issues](https://github.com/reactnativecn/react-native-update/issues). For billing, account, or private support requests, email [hi@cresc.dev](mailto:hi@cresc.dev).

***

#### Do you offer higher-volume enterprise plans?

Yes. If your traffic profile goes beyond `Ultra`, or you need tailored limits, rollout controls, or onboarding help, email [hi@cresc.dev](mailto:hi@cresc.dev) with your expected daily checks and app footprint.

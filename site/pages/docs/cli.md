---
order: 12
title: CLI Tools (Built-in)
type: Guide
---

### Installation

```bash
$ npm install -g react-native-update-cli
```

### Commands

#### cresc bundle

Generates a hot update resource package (ppk). Automatically detects if frameworks like Expo or Taro are used and runs their packagers respectively. If detection is inaccurate or errors occur, try using `--rncli` to specify the official React Native CLI.

- `platform`: `ios|android|harmony` The target platform.
- `entryFile`: The entry script file.
- `intermediaDir`: Temporary file output directory.
- `output`: Final ppk file output path.
- `dev`: Whether to bundle a dev version.
- `sourcemap`: Whether to generate sourcemaps (requires CLI v1.11.0+).
- `no-interactive`: Disable interactive prompts.
- `rncli`: Force use of official RN CLI for bundling (requires CLI v1.40.0+).
- `expo`: Force use of Expo CLI for bundling (requires CLI v1.40.0+).
- `taro`: Force use of Taro CLI for bundling (requires CLI v1.40.0+).

Since v1.44.2, direct publishing arguments have been added (equivalent to calling `cresc publish` right after bundling finishes):

- `name`: Target name for the hot update version (its own version number).
- `description`: Update description/changelog shown to users.
- `metaInfo`: Custom meta info for saving arbitrary state data. Refer to [Best Practices](bestpractice#using-meta-info).

Since v1.46.1, alongside passing `name`, `description`, and `metaInfo`, you can stack the following arguments (equivalent to calling `cresc update` right after publishing):

- `packageId`: The target native package ID to bind to (Choose one).
- `packageVersion`: The target native package version to bind to (Choose one).
- `minPackageVersion`: Minimum target native package version. Applies to all inclusive versions above it (Choose one).
- `maxPackageVersion`: Maximum target native package version. Applies to all inclusive versions below it (Choose one).
- `packageVersionRange`: Target native package version range (Choose one). Range format strictly follows Semantic Versioning (semver). See <https://devhints.io/semver>.

Example:

```bash
cresc bundle --platform android --name "1.0.0" --description "Hot update version 1.0.0" --metaInfo '{"key": "value"}' --packageVersionRange ">=1.0 <3.0"
```

---

#### cresc parseIpa [ipaFile]

Parses an `.ipa` file and outputs associated data like version codes and build timestamps.

---

#### cresc parseApk [apkFile]

Parses an `.apk` file and outputs associated data like version codes and build timestamps.

---

#### cresc parseApp [appFile]

Parses an `.app` file and outputs associated data like version codes and build timestamps.

---

#### cresc parseAab [aabFile]

Parses an `.aab` file and outputs associated data like version codes and build timestamps.

---

#### cresc diff [origin][next]

Provide two `.ppk` files to generate a delta differential hot update package from the origin to next versions.

- `output`: Diff file output path.

---

#### cresc diffFromApk [apkFile][next]

Provide an `.apk` file and a `.ppk` file to generate a diff update package from the `.apk` baseline to the next version.

No need to run this manually if you use the managed platform.

- `output`: Diff file output path.

---

#### cresc diffFromApp [appFile][next]

Provide an `.app` file and a `.ppk` file to generate a diff update package.

No need to run this manually if you use the managed platform.

- `output`: Diff file output path.

---

#### cresc diffFromIpa [ipaFile][next]

Provide an `.ipa` file and a `.ppk` file to generate a diff update package.

No need to run this manually if you use the managed platform.

- `output`: Diff file output path.

---

#### cresc login [email][pwd]

Logs into the hot update platform. You must authenticate to execute most subsequent commands.

---

#### cresc logout

Logs out and clears local session cache.

---

#### cresc me

Checks if you are currently logged in, and displays account details.

---

#### cresc createApp

Creates a new remote app and instantly binds it to the current project directory. This action can also be completed via the web dashboard.

- `platform`: `ios|android|harmony` The target platform.
- `name`: The application name.
- `downloadUrl`: The remote URL where users go to download native package upgrades.

---

#### cresc deleteApp [appId]

Deletes an existing app entirely. All related native packages and hot versions will be permanently wiped. This action can also be completed via the web dashboard.

- `appId`: The App ID to delete.

---

#### cresc apps

List all established apps in your account. This action can also be completed via the web dashboard.

- `platform`: `ios|android|harmony` The target platform filter.

---

#### cresc selectApp [appId]

Locally binds an existing app configuration to the current project folder.

- `platform`: `ios|android|harmony` The target platform.

---

#### cresc uploadIpa [ipaFile]

Uploads an `.ipa` to the managed platform. (Requires CLI 1.24.0+)

---

#### cresc uploadApk [apkFile]

Uploads an `.apk` to the managed platform. (Requires CLI 1.24.0+)

---

#### cresc uploadApp [appFile]

Uploads an `.app` to the managed platform. (Requires CLI 1.24.0+)

---

#### cresc uploadAab [aabFile]

Uploads an `.aab` to the managed platform. (Requires CLI 2.6.0+)

---

#### cresc extractApk [aabFile]

Extracts an `.apk` file from an `.aab` build envelope. (Requires CLI 2.6.0+)

---

#### cresc packages

View all natively uploaded packages. This action can also be completed via the web dashboard.

- `platform`: `ios|android|harmony` The target platform filter.

---

#### cresc deletePackage

Delete an uploaded native package baseline.

- `appId`: The App ID that the native package belongs to.
- `packageId`: The target Package ID to delete.

---

#### cresc publish [ppkFile]

Uploads and publishes a new hot update package (`.ppk` file).

- `platform`: `ios|android|harmony`
- `name`: Target name for the hot update version (its own version code).
- `description`: Update description/changelog shown to users.
- `metaInfo`: Custom meta info payload. Refer to [Best Practices](bestpractice#using-meta-info).

Since v1.46.1, alongside publishing, you can stack the following arguments (equivalent to calling `cresc update` right after publishing):

- `packageId`: The target native package ID to bind to (Choose one).
- `packageVersion`: The target native package version to bind to (Choose one).
- `minPackageVersion`: Minimum target native package version. Applies to all inclusive versions above it (Choose one).
- `maxPackageVersion`: Maximum target native package version. Applies to all inclusive versions below it (Choose one).
- `packageVersionRange`: Target native package version range (Choose one). Range format strictly follows Semantic Versioning (semver). See <https://devhints.io/semver>.

Example:

```bash
cresc publish .cresc/output/android.1750423283653.ppk --platform android --name "1.0.0" --description "Hot update 1.0.0" --metaInfo '{"key": "value"}' --packageVersionRange ">=1.0 <3.0"
```

---

#### cresc versions

Paginates and lists available hot update versions. This action can also be completed via the web dashboard.

- `platform`: `ios|android|harmony`

---

#### cresc deleteVersion

Delete a specific published hot update version.

- `appId`: The App ID the target hot update version belongs to.
- `versionId`: The Target update Version ID to delete.

---

#### cresc update

Binds and applies an active hot update version to a native package baseline. This action can also be completed via the web dashboard. You must supply one of the package scope args: `packageId`, `packageVersion`, `minPackageVersion`, `maxPackageVersion`, or `packageVersionRange`.

From CLI v2.4.0 onward, a full rollout and a canary rollout can coexist simultaneously. Prior to 2.4.0 they overwrote each other depending on which was set last.

- `platform`: `ios|android|harmony`
- `versionId`: The Version ID of the hot update.
- `rollout`: Phased canary rollout percentage (Int between 1 - 100). Default is 100 (Requires CLI v1.31.0+).
- `dryRun`: Dry run preview only, prevents applying actual bindings (Requires CLI v1.45.4+).
- `packageId`: Target bind native package ID (Choose one).
- `packageVersion`: Target bind native package version string (Choose one, CLI v1.7.2+).
- `minPackageVersion`: Target minimum native package version (Choose one, CLI v1.27.0+).
- `maxPackageVersion`: Target maximum native package version (Choose one, CLI v1.27.0+).
- `packageVersionRange`: Target semantic version range string (Choose one, CLI v1.45.4+). Format follows SemVer.

Example:

```bash
❯ cresc update --versionId 211343 --platform android --packageVersionRange ">=1.0 <3.0" --dryRun
react-native-update-cli: 1.45.4 (Latest: 1.45.4)
react-native-update: 10.28.11 (Latest: 10.28.11)
The following is a dry-run simulation and no destructive changes will occur:
Successfully bound update 211343 to native baseline 1.28.1 (id: 75219)
Successfully bound update 211343 to native baseline 1.28 (id: 75184)
Successfully bound update 211343 to native baseline 1.5 (id: 73396)
Successfully bound update 211343 to native baseline 2.0 (id: 68219)
Successfully bound update 211343 to native baseline 1.0 (id: 68158)
Operation complete, 5 active native packages bound.
```

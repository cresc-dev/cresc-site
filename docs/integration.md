# Code Integration

Once installation and native configuration are complete, the next step is wiring Cresc into your app code.

### Retrieve your `appKey`
Each platform uses its own `appKey`. The value is stored in `update.json`, which is created by `cresc createApp` or `cresc selectApp`.
```javascript
import { Platform } from "react-native";

import _updateConfig from "./update.json";

const { appKey } = _updateConfig[Platform.OS];
```
You can also find the `appKey` in the Cresc dashboard.
### Initialize the client
```js
import { UpdateProvider, Cresc } from "react-native-update";

const crescClient = new Cresc({
  appKey,
  // Updates are skipped in development by default.
  // Set debug: true if you want to test update checks in development.
  // Applying the patch still requires a release build.
  // debug: true,
});

export default function Root() {
  return (
    <UpdateProvider client={crescClient}>
      <App />
    </UpdateProvider>
  );
}
```
After this, the default OTA flow already works. Cresc can check for updates and show the built-in alert flow automatically.
### Choose your check strategy
`checkStrategy` controls **when** Cresc checks for updates:
- `"both"`: Check on cold start and when the app returns from background.
- `"onAppStart"`: Check only on cold start.
- `"onAppResume"`: Check only when resuming from background.
- `null`: Disable automatic checks and call `checkUpdate()` yourself.
```js
const crescClient = new Cresc({
  appKey,
  checkStrategy: "onAppStart",
});
```
### Choose your update strategy
`updateStrategy` controls **how** Cresc handles an available update:
- `"alwaysAlert"`: Always show the default update alert flow.
- `"alertUpdateAndIgnoreError"`: Show the default alert flow and ignore download errors in the UI.
- `"silentAndNow"`: Download silently and switch immediately after the update is ready.
- `"silentAndLater"`: Download silently and apply on a later restart.
- `null`: Disable the built-in UI so you can build the full experience yourself.
```js
const crescClient = new Cresc({
  appKey,
  updateStrategy: "silentAndLater",
});
```
### Build a custom update UI
If you want full control over the UI, disable the built-in update strategy and use `useUpdate()`:
```js
const crescClient = new Cresc({
  appKey,
  updateStrategy: null,
  debug: true,
});
```
Example:
```js
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Banner, Icon, Snackbar } from "react-native-paper";
import { useUpdate } from "react-native-update";

function App() {
  const {
    checkUpdate,
    downloadUpdate,
    switchVersionLater,
    switchVersion,
    updateInfo,
    progress: { received, total } = {},
  } = useUpdate();

  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [showUpdateSnackbar, setShowUpdateSnackbar] = useState(false);
  const snackbarVisible = showUpdateSnackbar && updateInfo?.update;

  return (
    <View style={styles.container}>
      <Text>
        Download progress: {received} / {total}
      </Text>

      <TouchableOpacity
        onPress={() => {
          checkUpdate();
          setShowUpdateSnackbar(true);
        }}
      >
        <Text>Check for updates</Text>
      </TouchableOpacity>

      {snackbarVisible && (
        <Snackbar
          visible={true}
          onDismiss={() => {
            setShowUpdateSnackbar(false);
          }}
          action={{
            label: "Update",
            onPress: async () => {
              setShowUpdateSnackbar(false);
              if (await downloadUpdate()) {
                setShowUpdateBanner(true);
              }
            },
          }}
        >
          <Text>Update {updateInfo.name} is available.</Text>
        </Snackbar>
      )}

      <Banner
        style={{ width: "100%", position: "absolute", top: 0 }}
        visible={showUpdateBanner}
        actions={[
          {
            label: "Restart now",
            onPress: switchVersion,
          },
          {
            label: "Later",
            onPress: () => {
              switchVersionLater();
              setShowUpdateBanner(false);
            },
          },
        ]}
        icon={({ size }) => (
          <Icon name="checkcircleo" size={size} color="#00f" />
        )}
      >
        The update has finished downloading.
      </Banner>
    </View>
  );
}
```
### Understand the `updateInfo` states
After `checkUpdate()`, Cresc exposes state through `useUpdate()`:
1. `{ expired: true }`: The installed native baseline is no longer valid. Prompt the user to install a newer native build if needed.
2. `{ upToDate: true }`: No OTA update is currently available.
3. `{ update: true }`: An OTA update is available. Use `name`, `description`, `metaInfo`, and the download flow to drive your UI.
When `updateInfo.update` is true, call `downloadUpdate()` and wait for it to resolve before assuming the patch is ready. The `progress` fields are useful for UI, but the promise result is the reliable completion signal.
### Forward OTA analytics into your own tools
Use the `logger` option if you want to pipe update events into your analytics system:
```ts
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

const crescClient = new Cresc({
  appKey,
  logger: ({ type, data }) => {
    logEvent(analytics, "cresc_" + type, data);
  },
});
```
### Continue
- [API reference](/docs/api.md)
- [Best practices](/docs/bestpractice.md)
- [Publishing hot updates](/docs/publish.md)

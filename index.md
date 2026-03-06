Cresc OTA

# A steadier cadence for React Native updates.

Named for the gradual rise in music, Cresc treats over-the-air publishing the same way: smaller packages, deliberate rollout, and recovery kept within reach when a change needs to be revised.

[Open Dashboard](https://admin.cresc.dev)[Read Documentation](/docs/getting-started)[Open-source on GitHub](https://github.com/reactnativecn/react-native-update)Self-host friendly![Cresc Logo](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4IiBoZWlnaHQ9IjEwOCIgdmlld0JveD0iMCAwIDEwOCAxMDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImNyZXNjX3N0cm9rZSIgeDE9IjE2IiB5MT0iMTgiIHgyPSI5MCIgeTI9IjkwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNEN0I1N0MiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjU1IiBzdG9wLWNvbG9yPSIjQTg2QTQyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzZFMzQyOCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iY3Jlc2NfcGVhcmwiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoODQgNTApIHJvdGF0ZSg1Ni4zMSkgc2NhbGUoMTguNjAxMSkiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRkZGREY5Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC41NiIgc3RvcC1jb2xvcj0iI0YwRTFDQSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNDN0EwNzIiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoCiAgICBkPSJNIDg4IDI1IEEgNDAgNDAgMCAxIDAgODggODMiCiAgICBzdHJva2U9InVybCgjY3Jlc2Nfc3Ryb2tlKSIKICAgIHN0cm9rZS13aWR0aD0iMTgiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICA8cGF0aAogICAgZD0iTSA4NiAzMSBBIDMyIDMyIDAgMSAwIDg2IDc3IgogICAgc3Ryb2tlPSIjRjRFNkNEIgogICAgc3Ryb2tlLW9wYWNpdHk9IjAuMjgiCiAgICBzdHJva2Utd2lkdGg9IjQiCiAgICBzdHJva2UtbGluZWNhcD0icm91bmQiCiAgLz4KICA8Y2lyY2xlIGN4PSI4OCIgY3k9IjU0IiByPSIxMCIgZmlsbD0idXJsKCNjcmVzY19wZWFybCkiIHN0cm9rZT0iI0I2ODY1NyIgc3Ryb2tlLXdpZHRoPSIxLjYiIC8+CiAgPGNpcmNsZSBjeD0iODQuMiIgY3k9IjQ5LjMiIHI9IjIuOCIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1vcGFjaXR5PSIwLjg4IiAvPgo8L3N2Zz4K)Named for crescendo

## Composed for careful release work.

The first native release establishes the full picture. After that, Cresc can deliver only the missing detail and let the device complete the scene locally.

Measured cadence

Publish in smaller, deliberate steps instead of treating every release as a full reset.

Light variations

Diff-based delivery keeps each update closer to a new phrase than a whole score.

Reliable return

Rollback stays close at hand whenever a release needs to settle back into place.

Incremental Delivery

## Add the missing detail, not the whole canvas.

Like a variation added to an existing score, each Cresc update arrives as a measured addition to what the device already holds.

Current state

Base package present

0%

The device already holds the full portrait. The scroll only introduces the pearl, mirroring how Cresc sends the missing patch instead of re-sending the whole release.

Movement I

### Set the full base package

The first release carries the full picture the device needs before later over-the-air changes begin to arrive.

Movement II

### Send only the new detail

When the app changes, Cresc prepares a smaller patch instead of shipping the entire bundle again.

Movement III

### Complete the picture on device

The client combines what it already has with the new patch, so the finished release appears with much less transfer.

In Practice

## Three steps, kept in time.

Install the CLI, upload the baseline, and publish the update with the same steady rhythm each time the app changes.

I### Install the CLI

Connect your project to the publishing workflow with the Cresc command-line tool.

II### Upload the baseline package

Give Cresc the native build it compares against before later updates are published.

III### Publish the update

Bundle JavaScript and assets, then release the update through the dashboard or your CI flow.

First release


````
npm i -g react-native-update-cli

cresc uploadIpa ios-release.ipa
cresc uploadApk android-release.apk

cresc bundle --platform ios
cresc bundle --platform android
````
After the first baseline is in place, the dashboard and CLI can carry the rest of the release cycle with much less effort.

[Open Dashboard](https://admin.cresc.dev)[View Docs](/docs/getting-started)### Contact Us

- [Email hi@charmlot.com](mailto:hi@charmlot.com)
- QQ Group 729013783

### Terms & Policies

- [User Agreement](/agreement/)
- [Privacy Policy](/agreement/#privacy)

### Help & Support

- [FAQ](/docs/faq)
- [Issue Discussions](https://github.com/reactnativecn/react-native-update/issues)

### Links

- [React Native Chinese Site](https://reactnative.cn/)
- [ReactJS](https://react.dev/)

React Native Chinese Site © 2026 Wuhan Qingluo Network Technology Co., Ltd.

|[E ICP Bei 20002031-3](https://beian.miit.gov.cn/)[![](https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png)E Gongwang Anbei 42011202001821](http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011202001821)
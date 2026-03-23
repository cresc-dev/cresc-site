
# Expo pricing vs Cresc for React Native OTA

Short answer: **Expo Starter and Cresc Standard both start at $19/month**, but Cresc becomes much cheaper at production scale and is easier to budget because Cresc does not layer monthly active user and bandwidth overages on top of the base plan.

> Pricing snapshot checked against Expo official pricing on **March 23, 2026**.

## Expo pricing snapshot

| Plan            | Monthly price               | Included OTA capacity      |
| --------------- | --------------------------- | -------------------------- |
| Expo Starter    | $19/mo + usage              | 3K MAUs, 500 GiB bandwidth |
| Expo Production | $199/mo + usage             | 50K MAUs, 1 TiB bandwidth  |
| Expo Enterprise | Starts at $1,999/mo + usage | 1M MAUs, 40 TiB bandwidth  |

Expo's official usage-based pricing for EAS Update adds:

- `$0.005` per additional updated user
- `$0.10` per additional GiB of global edge bandwidth

## Cresc pricing snapshot

| Plan           | Monthly price | Included delivery scale |
| -------------- | ------------- | ----------------------- |
| Cresc Standard | $19/mo        | 10K daily queries       |
| Cresc Premium  | $39/mo        | 100K daily queries      |
| Cresc Pro      | $99/mo        | 1M daily queries        |
| Cresc Max      | $399/mo       | 10M daily queries       |
| Cresc Ultra    | $1,699/mo     | 100M daily queries      |

## What this means in practice

- At the **starter tier**, Cresc is **not more expensive** than Expo Starter.
- At the **production tier**, Cresc Pro at `$99/mo` is below Expo Production at `$199/mo`.
- At the **enterprise tier**, Cresc Ultra at `$1,699/mo` is below Expo Enterprise starting at `$1,999/mo`.
- Cresc pricing scales in fixed jumps, so you know the plan ceiling up front.
- Expo pricing can expand with both updated-user count and bandwidth after you cross plan limits.

## Expo's own usage example

Expo's official billing documentation gives this example for the Starter plan:

- 20 updates
- 5 MiB each
- 10,000 updated users

Their documented **extra usage** comes to **$95.31** for that month. Adding the Starter subscription itself means the all-in monthly cost would be **$114.31**. That total is an inference from the official example plus the public Starter plan fee.

## Why Cresc gets cheaper as scale grows

Inside Cresc itself, the effective price per `1M daily queries` drops sharply as the plan grows:

| Cresc plan | Effective price per 1M daily queries |
| ---------- | ------------------------------------ |
| Premium    | $390                                 |
| Pro        | $99                                  |
| Max        | $39.90                               |
| Ultra      | $16.99                               |

That is the economic story worth emphasizing: **same low entry point, but better cost curve once your release traffic becomes real**.

## Which pricing model is easier to budget?

- Choose **Expo** if you are already deep into Expo services and are comfortable budgeting around MAU plus bandwidth overages.
- Choose **Cresc** if you want OTA pricing to stay closer to a fixed monthly infrastructure cost.

## Related pages

- [Expo Updates vs Cresc](/expo-updates-vs-cresc.md)
- [Pricing](/pricing.md)
- [CodePush alternative](/codepush-alternative.md)

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


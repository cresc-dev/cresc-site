
# Expo pricing vs Cresc for React Native OTA

Short answer: **do not compare Expo MAUs directly with Cresc daily queries**. They are different meters. Compare the monthly scenario instead: base price, included capacity, and whether extra usage can create a surprise bill after that capacity is used.

> Pricing snapshot checked against Expo official pricing and billing docs on **April 17, 2026**.

## What is being compared?

| Service         | Meter                               | What counts                                                                                                                |
| --------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Expo EAS Update | Update MAUs + global edge bandwidth | A unique installation counts as an update MAU only if it downloads at least one update during the billing period.          |
| Cresc           | Daily update checks                 | A client request counts when the app asks Cresc whether an update is available, regardless of whether a new update exists. |

That means the two products do not share one universal quota unit. A readable comparison has to use monthly scenarios, not raw tier names.

## Expo pricing snapshot

| Plan            | Monthly price   | Included EAS Update capacity                                     |
| --------------- | --------------- | ---------------------------------------------------------------- |
| Expo Free       | $0/mo           | 1K update MAUs                                                   |
| Expo Starter    | $19/mo + usage  | 3K update MAUs, 100 GiB bandwidth                                |
| Expo Production | $199/mo + usage | 50K update MAUs, 1 TiB bandwidth                                 |
| Expo Enterprise | Custom          | Public pricing page does not publish a comparable monthly number |

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

## Scenario comparison

| Scenario           | Expo                                                                               | Cresc                                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| First paid tier    | Starter is `$19/mo`, then usage-based billing after 3K update MAUs and 100 GiB.    | Standard is `$19/mo` with 10K update checks per day, CDN delivery included, and no automatic overage bill. |
| Production traffic | Production is `$199/mo`, then usage-based billing after 50K update MAUs and 1 TiB. | Pro is `$99/mo` with 1M update checks per day. Upgrade when real traffic needs more headroom.              |
| High volume        | Enterprise pricing is custom, so there is no public monthly number to compare.     | Max and Ultra are fixed public tiers at `$399/mo` and `$1,699/mo`, so capacity planning stays explicit.    |

The useful takeaway is predictability. Cresc gives fixed public tiers and does not turn a traffic spike into an automatic overage invoice. Expo can be economical when your update MAUs and bandwidth stay inside the plan allowance, but it can add usage charges when either meter crosses the included limit.

When a Cresc tier is no longer enough, upgrading does not make the buyer forfeit the unused portion of the current plan. The higher tier takes effect after payment, the old subscription is cancelled, and the current plan's remaining value is converted into extra days on the new tier.

## Expo's own usage example

Expo's official billing documentation gives this example for the Starter plan:

- 20 updates
- 5 MiB each
- 10,000 updated users

Their documented **extra usage** comes to **$95.31** for that month. Adding the Starter subscription itself means the all-in monthly cost would be **$114.31**. That total is an inference from the official example plus the public Starter plan fee.

## How Cresc scales

Cresc is not metered as a continuously discounted usage product. Plans only move upward. Start with the tier that covers current release traffic. When a plan ceiling is no longer enough, upgrade to the next fixed tier with a larger daily update-check allowance:

| Cresc plan | Monthly price | Included delivery scale |
| ---------- | ------------- | ----------------------- |
| Standard   | $19/mo        | 10K daily queries       |
| Premium    | $39/mo        | 100K daily queries      |
| Pro        | $99/mo        | 1M daily queries        |
| Max        | $399/mo       | 10M daily queries       |
| Ultra      | $1,699/mo     | 100M daily queries      |

Upgrading changes the allowance, not the app integration or release flow. The unused value is preserved with this conversion:

```text
extraDays = floor(currentRemainingDays * currentPlanMonthlyPrice / newPlanMonthlyPrice)
newExpiry = now + 30 days + extraDays
```

That is the economic story worth emphasizing: **fixed public ceilings, intentional upgrades, and preserved unused value instead of a usage bill that can grow across multiple meters**.

## Which pricing model is easier to budget?

- Choose **Expo** if you are already deep into Expo services and are comfortable budgeting around update MAU plus bandwidth overages.
- Choose **Cresc** if you want OTA pricing to stay closer to a fixed monthly infrastructure cost and prefer adding capacity intentionally as real usage grows.

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


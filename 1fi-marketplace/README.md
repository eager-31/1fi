# 1Fi Marketplace

A new **1Fi Marketplace** tab inside the Shop page of the 1Fi app, plus a mock API that
serves products and computed no-cost / low-cost EMI plans.

```
1fi-marketplace/
├── server/   Express + TypeScript mock API (products, variants, computed EMI plans)
└── app/      React Native (Expo) + TypeScript client
```

## Quick start

Open two terminal.

### 1. API

```bash
cd server
npm install
npm run dev          # http://localhost:4000
```

Endpoints:

| Method | Path                         | Description                          |
| ------ | ---------------------------- | ------------------------------------ |
| GET    | `/products`                 | all products                        |
| GET    | `/products/:id`             | one product (`404` JSON for bad id) |
| GET    | `/products/:id/emi-plans`   | 3/6/12-month EMI plans, math computed |
| GET    | `/health`                   | liveness probe                      |

Set `LATENCY_MS=800` (default `500`) to exaggerate loading states, or `PORT` to move the port.

### 2. App

```bash
cd app
npm install
npm start            # then press i / a / w
```

The app talks to `http://localhost:4000` on iOS/web and `http://10.0.2.2:4000` on the
Android emulator. Override with `EXPO_PUBLIC_API_URL` (e.g. your LAN IP for a physical device):

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.20:4000 npm start
```

## What to look at

- **Shop tab → segmented control** has three segments: *Top Brands*, *Nearby Stores*
  (both intentionally blank per the assignment), and **1Fi Marketplace** (fully built).
- **Marketplace list** — skeleton rows while loading, retry button on error, empty state
  when a search matches nothing. Tap a card for the detail screen.
- **Product detail** — variant chips update the displayed price, EMI plan cards are
  selectable, and the sticky **Proceed** CTA stays disabled (40% opacity) until a variant
  *and* a plan are both chosen. Pressing it logs the full selection payload.

Kill the server while the app is open to see the error/retry states on both screens.

## Notes

- No product or EMI numbers are hardcoded in `.tsx` files — everything flows through the
  `/products` API via TanStack Query hooks.
- EMI math lives in `server/src/data/emiPlans.ts` (standard reducing-balance EMI formula;
  0% tenures are just `principal / months`).
- Colors and spacing come from `app/src/theme` — no inline hex in components.

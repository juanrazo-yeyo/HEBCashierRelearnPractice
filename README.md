# H-E-B Cashier Practice Simulator

double click and open it on another tab

https://heb-cashier-relearn-practice.vercel.app/

A personal web app for practicing H-E-B cashier workflows with a virtual POS keyboard and fake checkout screen.

> **Not affiliated with or endorsed by H-E-B Grocery Company, LP. Personal project only.**

---

## Project Structure

```
heb-simulator/
├── index.html                   ← App entry HTML
├── package.json                 ← Dependencies
├── vite.config.js               ← Vite config
├── tailwind.config.js           ← Tailwind config
├── postcss.config.js            ← PostCSS config
└── src/
    ├── main.jsx                 ← React entry point
    ├── App.jsx                  ← Root component (screen router)
    ├── index.css                ← Global styles + Tailwind + key styles
    ├── data/
    │   └── scenarios.js         ← All 10 practice scenarios
    ├── hooks/
    │   └── useSimulator.js      ← Core game logic (state, timer, scoring)
    └── components/
        ├── HomeScreen.jsx       ← Start screen with mode selection
        ├── CartDisplay.jsx      ← Customer receipt / item list
        ├── RegisterScreen.jsx   ← POS terminal display (green screen)
        ├── CashierKeyboard.jsx  ← Virtual H-E-B POS keyboard
        ├── ScenarioPanel.jsx    ← Scenario progress tracker
        └── ScorePanel.jsx       ← Final results screen
```

---

## Setup

### Prerequisites
- Node.js 18+ installed
- npm

### Steps

```bash
# 1. Navigate into the project folder
cd heb-simulator

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open your browser at:
http://localhost:5173
```

### Build for production
```bash
npm run build
npm run preview
```

---

## Features

- **10 Practice Scenarios** covering scans, produce, price inquiry, void, coupon, cash, card, EBT, clear, and full order
- **Beginner Mode** — glowing hints highlight the correct button
- **Test Mode** — no hints, rely on memory
- **Scoring** — 1000 base points per scenario, -50 per mistake, time bonus
- **Live timer & mistake counter**
- **Keyboard modeled on real H-E-B POS layout** based on the NCR keyboard photo

---

## How to Add More Scenarios

Open `src/data/scenarios.js` and add a new object to the `SCENARIOS` array:

```js
{
  id: 11,
  title: "My New Scenario",
  description: "What the cashier needs to do.",
  difficulty: "beginner",   // or "intermediate"
  cart: [
    { name: "Item Name", price: 1.99, barcode: "000000000000" },
  ],
  steps: [
    {
      instruction: "What to tell the cashier.",
      expectedKey: "ENTER",          // must match a key id in CashierKeyboard.jsx
      hint: "Press the ENTER key.",
      autoScan: { name: "Item Name", price: 1.99 }, // null if no item to add
    },
  ],
}
```

---

## Key IDs Reference

These are the key `id` values available in `CashierKeyboard.jsx` that you can use as `expectedKey` in scenarios:

`ENTER`, `TOTAL`, `CASH`, `CLEAR`, `SCAN VOID`, `PRODUCE`, `SCALE`, `DEPT`,
`ELECTRONIC PAYMENT`, `FOOD STAMPS`, `WIC EBT`, `COUPON`, `PROMO`,
`MANAGER MENU`, `CASHIER MENU`, `ORDER VIEW`, `SUSP RCALL`, `PRICE INQ`,
`RTRN`, `0`–`9`, `F1`–`F12`, and all letter keys `A`–`Z`

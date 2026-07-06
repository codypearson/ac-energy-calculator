# AC Energy Cost Calculator

A small React app that estimates the electricity cost of running a specific
air conditioner (a Lennox 13ACXN024-230A23) based on daily compressor
runtime pulled from an Ecobee thermostat. Adjust the runtime slider and
electric rate to see daily, monthly, and full cooling-season cost estimates.

## Background

This started as a one-off [Claude](https://claude.com) artifact — a single
JSX component sketched out to answer "what is this AC actually costing me
per month?" using real appliance wattage and utility rate data. The
surrounding project (Vite/Tailwind scaffolding, file structure, this README)
was then built out by [Claude Code](https://claude.com/claude-code) to turn
that artifact into a standalone, runnable repo.

## Running locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

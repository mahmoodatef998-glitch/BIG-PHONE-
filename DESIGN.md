# DESIGN.md — BIG PHONE Wholesale Platform

**Project:** BIG PHONE — B2B Wholesale Mobile Devices Marketplace
**Audience:** Mobile shop owners, importers, resellers, distributors (global)
**Single Job:** Convert trade buyers into quote requests or direct WhatsApp contacts

---

## 1. Visual Theme & Atmosphere

Corporate-grade confidence with a trading-floor edge. The site reads like a Bloomberg terminal meets a premium product catalog: data-forward, authoritative, and fast. Dark navy headers anchor serious B2B intent; clean white product surfaces let the stock data do the talking.

The “Live Stock Ticker” is the signature element — a scrolling strip of real inventory counts between the hero and navigation. No other B2B phone site does this. It communicates active trade and urgency without shouting, and signals to buyers that this is a live, operating marketplace.

**Mood keywords:** Professional · Trustworthy · Fast · Data-forward · Active

---

## 2. Color Palette & Roles

| Role | Descriptive Name | Hex | Usage |
|---|---|---|---|
| Navy Anchor | Midnight Trade Blue | `#0B1829` | Hero bg, Why Buy section, dark anchors |
| Deep Navy | Abyss Black | `#070F1C` | Ticker bg, deepest surfaces |
| Action Blue | Wholesale Link Blue | `#0066FF` | Primary CTAs, active tabs, links |
| Action Blue (hover) | Pressed Blue | `#0052CC` | Button hover states |
| Stock Green | Confirmed Stock Green | `#4ADE80` | High stock count, in-stock dots |
| Trade Amber | MOQ Amber | `#F59E0B` | MOQ badges, medium stock, accent |
| Alert Red | Low Stock Red | `#F87171` | Low stock warnings |
| WhatsApp Green | Connect Green | `#00A850` | WhatsApp CTA exclusively |
| Page Surface | Cool Slate | `#F0F4F8` | Page background, section alternates |
| Card White | Catalog White | `#FFFFFF` | Product card backgrounds |
| Border | Pale Silver | `#DDE3EA` | Card borders, dividers, inputs |
| Muted Text | Slate Mist | `#8B9DB5` | Metadata, secondary labels, counts |
| Body Text | Deep Charcoal | `#1A2332` | Primary text, card titles |

---

## 3. Typography

**Font:** Plus Jakarta Sans (via Next.js Google Fonts)
- Variable weights: 400, 500, 600, 700, 800

| Role | Size | Weight |
|---|---|---|
| Hero H1 | `clamp(1.875rem, 5vw, 3rem)` | 800 |
| Section H2 | `1.75rem → 2rem` | 700–800 |
| Card H3 | `0.9375rem` | 700 |
| Body | `1rem` | 400–500 |
| Chips/badges | `0.6875rem` | 700 uppercase |

---

## 4. Signature Element — Live Stock Ticker

A 42px scrolling horizontal strip between hero and brand navigation.

- Background: `#070F1C`
- Left-pinned: pulsing `#4ADE80` dot + “LIVE STOCK” label
- Stock color: `≥200` → green, `50–199` → amber `#FBBF24`, `<50` → red `#F87171`
- Animation: `55s linear infinite` CSS translateX(-50%) on doubled content
- `prefers-reduced-motion`: animation paused

---

## 5. Layout Rhythm

```
[Dark navy] Hero
[Black]     Stock Ticker  ← signature
[White]     Brands Strip
[#F0F4F8]   Featured Inventory
[Dark navy] Why Buy Us
[#F0F4F8]   Process Steps
[Blue]      WhatsApp CTA
```

## 6. Accessibility

- Focus: `2px solid #0066FF`, `2px` offset
- Touch targets: all interactive elements ≥ `44×44px`
- Contrast: body `#1A2332` on `#F0F4F8` ≈ 9:1
- `prefers-reduced-motion` disables all animations globally
- Ticker: `role="marquee"` + `aria-label`
- No event handlers on server components — CSS `:hover` only

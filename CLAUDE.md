# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

No test suite is configured.

## Stack

- **React 19** + **TypeScript** (strict mode), built with **Vite 7**
- **React Router 7** for client-side routing
- **Tailwind CSS 4** (via `@tailwindcss/vite` plugin)
- **shadcn/ui** components backed by **Radix UI** primitives
- **Axios** for HTTP; backend assumed at `http://localhost:8080`

## Architecture

### Routing & Layouts

Two layout shells are defined in `src/app.router.tsx`:

- **`IndexLayout`** — wraps the `/index` landing page only
- **`DefaultLayout`** — wraps everything else; owns cart state (items, counts, add/remove/increment/decrement) and renders the persistent header and `CartSheet` drawer

Routes (Spanish slugs):
```
/index          → LandingPage
/               → StorePage
/eventos        → EventsPage
/atencion       → CustomSupportPage
/contacto       → ContactPage
/checkout       → CheckoutPage
/checkout/success
/checkout/failed
```

### State Management

State is intentionally minimal:

- **Cart** lives in `DefaultLayout` as `useState` and is passed down as props
- **Checkout** uses a React Context (`src/pages/checkout/context/`) backed by `useCheckoutHook`, which holds form state, validation, guest info, delivery location, and order submission logic
- No global state library (no Redux/Zustand)

### Checkout Flow

`useCheckoutHook` (`src/pages/checkout/`) is the central hook for the checkout feature. It manages:
- Multi-step form state and validation
- Cart items (currently hardcoded mock data — `ITEMS`, `CART_ITEMS` arrays)
- Delivery location selection via `useDeliveryMap` (Leaflet integration)
- Order submission POST to `/checkout`

### Path Alias

`@/` maps to `src/`. Use it for all internal imports.

### UI Components

Shared primitives live in `src/components/ui/` (shadcn-generated). Do not edit these manually — re-generate via shadcn CLI if updates are needed. Custom components go in `src/components/`.

### Styling

Theme colors are defined as OKLch CSS custom properties in `src/index.css`. Dark mode is toggled via the `.dark` class on the root element. Use `cn()` from `src/lib/` for conditional class merging (`tailwind-merge` + `clsx`).

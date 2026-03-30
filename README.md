# Mini E-commerce Frontend

Customer-facing storefront for the Mini E-commerce platform.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** / TypeScript
- **Tailwind CSS 4**
- **Axios** — API client
- **Zustand** — auth, cart, wishlist state (persisted to localStorage)
- **React Hook Form + Zod** — form handling & validation
- **Radix UI** — accessible UI primitives

## Pages

| Route            | Status | Description                                                 |
| ---------------- | ------ | ----------------------------------------------------------- |
| `/`              | Mock   | Home page (hero, categories, featured products — hardcoded) |
| `/login`         | Live   | Login & register forms                                      |
| `/register`      | Live   | Registration                                                |
| `/products`      | Live   | Product catalog with filters, sorting, pagination           |
| `/products/[id]` | Live   | Product detail (reviews/Q&A tabs still mock)                |
| `/cart`          | Local  | Cart from localStorage (no backend sync)                    |
| `/checkout`      | Live   | Order creation via API                                      |
| `/orders/[id]`   | Live   | Order detail                                                |
| `/profile`       | Live   | Profile edit, change password                               |
| `/account`       | Live   | Orders list, profile, favorites                             |
| `/wishlist`      | Local  | Wishlist from localStorage (no backend sync)                |

## Backend Services

- **User Service** — `http://localhost:8081` (auth, profile)
- **Product Service** — `http://localhost:8082` (products, categories, orders)

Set via environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8081
NEXT_PUBLIC_PRODUCT_API_URL=http://localhost:8082
```

## Project Structure

```
app/            — App Router pages
components/     — Reusable UI (layout, home sections, product widgets, cart)
features/       — Domain modules (products, orders, user) with API + types
hooks/          — useAuth
store/          — Zustand stores (auth, cart, wishlist)
lib/            — Axios clients, utilities
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3001 (or 3000 if admin is not running). Requires the backend services to be running (see `MiniEcommerce-API/docker-compose.yml`).

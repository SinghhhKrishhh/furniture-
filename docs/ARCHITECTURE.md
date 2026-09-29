# RoomCraft Architecture

## Overview
RoomCraft is a full-stack TypeScript monorepo built for a 3D furniture e-commerce experience.

## Core Technologies
- **Frontend / 3D Framework:** Next.js 15 (App Router) combined with React Three Fiber.
- **Styling:** Tailwind CSS.
- **Database / ORM:** PostgreSQL managed via Prisma.
- **Authentication:** NextAuth (Credentials and Google OAuth).
- **Payments:** Stripe Checkout.
- **AI Integration:** Meshy.ai for automated 2D-to-3D asset generation.
- **State Management:** Zustand for global cart state.

## Architecture Guidelines
- **3D Engine:** A global `<Canvas>` is rendered in the Next.js root layout. HTML overlays are synchronized with 3D interactions.
- **Webhooks:** Stripe webhooks manage asynchronous order finalization and inventory adjustments using database transactions.

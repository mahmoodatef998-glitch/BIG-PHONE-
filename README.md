# BIG PHONE — B2B Wholesale Platform

Next.js marketplace for wholesale mobile devices. Converts trade buyers into RFQ submissions and WhatsApp contacts.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Supabase** (Postgres, Auth, Storage)
- **Resend** (RFQ emails)
- **Cloudinary** (product images)

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Supabase env vars, the app runs with built-in mock catalog data.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production | Supabase anon key (public reads + RFQ insert) |
| `SUPABASE_SERVICE_ROLE_KEY` | Production | Server-only admin operations |
| `ADMIN_EMAIL` | Recommended | Restrict admin access to this email |
| `RESEND_API_KEY` | Optional | Send RFQ notification emails |
| `RESEND_FROM_EMAIL` | Optional | Verified sender (default: `noreply@bigphone.ae`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Recommended | WhatsApp CTA number (no `+`) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for SEO/emails |
| `NEXT_PUBLIC_COMPANY_EMAIL` | Optional | Admin notification recipient |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Optional | Image uploads in admin |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Optional | Unsigned upload preset |

## Supabase Setup

1. Create a Supabase project.
2. Run `src/lib/supabase/schema.sql` in the SQL Editor (safe to re-run).
3. Optionally run `src/lib/supabase/seed-accessories.sql` for accessory products.
4. Create an admin user under **Authentication → Users**.
5. Set `ADMIN_EMAIL` to that user's email in `.env.local`.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── (site)/          # Public storefront
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # UI components
├── lib/                   # Data layer, email, utils
└── types/                 # Shared TypeScript types
```

## Deployment

Deploy to Vercel and set all environment variables. The app uses ISR (`revalidate: 60`) on public pages for performance.

## License

Private — BIG PHONE

# MemoryOS Marketing

Public MemoryOS marketing surfaces live here. 
## Local setup

```bash
cd memory-dashboard/marketing
cp .env.example .env.local
npm install
npm run dev -- -p 3002
```

Open `http://localhost:3002/pricing`.

## Environment

- `NEXT_PUBLIC_API_BASE`: MemoryOS API base URL. The pricing page fetches `GET /v1/billing/plans` from this API.
- `NEXT_PUBLIC_TENANT_APP_URL`: Tenant dashboard URL used for sign-up, dashboard, and upgrade handoff links.
- `NEXT_PUBLIC_DOCS_URL`: Public docs URL. Page-specific CTAs append exact docs paths such as `/cookbooks/support-agent`.
- `NEXT_PUBLIC_SALES_EMAIL`: Sales/contact email used by sales CTAs.
- `NEXT_PUBLIC_VERIFY_EMAIL`: Verification email used by agent verification CTAs.

Use `.env.example` for local development and `.env.production.example` as the production deployment template.

Local:

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_TENANT_APP_URL=http://localhost:3000
NEXT_PUBLIC_DOCS_URL=https://memoryengine.mintlify.app
NEXT_PUBLIC_SALES_EMAIL=sales@memoryos.io
NEXT_PUBLIC_VERIFY_EMAIL=verify@memoryos.io
```

Production:

```env
NEXT_PUBLIC_API_BASE=https://api.memoryos.io
NEXT_PUBLIC_TENANT_APP_URL=https://app.memoryos.io
NEXT_PUBLIC_DOCS_URL=https://docs.memoryos.io
NEXT_PUBLIC_SALES_EMAIL=sales@memoryos.io
NEXT_PUBLIC_VERIFY_EMAIL=verify@memoryos.io
```


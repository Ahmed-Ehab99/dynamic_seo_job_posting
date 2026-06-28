<div align="center">

# 🧑‍💼 JobBoard

### Dynamic Job Listings with SEO-Optimized Structured Data

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[Live Demo](https://dynamic-seo-job-posting.vercel.app)

</div>

---

## Overview

A Next.js 16 (App Router) job listing application that demonstrates dynamic routing, server-side metadata generation, and Google-compliant Structured Data (JSON-LD) — all driven from a single JSON data source with no hardcoded values.

Each job detail page generates its own SEO title, meta description, and a valid `JobPosting` schema that passes **Google's Rich Results Test** out of the box.

---

## Features

- **Dynamic Routes** — `/jobs/[slug]` resolves each job by its URL slug
- **Dynamic Metadata API** — `generateMetadata()` produces unique `<title>` and `<meta description>` per job
- **Google JSON-LD** — Fully valid `JobPosting` schema injected via `<script type="application/ld+json">`, auto-updates on route change
- **Static Site Generation** — `generateStaticParams()` pre-renders all job pages at build time
- **404 Handling** — `notFound()` renders a proper 404 for any unknown slug
- **Next.js Image** — Optimised `<Image>` component with an automatic letter-avatar fallback
- **Remote Job Support** — Remote positions use `jobLocationType: TELECOMMUTE` per schema.org spec
- **Responsive UI** — Clean, mobile-first design built with Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | Local JSON (`data/jobs.json`) |
| Images | Next.js `<Image>` (optimised) |
| SEO | Metadata API + JSON-LD (schema.org) |
| Deployment | Vercel |

---

## Project Structure

```
├── src
│   ├── app
│   │   ├── jobs
│   │   │   └── [slug]
│   │   │       └── page.tsx        # ⭐ Dynamic job detail page
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx              # Root layout — sticky header, footer
│   │   ├── not-found.tsx           # Global 404 page
│   │   └── page.tsx                # Jobs listing page (/)
│   ├── components
│   │   ├── Badge.tsx               # Badge for job page
│   │   ├── CompanyLogo.tsx         # <Image> with letter-avatar fallback
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── JobCard.tsx             # Job card in (/)
│   ├── data
│   │   └── jobs.json               # Data source
│   ├── lib
│   │   ├── jobs.ts                 # getAllJobs · getJobBySlug · getStaticSlugs
│   │   ├── jsonld.ts               # generateJobPostingJsonLd() utility
│   │   └── utils.ts
│   └── types
│       └── job.ts                  # Job & Salary TypeScript interfaces
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Ahmed-Ehab99/dynamic_seo_job_posting

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Available Routes

| URL | Page |
|---|---|
| `/` | All job listings |
| `/jobs/frontend-developer` | Frontend Developer — TechNova Solutions |
| `/jobs/backend-laravel-developer` | Backend Laravel Developer — Digital Horizon |
| `/jobs/ui-ux-designer` | UI/UX Designer — Creative Studio |
| `/jobs/devops-engineer` | DevOps Engineer — CloudStack |
| `/jobs/flutter-developer` | Flutter Developer — AppWorks |
| `/jobs/[unknown-slug]` | 404 — Page Not Found |

---

## SEO Implementation

### Dynamic Metadata
Each job page exports a `generateMetadata` function that builds the page title and description from the fetched job data:

```
Title:       Frontend Developer | TechNova Solutions
Description: We are looking for a skilled Frontend Developer...
```

### JSON-LD (Structured Data)
A valid `JobPosting` schema is generated for every job and injected into the `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Frontend Developer",
  "datePosted": "2026-06-20",
  "validThrough": "2026-07-20T23:59:59",
  "employmentType": "FULL_TIME",
  "hiringOrganization": { "@type": "Organization", "name": "TechNova Solutions" },
  "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Cairo, Egypt" } },
  "baseSalary": { "@type": "MonetaryAmount", "currency": "EGP", "value": { "@type": "QuantitativeValue", "value": 25000, "unitText": "MONTH" } }
}
```

> ✅ Test any live URL at [Google's Rich Results Test](https://search.google.com/test/rich-results)

---

## Adding Company Logos

Place logo images inside `/public/logos/` to match the paths defined in `jobs.json`:

```
public/
└── logos/
    ├── technova.png
    ├── digital-horizon.png
    ├── creative-studio.png
    ├── cloudstack.png
    └── appworks.png
```

If an image is missing or fails to load, `CompanyLogo.tsx` automatically renders a coloured letter avatar instead.

---

## License

MIT © [Ahmed](https://github.com/your-username)
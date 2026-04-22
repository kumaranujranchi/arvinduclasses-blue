# Arvindu Classes Website

A modern education platform built with **Next.js** (React) on the frontend and **Convex** as the real-time backend, deployed on **Netlify**.

## Project Structure

```
Arvinduclasses/
├── edumate/          # Original static HTML/CSS template (design reference)
│   ├── assets/       # CSS, JS, images and SCSS source files
│   └── *.html        # All static HTML pages (kept as design backup)
│
└── frontend/         # Next.js React application (ACTIVE - production build)
    ├── public/
    │   └── assets/   # Copied from edumate/assets (images, CSS, JS)
    ├── src/
    │   └── app/
    │       ├── components/
    │       │   ├── Header.tsx    # Shared navigation header
    │       │   └── Footer.tsx    # Shared footer with copyright
    │       ├── courses/
    │       │   └── page.tsx      # Courses listing page
    │       ├── blog/
    │       │   └── page.tsx      # Blog posts listing page
    │       ├── contact/
    │       │   └── page.tsx      # Contact form page
    │       ├── layout.tsx        # Root layout (CSS, scripts, metadata)
    │       ├── globals.css       # Minimal global reset
    │       └── page.tsx          # Home page
    ├── next.config.ts
    └── package.json
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Original template CSS (`style.min.css`) + Bootstrap 4 |
| Backend/Database | [Convex](https://convex.dev/) *(Phase 4 - coming soon)* |
| Frontend Hosting | [Netlify](https://netlify.com/) |
| Source Control | GitHub |

## Getting Started

```bash
# Install dependencies
cd frontend
npm install

# Start dev server (runs on localhost:3001)
npm run dev -- --port 3001

# Build for production
npm run build
```

## Deployment (Netlify)

1. Connect this GitHub repo on [netlify.com](https://netlify.com)
2. Set **Base directory**: `frontend`
3. Set **Build command**: `npm run build`
4. Set **Publish directory**: `frontend/.next`
5. Deploy!

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero slider, courses, counter |
| `/courses` | Courses listing grid |
| `/blog` | Blog posts listing |
| `/contact` | Contact form + info |

## Roadmap

- [x] Phase 1: Next.js + Convex setup
- [x] Phase 2: Asset migration & global layout components
- [x] Phase 3: HTML → JSX page conversions
- [ ] Phase 4: Convex database schemas (Courses, Events, Blog)
- [ ] Phase 5: Admin dashboard for content management
- [ ] Phase 6: User authentication (Login / Register)

---

Built by [Synergy Brand Architect](https://www.synergybrandarchitect.in)

# Procure-Brain — Multi-Tenant Tender Intelligence SaaS

A complete, production-ready React + TypeScript frontend for a Government e-Marketplace style tender portal.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open in browser
http://localhost:3000
```

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx       # Sticky responsive navbar with mobile drawer
│   │   └── Navbar.css
│   ├── Footer/
│   │   ├── Footer.tsx       # Multi-column footer
│   │   └── Footer.css
│   └── TenderCard/
│       ├── TenderCard.tsx   # Reusable card (grid + list modes)
│       └── TenderCard.css
│
├── pages/
│   ├── Home/
│   │   ├── Home.tsx         # Hero, category filter, featured tenders
│   │   └── Home.css
│   ├── Listings/
│   │   ├── Listings.tsx     # Sidebar filters, grid/list toggle
│   │   └── Listings.css
│   ├── Detail/
│   │   ├── Detail.tsx       # Tender detail + CTA bid panel
│   │   └── Detail.css
│   ├── Dashboard/
│   │   ├── Dashboard.tsx    # Sidebar nav, stats, table, profile
│   │   └── Dashboard.css
│   ├── Login/
│   │   ├── Login.tsx        # Login form with validation
│   │   └── Login.css
│   └── Signup/
│       ├── Signup.tsx       # Registration form with validation
│       └── Signup.css
│
├── data/
│   └── products.ts          # Mock tender data
│
├── types/
│   └── index.ts             # Shared TypeScript interfaces
│
├── utils/
│   └── index.ts             # Helper functions (fmt, stars, daysLeft)
│
├── styles/
│   └── variables.css        # CSS variables, global reset, shared utilities
│
├── App.tsx                  # React Router setup + layout
└── index.tsx                # Entry point
```

---

## 🛣️ Routes

| Path             | Page           | Protected |
|-----------------|----------------|-----------|
| `/`              | Home           | No        |
| `/tenders`       | Listings       | No        |
| `/tenders/:id`   | Tender Detail  | No        |
| `/dashboard`     | Dashboard      | ✅ Yes     |
| `/login`         | Login          | No        |
| `/signup`        | Sign Up        | No        |

> Dashboard redirects to `/login` if not authenticated.

---

## 🎨 Tech Stack

- **React 18** + **TypeScript**
- **React Router v6** (client-side routing)
- **Bootstrap 5.3** (grid + utility classes)
- **Custom CSS** (one `.css` file per component)
- **Google Fonts** — Plus Jakarta Sans + Syne

---

## 📱 Responsive Breakpoints

| Breakpoint | Width    |
|------------|----------|
| xs         | < 576px  |
| sm         | ≥ 576px  |
| md         | ≥ 768px  |
| lg         | ≥ 992px  |
| xl         | ≥ 1200px |

---

## 🔧 Customisation

- **Add real data**: Replace `src/data/products.ts` with API calls
- **Auth**: Replace the `user` state in `App.tsx` with JWT / context
- **Theme**: Edit CSS variables in `src/styles/variables.css`

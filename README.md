# Aries Razak — Professional IT Support & Systems Portfolio

[![Live Site](https://img.shields.io/badge/Live%20Demo-aries--razak.vercel.app-0284c7?style=flat&logo=vercel)](https://aries-razak.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![AWS Certified](https://img.shields.io/badge/AWS-Cloud%20Practitioner-ff9900?style=flat&logo=amazon-aws)](https://aws.amazon.com/certification/certified-cloud-practitioner/)

> **"I support, troubleshoot, and improve the technology that helps businesses operate."**

A modern, high-performance personal technology portfolio built for **Aries Razak** (Muhammad Aries Irhan bin Abd Razak). Designed as an interactive engineering portfolio that presents hands-on technical capabilities across **Application Support, Systems Support, IT Operations, Business Systems/SaaS, Infrastructure, and Cloud Foundations**.

---

## 🌐 Live Website

- **Production Deployment:** [https://aries-razak.vercel.app/](https://aries-razak.vercel.app/)
- **LinkedIn:** [linkedin.com/in/aries-razak-a36045256](https://www.linkedin.com/in/aries-razak-a36045256)
- **Public Contact:** [ariesirhan25@gmail.com](mailto:ariesirhan25@gmail.com)

---

## 🧭 Key Architectural Features

### 1. "Choose Your Route" Recruiter Discovery Filter
A sticky perspective controller that highlights relevant experience, missions, and technical skills based on the visitor's hiring focus:
- **All Overview:** Comprehensive view of career progression, technical missions, and skills.
- **Application Support:** Triage workflows, Xilnex POS troubleshooting, payment gateways, vendor escalation, and UAT testing.
- **IT Operations:** Multi-site retail operations, incident ticket management, hardware diagnostics, and endpoint lifecycles.
- **Business Systems:** SaaS administration (Lark Super Admin, Google Workspace migration), and NetSuite data validation.
- **Infrastructure:** Layer 1–4 networking, physical RJ45 termination, DHCP/AP provisioning, and new store commissioning.
- **Cloud Foundations:** AWS Certified Cloud Practitioner competencies, IAM, and foundational cloud services.

### 2. Interactive Terminal Status Console (`ARIES.EXE`)
- Simulated CLI interface embedded directly into the hero section.
- Non-blocking quick command triggers (`--profile`, `--stack`, `--contact`, `--help`).
- Real-time technical summary without intrusive modal popups.

### 3. Story-Driven Chapters
Structured as progressive chapters instead of a dry, static resume:
- **Chapter 01 · The Operator:** Operating philosophy bridging software understanding with hands-on systems support.
- **Chapter 02 · The Journey:** Interactive career timeline (emart24 Malaysia, Palaterium, Managed Print Services, and the Attorney General’s Chambers of Malaysia).
- **Chapter 03 · The Problem Solver:** 5 structured case studies detailing *The Challenge*, *The Investigation*, *The Approach*, *The Outcome*, and *What I Learned*.
- **Chapter 04 · The Toolkit:** Honest, contextualized skill inventory with real production examples.
- **Chapter 05 · The Builder:** Real project deliverables (DKICT Compliance System in Laravel/MySQL, Lark Super Admin Migration, Multi-Site Commissioning Runbooks, etc.).
- **Chapter 06 · The Next Mission:** Role-focused email launcher, email copy button with toast feedback, and verified links.

### 4. Verified ATS-Optimized Technical Resume
- Dedicated full-screen modal with printable stylesheet rules (`@media print`).
- Allows recruiters to save a clean, standardized 1–2 page PDF directly using native browser print (`Ctrl+P` / `Cmd+P`).

---

## 🔒 Public Repository & Data Privacy Compliance

This codebase has been sanitized for public open-source hosting:
- **Location:** General regional location only (`Selangor / Kuala Lumpur, Malaysia`).
- **Phone Number:** Displayed as `"Available upon request"` to prevent web scrapers and telemarketing spam.
- **Credentials & API Keys:** Zero hardcoded API keys, tokens, database passwords, or confidential internal links.

---

## 🛠️ Tech Stack & Tooling

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| **Bundler & Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Icons & Motion** | [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/) |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or 20.x recommended)
- `npm` (version 9.x or higher)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies
> **Important:** Install with `--legacy-peer-deps` to guarantee clean resolution across modern Vite 8 peer dependencies.
```bash
npm install --legacy-peer-deps
```

### 3. Start the development server
```bash
npm run dev
```
The site will run locally at `http://localhost:3000` (or the port specified in terminal).

### 4. Type checking & Linting
```bash
npm run lint
```

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## ☁️ Vercel Deployment

This project includes pre-configured deployment rules for seamless Vercel integration:
- `.npmrc`: Sets `legacy-peer-deps=true` automatically.
- `vercel.json`: Specifies `"installCommand": "npm install --legacy-peer-deps"`, `"buildCommand": "npm run build"`, and Single Page Application (SPA) client-side rewrites.

### Deploying via Vercel CLI:
```bash
npx vercel
```

### Deploying via GitHub Integration:
1. Push your commits to GitHub:
   ```bash
   git add .
   git commit -m "feat: portfolio updates"
   git push origin main
   ```
2. Import the repository in [Vercel](https://vercel.com/new).
3. Vercel will automatically detect the Vite preset and use settings from `vercel.json`.

---

## 📁 Project Structure

```text
├── index.html                   # HTML entry point with SEO & OpenGraph tags
├── vercel.json                  # Vercel deployment & routing configuration
├── .npmrc                       # npm dependency resolution configuration
├── package.json                 # Project scripts and dependencies
├── src/
│   ├── main.tsx                 # React application mounting
│   ├── App.tsx                  # Root component & route state coordination
│   ├── index.css                # Tailwind CSS imports & print styles
│   ├── data/
│   │   └── portfolioData.ts     # Central verified profile, missions & experience data
│   └── components/
│       ├── Navbar.tsx           # Header navigation with scroll indicator
│       ├── RouteSelector.tsx    # "Choose Your Route" recruiter filter bar
│       ├── Hero.tsx             # Hero section with interactive ARIES.EXE terminal
│       ├── OperationalStrip.tsx # Core capabilities highlight bar
│       ├── About.tsx            # Chapter 01: Career progression & narrative
│       ├── Experience.tsx       # Chapter 02: Interactive career timeline
│       ├── Projects.tsx         # Chapter 03: Structured technical case studies
│       ├── Skills.tsx           # Chapter 04: Domain skills explorer
│       ├── ProjectShowcase.tsx  # Chapter 05: Practical project implementations
│       ├── Certifications.tsx   # Accreditations & education
│       ├── LearningJourney.tsx  # Target roles & continuous growth
│       ├── Contact.tsx          # Chapter 06: Contact form & outreach
│       ├── ResumeModal.tsx      # Print-ready ATS resume viewer
│       └── Footer.tsx           # Footer with chapter links & back-to-top
```

---

## 📄 License & Attribution

- Built and maintained by **Aries Razak**.
- Designed and engineered with React, TypeScript, and Tailwind CSS.

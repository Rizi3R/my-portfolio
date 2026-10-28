# Technical Architecture: Personal Technology Universe

**Date:** October 28, 2026  
**Architect:** Frontend Engineering & Systems Architecture Team

---

## 1. Component Hierarchy & View Switching Architecture

```
App.tsx
├── Header (Compact Persistent Bar: View Switcher [Trace | Atlas | Plain] + Quick Experience/Contact Jumps)
│
├── [VIEW 1: TRACE (Default)]
│   ├── Premise Banner ("One scan. Six layers. What happens between the beep and the receipt.")
│   ├── TraceLine Rail (Continuous SVG Path with Scroll-Driven / IntersectionObserver sync)
│   ├── Stratum 1: Hardware & Peripherals (SVG Schematic, Terminals, Printers, RJ45)
│   ├── Stratum 2: Operating System & Device (Kernel Drivers, POS Daemons, Process Tree)
│   ├── Stratum 3: Network (VLANs, Gateway NAT, Packet Flight Simulator)
│   ├── Stratum 4: Application (Xilnex POS Logic, Transaction Logs, NetSuite Audit)
│   ├── Stratum 5: Cloud & Automation (Lark Automated Workflows, AWS Primitives, S3/EC2)
│   ├── Stratum 6: People & Process (Vendor Escalation, Incident Handoff, Commissioning SOP)
│   └── Receipt Section (Thermal Printed Experience Dossier, Contact, Print Sheet)
│
├── [VIEW 2: ATLAS (Interactive Knowledge Graph)] (Lazy Loaded)
│   ├── Graph Controls (Filter by Stratum, Evidence Status, Text Search)
│   ├── Deterministic Canvas / SVG Coordinate Graph
│   ├── Node Inspector Dossier Panel (Summary, Evidence Link, Related Nodes with Edge Reasons)
│   └── Accessible Screen-Reader Semantic List Tree (ARIA-compliant)
│
├── [VIEW 3: PLAIN (Linear Document)]
│   ├── Semantic Paper Theme View
│   ├── Complete Linear Text Representation of all 6 Strata, Experiences & Cases
│   └── Print Stylesheet Source
│
├── The Lab (Standalone Interactive Workbench) (Lazy Loaded)
│   ├── Simulation Chrome ("SIMULATION" Badge, Models / Does Not Model Note)
│   ├── Packet Flight Simulator (Pure Logic + Canvas/SVG)
│   ├── Cache Eviction Visualizer (LRU / FIFO State Machine + Visual Slots)
│   └── UNIX Permission Bitmask Calculator
│
├── Shared Modals
│   ├── ResumeModal (ATS Print Sheet)
│   └── CommandPalette (Cmd+K Global Shortcuts)
│
└── Footer (Colophon, Monogram, Back-to-Top, Verifications)
```

---

## 2. Content Model & Single Source of Truth

All views (Trace, Atlas, Plain, Receipt, SEO Schema) derive deterministically from `src/data/universeContent.ts`:

```typescript
export type StratumType = 
  | 'hardware' 
  | 'os' 
  | 'network' 
  | 'application' 
  | 'cloud-automation' 
  | 'people-process';

export type NodeKind = 'technology' | 'concept' | 'project' | 'role' | 'certification';

export type EvidenceStatus = 
  | 'professional' 
  | 'project' 
  | 'experiment' 
  | 'foundation' 
  | 'learning' 
  | 'exploring';

export interface UniverseNode {
  id: string;
  label: string;
  stratum: StratumType;
  kind: NodeKind;
  status: EvidenceStatus;
  summary: string; // Max 200 chars, factual, first person
  evidenceRef?: string; // REQUIRED if status is 'professional' or 'project'
  links?: Array<{ label: string; url: string }>;
  x?: number; // Normalized coordinate for deterministic Atlas layout (0-100)
  y?: number;
}

export interface UniverseEdge {
  from: string;
  to: string;
  reason: string; // REQUIRED, max 120 chars, states real relationship
}

export interface UniverseExperience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
  technologies: string[];
}
```

---

## 3. Provenance & Validation Workflow

A standalone script `scripts/validate-content.mjs` is executed via:
```bash
node scripts/validate-content.mjs
```
The validator strictly asserts:
1. Every node has an assigned `status`.
2. Every node with status `professional` or `project` has a non-empty `evidenceRef` pointing to an experience ID, project ID, or verified external URL.
3. Every edge has a descriptive `reason` (under 120 characters) and valid `from`/`to` node references.
4. No duplicate node IDs or edge pairs exist.
5. Node summaries are strictly $\le 200$ characters.

---

## 4. Code Splitting & Performance Boundaries

To prevent the 740 kB monolithic bundle observed in the audit:
* `AtlasView` is loaded lazily via `React.lazy(() => import('./views/AtlasView'))`.
* `TheLab` is loaded lazily via `React.lazy(() => import('./components/TheLab'))`.
* Initial page load strictly delivers `TraceView` and `ReceiptSection`, bringing the initial-route JavaScript under 120 kB gzipped.

---

## 5. Resilience, A11y & Crawlability Strategy

* **No-JS / Crawler Fallback:** Pre-rendered HTML shell inside `index.html` detailing Aries Razak's verified positions, education, and credentials, paired with JSON-LD Person schema.
* **Scroll Animation Feature Detection:**
  * Uses CSS `@supports (animation-timeline: scroll())` where native browser support exists.
  * Gracefully falls back to a passive `IntersectionObserver` scroll listener on non-supporting engines.
  * If `prefers-reduced-motion: reduce` is enabled, the trace line renders at 100% stroke immediately.

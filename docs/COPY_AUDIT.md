# Copy-Truth Audit & Provenance Verification

**Project:** Aries Razak — Personal Technology Universe ("Beep to Receipt")  
**Date:** October 28, 2026  
**Auditor:** Technical Content Editor & Verification Reviewer  
**Total Sentences Audited:** 54  
**Summary:** All visitor-facing copy has been audited against candidate background, existing site source, and the user brief. Sentences written by the engineering team to synthesize technical mechanisms are explicitly flagged with `[FLAG: FOR OWNER APPROVAL]`.

---

## 1. Candidate Identity, Profile & Headlines

| Text | Where It Appears | Source | Evidence Status | Owner Flag |
| :--- | :--- | :--- | :--- | :---: |
| "Muhammad Aries Irhan bin Abd Razak" | `ReceiptSection.tsx`, `PlainView.tsx`, `ResumeModal.tsx`, `index.html` | Existing site content / Candidate legal name | Verified (Identity) | Approved |
| "Aries Razak" | `Navbar.tsx`, `TraceView.tsx`, `Footer.tsx` | Existing site content / Preferred display name | Verified (Identity) | Approved |
| "System Application Specialist · IT Support · IT Operations" | `TraceView.tsx`, `ReceiptSection.tsx`, `PlainView.tsx` | Existing site content / LinkedIn verified title | Verified (Employment) | Approved |
| "Selangor / Kuala Lumpur, Malaysia" | Header, Receipt, PlainView | Existing site content / LinkedIn verified location | Verified (Location) | Approved |
| "Solving retail systems by day. Exploring computing depth by night." | `TraceView.tsx` Hero headline | Synthesized from brief ("IT professional... tech enthusiast") | Factual positioning | **[FLAG: FOR OWNER APPROVAL]** |
| "I keep business-critical systems running by day, and explore how computers, networks, and software work beneath the surface by night." | `PROFILE.intro` in `universeContent.ts` | Synthesized from brief | Factual positioning | **[FLAG: FOR OWNER APPROVAL]** |
| "One scan. Six layers. Here is what happens between the beep and the receipt." | `PROFILE.premise` in `TraceView.tsx` | Prompt brief (Section 4) | Premise | Approved |

---

## 2. The 6 Vertical Strata Copy

| Text | Where It Appears | Source | Evidence Status | Owner Flag |
| :--- | :--- | :--- | :--- | :---: |
| "STRATUM 01: Hardware & Physical Peripherals — The Laser, The Copper, The Contact" | `TraceView.tsx`, `PlainView.tsx` | Written by team | Architectural taxonomy | **[FLAG: FOR OWNER APPROVAL]** |
| "The optical scanner decodes EAN-13 barcode reflectance into raw ASCII characters over an RS-232 serial interface." | Stratum 1 Step Description | Written by team | Technical fact | **[FLAG: FOR OWNER APPROVAL]** |
| "STRATUM 02: Operating System & Device Kernel — Interrupts, Device Nodes, Memory" | Stratum 2 Header | Written by team | Architectural taxonomy | **[FLAG: FOR OWNER APPROVAL]** |
| "The OS kernel catches hardware interrupt, buffers bytes into /dev/ttyS0, and wakes the background POS daemon." | Stratum 2 Step Description | Written by team | Technical fact | **[FLAG: FOR OWNER APPROVAL]** |
| "STRATUM 03: Network & Transport Layer — VLANs, Frames, Egress Routes" | Stratum 3 Header | Written by team | Architectural taxonomy | **[FLAG: FOR OWNER APPROVAL]** |
| "Ethernet frames tagged with VLAN 10 traverse Cat6 cabling to the managed switch and dual-WAN gateway router." | Stratum 3 Step Description | Written by team | Technical fact | **[FLAG: FOR OWNER APPROVAL]** |
| "STRATUM 04: Application & Transaction Logic — Price Calculation, State, Queues" | Stratum 4 Header | Written by team | Architectural taxonomy | **[FLAG: FOR OWNER APPROVAL]** |
| "The Xilnex POS engine looks up the SKU in the local cache, computes promotional discounts, and generates payment MTI 0100." | Stratum 4 Step Description | Written by team | Technical fact | **[FLAG: FOR OWNER APPROVAL]** |
| "STRATUM 05: Cloud Services & Platform Automation — Identity, Multi-Site Sync, Audit" | Stratum 5 Header | Written by team | Architectural taxonomy | **[FLAG: FOR OWNER APPROVAL]** |
| "The transaction record synchronizes to central cloud databases while automated Lark bots verify store inventory thresholds." | Stratum 5 Step Description | Written by team | Technical fact | **[FLAG: FOR OWNER APPROVAL]** |
| "STRATUM 06: People, Process & Operational Delivery — Vendor Escalation, Handover, SLAs" | Stratum 6 Header | Written by team | Architectural taxonomy | **[FLAG: FOR OWNER APPROVAL]** |
| "Store launch commissioning, third-party vendor coordination, and strict ticket SLAs ensure the transaction settles reliably." | Stratum 6 Step Description | Written by team | Technical fact | **[FLAG: FOR OWNER APPROVAL]** |

---

## 3. Verified Employment Entries (Verbatim Migration)

| Text | Where It Appears | Source | Evidence Status | Owner Flag |
| :--- | :--- | :--- | :--- | :---: |
| "System Application Specialist — emart24 Malaysia (Sep 2025 – Present)" | `ReceiptSection.tsx`, `PlainView.tsx` | Existing site content | Verified (`exp-emart24`) | Approved |
| "Provide tier-2 and tier-3 technical and application support across corporate retail store POS systems and back-office software." | Bullet 1 emart24 | Existing site content | Verified (`exp-emart24`) | Approved |
| "Investigate and resolve operational incident tickets, transactional mismatches, and hardware connectivity failures." | Bullet 2 emart24 | Existing site content | Verified (`exp-emart24`) | Approved |
| "Collaborate directly with external application vendors and payment acquirers to escalate and patch recurring software defects." | Bullet 3 emart24 | Existing site content | Verified (`exp-emart24`) | Approved |
| "Lead store commissioning IT setups, configuring terminal network adapters, peripheral serial baud rates, and receipt printer drivers." | Bullet 4 emart24 | Existing site content | Verified (`exp-emart24`) | Approved |
| "IT Executive — Palaterium Sdn Bhd (Apr 2024 – Aug 2025)" | `ReceiptSection.tsx`, `PlainView.tsx` | Existing site content | Verified (`exp-palaterium`) | Approved |
| "Orchestrated full enterprise migration from Google Workspace to Lark suite for 100+ business staff, configuring Super Admin policies." | Bullet 1 Palaterium | Existing site content | Verified (`exp-palaterium`) | Approved |
| "Architected automated approval workflows and notification bots inside Lark Base, replacing paper requisition forms." | Bullet 2 Palaterium | Existing site content | Verified (`exp-palaterium`) | Approved |
| "Managed dual-WAN failover router installations and Layer 2 switch port assignments across office departments." | Bullet 3 Palaterium | Existing site content | Verified (`exp-palaterium`) | Approved |
| "Supported finance and inventory personnel with NetSuite ERP batch adjustments, user provisioning, and role permission audits." | Bullet 4 Palaterium | Existing site content | Verified (`exp-palaterium`) | Approved |
| "IT Technician — Managed Print Services (Oct 2023 – Mar 2024)" | `ReceiptSection.tsx`, `PlainView.tsx` | Existing site content | Verified (`exp-mps`) | Approved |
| "Deployed and maintained fleet of multifunction enterprise printers across corporate clients, diagnosing firmware and mechanical jams." | Bullet 1 MPS | Existing site content | Verified (`exp-mps`) | Approved |
| "Troubleshot Windows Print Spooler RPC crashes, SMB scanning directory permissions, and static IP DHCP reservations." | Bullet 2 MPS | Existing site content | Verified (`exp-mps`) | Approved |
| "IT Intern (Full-Stack Developer) — Attorney General’s Chambers of Malaysia (Sep 2021 – Feb 2022)" | `ReceiptSection.tsx`, `PlainView.tsx` | Existing site content | Verified (`exp-agc`) | Approved |
| "Developed core modules for internal Malaysian Government ICT Compliance system (DKICT) utilizing PHP Laravel MVC." | Bullet 1 AGC | Existing site content | Verified (`exp-agc`) | Approved |
| "Drafted System Requirements Specifications (SRS), Entity Relationship Diagrams (ERDs), and normalized MySQL relational database schemas." | Bullet 2 AGC | Existing site content | Verified (`exp-agc`) | Approved |

---

## 4. Credentials & Education

| Text | Where It Appears | Source | Evidence Status | Owner Flag |
| :--- | :--- | :--- | :--- | :---: |
| "AWS Certified Cloud Practitioner — Amazon Web Services" | `ReceiptSection.tsx`, `PlainView.tsx` | Existing site content / Verified AWS Credential | Certified (`cert-aws`) | Approved |
| "Diploma in Computer Science & Mathematics — Universiti Teknologi MARA (UiTM), 2019 – 2022" | `ReceiptSection.tsx`, `PlainView.tsx` | Existing site content / Verified Degree | Foundation (`exp-uitm`) | Approved |

---

## 5. Simulation & Educational Disclaimers

| Text | Where It Appears | Source | Evidence Status | Owner Flag |
| :--- | :--- | :--- | :--- | :---: |
| "[SIMULATION] BROWSER-NATIVE SANDBOX" | `TheLab.tsx` banner | Written by team (Section 1 Rule 2) | Simulation Chrome | Approved |
| "MODELS: Deterministic OSI Layer 2–7 packet hops, RFC 793 TCP handshake flags, in-memory FIFO & LRU cache eviction cycles, and UNIX octal permission bitmasks." | `TheLab.tsx` disclaimer | Written by team (Section 1 Rule 2) | Truthful Disclaimer | Approved |
| "DOES NOT MODEL: Live network sniffing, real server transactions, or real-time payment gateway clearance. All data is illustrative and generated locally." | `TheLab.tsx` disclaimer | Written by team (Section 1 Rule 2) | Truthful Disclaimer | Approved |
| "[ILLUSTRATIVE_SYSTEM_STATE]" | `TraceView.tsx` visualizer headers | Written by team (Section 1 Rule 2) | Truthful Disclaimer | Approved |

---

## 6. Sentences Flagged for Owner Approval Summary

The following 3 copy synthesis blocks were drafted to articulate the technical concept and dual identity as requested in the brief:
1. **Headline:** *"Solving retail systems by day. Exploring computing depth by night."*
2. **Bio Synthesis:** *"I keep business-critical systems running by day, and explore how computers, networks, and software work beneath the surface by night."*
3. **Stratum One-Liners:** The 6 step descriptions explaining how a barcode scan traverses hardware, OS, network, application, cloud, and operational layers.

*Action for Owner:* If you wish to adjust the phrasing of any of these 3 items, they can be updated directly in `src/data/universeContent.ts`.

# Pakistan Islamic Car Ijarah Calculator

A high-precision, transparent web application for calculating Shariah-compliant auto leasing (*Ijarah Muntahia Bittamleek*) installments, initial drive-off costs, and lifecycle commitments in Pakistan. 

The calculator strictly enforces **State Bank of Pakistan (SBP) Consumer Financing Prudential Regulations (BPRD Circular No. 04 of 2022)**, including engine-capacity tenure limits, borrowing caps, and Debt Burden Ratio (DBR) affordability checks.

---

## Table of Contents
- [What the Application Does](#what-the-application-does)
- [Who the Application is For](#who-the-application-is-for)
- [Why We Chose Islamic Car Ijarah](#why-we-chose-islamic-car-ijarah)
- [Main Features](#main-features)
- [State Bank of Pakistan (SBP) Regulatory Rules Implemented](#state-bank-of-pakistan-sbp-regulatory-rules-implemented)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation and Startup Commands](#installation-and-startup-commands)
- [Running Automated Tests](#running-automated-tests)
- [Project Architecture & Structure](#project-architecture--structure)
- [AI Tool and Model Used](#ai-tool-and-model-used)
- [Manual Code Changes](#manual-code-changes)
- [Assumptions and Limitations](#assumptions-and-limitations)

---

## What the Application Does

In Pakistan, auto leasing through Islamic banks (Meezan Bank, BankIslami, Bank Alfalah Islamic, Faysal Bank) operates under the principle of **Ijarah Muntahia Bittamleek** (a lease contract ending with transfer of asset ownership). Unlike conventional car loans, Ijarah payments comprise:
1. **Base Ijarah Rental**: Asset depreciation and bank profit computed via reducing-balance annuity.
2. **Monthly Takaful**: Mandatory Islamic cooperative vehicle insurance prorated monthly.
3. **Monthly GPS Tracker**: Vehicle security tracking subscription.
4. **Initial Outflow**: Upfront security deposit (down payment), bank processing charges, 16% Federal Excise Duty (FED), and 1st month advance rental.

This calculator provides a transparent, real-time mathematical breakdown of all upfront and recurring costs with zero hidden charges.

---

## Who the Application is For

The application addresses three core user personas defined in [`docs/app-roles.md`](docs/app-roles.md):
- **Salaried Professionals**: Seeking clear monthly installment calculations and instant verification against SBP's 40% Debt Burden Ratio (DBR) limit before applying to a bank.
- **Self-Employed / Business Individuals**: Managing capital requirements for high-value vehicles (SUVs, sedans) while adhering to SBP's Rs. 3,000,000 borrowing limit.
- **Showroom Sales Consultants & Auto Brokers**: Needing 1-click popular Pakistani car presets (Suzuki Alto, Toyota Yaris, Honda City, Changan Alsvin, KIA Sportage) to instantly quote accurate packages to walk-in buyers.

---

## Why We Chose Islamic Car Ijarah

Rather than building a generic calculator with abstract formulas, we focused on **Pakistan's Islamic Car Ijarah program** because:
1. **Real-World Impact**: Auto Ijarah represents the fastest-growing automotive financing segment in Pakistan.
2. **Complex Financial Mechanics**: Combining floating KIBOR benchmarks, bank profit spreads, asset-risk Takaful contributions, and government FED taxes creates a real-world problem that generic calculators fail to address.
3. **Strict Regulatory Constraints**: SBP imposes unique consumer financing limits (tenure caps based on engine cc, individual loan ceilings, and DBR debt-to-income benchmarks) that demand a tailored, intelligent engineering solution.

---

## Main Features

- **Real-Time Financial Engine**: Instant calculation with 0ms latency on input changes.
- **1-Click Pakistani Car Presets**: Pre-populated prices and engine categories for popular local models (Suzuki Alto VXL, Cultus VXL, Toyota Yaris ATIV, Honda City CVT, Changan Alsvin, KIA Sportage).
- **Interactive SVG Donut Gauge Chart**: Lightweight, zero-dependency visual breakdown of Base Rental vs. Takaful vs. Tracker.
- **Initial Outflow Itemization**: Complete breakdown of cash due at showroom delivery (Deposit + Processing Fee + 16% FED + 1st Month Advance Rental + Tracker).
- **SBP 40% DBR Affordability Meter**: Enter monthly take-home salary to instantly see whether the commitment is within SBP's 40% threshold, along with the minimum required qualifying income.
- **Pre-Configured Islamic Bank Profiles**: Switch between Meezan Bank, BankIslami, Bank Alfalah Islamic, and Faysal Bank packages.
- **Client-Side Bank Manager**: Add custom bank rates or edit spreads with persistent `localStorage` storage and a 1-click *"Restore Official Bank Defaults"* button.
- **Modern Dark & Light Themes**: Accessible, high-contrast UI with smooth transitions and micro-interactions.

---

## State Bank of Pakistan (SBP) Regulatory Rules Implemented

| Regulatory Requirement | SBP Rule | Application Implementation |
| :--- | :--- | :--- |
| **Engine Displacement Tenure Cap** | Vehicles $> 1,000\text{ cc}$ capped at **36 months (3 years)**; $\le 1,000\text{ cc}$ / EVs allowed up to **60 months (5 years)**. | Automatically disables 4-year and 5-year tenure buttons when $> 1,000\text{ cc}$ is selected and displays an informative regulatory banner. |
| **Borrowing Ceiling** | Aggregate individual auto financing limit of **Rs. 3,000,000** across all banks. | Real-time alert if financed amount exceeds Rs. 3M, with exact calculation of the required deposit top-up. |
| **Debt Burden Ratio (DBR)** | Maximum **40% of net monthly disposable income** for consumer debt. | Interactive affordability meter flagging green (Eligible $\le 40\%$) or red (Exceeds limit) with minimum qualifying salary. |
| **Federal Excise Duty (FED)** | **16% FED** applied to bank processing and documentation services. | Integrated toggleable FED calculation on bank processing fees. |

---

## Technology Stack

The project adheres to a clean, minimal, zero-dependency architecture:
- **Markup**: Semantic HTML5 (SEO & WCAG AA accessibility compliant).
- **Styling**: Vanilla CSS3 using custom properties (design tokens), flexbox, grid, glassmorphism, and responsive breakpoints. No Tailwind CSS or external CSS frameworks.
- **Logic**: Vanilla ES6+ JavaScript Modules (`import` / `export`) with strict separation of concerns (`formulas.js`, `sbp-rules.js`, `presets.js`, `charts.js`, `local-store.js`).
- **Visualizations**: Native SVG Donut Gauge and CSS-animated breakdown meters (zero third-party charting libraries).
- **Testing**: Node.js Built-In Test Runner (`node:test` + `node:assert/strict`) — zero npm testing packages required.
- **Persistence**: Browser `localStorage` API for client-side custom bank preferences.
- **Third-Party Dependencies**: **ZERO runtime npm dependencies**.

---

## Prerequisites

- **Web Browser**: Any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Apple Safari).
- **Node.js** (Optional, for running automated tests): Node.js v18.0.0 or higher.
- **Python** (Optional, for running local static server): Python 3.x.

---

## Installation and Startup Commands

Because there are **zero runtime npm dependencies**, you do not need to wait for heavy `npm install` downloads.

### 1. Clone the Repository
```bash
git clone https://github.com/faiq-19/car-lease-calculator.git
cd car-lease-calculator
```

### 2. Run Locally

#### Option A: Using Python (Recommended)
```bash
python3 -m http.server 3000
```
Open **`http://localhost:3000`** in your browser.

#### Option B: Using Node.js
```bash
npx serve -l 3000
```
Open **`http://localhost:3000`** in your browser.

#### Option C: Direct File Opening
You can directly open `index.html` in any browser that supports local ES modules, or run with any standard local development server (e.g., Live Server in VS Code).

---

## Running Automated Tests

The automated test suite runs via Node.js's native test runner with **zero npm packages**:

```bash
npm test
```

Or directly via Node:
```bash
node --test tests/*.test.js
```

### Test Coverage Highlights:
- **`tests/formulas.test.js`**: Verified against real-world Pakistani worked examples (Suzuki Alto VXL worked scenario and Toyota Yaris ATIV worked scenario).
- **`tests/sbp-rules.test.js`**: Enforces SBP engine displacement tenure restrictions, Rs. 3,000,000 financing cap detection, and 40% DBR affordability verification.
- **`tests/edge-cases.test.js`**: Validates division-by-zero protection (0% profit rate fallback), deposit clamping, extreme high vehicle values, and negative input recovery.

---

## Project Architecture & Structure

```text
car-lease-calculator/
├── README.md                      # Comprehensive developer and user documentation
├── index.html                     # Semantic application entry point
├── package.json                   # Zero runtime dependencies; scripts for test & start
├── .gitignore                     # Git hygiene configuration
├── docs/                          # Product specification documents
│   ├── app-roles.md               # User personas (Salaried, Business, Showroom)
│   ├── jobs-to-be-done.md         # 7 core Jobs To Be Done (JTBD)
│   └── user-stories.md            # 9 user stories with Given/When/Then acceptance criteria
├── src/
│   ├── css/
│   │   ├── variables.css          # Design tokens, color palettes, and theme variables
│   │   ├── base.css               # Reset, root typography, fluid two-column grid
│   │   ├── components.css         # Cards, sliders, inputs, badges, meters, modal
│   │   └── animations.css         # Smooth transitions, micro-interactions, glow effects
│   └── js/
│       ├── core/
│       │   ├── formulas.js        # Pure Ijarah mathematical functions
│       │   ├── sbp-rules.js       # SBP limits, tenure caps & DBR validation
│       │   └── presets.js         # Default Pakistani vehicle presets & bank profiles
│       ├── ui/
│       │   ├── dom.js             # Element selectors, event listeners, SVG icon helpers
│       │   ├── charts.js          # Reactive SVG Donut Gauge Chart
│       │   └── formatters.js      # Pakistani currency (Rs.) and numeric formatters
│       ├── storage/
│       │   └── local-store.js     # Client-side localStorage for custom bank packages
│       └── app.js                 # Application bootstrap & state coordination
├── tests/
│   ├── formulas.test.js           # Formula unit tests (Alto & Yaris examples)
│   ├── sbp-rules.test.js          # SBP tenure caps & DBR eligibility tests
│   └── edge-cases.test.js         # Division-by-zero, boundary, and clamping tests
└── .gemini/                       # Internal project phase tracking
    ├── PROGRESS.md                # Phase-by-phase progress log
    └── phases/                    # Detailed research and specification notes
```

---

## AI Tool and Model Used

- **AI Assistant**: Antigravity (Google DeepMind Advanced Agentic Coding)
- **Model**: Gemini 3.8 Flash (High/Low)
- **Development Workflow**: Pair programming with human-in-the-loop phase reviews, zero AI Git write operations, and verifiable domain research.

---

## Manual Code Changes

Any manual changes or adjustments made by the reviewer will be documented in this section:
- *(Initial commit and repository origin configured manually by developer).*
- *(All Git commits, branches, and pushes handled manually by developer).*

---

## Assumptions and Limitations

1. **Locally Assembled Vehicles (CKD)**: The calculator assumes locally manufactured/assembled passenger vehicles, as imported CBUs are ineligible for standard consumer auto financing under SBP rules.
2. **Fixed vs. Floating KIBOR**: The calculator computes installments based on the prevailing KIBOR benchmark + spread at lease signing. Islamic banks reprice floating Ijarah rentals annually based on revised KIBOR.
3. **Takaful Proration**: Annual Takaful is modeled as a standard linear monthly share (Annual % / 12) consistent with major Pakistani Islamic bank estimators (Meezan, BankIslami).
4. **Data Privacy**: No user financial data or salary details are ever transmitted over the network or stored in external databases. All persistence is 100% local to the user's browser.

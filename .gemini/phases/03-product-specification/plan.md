# Phase 3: Product Specification & Implementation Plan

**Project**: Pakistan Islamic Car Ijarah Calculator (*Ijarah Muntahia Bittamleek*)  
**Author**: Antigravity Assistant & Engineering Team  
**Date**: November 2026  
**Status**: Ready for Review & Approval  

---

## Executive Summary

Phase 3 transitions our approved product research and technology stack into an actionable, structured engineering blueprint. In accordance with project instructions:
1. Created the 3 mandatory product documents:
   - [`docs/app-roles.md`](file:///home/faiq/Development/Projects/knowledgecity/docs/app-roles.md) (Salaried Professional, Self-Employed Businessman, Showroom Sales Rep)
   - [`docs/jobs-to-be-done.md`](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md) (7 core jobs with role associations)
   - [`docs/user-stories.md`](file:///home/faiq/Development/Projects/knowledgecity/docs/user-stories.md) (9 user stories with Given/When/Then acceptance criteria, all marked `Not implemented`)
2. Created the repository hygiene configuration in [`.gitignore`](file:///home/faiq/Development/Projects/knowledgecity/.gitignore).
3. Developed the technical specifications, component hierarchy, test suite structure, edge case handling, and proposed Git commit plan.

---

## 1. Application Architecture & Component Structure

The application will be built as a responsive, high-performance, single-page web application with modular separation of concerns.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        PAKISTAN ISLAMIC CAR IJARAH APP                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│ [Header] Brand Logo | Title | SBP Regulations Badge | Dark/Light Mode Toggle   │
├───────────────────────────────────────┬─────────────────────────────────────────┤
│ [LEFT COLUMN: Input & Configuration]  │ [RIGHT COLUMN: Live Output Dashboard]   │
│                                       │                                         │
│ 1. Vehicle Presets (Alto, Cultus,     │ 1. Hero Card: Total Monthly Ijarah      │
│    Yaris, City, Alsvin, Sportage)     │    Rental (Large Currency Callout)      │
│ 2. Vehicle Price & Engine CC Selector │                                         │
│    (Auto-enforces SBP tenure limits)  │ 2. Monthly Rental Breakdown:            │
│ 3. Bank Profile Selector              │    - Base Rental (Principal + Profit)   │
│    (Meezan, BankIslami, Alfalah, etc.)│    - Monthly Takaful (Asset Insurance)  │
│ 4. Deposit & Tenure Sliders           │    - Monthly Tracker Fee                │
│    (Min 30% SBP rule, tenure buttons) │    - Interactive SVG Donut Gauge Chart  │
│ 5. Profit Rate Builder                │                                         │
│    (KIBOR benchmark + Bank Spread)    │ 3. Initial Outflow (Due at Signing):    │
│ 6. Fees & Takaful Settings            │    - Security Deposit                   │
│    (Takaful %, Tracker, Proc. Fee)    │    - Bank Processing Fee + 16% FED      │
│ 7. SBP 40% DBR Affordability Input    │    - 1st Month Advance Rental           │
│    (Net take-home income field)       │    - Total Cash Required to Drive-Off   │
│                                       │                                         │
│                                       │ 4. SBP Regulatory Status Alerts:        │
│                                       │    - DBR Meter: Green (Eligible <= 40%) │
│                                       │    - Financing Cap: Alert if > Rs. 3M   │
│                                       │    - Tenure Badge: Capped at 36mo (>1L) │
│                                       │                                         │
│                                       │ 5. Total Lifecycle Outflow Summary      │
├───────────────────────────────────────┴─────────────────────────────────────────┤
│ [Manage Banks Modal] Add custom bank / Update spreads / Reset to defaults       │
├─────────────────────────────────────────────────────────────────────────────────┤
│ [Footer] Shariah & SBP Regulatory Disclosures | Zero-Cost Open Source | 2026    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Source Code Directory Layout

```text
src/
├── css/
│   ├── variables.css          # Design tokens (colors, gradients, typography, spacing)
│   ├── base.css               # Reset, root typography, fluid container layout
│   ├── components.css         # Sliders, cards, meters, badges, modal dialog
│   └── animations.css         # Transitions, chart animations, glow effects
├── js/
│   ├── core/
│   │   ├── formulas.js        # Pure Ijarah formulas (Principal, Base Rental, Takaful)
│   │   ├── sbp-rules.js       # SBP limits: tenure cap, Rs. 3M limit, 40% DBR
│   │   └── presets.js         # Default Pakistani vehicle presets & bank profiles
│   ├── ui/
│   │   ├── dom.js             # Element selectors, event listeners, input binders
│   │   ├── charts.js          # SVG Donut Gauge & animated CSS breakdown bars
│   │   └── formatters.js      # Pakistani currency (Rs.) and percentage formatters
│   ├── storage/
│   │   └── local-store.js     # localStorage management for custom bank profiles
│   └── app.js                 # Application bootstrap & state coordination
tests/
├── formulas.test.js           # Mathematical verification of all Ijarah formulas
├── sbp-rules.test.js          # Verification of SBP regulatory rules and limits
└── edge-cases.test.js         # Boundary tests, 0% profit, extreme values, clamping
index.html                     # Semantic HTML5 entry point
package.json                   # Zero runtime dependencies, scripts for test & start
.gitignore                     # Git hygiene configuration
```

---

## 2. API Routes & Database Requirements (Confirmed: Zero)

- **API Routes**: None. All logic executes in client-side JavaScript. This preserves offline capability, sub-millisecond execution, and total user privacy.
- **Database**: None. Bank profiles and user preferences are stored in the browser's native `localStorage` API, with an instantaneous one-click "Restore Official Bank Defaults" capability.

---

## 3. Implementation of Financial Calculations & SBP Rules

### 3.1 Financial Formulas Module (`src/js/core/formulas.js`)
- `calculatePrincipal(vehiclePrice, securityDeposit)`: Enforces $P = \text{Price} - \text{Deposit}$.
- `calculateBaseRental(principal, annualProfitRate, tenureMonths)`:
  - If $\text{rate} > 0$: $R_{\text{base}} = P \times \frac{r(1+r)^n}{(1+r)^n - 1}$ where $r = \frac{\text{rate}}{1200}$.
  - If $\text{rate} == 0$: Fallback $R_{\text{base}} = P / n$ (division-by-zero protection).
- `calculateMonthlyTakaful(vehiclePrice, annualTakafulRate)`: $T_m = \frac{\text{Price} \times \text{Takaful Rate}}{1200}$.
- `calculateTotalMonthlyRental(baseRental, monthlyTakaful, monthlyTracker)`: $R_{\text{total}} = R_{\text{base}} + T_m + Tr_m$.
- `calculateInitialOutflow(deposit, processingFee, applyFed, totalMonthlyRental)`:
  - $\text{FED} = \text{applyFed} ? \text{processingFee} \times 0.16 : 0$.
  - $\text{Total Upfront} = \text{Deposit} + \text{ProcessingFee} + \text{FED} + \text{TotalMonthlyRental}$.
- `calculateLifecycleCost(initialOutflow, totalMonthlyRental, tenureMonths)`:
  - $\text{Lifecycle} = \text{InitialOutflow} + (\text{TotalMonthlyRental} \times (n - 1))$.

### 3.2 SBP Regulatory Module (`src/js/core/sbp-rules.js`)
- `getMaximumTenure(engineDisplacementCategory)`:
  - If category is `> 1,000 cc`: Returns 36 months (3 years).
  - If category is `≤ 1,000 cc or EV`: Returns 60 months (5 years).
- `checkFinancingCap(principal)`:
  - Returns `{ exceedsCap: principal > 3000000, maxCap: 3000000, excess: Math.max(0, principal - 3000000) }`.
- `calculateDBR(monthlyPayment, monthlyIncome)`:
  - If $\text{income} \le 0$: Returns `{ dbrPercentage: 0, isEligible: true, hasIncome: false }`.
  - If $\text{income} > 0$: $\text{DBR} = \frac{\text{monthlyPayment}}{\text{income}} \times 100$.
  - Returns `{ dbrPercentage, isEligible: dbrPercentage <= 40.0, requiredIncome: monthlyPayment / 0.40 }`.

---

## 4. Input Validation & Error Handling Strategy

| Input Field | Validation Rule | Normal Handling | Boundary & Edge Handling |
| :--- | :--- | :--- | :--- |
| **Vehicle Price** | Positive number | Normal input (e.g. Rs. 3,500,000) | Clamped to min Rs. 500,000; max Rs. 50,000,000. Prevents negative or NaN. |
| **Security Deposit** | Percentage (15% - 90%) | Linked percentage slider & rupee input box | Clamped so deposit is strictly $< \text{Vehicle Price}$. If user types deposit $\ge$ price, clamped to 90% with warning. |
| **Tenure** | 12, 24, 36, 48, 60 mo | Clickable button group | Automatically disables 48 & 60 mo if vehicle is $> 1,000\text{ cc}$. |
| **Profit Rate** | Number (0.0% - 35.0%) | KIBOR + Bank Spread inputs | 0.0% triggers zero-interest fallback; values $> 35\%$ trigger high-rate advisory. |
| **Net Income** | Number $\ge 0$ | Optional input | If 0 or empty, DBR meter shows neutral state without breaking. |

---

## 5. Automated Test Plan & Sample Test Cases

We will implement three automated test suites executed via Node.js built-in `node:test`:

### 5.1 Suite 1: `tests/formulas.test.js`
- Test 1.1: Verify Suzuki Alto VXL calculation matching worked example:
  - Expected: Base Rental = Rs. 51,353.56; Takaful = Rs. 5,083.33; Total = Rs. 57,936.90.
- Test 1.2: Verify Toyota Yaris ATIV calculation matching worked example:
  - Expected: Base Rental = Rs. 99,142.83; Takaful = Rs. 8,616.67; Total = Rs. 109,559.50.
- Test 1.3: Verify 16% FED calculation on bank processing fee (Rs. 10,000 $\to$ Rs. 1,600).
- Test 1.4: Verify Initial Outflow summation accuracy (within 1 cent/rupee).

### 5.2 Suite 2: `tests/sbp-rules.test.js`
- Test 2.1: Verify maximum tenure is 36 months for $> 1,000\text{ cc}$ vehicles.
- Test 2.2: Verify maximum tenure is 60 months for $\le 1,000\text{ cc}$ vehicles.
- Test 2.3: Verify SBP Rs. 3M financing cap detection when principal is Rs. 3,290,000.
- Test 2.4: Verify SBP 40% DBR returns eligible when DBR = 28.97% ($\le 40\%$).
- Test 2.5: Verify SBP 40% DBR returns ineligible and calculates minimum required salary when DBR = 43.82% ($> 40\%$).

### 5.3 Suite 3: `tests/edge-cases.test.js`
- Test 3.1: 0% profit rate division-by-zero protection.
- Test 3.2: Clamping deposit when user inputs deposit $\ge$ vehicle price.
- Test 3.3: Handling empty or negative income input.
- Test 3.4: Extreme high vehicle price (Rs. 50,000,000) formatting and precision.

---

## 6. GitHub Workflows & Repository Hygiene

### 6.1 Continuous Integration (`.github/workflows/ci.yml`)
- Triggers on `push` and `pull_request` to `master`.
- Sets up Node.js v20/v24.
- Runs `npm test` (executing Node's built-in `node:test`).
- Blocks broken changes if any financial or regulatory assertion fails.

### 6.2 Continuous Deployment (`.github/workflows/deploy.yml`)
- Triggers on `push` to `master`.
- Deploys static files directly to GitHub Pages using official GitHub Actions (`actions/deploy-pages`).

---

## 7. Proposed Git Commit Plan

> **Note**: In strict accordance with General Rule 9, the AI assistant will **never execute Git write commands**. All Git commits, pushes, and branches will be executed manually by you. Below is the proposed, structured commit plan:

| Commit # | Proposed Message | Purpose & Contents |
| :--- | :--- | :--- |
| **Commit 1** | `chore: setup project structure, progress tracking, and gitignore` | Adds `.gemini/` documentation, `PROGRESS.md`, and `.gitignore`. |
| **Commit 2** | `docs: add product specification documents (roles, jtbd, user stories)` | Adds `docs/app-roles.md`, `docs/jobs-to-be-done.md`, and `docs/user-stories.md`. |
| **Commit 3** | `feat(core): implement financial formulas and SBP regulatory rules with unit tests` | Adds `src/js/core/formulas.js`, `src/js/core/sbp-rules.js`, `src/js/core/presets.js`, and test suites in `tests/`. Adds `package.json` with test scripts. |
| **Commit 4** | `feat(ui): implement modern responsive interface, styles, and SVG breakdown chart` | Adds `index.html`, `src/css/*.css`, and `src/js/ui/*.js` with dark/light themes and reactive inputs. |
| **Commit 5** | `feat(storage): implement local bank management and persistence` | Adds `src/js/storage/local-store.js` and custom bank management modal with reset functionality. |
| **Commit 6** | `ci: configure GitHub Actions workflows for automated testing and deployment` | Adds `.github/workflows/ci.yml` and `.github/workflows/deploy.yml`. |
| **Commit 7** | `docs: update user stories status and finalize README documentation` | Updates `docs/user-stories.md` to `Implemented`, finalizes `README.md` and session transcripts. |

---

## 8. Browser Compatibility & Accessibility (a11y) Standards

1. **Browser Compatibility**: Fully tested across current versions of Google Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari (desktop and mobile).
2. **Accessibility**:
   - Proper semantic HTML elements (`<header>`, `<main>`, `<section>`, `<article>`, `<button>`, `<label>`).
   - Every input has an explicitly associated `<label>` or `aria-label`.
   - High color contrast ratio (WCAG AA compliant $\ge 4.5:1$) in both light and dark themes.
   - Sliders paired with numeric inputs for full keyboard accessibility and screen-reader usability.
3. **SEO & Performance**:
   - Proper meta tags, page title, and OpenGraph descriptors.
   - Sub-50ms load time with zero layout shift (CLS = 0).

---

## Summary & Approval Request

With Phase 3 complete:
- The 3 required product documents are authored in [`docs/`](file:///home/faiq/Development/Projects/knowledgecity/docs/).
- The `.gitignore` is created.
- The complete technical specification, component architecture, test plan, and commit roadmap are documented.

Please review this specification. Once approved:
- I will mark **Phase 3 as Completed** in [PROGRESS.md](file:///home/faiq/Development/Projects/knowledgecity/.gemini/PROGRESS.md).
- We will proceed to **Phase 4: Implementation**.

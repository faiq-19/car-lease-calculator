# Phase 1: Product & Financial Research Report — Pakistan Islamic Car Ijarah

**Project**: Pakistan Islamic Car Ijarah Calculator (*Ijarah Muntahia Bittamleek*)  
**Scope**: Focused specifically on the **Pakistan Automotive Market** and **Islamic Auto Ijarah Program**  
**Author**: Antigravity Assistant & Engineering Team  
**Date**: November 2026  
**Status**: Revised Scope — Ready for Review & Approval  

---

## Executive Summary

Following product direction, the scope of this project is streamlined and focused entirely on the **Pakistani automotive market** under the **Islamic Car Ijarah (*Ijarah Muntahia Bittamleek*)** financial and regulatory framework. 

Islamic Car Ijarah is the dominant Shariah-compliant auto-financing structure offered by leading Pakistani Islamic financial institutions (Meezan Bank, BankIslami, Bank Alfalah Islamic, Faysal Bank Islamic, and Dubai Islamic Bank Pakistan). Unlike conventional auto leasing, Islamic Ijarah contracts operate on the lease of asset usufruct (*Manfa'ah*), governed by the **State Bank of Pakistan (SBP) Prudential Regulations for Consumer Financing** and **AAOIFI Shariah Standard No. 9**. 

This research defines the exact financial mechanics, SBP regulatory restrictions (security deposit minimums, engine-capacity tenure limits, and financing caps), Takaful (Islamic mutual insurance) integration, GPS tracking charges, and Debt Burden Ratio (DBR) affordability checks required to build an authoritative, transparent, and user-friendly web application.

---

## 1. Target Audience & Problem Space in Pakistan

### 1.1 Who Uses This Calculator?

| User Segment | Profile & Real-World Situation | Core Pain Point Solved |
| :--- | :--- | :--- |
| **Salaried Professional in Pakistan** | Employed in corporate or public sector earning a fixed monthly salary. Planning to acquire a locally assembled car (e.g., Suzuki Alto, Toyota Yaris, Honda City, Changan Alsvin). | Confused by complex bank quotes that don't explain how KIBOR floating rates, mandatory Takaful, tracker charges, and Federal Excise Duty (FED) add up to the final monthly installment. |
| **Self-Employed / Businessman** | Business owner or freelancer in Pakistan with variable monthly cash flows. Seeking asset ownership without violating Islamic principles against *Riba* (usury). | Faces higher minimum security deposit requirements (typically 25%–35%) and needs to determine exact upfront capital requirements before applying. |
| **Shariah-Conscious Buyer** | Customer specifically avoiding conventional bank interest (*Riba*) and conventional insurance (*Gharar*). | Wants verification that the calculation strictly reflects an *Ijarah* usufruct rental schedule and transparent *Takaful* contribution rather than compounding interest on money. |
| **Dealership / Sales Executive** | Auto showroom sales representative at PakWheels, Suzuki, Toyota, or Honda dealerships. | Needs a quick, accurate tool to instantly calculate monthly rentals and verify whether a customer satisfies the SBP Debt Burden Ratio (DBR) criteria before submitting bank paperwork. |

### 1.2 Core Problems Solved
1. **The "Hidden Cost" Shock**: Pakistani car buyers are frequently surprised at delivery by auxiliary costs: 16% FED on processing fees, upfront advance rentals, tracker installation, and annual Takaful proration. This calculator makes all upfront and recurring costs completely transparent.
2. **SBP Regulatory Confusion**: Many buyers do not know that the State Bank of Pakistan restricts vehicle tenure based on engine capacity (max 3 years for vehicles $> 1,000\text{ cc}$, max 5 years for $\le 1,000\text{ cc}$) and enforces an aggregate financing cap of Rs. 3,000,000. Our calculator directly informs and guides the user through these rules.
3. **Affordability & SBP Debt Burden Ratio (DBR)**: SBP mandates that total monthly debt payments cannot exceed **40% of net monthly disposable income**. The calculator includes an instant eligibility indicator.

---

## 2. Regulatory & Shariah Framework (State Bank of Pakistan & AAOIFI)

### 2.1 What is *Ijarah Muntahia Bittamleek*?
In Islamic jurisprudence, *Ijarah* is an exchange of the usufruct (*right to use*) of an asset for an agreed rental consideration. *Ijarah Muntahia Bittamleek* is a lease agreement that concludes with the transfer of ownership of the vehicle to the customer at the end of the agreed tenure through:
- A unilateral gift deed (*Hiba*), or
- A nominal token purchase price (e.g., Rs. 1,000 or adjustment against the initial security deposit).

### 2.2 Key Distinctions from Conventional Auto Loans
1. **Asset Ownership**: The bank purchases the vehicle and remains the legal owner throughout the lease term. The customer is the *Musta'jir* (lessee).
2. **Total Loss Protection**: If the vehicle is stolen or completely wrecked (*Total Loss*), the Ijarah contract terminates immediately. The customer does not owe future rentals (unlike conventional loans where interest and balance remain due). The bank recovers the asset value through Takaful.
3. **No Rent During Delay/Non-Delivery**: Rentals strictly commence **only after** physical delivery of the vehicle to the customer.
4. **Mandatory Takaful**: Because the bank owns the asset, Islamic law requires the asset to be covered by Islamic cooperative risk-sharing (**Takaful**), not conventional interest-bearing commercial insurance.

### 2.3 SBP Consumer Financing Prudential Regulations (BPRD Circular No. 04 of 2022)
Pakistani banks must adhere to strict SBP guidelines:
1. **Minimum Security Deposit (Equity)**: Standard minimum is **30%** of the vehicle price for conventional consumers (banks may require 15%–25% for specific salaried/RDA segments, up to 35% for business individuals).
2. **Maximum Financing Limit**: SBP imposes an aggregate cap of **Rs. 3,000,000 (3 Million)** on auto financing per individual across the banking sector. If a car costs Rs. 5,000,000, the buyer must pay at least Rs. 2,000,000 (40%) as down payment to comply.
3. **Tenure Capped by Engine Displacement**:
   - **Vehicles $\le 1,000\text{ cc}$ and Local EVs**: Maximum tenure is **5 years (60 months)**.
   - **Vehicles $> 1,000\text{ cc}$**: Maximum tenure is **3 years (36 months)**.
4. **Ineligibility of Imported Vehicles (CBU)**: New or used imported CBUs are ineligible for auto financing under standard SBP regulations; financing is reserved for locally assembled/manufactured vehicles (CKD).
5. **Debt Burden Ratio (DBR)**: Total monthly consumer finance payments cannot exceed **40% of net disposable income**.

---

## 3. Financial Formulas & Mathematical Model

The calculation of monthly payments in Pakistani Islamic Car Ijarah comprises three distinct components:
1. **Base Ijarah Rental ($R_{\text{base}}$)**: Recovers the bank's asset cost plus agreed profit margin.
2. **Monthly Takaful Contribution ($T_m$)**: Prorated Islamic vehicle insurance.
3. **Monthly Tracker Fee ($Tr_m$)**: GPS vehicle tracking device subscription.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TOTAL MONTHLY IJARAH PAYMENT                         │
│                                                                        │
│   ┌────────────────────┐   ┌──────────────────┐   ┌────────────────┐   │
│   │    Base Rental     │ + │  Monthly Takaful │ + │ Monthly Tracker│   │
│   │ (Principal+Profit) │   │  (Asset Insur.)  │   │   (GPS Sub.)   │   │
│   └────────────────────┘   └──────────────────┘   └────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Mathematical Formulas

#### 1. Net Financed Amount ($P$):
$$P = \text{Vehicle Price} - \text{Security Deposit}$$

Where:
$$\text{Security Deposit} = \text{Vehicle Price} \times \text{Security Deposit Percentage (\%)} \ge \text{SBP Minimum (30\%)}$$

#### 2. Monthly Profit Rate ($r$):
Pakistani Islamic banks price Ijarah based on **KIBOR (Karachi Interbank Offered Rate) + Bank Spread** (or a fixed profit rate):
$$r = \frac{\text{Annual Profit Rate (\%)}}{12 \times 100} = \frac{\text{Benchmark KIBOR (\%)} + \text{Bank Spread (\%)}}{1200}$$

#### 3. Base Monthly Ijarah Rental ($R_{\text{base}}$):
Using the standard reducing-balance annuity formula accepted by SBP-regulated Islamic banks:
$$R_{\text{base}} = P \times \frac{r(1 + r)^n}{(1 + r)^n - 1}$$
Where $n$ is tenure in months ($12, 24, 36, 48, 60$).

*(Fallback for 0% Profit Rate: $R_{\text{base}} = P / n$ to prevent division-by-zero).*

#### 4. Monthly Takaful Component ($T_m$):
Takaful operators (Pak-Qatar, EFU General Islamic, Adamjee Takaful) charge an annual rate between 1.8% to 2.5% of the vehicle value:
$$T_m = \frac{\text{Vehicle Price} \times \text{Annual Takaful Rate (\%)}}{12 \times 100}$$

#### 5. Total Monthly Ijarah Rental ($R_{\text{total}}$):
$$R_{\text{total}} = R_{\text{base}} + T_m + Tr_m$$
Where $Tr_m$ is the monthly tracker charge (typically Rs. 1,200 to Rs. 1,800/month, or Rs. 0 if paid upfront).

#### 6. Upfront Outflow / Due at Signing:
$$\text{Initial Outflow} = \text{Security Deposit} + \text{Bank Processing Fee} + \text{FED (16\% on fee)} + R_{\text{total}} (\text{1st Month Advance Rental}) + Tr_{\text{upfront}} (\text{if applicable})$$

#### 7. SBP Debt Burden Ratio (DBR) Check:
$$\text{DBR (\%)} = \frac{R_{\text{total}} + \text{Existing Monthly Debt Payments}}{\text{Net Monthly Disposable Income}} \times 100$$
- If $\text{DBR} \le 40\%$: **Compliant with SBP Guidelines** (Eligible).
- If $\text{DBR} > 40\%$: **Exceeds SBP 40% Maximum Limit** (Ineligible without co-borrower or higher down payment).

---

## 4. Worked Numerical Examples (Verifiable Pakistani Scenarios)

### Example 1: Entry-Level Hatchback — Suzuki Alto VXL AGS ($\le 1,000\text{ cc}$)

*Target Vehicle*: Suzuki Alto VXL (658 cc, Locally Assembled). Eligible for up to 5-year tenure.

**Input Parameters**:
- Vehicle Price: **Rs. 3,050,000.00**
- Customer Type: Salaried Individual
- Security Deposit: **30.0%** = **Rs. 915,000.00**
- Financed Principal ($P$): **Rs. 2,135,000.00** (under Rs. 3M cap)
- Tenure ($n$): **60 months (5 years)**
- Annual Profit Rate: **15.50%** (1-Year KIBOR 13.0% + Bank Spread 2.5%) $\to r = 0.155 / 12 = 0.0129167$
- Annual Takaful Rate: **2.00%** per annum
- Monthly Tracker Fee: **Rs. 1,500.00**
- Bank Processing Fee: **Rs. 10,000.00** (+ 16% FED = Rs. 1,600.00)
- Customer Net Monthly Income: **Rs. 200,000.00**

**Step-by-Step Calculation**:
1. Compounding Factor $(1 + r)^{60} = (1.0129167)^{60} = 2.158866$
2. Base Ijarah Rental ($R_{\text{base}}$):
   $$R_{\text{base}} = 2,135,000 \times \frac{0.0129167 \times 2.158866}{2.158866 - 1} = 2,135,000 \times \frac{0.027885}{1.158866} = \mathbf{\text{Rs. } 51,353.56}$$
3. Monthly Takaful ($T_m$):
   $$T_m = \frac{3,050,000 \times 0.02}{12} = \mathbf{\text{Rs. } 5,083.33}$$
4. Monthly Tracker Fee ($Tr_m$):
   $$Tr_m = \mathbf{\text{Rs. } 1,500.00}$$
5. **Total Monthly Rental Outflow**:
   $$R_{\text{total}} = 51,353.56 + 5,083.33 + 1,500.00 = \mathbf{\text{Rs. } 57,936.90}$$
6. **Initial Upfront Outflow**:
   $$\text{Deposit } (915,000) + \text{Proc. Fee } (10,000) + \text{FED } (1,600) + \text{Advance Rental } (57,936.90) = \mathbf{\text{Rs. } 984,536.90}$$
7. **Total 60-Month Outflow**:
   $$984,536.90 + (59 \times 57,936.90) = \mathbf{\text{Rs. } 4,402,813.78}$$
8. **SBP DBR Check**:
   $$\text{DBR} = \frac{57,936.90}{200,000.00} = \mathbf{28.97\%} \quad (\le 40\% \implies \textbf{Eligible})$$

---

### Example 2: Mid-Tier Sedan — Toyota Yaris ATIV 1.3 CVT ($> 1,000\text{ cc}$)

*Target Vehicle*: Toyota Yaris 1.3 (1,329 cc, Locally Assembled). SBP mandates maximum 3-year tenure and Rs. 3M financing cap.

**Input Parameters**:
- Vehicle Price: **Rs. 4,700,000.00**
- Customer Type: Self-Employed / Businessman
- Security Deposit: **40.0%** = **Rs. 1,880,000.00**
- Financed Principal ($P$): **Rs. 2,820,000.00** *(Note: At 30% deposit, financed amount would be Rs. 3.29M exceeding SBP's Rs. 3M cap. 40% brings it down to Rs. 2.82M, fully compliant!)*
- Tenure ($n$): **36 months (3 years)** *(SBP maximum for $> 1,000\text{ cc}$)*
- Annual Profit Rate: **16.00%** (1-Year KIBOR 13.0% + Bank Spread 3.0%) $\to r = 0.160 / 12 = 0.0133333$
- Annual Takaful Rate: **2.20%** per annum
- Monthly Tracker Fee: **Rs. 1,800.00**
- Bank Processing Fee: **Rs. 12,000.00** (+ 16% FED = Rs. 1,920.00)
- Customer Net Monthly Income: **Rs. 250,000.00**

**Step-by-Step Calculation**:
1. Compounding Factor $(1 + r)^{36} = (1.0133333)^{36} = 1.610323$
2. Base Ijarah Rental ($R_{\text{base}}$):
   $$R_{\text{base}} = 2,820,000 \times \frac{0.0133333 \times 1.610323}{1.610323 - 1} = 2,820,000 \times \frac{0.021471}{0.610323} = \mathbf{\text{Rs. } 99,142.83}$$
3. Monthly Takaful ($T_m$):
   $$T_m = \frac{4,700,000 \times 0.022}{12} = \mathbf{\text{Rs. } 8,616.67}$$
4. Monthly Tracker Fee ($Tr_m$):
   $$Tr_m = \mathbf{\text{Rs. } 1,800.00}$$
5. **Total Monthly Rental Outflow**:
   $$R_{\text{total}} = 99,142.83 + 8,616.67 + 1,800.00 = \mathbf{\text{Rs. } 109,559.50}$$
6. **Initial Upfront Outflow**:
   $$\text{Deposit } (1,880,000) + \text{Proc. Fee } (12,000) + \text{FED } (1,920) + \text{Advance Rental } (109,559.50) = \mathbf{\text{Rs. } 2,003,479.50}$$
7. **Total 36-Month Outflow**:
   $$2,003,479.50 + (35 \times 109,559.50) = \mathbf{\text{Rs. } 5,838,061.99}$$
8. **SBP DBR Check**:
   $$\text{DBR} = \frac{109,559.50}{250,000.00} = \mathbf{43.82\%} \quad (> 40\% \implies \textbf{Exceeds SBP Limit by 3.82\%})$$
   *Actionable Recommendation for user*: Increase deposit to 45% or extend co-borrower income to qualify.

---

## 5. Input & Output Parameter Specifications

### 5.1 Input Parameters

| Parameter | Type | Required | Default | Pakistani Market Range | Validation & SBP Regulatory Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Vehicle Price** | Number | **Yes** | Rs. 3,500,000 | Rs. 1,500,000 to Rs. 25,000,000 | Ex-factory / invoice price of locally assembled car. |
| **Engine Displacement** | Enum | **Yes** | $\le 1,000\text{ cc}$ | `$\le 1,000\text{ cc}$ / EV` or `$> 1,000\text{ cc}$` | **SBP Rule**: Governs maximum permitted tenure. |
| **Customer Type** | Enum | **Yes** | Salaried | `Salaried` or `Business / Self-Employed` | Determines standard deposit guidelines (15%-30% vs 25%-35%). |
| **Security Deposit (%)** | Number | **Yes** | 30.0% | 15.0% to 75.0% | Minimum 30% standard SBP rule. |
| **Tenure (Years / Months)**| Integer | **Yes** | 36 mo (3 yrs) | 12 to 60 months (1 to 5 yrs) | Max 36 mo for $> 1,000\text{ cc}$; Max 60 mo for $\le 1,000\text{ cc}$. |
| **Profit Rate Mode** | Enum | **Yes** | Benchmark | `KIBOR + Spread` or `Fixed Rate` | Breakdown into benchmark + bank margin. |
| **1-Year KIBOR Rate (%)** | Number | Dynamic | 13.50% | 8.0% to 25.0% | Prevailing Karachi Interbank benchmark. |
| **Bank Spread (%)** | Number | Dynamic | 2.50% | 1.0% to 6.0% | Bank's profit margin. |
| **Annual Takaful Rate (%)**| Number | **Yes** | 2.00% | 1.50% to 3.50% | Standard rate across Pakistani Takaful windows. |
| **Tracker Fee Structure** | Enum | **Yes** | Monthly | `Monthly (Rs. 1,500)` or `Upfront (Rs. 20,000)` | Bundled monthly vs paid at delivery. |
| **Bank Processing Fee** | Number | Optional | Rs. 10,000 | Rs. 5,000 to Rs. 20,000 | Standard processing charge. |
| **Include 16% FED?** | Boolean | **Yes** | `true` | `true` / `false` | Federal Excise Duty applied to processing charges. |
| **Net Monthly Income** | Number | Optional | Rs. 200,000 | $\ge 0$ | Enables instant **SBP 40% DBR Affordability Check**. |

---

### 5.2 Output Parameters

| Section | Output Name | Format | Description / Formula |
| :--- | :--- | :--- | :--- |
| **Hero Card** | **Total Monthly Ijarah Rental** | `Rs. XX,XXX / mo` | Primary monthly installment ($R_{\text{base}} + T_m + Tr_m$). |
| **Monthly Breakdown** | Base Rental (Principal + Profit) | `Rs. XX,XXX` (XX%) | Amortized monthly payment toward asset & profit. |
| | Monthly Takaful Contribution | `Rs. XX,XXX` (XX%) | Transparent Islamic insurance share. |
| | Monthly Tracker Subscription | `Rs. X,XXX` | GPS tracking device fee. |
| **Upfront Outflow** | Security Deposit Amount | `Rs. X,XXX,XXX` | Upfront customer equity contribution. |
| | Processing Fee & FED | `Rs. XX,XXX` | Rs. 10,000 + 16% tax (Rs. 1,600). |
| | 1st Month Advance Rental | `Rs. XX,XXX` | Payable at delivery. |
| | **Total Initial Outflow (Due at Signing)**| `Rs. X,XXX,XXX` | Total cash required to drive car out of showroom. |
| **Total Term Outflow** | Total Net Financing | `Rs. X,XXX,XXX` | Financed asset cost. |
| | Total Profit Paid to Bank | `Rs. X,XXX,XXX` | Total bank return over tenure. |
| | Total Takaful Paid | `Rs. XX,XXX` | Total insurance contributions over tenure. |
| | **Total Lifecycle Outflow** | `Rs. X,XXX,XXX` | Complete financial commitment until ownership transfer. |
| **SBP Regulatory Check**| **Debt Burden Ratio (DBR)** | `XX.X%` | Total debt / net income. Visual indicator: Green (Eligible $\le 40\%$) or Red (Exceeds limit). |
| | **Financing Cap Alert** | Alert badge | Flags if $P > \text{Rs. 3,000,000}$ with guidance to increase deposit. |

---

## 6. Input Validation, SBP Rules & Edge Cases

### 6.1 SBP Regulatory Validation Rules
1. **Engine Capacity Tenure Enforcement**:
   - If user selects Vehicle Category `> 1,000 cc`, tenure options are restricted to **1, 2, or 3 years (12, 24, 36 months)**. If the user had 48 or 60 months selected, the UI automatically adjusts and displays an informative banner: *"SBP restricts financing tenure for vehicles above 1,000 cc to a maximum of 36 months."*
   - If user selects `≤ 1,000 cc or Local EV`, tenure options expand up to **5 years (60 months)**.
2. **Financing Cap Rule (Rs. 3 Million)**:
   - If $\text{Vehicle Price} - \text{Security Deposit} > \text{Rs. 3,000,000}$, the calculator immediately warns:
     *"State Bank of Pakistan regulations cap individual auto financing at Rs. 3,000,000. Increase your security deposit to at least Rs. X,XXX,XXX to comply."*
3. **Security Deposit Bounds**:
   - Minimum: 15% (special schemes) / 30% (standard SBP).
   - Maximum: 75% of vehicle price.
4. **DBR Affordability Warning**:
   - When net monthly income is entered, if monthly rental $> 40\%$ of income, display warning with the minimum required salary to qualify.

### 6.2 Edge Cases & Precision
- **Zero Profit Rate**: Fallback formula $R_{\text{base}} = P / n$ to avoid $0/0$ `NaN` or `Infinity`.
- **Currency & Number Formatting**: Standard Pakistani Rupee formatting (`Rs.` / `PKR`) with proper comma separation (e.g. `Rs. 3,050,000`).
- **Rounding Hygiene**: All calculations maintained in double-precision floating point, rounded to nearest whole rupee or 2 decimal places at final display. Zero penny/rupee drift between subcomponents and total.

---

## 7. Categorized Scope for Implementation

### 7.1 Tier 1: Essential MVP Requirements (Phase 4 Target)
1. **Specialized Pakistan Islamic Ijarah Engine**:
   - Precise *Ijarah Muntahia Bittamleek* amortization formula.
   - SBP Regulatory integration (Engine capacity tenure cap: 3 yrs vs 5 yrs; Rs. 3M financing cap alert).
   - Prorated monthly Takaful calculation (1.5% - 3.5%).
   - GPS tracker options (monthly vs upfront).
   - Bank processing fee + 16% FED calculation.
2. **KIBOR + Bank Spread Rate Builder**:
   - Benchmark 1-Year KIBOR input + Bank Spread input with combined effective profit rate display.
   - Fixed rate alternate mode.
3. **SBP Debt Burden Ratio (DBR) Affordability Meter**:
   - Optional monthly income field providing instant SBP 40% DBR compliance feedback (Eligible vs. Ineligible).
4. **Pakistani Market Vehicle Presets**:
   - Quick one-click presets for popular local cars:
     - Suzuki Alto VXL (658 cc, ~Rs. 3.05M)
     - Suzuki Cultus VXL (998 cc, ~Rs. 4.2M)
     - Toyota Yaris 1.3 ATIV (1329 cc, ~Rs. 4.7M)
     - Honda City 1.2 CVT (1199 cc, ~Rs. 4.69M)
     - Changan Alsvin 1.5 Lumiere (1480 cc, ~Rs. 4.99M)
     - KIA Sportage Alpha (1999 cc, ~Rs. 7.3M)
5. **Clear, Transparent Outflow Visuals**:
   - Prominent **Monthly Rental** Hero Card.
   - Component Breakdown: Base Rental vs. Takaful vs. Tracker.
   - Upfront Outflow (Due at Signing): Security deposit + processing fee + FED + 1st month advance rental.
   - Complete Lifecycle Cost (Total paid across tenure).
6. **Aesthetic Excellence & Local Zero-Cost Execution**:
   - Sleek modern interface, dark/light theme, rich typography (Outfit / Inter), fast client-side calculations, zero external APIs, zero paid hosting requirements.

### 7.2 Tier 2: Optional Features (High Value for V1.1)
1. Month-by-month Islamic Ijarah payment schedule (principal reduction vs profit vs Takaful).
2. Printable / PDF exportable "Ijarah Quotation & Assessment Sheet".
3. Comparison tool: 3-Year vs. 5-Year tenure side-by-side.

### 7.3 Tier 3: Future Improvements (Post-V1)
1. Live automated daily KIBOR rate scraper.
2. Bank-by-bank comparative quote generator (Meezan vs BankIslami vs Alfalah vs Faysal).
3. Used vehicle Ijarah valuation estimator.

---

## 8. Summary of Key Decisions for User Sign-Off

1. **Focused Geographic & Product Scope**: Pakistan Islamic Auto Ijarah exclusively. Generic US/UK models are omitted to deliver a tailored, highly authentic tool for Pakistani car buyers.
2. **Built-in SBP Regulatory Intelligence**: Enforces SBP limits (tenure capped at 36 mo for $>1000\text{cc}$, 60 mo for $\le 1000\text{cc}$; Rs. 3M financing limit alert; 40% DBR eligibility check).
3. **100% Client-Side, Zero Paid Dependencies**: Instant, offline-capable calculation with zero external servers, API keys, or databases.

---

## 9. Verified Sources & Regulatory Citations

1. **State Bank of Pakistan (SBP)**: *Prudential Regulations for Consumer Financing — Auto Financing Regulations & BPRD Circular No. 04 of 2022*. [sbp.org.pk](https://www.sbp.org.pk/bprd/2022/C4.htm) (Verified 2026).
2. **Meezan Bank Limited**: *Car Ijarah Consumer Product Guide, Schedule of Charges & Calculator Architecture*. [meezanbank.com](https://www.meezanbank.com/car-ijarah/) (Verified 2026).
3. **BankIslami Pakistan Limited**: *Auto Ijarah Shariah Guidelines & Takaful Mechanics*. [bankislami.com.pk](https://bankislami.com.pk/) (Verified 2026).
4. **State Bank of Pakistan — Islamic Banking Department (IBD)**: *Guidelines for Islamic Consumer Financing Products — Ijarah*. [sbp.org.pk/ibd/](https://www.sbp.org.pk/ibd/) (Verified 2026).
5. **Accounting and Auditing Organization for Islamic Financial Institutions (AAOIFI)**: *Shariah Standard No. 9: Ijarah & Ijarah Muntahia Bittamleek*. [aaoifi.com](https://aaoifi.com/) (Verified 2026).
6. **Pak-Qatar General Takaful & EFU General Islamic Takaful**: *Auto Takaful Contribution Schedules for Islamic Bank Consumer Leases*. (Verified 2026).

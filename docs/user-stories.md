# User Stories with Acceptance Criteria

This document details the user stories and testable acceptance criteria for the **Pakistan Islamic Car Ijarah Calculator**. 

- Every story serves a specific role defined in [`docs/app-roles.md`](file:///home/faiq/Development/Projects/knowledgecity/docs/app-roles.md) and references its parent job in [`docs/jobs-to-be-done.md`](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md).
- Acceptance criteria are defined using the testable **Given / When / Then** format.
- In accordance with Phase 3 instructions, all user stories are initially marked:  
  **Status**: `Not implemented`

---

## User Story 1: Calculate Total Monthly Ijarah Rental
- **Role**: Salaried Professional
- **Job Reference**: [Job 1: Estimate Accurate Shariah-Compliant Monthly Commitment](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md)
- **Story Statement**:  
  *As a Salaried Professional, I want to input my desired vehicle price, security deposit percentage, and tenure so that I can see the exact monthly Ijarah installment broken down into base rental, Takaful, and tracker fees.*
- **Status**: `Not implemented`

### Acceptance Criteria:
1. **Normal Scenario**:
   - **Given** a vehicle price of Rs. 3,050,000, 30% security deposit (Rs. 915,000), 60-month tenure, 15.5% annual profit rate, 2.0% annual Takaful, and Rs. 1,500 monthly tracker fee,
   - **When** the calculator processes the values,
   - **Then** the Base Rental must equal Rs. 51,353.56, Monthly Takaful must equal Rs. 5,083.33, and Total Monthly Rental must equal Rs. 57,936.90.
2. **Boundary Value (0% Profit Rate)**:
   - **Given** an annual profit rate of 0.0%,
   - **When** calculations are executed,
   - **Then** the base rental must divide the financed amount equally over the months ($P / n$) without producing `NaN` or division-by-zero errors.
3. **Large Numbers (High Value Vehicle)**:
   - **Given** a vehicle price of Rs. 20,000,000 and 50% deposit,
   - **When** calculated,
   - **Then** all figures must be properly formatted with standard Pakistani Rupee comma notation (e.g., `Rs. 10,000,000`) without floating-point overflow.

---

## User Story 2: Enforce SBP Engine Displacement Tenure Limit
- **Role**: Automotive Showroom Sales Consultant
- **Job Reference**: [Job 6: Enforce Regulatory Engine Displacement Tenure Limits](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md)
- **Story Statement**:  
  *As an Automotive Showroom Sales Consultant, I want the calculator to enforce the SBP 3-year maximum tenure limit for vehicles above 1,000 cc so that I do not quote non-compliant financing plans.*
- **Status**: `Not implemented`

### Acceptance Criteria:
1. **Selecting Engine Displacement $> 1,000\text{ cc}$**:
   - **Given** a user has currently selected a 5-year (60 months) tenure,
   - **When** the user toggles the vehicle engine category to `> 1,000 cc` (or selects a vehicle preset like Toyota Yaris 1.3),
   - **Then** the tenure must automatically adjust to a maximum of 36 months (3 years), the 48-month and 60-month options must become disabled, and a badge/banner must state: *"State Bank of Pakistan restricts financing tenure for vehicles above 1,000 cc to a maximum of 36 months."*
2. **Switching back to $\le 1,000\text{ cc}$**:
   - **Given** the vehicle category is `> 1,000 cc`,
   - **When** the user switches back to `≤ 1,000 cc or Local EV` (or selects Suzuki Alto),
   - **Then** 48-month and 60-month options must become re-enabled.

---

## User Story 3: Alert on SBP Rs. 3 Million Financing Cap
- **Role**: Self-Employed Businessman
- **Job Reference**: [Job 4: Bridge the SBP Rs. 3 Million Financing Cap for High-Value Vehicles](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md)
- **Story Statement**:  
  *As a Self-Employed Businessman, I want the calculator to detect if my financed principal exceeds the SBP Rs. 3,000,000 cap so that I know the minimum down payment required to comply with banking regulations.*
- **Status**: `Not implemented`

### Acceptance Criteria:
1. **Financing Exceeding Limit**:
   - **Given** a vehicle priced at Rs. 4,700,000 and a 30% security deposit (financed amount = Rs. 3,290,000, which exceeds Rs. 3,000,000),
   - **When** calculated,
   - **Then** a prominent regulatory warning must display: *"State Bank of Pakistan caps individual auto financing at Rs. 3,000,000. Increase your deposit to at least Rs. 1,700,000 (36.2%) to comply."*
2. **Financing Within Limit**:
   - **Given** the user increases deposit to 40% (financed amount = Rs. 2,820,000),
   - **When** calculated,
   - **Then** the regulatory cap warning must clear, displaying a green compliance indicator: *"Financing within SBP Rs. 3M limit."*

---

## User Story 4: Evaluate SBP 40% Debt Burden Ratio (DBR) Affordability
- **Role**: Salaried Professional
- **Job Reference**: [Job 2: Verify SBP Debt Burden Ratio (DBR) Affordability](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md)
- **Story Statement**:  
  *As a Salaried Professional, I want to enter my monthly take-home income so that I can see my Debt Burden Ratio and verify whether I meet SBP eligibility rules.*
- **Status**: `Not implemented`

### Acceptance Criteria:
1. **Eligible Scenario ($\text{DBR} \le 40\%$)**:
   - **Given** a Total Monthly Rental of Rs. 57,936.90 and an entered net monthly income of Rs. 200,000.00,
   - **When** calculated,
   - **Then** the DBR meter must display 28.97% with a positive green badge: *"Eligible under SBP 40% DBR benchmark."*
2. **Ineligible Scenario ($\text{DBR} > 40\%$)**:
   - **Given** a Total Monthly Rental of Rs. 109,559.50 and an entered net monthly income of Rs. 200,000.00 (DBR = 54.78%),
   - **When** calculated,
   - **Then** the DBR meter must display 54.78% with an amber warning badge: *"Exceeds SBP 40% DBR limit. Minimum required monthly income to qualify is Rs. 273,899."*
3. **Empty Income State**:
   - **Given** the income field is left blank or set to 0,
   - **When** viewing results,
   - **Then** the DBR meter displays an informative prompt: *"Enter monthly income to test SBP eligibility"* without rendering errors.

---

## User Story 5: Itemize Total Initial Outflow (Due at Delivery)
- **Role**: Salaried Professional / Self-Employed Businessman
- **Job Reference**: [Job 3: Determine Total Initial Drive-Off Cash Requirement](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md)
- **Story Statement**:  
  *As a car buyer, I want an itemized breakdown of all upfront charges so that I know the exact cash required to take delivery of the vehicle.*
- **Status**: `Not implemented`

### Acceptance Criteria:
1. **Complete Breakdown Rendering**:
   - **Given** a vehicle deposit of Rs. 915,000, bank processing fee of Rs. 10,000, 16% FED (Rs. 1,600), and first month advance rental of Rs. 57,936.90,
   - **When** viewing the "Initial Outflow / Due at Signing" card,
   - **Then** each subcomponent must be listed with its individual amount, and the Total Initial Outflow must equal exactly Rs. 984,536.90.
2. **FED Toggle**:
   - **Given** the user unchecks "Apply 16% FED",
   - **When** updated,
   - **Then** the FED line item drops to Rs. 0 and the Total Initial Outflow reduces accordingly.

---

## User Story 6: Quick-Select Popular Pakistani Vehicle Presets
- **Role**: Automotive Showroom Sales Consultant
- **Job Reference**: [Job 5: Compare Financing Terms Across Pakistani Islamic Banks](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md)
- **Story Statement**:  
  *As an Automotive Showroom Sales Consultant, I want 1-click presets for popular Pakistani cars so that I can quote walk-in customers instantly without manually researching vehicle specs.*
- **Status**: `Not implemented`

### Acceptance Criteria:
1. **Selecting Suzuki Alto Preset**:
   - **When** the user clicks "Suzuki Alto VXL",
   - **Then** Vehicle Price populates with Rs. 3,050,000, Engine Displacement sets to `≤ 1,000 cc`, and 5-year tenure options remain available.
2. **Selecting Toyota Yaris Preset**:
   - **When** the user clicks "Toyota Yaris ATIV 1.3",
   - **Then** Vehicle Price populates with Rs. 4,700,000, Engine Displacement automatically toggles to `> 1,000 cc`, and tenure is capped at 3 years.

---

## User Story 7: Select and Compare Bank Rate Profiles
- **Role**: Automotive Showroom Sales Consultant / Comparison Shopper
- **Job Reference**: [Job 5: Compare Financing Terms Across Pakistani Islamic Banks](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md)
- **Story Statement**:  
  *As a Comparison Shopper, I want to select between major Pakistani Islamic banks (Meezan Bank, BankIslami, Bank Alfalah, Faysal Bank) so that I can see their respective profit spreads, Takaful rates, and fees.*
- **Status**: `Not implemented`

### Acceptance Criteria:
1. **Selecting Meezan Bank**:
   - **When** the user selects "Meezan Bank Car Ijarah",
   - **Then** Bank Spread sets to 2.50%, Takaful sets to 2.00%, and Processing Fee sets to Rs. 10,000.
2. **Selecting BankIslami**:
   - **When** the user selects "BankIslami Auto Ijarah",
   - **Then** Bank Spread sets to 2.75%, Takaful sets to 1.90%, and Processing Fee sets to Rs. 12,000.
3. **Manual Overrides**:
   - **Given** a bank profile is active,
   - **When** the user manually modifies any rate slider or input box,
   - **Then** the bank selector switches to "Custom", recalculating instantly without locking the inputs.

---

## User Story 8: Manage Custom Bank Rates Locally with Reset
- **Role**: Automotive Showroom Sales Consultant
- **Job Reference**: [Job 7: Maintain Custom Bank Rates Without Backend Dependencies](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md)
- **Story Statement**:  
  *As a Sales Consultant, I want to customize bank rates or add a new bank in a lightweight settings modal with local storage persistence and a one-click reset option so that I can maintain updated financing packages.*
- **Status**: `Not implemented`

### Acceptance Criteria:
1. **Saving Custom Bank**:
   - **Given** the "Manage Banks" dialog is opened,
   - **When** the user edits a bank spread or adds a new bank and clicks "Save",
   - **Then** the updated bank data must persist in `localStorage` and become immediately selectable in the bank dropdown.
2. **Restoring Defaults**:
   - **Given** custom modifications have been saved,
   - **When** the user clicks "Restore Official Bank Defaults",
   - **Then** all custom changes are removed from `localStorage`, and the default Pakistani bank profiles are restored.

---

## User Story 9: Robust Input Validation & Error Recovery
- **Role**: Salaried Professional / Self-Employed Businessman
- **Job Reference**: [Job 1: Estimate Accurate Shariah-Compliant Monthly Commitment](file:///home/faiq/Development/Projects/knowledgecity/docs/jobs-to-be-done.md)
- **Story Statement**:  
  *As a user, I want the calculator to prevent invalid inputs (negative values, deposit > price, non-numeric keystrokes) so that the calculation never displays broken states.*
- **Status**: `Not implemented`

### Acceptance Criteria:
1. **Deposit Exceeding Vehicle Price**:
   - **When** a user types a deposit amount greater than or equal to the vehicle price,
   - **Then** the calculator caps the deposit at 90%, shows an inline notice: *"Security deposit must be less than vehicle price"*, and prevents negative financing calculations.
2. **Negative Values**:
   - **When** a negative number is entered into any field,
   - **Then** the system automatically clamps it to 0.
3. **Field Clearing**:
   - **When** a user clears an input field to retype,
   - **Then** the calculator gracefully falls back to the minimum valid value without throwing unhandled exceptions or rendering `NaN`.

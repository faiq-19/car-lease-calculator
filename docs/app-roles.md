# App Roles

This document defines the user roles for the **Pakistan Islamic Car Ijarah Calculator** (*Ijarah Muntahia Bittamleek*). 

These roles describe real-world human personas and their functional contexts within the application. In accordance with our product design decisions, these roles represent user situations and perspectives rather than database-backed technical authentication accounts.

---

## Role 1: Salaried Professional

A **Salaried Professional** is an employed individual in Pakistan (corporate, public sector, or private company) who receives a fixed monthly pay slip and wishes to lease a car through Shariah-compliant Islamic banking.

### Capabilities (What they see and do):
- They can select or customize vehicle prices for locally assembled Pakistani cars (e.g., Suzuki Alto, Suzuki Cultus, Toyota Yaris, Honda City, Changan Alsvin).
- They can select their customer profile as "Salaried Individual" to receive standard minimum security deposit recommendations (starting at 15% to 30%).
- They can enter their monthly net take-home salary to instantly evaluate their affordability using the **State Bank of Pakistan (SBP) 40% Debt Burden Ratio (DBR)** meter.
- They can toggle between major Pakistani Islamic bank presets (Meezan Bank, BankIslami, Bank Alfalah Islamic, Faysal Bank) to compare estimated monthly rentals, Takaful rates, and upfront bank processing charges.
- They can adjust down payment percentages and financing tenure (12 to 60 months) to find an installment that fits their monthly household budget.
- They can view a transparent, itemized breakdown of their **Initial Outflow** (Security Deposit + Bank Processing Fee + 16% Federal Excise Duty + 1st Month Advance Rental + Tracker) so they are not surprised by hidden dealership delivery costs.

### Restrictions (What the app must prevent):
- The app must prevent them from selecting a financing tenure exceeding **36 months (3 years)** if their selected vehicle has an engine displacement greater than **1,000 cc**, strictly enforcing SBP Consumer Financing Regulations.
- The app must prevent them from entering a security deposit below 0% or equal to/greater than 100% of the vehicle price.
- The app must prevent them from misinterpreting an unaffordable lease by displaying a clear, non-blocking warning if their monthly commitment exceeds 40% of their net disposable income.
- The app must never transmit their private salary, income details, or financial inputs to any remote server or third-party service.

---

## Role 2: Self-Employed Businessman / Sole Proprietor

A **Self-Employed Businessman** is a Pakistani entrepreneur, trader, doctor, lawyer, or business owner with fluctuating monthly business earnings who wants to acquire a commercial or personal vehicle through Islamic Ijarah without paying conventional bank interest (*Riba*).

### Capabilities (What they see and do):
- They can select their customer profile as "Business / Self-Employed", which automatically adjusts the recommended security deposit to business baseline criteria (25% to 35%+).
- They can evaluate high-value vehicles (e.g., KIA Sportage, Hyundai Tucson, Toyota Corolla Cross) and view instant SBP financing cap compliance feedback.
- They can view the SBP **Rs. 3,000,000 financing cap guidance**, showing the exact minimum cash down payment required to bridge the gap between vehicle price and regulatory borrowing limits.
- They can view the total lifecycle cost of ownership across the entire tenure, including the cumulative bank profit, cumulative Takaful, and end-of-tenure token ownership transfer terms (*Hiba* or token buy-out).
- They can customize the benchmark KIBOR and bank spread manually to test sensitivity against expected interest rate shifts.

### Restrictions (What the app must prevent):
- The app must prevent the financed principal from exceeding SBP guidelines without clearly alerting the user of the required equity top-up.
- The app must prevent invalid mathematical states (such as zero tenure or negative profit rates) from crashing the calculation engine or rendering `NaN` / `Infinity`.

---

## Role 3: Automotive Showroom Sales Consultant

An **Automotive Showroom Sales Consultant** is a car dealership sales representative, finance coordinator, or PakWheels auto broker in Pakistan helping walk-in customers structure car financing packages.

### Capabilities (What they see and do):
- They can use 1-click popular Pakistani car presets (Alto VXL, Cultus VXL, Yaris ATIV, City 1.2, Alsvin Lumiere, Sportage Alpha) to rapidly quote monthly installments to prospective buyers.
- They can switch bank profiles on the fly to compare offerings from partner Islamic banks (e.g., demonstrating why Meezan Bank or BankIslami is advantageous for a customer's specific tenure).
- They can use the **Manage Banks / Custom Bank Rates** modal to add a new financing institution, update bank spreads, or modify Takaful and processing fees in browser local storage.
- They can reset custom rates back to official regulatory defaults at any time with a single click ("Restore Official Bank Defaults").
- They can quickly qualify walk-in prospects by checking whether their stated income satisfies the SBP 40% DBR threshold.

### Restrictions (What the app must prevent):
- The app must prevent corrupted or invalid bank configurations from breaking the calculator by validating all custom entries before persisting to `localStorage`.
- The app must prevent client-side data loss by providing a clean fallback to default banking data if local storage is cleared or unavailable.

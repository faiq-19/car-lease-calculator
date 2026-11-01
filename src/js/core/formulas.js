/**
 * Pure Mathematical Formulas for Pakistan Islamic Car Ijarah (Ijarah Muntahia Bittamleek)
 *
 * Implements Shariah-compliant annuity and fee calculations adhering to State Bank of
 * Pakistan (SBP) guidelines and standard Pakistani Islamic banking practices.
 */

/**
 * Calculates net principal financed by the bank after customer's upfront security deposit.
 * @param {number} vehiclePrice - Total price of the vehicle in PKR
 * @param {number} securityDeposit - Upfront deposit amount in PKR
 * @returns {number} Net Financed Principal Amount (P)
 */
export function calculatePrincipal(vehiclePrice, securityDeposit) {
  const price = Math.max(0, Number(vehiclePrice) || 0);
  const deposit = Math.max(0, Math.min(price, Number(securityDeposit) || 0));
  return price - deposit;
}

/**
 * Converts security deposit percentage to an absolute PKR amount.
 * @param {number} vehiclePrice - Total vehicle price in PKR
 * @param {number} percentage - Security deposit percentage (e.g. 30 for 30%)
 * @returns {number} Security deposit amount in PKR rounded to whole Rupee
 */
export function depositPercentToAmount(vehiclePrice, percentage) {
  const price = Math.max(0, Number(vehiclePrice) || 0);
  const pct = Math.max(0, Math.min(100, Number(percentage) || 0));
  return Math.round((price * pct) / 100);
}

/**
 * Converts an absolute PKR security deposit amount to percentage of vehicle price.
 * @param {number} vehiclePrice - Total vehicle price in PKR
 * @param {number} amount - Deposit amount in PKR
 * @returns {number} Percentage formatted to 1 decimal place (e.g. 30.0)
 */
export function depositAmountToPercent(vehiclePrice, amount) {
  const price = Math.max(0, Number(vehiclePrice) || 0);
  if (price === 0) return 0;
  const dep = Math.max(0, Math.min(price, Number(amount) || 0));
  return Math.round((dep / price) * 1000) / 10;
}

/**
 * Calculates base monthly Ijarah rental using standard reducing balance annuity formula.
 * Base Rental covers recovery of asset principal and the agreed bank profit.
 *
 * Formula: R_base = P * [ r*(1+r)^n ] / [ (1+r)^n - 1 ]
 * Where:
 *   P = Principal financed
 *   r = Monthly profit rate (Annual Profit Rate / 1200)
 *   n = Tenure in months
 *
 * @param {number} principal - Financed principal amount in PKR
 * @param {number} annualProfitRate - Annual profit rate in percentage (e.g. 15.5 for 15.5%)
 * @param {number} tenureMonths - Lease tenure in months (e.g. 36 or 60)
 * @returns {number} Monthly base rental in PKR
 */
export function calculateBaseRental(principal, annualProfitRate, tenureMonths) {
  const p = Math.max(0, Number(principal) || 0);
  const n = Math.max(1, Math.round(Number(tenureMonths) || 1));
  const rate = Math.max(0, Number(annualProfitRate) || 0);

  if (p === 0) return 0;

  // Zero-profit fallback: Equal division of principal over months
  if (rate === 0) {
    return p / n;
  }

  const monthlyRate = rate / 1200;
  const compoundingFactor = Math.pow(1 + monthlyRate, n);
  const baseRental = p * ((monthlyRate * compoundingFactor) / (compoundingFactor - 1));

  return baseRental;
}

/**
 * Calculates monthly Takaful (Islamic mutual insurance) contribution.
 * In Pakistani Islamic banking, Takaful is computed as a percentage of the vehicle's
 * total value per year and prorated monthly into installments.
 *
 * Formula: T_m = (Vehicle Price * Annual Takaful Rate %) / 1200
 *
 * @param {number} vehiclePrice - Total vehicle price in PKR
 * @param {number} annualTakafulRate - Annual Takaful percentage (e.g. 2.0 for 2.0%)
 * @returns {number} Monthly Takaful in PKR
 */
export function calculateMonthlyTakaful(vehiclePrice, annualTakafulRate) {
  const price = Math.max(0, Number(vehiclePrice) || 0);
  const rate = Math.max(0, Number(annualTakafulRate) || 0);
  return (price * rate) / 1200;
}

/**
 * Calculates total monthly Ijarah installment payable by the customer.
 * Combines base rental, monthly Takaful, and monthly GPS tracker fee.
 *
 * @param {number} baseRental - Base Ijarah rental in PKR
 * @param {number} monthlyTakaful - Monthly Takaful in PKR
 * @param {number} monthlyTracker - Monthly tracker fee in PKR (default 0)
 * @returns {number} Total Monthly Payment in PKR
 */
export function calculateTotalMonthlyRental(baseRental, monthlyTakaful, monthlyTracker = 0) {
  const base = Math.max(0, Number(baseRental) || 0);
  const takaful = Math.max(0, Number(monthlyTakaful) || 0);
  const tracker = Math.max(0, Number(monthlyTracker) || 0);
  return base + takaful + tracker;
}

/**
 * Calculates total initial upfront cash required to drive the car out of the showroom.
 * Includes: Security Deposit + Processing Fee + 16% FED (if applicable) + 1st Month Advance Rental + Upfront Tracker (if applicable)
 *
 * @param {Object} params - Upfront cost parameters
 * @param {number} params.securityDeposit - Security deposit in PKR
 * @param {number} params.processingFee - Bank processing fee in PKR
 * @param {boolean} params.applyFed - Whether to apply 16% Federal Excise Duty on processing fee
 * @param {number} params.firstMonthRental - 1st month advance rental in PKR
 * @param {number} [params.upfrontTracker=0] - Upfront tracker installation fee if not billed monthly
 * @returns {{fedAmount: number, totalInitialOutflow: number}} Breakdown of initial outflow
 */
export function calculateInitialOutflow({
  securityDeposit,
  processingFee,
  applyFed = true,
  firstMonthRental,
  upfrontTracker = 0
}) {
  const deposit = Math.max(0, Number(securityDeposit) || 0);
  const fee = Math.max(0, Number(processingFee) || 0);
  const fedAmount = applyFed ? fee * 0.16 : 0;
  const advanceRental = Math.max(0, Number(firstMonthRental) || 0);
  const tracker = Math.max(0, Number(upfrontTracker) || 0);

  const totalInitialOutflow = deposit + fee + fedAmount + advanceRental + tracker;

  return {
    deposit,
    processingFee: fee,
    fedAmount,
    firstMonthRental: advanceRental,
    upfrontTracker: tracker,
    totalInitialOutflow
  };
}

/**
 * Calculates complete lifecycle financial commitment across the entire tenure.
 * In Pakistani Ijarah, the 1st rental is collected in advance as part of initial outflow,
 * followed by (n - 1) monthly payments.
 *
 * @param {number} totalInitialOutflow - Total upfront cash paid at delivery
 * @param {number} totalMonthlyRental - Regular monthly rental
 * @param {number} tenureMonths - Total tenure in months
 * @returns {{totalOutflow: number, totalRentalsPaid: number, totalProfitPaid: number, totalTakafulPaid: number}}
 */
export function calculateLifecycleCost(totalInitialOutflow, totalMonthlyRental, tenureMonths, principal, vehiclePrice, annualTakafulRate) {
  const initial = Math.max(0, Number(totalInitialOutflow) || 0);
  const monthly = Math.max(0, Number(totalMonthlyRental) || 0);
  const n = Math.max(1, Math.round(Number(tenureMonths) || 1));
  const p = Math.max(0, Number(principal) || 0);

  // 1 advance rental is already inside initial outflow, remaining payments are (n - 1)
  const remainingRentals = Math.max(0, n - 1) * monthly;
  const totalOutflow = initial + remainingRentals;
  const totalRentalsPaid = monthly * n;

  const totalTakafulPaid = ((Number(vehiclePrice) || 0) * (Number(annualTakafulRate) || 0) * (n / 12)) / 100;
  const baseRentalsTotal = (totalRentalsPaid - totalTakafulPaid);
  const totalProfitPaid = Math.max(0, baseRentalsTotal - p);

  return {
    totalOutflow,
    totalRentalsPaid,
    totalProfitPaid,
    totalTakafulPaid
  };
}

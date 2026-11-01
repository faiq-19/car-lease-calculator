/**
 * State Bank of Pakistan (SBP) Consumer Financing Regulations Module
 *
 * Implements SBP Prudential Regulations (BPRD Circular No. 04 of 2022) governing:
 * 1. Engine capacity tenure caps (36 months for > 1,000 cc vs 60 months for <= 1,000 cc)
 * 2. Rs. 3,000,000 individual auto borrowing cap
 * 3. 40% maximum Debt Burden Ratio (DBR) / Debt-to-Income compliance
 * 4. Recommended minimum equity thresholds for salaried vs business borrowers
 */

export const SBP_CONSTANTS = {
  // SBP individual auto financing limit across all banks (in PKR)
  MAX_FINANCING_CAP: 3000000,

  // Maximum Debt Burden Ratio benchmark allowed by SBP
  MAX_DBR_PERCENT: 40.0,

  // Tenure limits based on engine capacity
  TENURE_CAP_ABOVE_1000CC: 36, // 3 years max for > 1,000 cc
  TENURE_CAP_UPTO_1000CC: 60,  // 5 years max for <= 1,000 cc and local EVs

  // Standard recommended deposit percentages
  DEFAULT_DEPOSIT_PERCENT_SALARIED: 30.0,
  DEFAULT_DEPOSIT_PERCENT_BUSINESS: 35.0,
  MIN_REGULATORY_DEPOSIT_PERCENT: 15.0,
  MAX_ALLOWED_DEPOSIT_PERCENT: 85.0
};

/**
 * Checks whether the vehicle category allows a given tenure under SBP regulations.
 * @param {string} engineCategory - 'upto_1000cc' or 'above_1000cc'
 * @returns {number} Maximum allowed tenure in months (36 or 60)
 */
export function getMaximumTenure(engineCategory) {
  if (engineCategory === 'above_1000cc') {
    return SBP_CONSTANTS.TENURE_CAP_ABOVE_1000CC;
  }
  return SBP_CONSTANTS.TENURE_CAP_UPTO_1000CC;
}

/**
 * Validates whether a requested tenure complies with SBP engine-capacity restrictions.
 * @param {number} requestedMonths - Tenure in months (e.g. 12, 24, 36, 48, 60)
 * @param {string} engineCategory - 'upto_1000cc' or 'above_1000cc'
 * @returns {{isValid: boolean, maxAllowedMonths: number, adjustedMonths: number, message: string}}
 */
export function validateTenure(requestedMonths, engineCategory) {
  const maxAllowed = getMaximumTenure(engineCategory);
  const months = Math.max(12, Math.min(60, Number(requestedMonths) || 36));

  if (months > maxAllowed) {
    return {
      isValid: false,
      maxAllowedMonths: maxAllowed,
      adjustedMonths: maxAllowed,
      message: `State Bank of Pakistan regulations restrict financing tenure for vehicles above 1,000 cc to a maximum of 36 months (3 years).`
    };
  }

  return {
    isValid: true,
    maxAllowedMonths: maxAllowed,
    adjustedMonths: months,
    message: `Tenure compliant with SBP regulations.`
  };
}

/**
 * Checks whether the financed principal complies with SBP's Rs. 3 Million financing limit.
 * @param {number} vehiclePrice - Total vehicle price in PKR
 * @param {number} principal - Net financed amount in PKR
 * @returns {{exceedsCap: boolean, maxCap: number, excessAmount: number, requiredDepositAmount: number, requiredDepositPercent: number, message: string}}
 */
export function checkFinancingCap(vehiclePrice, principal) {
  const p = Math.max(0, Number(principal) || 0);
  const price = Math.max(0, Number(vehiclePrice) || 0);
  const maxCap = SBP_CONSTANTS.MAX_FINANCING_CAP;

  if (p > maxCap) {
    const excessAmount = p - maxCap;
    const requiredDepositAmount = price - maxCap;
    const requiredDepositPercent = price > 0 ? Math.ceil((requiredDepositAmount / price) * 1000) / 10 : 0;

    return {
      exceedsCap: true,
      maxCap,
      excessAmount,
      requiredDepositAmount,
      requiredDepositPercent,
      message: `Financing amount exceeds SBP regulatory cap of Rs. 3,000,000 by Rs. ${excessAmount.toLocaleString('en-PK')}. Increase your security deposit to at least Rs. ${requiredDepositAmount.toLocaleString('en-PK')} (${requiredDepositPercent}%) to comply.`
    };
  }

  return {
    exceedsCap: false,
    maxCap,
    excessAmount: 0,
    requiredDepositAmount: 0,
    requiredDepositPercent: 0,
    message: `Financed amount is compliant with SBP Rs. 3,000,000 limit.`
  };
}

/**
 * Calculates Debt Burden Ratio (DBR) and evaluates SBP affordability compliance.
 * Formula: DBR = (Total Monthly Debt Obligations / Net Monthly Disposable Income) * 100
 *
 * @param {number} totalMonthlyRental - Proposed monthly Ijarah payment in PKR
 * @param {number} netMonthlyIncome - Borrower's net take-home salary/income in PKR
 * @param {number} [existingMonthlyDebts=0] - Existing loan/credit commitments in PKR
 * @returns {{hasIncome: boolean, dbrPercent: number, isEligible: boolean, maxAllowedMonthlyPayment: number, requiredMonthlyIncome: number, message: string}}
 */
export function calculateDBR(totalMonthlyRental, netMonthlyIncome, existingMonthlyDebts = 0) {
  const payment = Math.max(0, Number(totalMonthlyRental) || 0);
  const income = Math.max(0, Number(netMonthlyIncome) || 0);
  const existingDebts = Math.max(0, Number(existingMonthlyDebts) || 0);

  if (income <= 0) {
    return {
      hasIncome: false,
      dbrPercent: 0,
      isEligible: true,
      maxAllowedMonthlyPayment: 0,
      requiredMonthlyIncome: payment > 0 ? Math.ceil(payment / 0.40) : 0,
      message: `Enter monthly take-home salary to evaluate SBP 40% DBR affordability.`
    };
  }

  const totalObligations = payment + existingDebts;
  const dbrPercent = Math.round((totalObligations / income) * 10000) / 100;
  const maxAllowedMonthlyPayment = Math.max(0, (income * 0.40) - existingDebts);
  const requiredMonthlyIncome = Math.ceil(totalObligations / 0.40);
  const isEligible = dbrPercent <= SBP_CONSTANTS.MAX_DBR_PERCENT;

  let message = '';
  if (isEligible) {
    message = `Affordable: DBR is ${dbrPercent}%, well within SBP's 40% maximum threshold.`;
  } else {
    message = `Exceeds SBP 40% DBR limit: DBR is ${dbrPercent}%. Minimum required monthly income to qualify is Rs. ${requiredMonthlyIncome.toLocaleString('en-PK')}.`;
  }

  return {
    hasIncome: true,
    dbrPercent,
    isEligible,
    maxAllowedMonthlyPayment,
    requiredMonthlyIncome,
    message
  };
}

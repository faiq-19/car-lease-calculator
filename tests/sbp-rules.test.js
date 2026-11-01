import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getMaximumTenure,
  validateTenure,
  checkFinancingCap,
  calculateDBR,
  SBP_CONSTANTS
} from '../src/js/core/sbp-rules.js';

test('Suite 2.1: SBP Engine Displacement Tenure Limits', () => {
  // > 1,000 cc vehicles are capped at 36 months
  const maxAbove1000 = getMaximumTenure('above_1000cc');
  assert.strictEqual(maxAbove1000, 36);

  // <= 1,000 cc vehicles can go up to 60 months
  const maxUpto1000 = getMaximumTenure('upto_1000cc');
  assert.strictEqual(maxUpto1000, 60);

  // Validating 60 months requested for a > 1,000 cc vehicle
  const validationAbove1000 = validateTenure(60, 'above_1000cc');
  assert.strictEqual(validationAbove1000.isValid, false);
  assert.strictEqual(validationAbove1000.adjustedMonths, 36);

  // Validating 60 months requested for a <= 1,000 cc vehicle
  const validationUpto1000 = validateTenure(60, 'upto_1000cc');
  assert.strictEqual(validationUpto1000.isValid, true);
  assert.strictEqual(validationUpto1000.adjustedMonths, 60);
});

test('Suite 2.2: SBP Rs. 3,000,000 Individual Financing Cap Verification', () => {
  // Scenario A: Financing exceeds Rs. 3M cap
  // Vehicle price Rs. 4,700,000, 30% deposit = Rs. 1,410,000 -> Principal = Rs. 3,290,000
  const checkOverCap = checkFinancingCap(4700000, 3290000);
  assert.strictEqual(checkOverCap.exceedsCap, true);
  assert.strictEqual(checkOverCap.excessAmount, 290000);
  assert.strictEqual(checkOverCap.requiredDepositAmount, 1700000);
  assert.strictEqual(checkOverCap.requiredDepositPercent, 36.2);

  // Scenario B: Financing within Rs. 3M cap
  // Vehicle price Rs. 4,700,000, 40% deposit = Rs. 1,880,000 -> Principal = Rs. 2,820,000
  const checkUnderCap = checkFinancingCap(4700000, 2820000);
  assert.strictEqual(checkUnderCap.exceedsCap, false);
  assert.strictEqual(checkUnderCap.excessAmount, 0);
});

test('Suite 2.3: SBP 40% Debt Burden Ratio (DBR) Affordability Meter', () => {
  // Scenario A: Eligible (DBR <= 40%)
  // Monthly payment = Rs. 57,936.90, Monthly income = Rs. 200,000
  // DBR = 57,936.90 / 200,000 = 28.97%
  const eligibleCheck = calculateDBR(57936.90, 200000);
  assert.strictEqual(eligibleCheck.hasIncome, true);
  assert.strictEqual(eligibleCheck.isEligible, true);
  assert.strictEqual(eligibleCheck.dbrPercent, 28.97);

  // Scenario B: Ineligible (DBR > 40%)
  // Monthly payment = Rs. 109,559.50, Monthly income = Rs. 200,000
  // DBR = 109,559.50 / 200,000 = 54.78%
  const ineligibleCheck = calculateDBR(109559.50, 200000);
  assert.strictEqual(ineligibleCheck.hasIncome, true);
  assert.strictEqual(ineligibleCheck.isEligible, false);
  assert.strictEqual(ineligibleCheck.dbrPercent, 54.78);
  assert.strictEqual(ineligibleCheck.requiredMonthlyIncome, 273899);

  // Scenario C: No income entered
  const noIncomeCheck = calculateDBR(50000, 0);
  assert.strictEqual(noIncomeCheck.hasIncome, false);
  assert.strictEqual(noIncomeCheck.isEligible, true);
});

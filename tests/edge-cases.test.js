import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePrincipal,
  calculateBaseRental,
  calculateMonthlyTakaful,
  depositAmountToPercent
} from '../src/js/core/formulas.js';
import { calculateDBR, checkFinancingCap } from '../src/js/core/sbp-rules.js';

test('Suite 3.1: Zero Profit Rate Division-by-Zero Handling', () => {
  const principal = 1200000;
  const tenureMonths = 12;
  const baseRental = calculateBaseRental(principal, 0.0, tenureMonths);
  assert.strictEqual(baseRental, 100000, '0% profit rate should divide principal cleanly across months');
  assert.ok(!isNaN(baseRental), 'Result must not be NaN');
  assert.ok(isFinite(baseRental), 'Result must be finite');
});

test('Suite 3.2: Deposit Clamping and Boundary Conditions', () => {
  // Deposit larger than vehicle price
  const p1 = calculatePrincipal(3000000, 3500000);
  assert.strictEqual(p1, 0, 'Principal cannot be negative if deposit exceeds price');

  // Negative deposit
  const p2 = calculatePrincipal(3000000, -500000);
  assert.strictEqual(p2, 3000000, 'Negative deposit should be treated as 0');

  // Negative vehicle price
  const p3 = calculatePrincipal(-3000000, 500000);
  assert.strictEqual(p3, 0, 'Negative price should be clamped to 0');
});

test('Suite 3.3: Extreme Large Values Precision', () => {
  // Vehicle price Rs. 50,000,000 with 15% rate over 36 months
  const price = 50000000;
  const deposit = 20000000;
  const principal = calculatePrincipal(price, deposit); // 30,000,000
  const rental = calculateBaseRental(principal, 15.0, 36);
  assert.ok(isFinite(rental) && rental > 0);
  const takaful = calculateMonthlyTakaful(price, 2.5);
  assert.strictEqual(takaful, 104166.66666666667);
});

test('Suite 3.4: DBR Boundary & Zero Payment Cases', () => {
  const checkZero = calculateDBR(0, 150000);
  assert.strictEqual(checkZero.dbrPercent, 0);
  assert.strictEqual(checkZero.isEligible, true);

  const checkNegativeIncome = calculateDBR(50000, -100000);
  assert.strictEqual(checkNegativeIncome.hasIncome, false);
});

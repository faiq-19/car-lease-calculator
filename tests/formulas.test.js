import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePrincipal,
  depositPercentToAmount,
  depositAmountToPercent,
  calculateBaseRental,
  calculateMonthlyTakaful,
  calculateTotalMonthlyRental,
  calculateInitialOutflow,
  calculateLifecycleCost
} from '../src/js/core/formulas.js';

test('Suite 1.1: Suzuki Alto VXL AGS (<= 1000cc) Worked Example Verification', () => {
  const vehiclePrice = 3050000;
  const depositPercent = 30.0;
  const depositAmount = depositPercentToAmount(vehiclePrice, depositPercent);
  assert.strictEqual(depositAmount, 915000, 'Deposit should equal Rs. 915,000');

  const principal = calculatePrincipal(vehiclePrice, depositAmount);
  assert.strictEqual(principal, 2135000, 'Principal should equal Rs. 2,135,000');

  const annualProfitRate = 15.5; // 13.0% KIBOR + 2.5% Spread
  const tenureMonths = 60; // 5 years
  const baseRental = calculateBaseRental(principal, annualProfitRate, tenureMonths);
  // Verify with tolerance within 0.05 PKR (expected: 51,353.56)
  assert.ok(Math.abs(baseRental - 51353.56) < 0.05, `Base rental ${baseRental} should be close to 51,353.56`);

  const annualTakafulRate = 2.0;
  const monthlyTakaful = calculateMonthlyTakaful(vehiclePrice, annualTakafulRate);
  assert.ok(Math.abs(monthlyTakaful - 5083.33) < 0.05, `Monthly Takaful ${monthlyTakaful} should be close to 5,083.33`);

  const monthlyTracker = 1500;
  const totalMonthly = calculateTotalMonthlyRental(baseRental, monthlyTakaful, monthlyTracker);
  assert.ok(Math.abs(totalMonthly - 57936.90) < 0.05, `Total monthly ${totalMonthly} should be close to 57,936.90`);

  const initialOutflow = calculateInitialOutflow({
    securityDeposit: depositAmount,
    processingFee: 10000,
    applyFed: true,
    firstMonthRental: totalMonthly,
    upfrontTracker: 0
  });

  assert.strictEqual(initialOutflow.fedAmount, 1600, '16% FED on Rs. 10,000 should be Rs. 1,600');
  assert.ok(Math.abs(initialOutflow.totalInitialOutflow - 984536.90) < 0.05, `Initial outflow should be close to 984,536.90`);
});

test('Suite 1.2: Toyota Yaris ATIV 1.3 (> 1000cc) Worked Example Verification', () => {
  const vehiclePrice = 4700000;
  const depositPercent = 40.0;
  const depositAmount = depositPercentToAmount(vehiclePrice, depositPercent);
  assert.strictEqual(depositAmount, 1880000, 'Deposit should equal Rs. 1,880,000');

  const principal = calculatePrincipal(vehiclePrice, depositAmount);
  assert.strictEqual(principal, 2820000, 'Principal should equal Rs. 2,820,000');

  const annualProfitRate = 16.0; // 13.0% KIBOR + 3.0% Spread
  const tenureMonths = 36; // 3 years (SBP capped)
  const baseRental = calculateBaseRental(principal, annualProfitRate, tenureMonths);
  assert.ok(Math.abs(baseRental - 99142.83) < 0.05, `Base rental ${baseRental} should be close to 99,142.83`);

  const annualTakafulRate = 2.2;
  const monthlyTakaful = calculateMonthlyTakaful(vehiclePrice, annualTakafulRate);
  assert.ok(Math.abs(monthlyTakaful - 8616.67) < 0.05, `Monthly Takaful ${monthlyTakaful} should be close to 8,616.67`);

  const monthlyTracker = 1800;
  const totalMonthly = calculateTotalMonthlyRental(baseRental, monthlyTakaful, monthlyTracker);
  assert.ok(Math.abs(totalMonthly - 109559.50) < 0.05, `Total monthly ${totalMonthly} should be close to 109,559.50`);

  const initialOutflow = calculateInitialOutflow({
    securityDeposit: depositAmount,
    processingFee: 12000,
    applyFed: true,
    firstMonthRental: totalMonthly,
    upfrontTracker: 0
  });

  assert.strictEqual(initialOutflow.fedAmount, 1920, '16% FED on Rs. 12,000 should be Rs. 1,920');
  assert.ok(Math.abs(initialOutflow.totalInitialOutflow - 2003479.50) < 0.05, `Initial outflow should be close to 2,003,479.50`);
});

test('Suite 1.3: Percentage and Amount Conversions', () => {
  const price = 5000000;
  const amount = depositPercentToAmount(price, 35);
  assert.strictEqual(amount, 1750000);
  const percent = depositAmountToPercent(price, amount);
  assert.strictEqual(percent, 35.0);
});

test('Suite 1.4: Lifecycle Cost Calculation', () => {
  const initial = 1000000;
  const monthly = 50000;
  const tenure = 36;
  const lifecycle = calculateLifecycleCost(initial, monthly, tenure, 2000000, 3000000, 2.0);
  // (36 - 1) * 50,000 = 1,750,000 + 1,000,000 = 2,750,000
  assert.strictEqual(lifecycle.totalOutflow, 2750000);
  assert.strictEqual(lifecycle.totalRentalsPaid, 1800000);
});

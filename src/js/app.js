/**
 * Main Application Orchestrator for Pakistan Islamic Car Ijarah Calculator
 */

import {
  calculatePrincipal,
  depositPercentToAmount,
  depositAmountToPercent,
  calculateBaseRental,
  calculateMonthlyTakaful,
  calculateTotalMonthlyRental,
  calculateInitialOutflow,
  calculateLifecycleCost
} from './core/formulas.js';

import {
  getMaximumTenure,
  validateTenure,
  checkFinancingCap,
  calculateDBR,
  SBP_CONSTANTS
} from './core/sbp-rules.js';

import { VEHICLE_PRESETS, DEFAULT_BANKS } from './core/presets.js';
import { formatPKR, formatPercent, parseCleanNumber, escapeHTML } from './ui/formatters.js';
import { renderDonutChart } from './ui/charts.js';
import { getSavedBanks, saveBanks, restoreDefaultBanks, getSavedTheme, saveTheme } from './storage/local-store.js';
import { $, $$, onInputSync, getIcon } from './ui/dom.js';

class IjarahApp {
  constructor() {
    this.banks = getSavedBanks();
    this.state = {
      vehiclePrice: 3050000,
      engineCategory: 'upto_1000cc',
      customerType: 'salaried',
      depositPercent: 30.0,
      depositAmount: 915000,
      tenureMonths: 60,
      selectedBankId: 'meezan-bank',
      benchmarkKibor: 13.0,
      bankSpread: 2.5,
      takafulRate: 2.0,
      processingFee: 10000,
      applyFed: true,
      trackerMode: 'monthly',
      monthlyTrackerFee: 1500,
      upfrontTrackerFee: 20000,
      netMonthlyIncome: 0,
      theme: getSavedTheme()
    };

    this.init();
  }

  init() {
    this.applyTheme(this.state.theme);
    this.renderPresets();
    this.renderBankSelector();
    this.bindEvents();
    this.recalculate();
  }

  applyTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
    const themeBtn = $('#btn-theme-toggle');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? getIcon('sun') : getIcon('moon');
      themeBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  renderPresets() {
    const container = $('#presets-container');
    if (!container) return;

    container.innerHTML = VEHICLE_PRESETS.map((p, idx) => `
      <button type="button" class="preset-chip ${idx === 0 ? 'active' : ''}" data-preset-id="${p.id}" id="preset-${p.id}">
        <span class="preset-name">${escapeHTML(p.name)}</span>
        <span class="preset-price">${formatPKR(p.price)}</span>
        <span class="preset-engine">${escapeHTML(p.engineDisplacement)}</span>
      </button>
    `).join('');
  }

  renderBankSelector() {
    const selector = $('#select-bank');
    if (!selector) return;

    selector.innerHTML = this.banks.map(b => `
      <option value="${escapeHTML(b.id)}" ${b.id === this.state.selectedBankId ? 'selected' : ''}>
        ${escapeHTML(b.name)} (${b.bankSpread ? '+' + b.bankSpread + '% Spread' : ''})
      </option>
    `).join('');
  }

  bindEvents() {
    // Theme toggle
    $('#btn-theme-toggle')?.addEventListener('click', () => {
      this.applyTheme(this.state.theme === 'dark' ? 'light' : 'dark');
    });

    // Preset clicks
    $('#presets-container')?.addEventListener('click', (e) => {
      const chip = e.target.closest('.preset-chip');
      if (!chip) return;
      const presetId = chip.dataset.presetId;
      const preset = VEHICLE_PRESETS.find(p => p.id === presetId);
      if (preset) {
        $$('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectPreset(preset);
      }
    });

    // Customer type toggles
    $$('[data-customer-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('[data-customer-type]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.customerType = btn.dataset.customerType;
        if (this.state.customerType === 'business' && this.state.depositPercent < 35) {
          this.setDepositPercent(35.0);
        } else if (this.state.customerType === 'salaried' && this.state.depositPercent > 35 && this.state.depositPercent <= 35) {
          this.setDepositPercent(30.0);
        }
        this.recalculate();
      });
    });

    // Engine Category toggles
    $$('[data-engine-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('[data-engine-category]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setEngineCategory(btn.dataset.engineCategory);
      });
    });

    // Vehicle Price Input
    const priceInput = $('#input-vehicle-price');
    onInputSync(priceInput, () => {
      const val = parseCleanNumber(priceInput.value);
      this.state.vehiclePrice = Math.max(0, val);
      this.state.depositAmount = depositPercentToAmount(this.state.vehiclePrice, this.state.depositPercent);
      $('#input-deposit-amount').value = Math.round(this.state.depositAmount);
      this.recalculate();
    });

    // Deposit Percentage Slider & Numeric
    const depositSlider = $('#slider-deposit-percent');
    onInputSync(depositSlider, () => {
      this.setDepositPercent(parseFloat(depositSlider.value) || 30);
    });

    // Deposit Amount Input
    const depositAmountInput = $('#input-deposit-amount');
    onInputSync(depositAmountInput, () => {
      const amt = parseCleanNumber(depositAmountInput.value);
      const safeAmt = Math.max(0, Math.min(this.state.vehiclePrice, amt));
      this.state.depositAmount = safeAmt;
      this.state.depositPercent = depositAmountToPercent(this.state.vehiclePrice, safeAmt);
      if (depositSlider) depositSlider.value = this.state.depositPercent;
      $('#label-deposit-percent').textContent = formatPercent(this.state.depositPercent);
      this.recalculate();
    });

    // Tenure button group
    $$('[data-tenure-months]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        $$('[data-tenure-months]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.tenureMonths = parseInt(btn.dataset.tenureMonths, 10);
        this.recalculate();
      });
    });

    // Bank Profile selection
    $('#select-bank')?.addEventListener('change', (e) => {
      this.state.selectedBankId = e.target.value;
      const bank = this.banks.find(b => b.id === this.state.selectedBankId);
      if (bank) {
        this.state.benchmarkKibor = bank.benchmarkKibor;
        this.state.bankSpread = bank.bankSpread;
        this.state.takafulRate = bank.takafulRate;
        this.state.processingFee = bank.processingFee;
        this.state.monthlyTrackerFee = bank.monthlyTrackerFee || 1500;
        this.syncBankInputs();
      }
      this.recalculate();
    });

    // Rate Builders (KIBOR & Spread)
    onInputSync($('#input-kibor'), () => {
      this.state.benchmarkKibor = Math.max(0, parseFloat($('#input-kibor').value) || 0);
      this.markCustomBank();
      this.recalculate();
    });

    onInputSync($('#input-spread'), () => {
      this.state.bankSpread = Math.max(0, parseFloat($('#input-spread').value) || 0);
      this.markCustomBank();
      this.recalculate();
    });

    // Takaful Rate
    onInputSync($('#input-takaful-rate'), () => {
      this.state.takafulRate = Math.max(0, parseFloat($('#input-takaful-rate').value) || 0);
      this.markCustomBank();
      this.recalculate();
    });

    // Tracker Mode Toggles (Monthly vs Upfront)
    $$('[data-tracker-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('[data-tracker-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.trackerMode = btn.dataset.trackerMode;
        $('#monthly-tracker-group').style.display = this.state.trackerMode === 'monthly' ? 'flex' : 'none';
        $('#upfront-tracker-group').style.display = this.state.trackerMode === 'upfront' ? 'flex' : 'none';
        this.recalculate();
      });
    });

    onInputSync($('#input-tracker-monthly'), () => {
      this.state.monthlyTrackerFee = Math.max(0, parseCleanNumber($('#input-tracker-monthly').value));
      this.recalculate();
    });

    onInputSync($('#input-tracker-upfront'), () => {
      this.state.upfrontTrackerFee = Math.max(0, parseCleanNumber($('#input-tracker-upfront').value));
      this.recalculate();
    });

    // Processing fee & FED toggle
    onInputSync($('#input-processing-fee'), () => {
      this.state.processingFee = Math.max(0, parseCleanNumber($('#input-processing-fee').value));
      this.recalculate();
    });

    $('#check-fed')?.addEventListener('change', (e) => {
      this.state.applyFed = e.target.checked;
      this.recalculate();
    });

    // Monthly income for DBR
    onInputSync($('#input-monthly-income'), () => {
      this.state.netMonthlyIncome = Math.max(0, parseCleanNumber($('#input-monthly-income').value));
      this.recalculate();
    });

    // Manage Banks Modal
    this.bindBankModal();
  }

  selectPreset(preset) {
    this.state.vehiclePrice = preset.price;
    $('#input-vehicle-price').value = preset.price;
    this.setEngineCategory(preset.category);
    this.setDepositPercent(this.state.depositPercent);
  }

  setEngineCategory(category) {
    this.state.engineCategory = category;
    $$('[data-engine-category]').forEach(b => {
      b.classList.toggle('active', b.dataset.engineCategory === category);
    });

    const maxAllowed = getMaximumTenure(category);
    const alertBanner = $('#sbp-tenure-alert');

    // Disable tenure buttons above max allowed
    $$('[data-tenure-months]').forEach(btn => {
      const months = parseInt(btn.dataset.tenureMonths, 10);
      if (months > maxAllowed) {
        btn.disabled = true;
        if (this.state.tenureMonths > maxAllowed) {
          btn.classList.remove('active');
        }
      } else {
        btn.disabled = false;
      }
    });

    if (this.state.tenureMonths > maxAllowed) {
      this.state.tenureMonths = maxAllowed;
      $(`[data-tenure-months="${maxAllowed}"]`)?.classList.add('active');
    }

    if (category === 'above_1000cc') {
      alertBanner.style.display = 'flex';
      alertBanner.innerHTML = `${getIcon('info')} <div><strong>SBP Tenure Restriction:</strong> Vehicles above 1,000 cc are restricted to a maximum financing tenure of 36 months (3 years).</div>`;
    } else {
      alertBanner.style.display = 'none';
    }

    this.recalculate();
  }

  setDepositPercent(percent) {
    this.state.depositPercent = Math.max(0, Math.min(90, percent));
    this.state.depositAmount = depositPercentToAmount(this.state.vehiclePrice, this.state.depositPercent);
    const slider = $('#slider-deposit-percent');
    if (slider) slider.value = this.state.depositPercent;
    const label = $('#label-deposit-percent');
    if (label) label.textContent = formatPercent(this.state.depositPercent);
    const amtInput = $('#input-deposit-amount');
    if (amtInput) amtInput.value = Math.round(this.state.depositAmount);
    this.recalculate();
  }

  markCustomBank() {
    this.state.selectedBankId = 'custom-bank';
    const sel = $('#select-bank');
    if (sel) sel.value = 'custom-bank';
  }

  syncBankInputs() {
    $('#input-kibor').value = this.state.benchmarkKibor;
    $('#input-spread').value = this.state.bankSpread;
    $('#input-takaful-rate').value = this.state.takafulRate;
    $('#input-processing-fee').value = this.state.processingFee;
    $('#input-tracker-monthly').value = this.state.monthlyTrackerFee;
  }

  bindBankModal() {
    const modal = $('#modal-manage-banks');
    const openBtn = $('#btn-open-manage-banks');
    const closeBtn = $('#btn-close-modal');
    const resetBtn = $('#btn-reset-default-banks');
    const form = $('#form-custom-bank');

    openBtn?.addEventListener('click', () => {
      this.renderBankListInModal();
      modal?.classList.add('active');
    });

    closeBtn?.addEventListener('click', () => {
      modal?.classList.remove('active');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    resetBtn?.addEventListener('click', () => {
      if (confirm('Restore official SBP Islamic bank default profiles? Custom banks will be reset.')) {
        this.banks = restoreDefaultBanks();
        this.renderBankSelector();
        this.renderBankListInModal();
        $('#select-bank').value = 'meezan-bank';
        $('#select-bank').dispatchEvent(new Event('change'));
      }
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newBank = {
        id: 'custom-' + Date.now(),
        name: $('#bank-modal-name').value.trim(),
        shortName: $('#bank-modal-name').value.trim(),
        benchmarkKibor: parseFloat($('#bank-modal-kibor').value) || 13.0,
        bankSpread: parseFloat($('#bank-modal-spread').value) || 2.5,
        takafulRate: parseFloat($('#bank-modal-takaful').value) || 2.0,
        processingFee: parseCleanNumber($('#bank-modal-fee').value) || 10000,
        monthlyTrackerFee: 1500,
        upfrontTrackerFee: 0,
        notes: 'User customized bank profile.'
      };

      if (!newBank.name) return;

      this.banks.push(newBank);
      saveBanks(this.banks);
      this.renderBankSelector();
      this.renderBankListInModal();
      form.reset();
      $('#select-bank').value = newBank.id;
      $('#select-bank').dispatchEvent(new Event('change'));
    });
  }

  renderBankListInModal() {
    const list = $('#modal-banks-list');
    if (!list) return;

    list.innerHTML = this.banks.map(b => `
      <div class="breakdown-row" style="padding: 0.75rem 0;">
        <div>
          <strong>${escapeHTML(b.name)}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted);">
            KIBOR: ${b.benchmarkKibor}% | Spread: +${b.bankSpread}% | Takaful: ${b.takafulRate}%
          </div>
        </div>
        <div>
          ${b.id.startsWith('custom-') ? `<button type="button" class="btn-secondary" style="color: var(--color-danger); padding: 0.25rem 0.5rem;" data-delete-bank-id="${escapeHTML(b.id)}">Delete</button>` : `<span class="badge badge-sbp" style="font-size: 0.7rem;">Official</span>`}
        </div>
      </div>
    `).join('');

    $$('[data-delete-bank-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.deleteBankId;
        this.banks = this.banks.filter(b => b.id !== id);
        saveBanks(this.banks);
        this.renderBankSelector();
        this.renderBankListInModal();
        if (this.state.selectedBankId === id) {
          $('#select-bank').value = 'meezan-bank';
          $('#select-bank').dispatchEvent(new Event('change'));
        }
      });
    });
  }

  recalculate() {
    const {
      vehiclePrice,
      depositAmount,
      tenureMonths,
      benchmarkKibor,
      bankSpread,
      takafulRate,
      processingFee,
      applyFed,
      trackerMode,
      monthlyTrackerFee,
      upfrontTrackerFee,
      netMonthlyIncome,
      engineCategory
    } = this.state;

    // 1. Core Financial Calculations
    const principal = calculatePrincipal(vehiclePrice, depositAmount);
    const totalProfitRate = benchmarkKibor + bankSpread;
    const baseRental = calculateBaseRental(principal, totalProfitRate, tenureMonths);
    const monthlyTakaful = calculateMonthlyTakaful(vehiclePrice, takafulRate);
    const activeMonthlyTracker = trackerMode === 'monthly' ? monthlyTrackerFee : 0;
    const activeUpfrontTracker = trackerMode === 'upfront' ? upfrontTrackerFee : 0;

    const totalMonthlyRental = calculateTotalMonthlyRental(baseRental, monthlyTakaful, activeMonthlyTracker);

    const initialOutflow = calculateInitialOutflow({
      securityDeposit: depositAmount,
      processingFee,
      applyFed,
      firstMonthRental: totalMonthlyRental,
      upfrontTracker: activeUpfrontTracker
    });

    const lifecycle = calculateLifecycleCost(
      initialOutflow.totalInitialOutflow,
      totalMonthlyRental,
      tenureMonths,
      principal,
      vehiclePrice,
      takafulRate
    );

    // 2. Regulatory SBP Validations
    const capCheck = checkFinancingCap(vehiclePrice, principal);
    const dbrCheck = calculateDBR(totalMonthlyRental, netMonthlyIncome);

    // 3. Update UI Outputs
    // Hero Card
    $('#output-total-monthly').textContent = formatPKR(totalMonthlyRental);
    $('#output-total-rate-badge').textContent = `${formatPercent(totalProfitRate, 2)} Annual Profit`;
    $('#output-financed-principal').textContent = formatPKR(principal);

    // Subcomponent Breakdown
    $('#output-base-rental').textContent = formatPKR(baseRental);
    $('#output-monthly-takaful').textContent = formatPKR(monthlyTakaful);
    $('#output-monthly-tracker').textContent = formatPKR(activeMonthlyTracker);

    // Percent shares
    const basePct = totalMonthlyRental > 0 ? Math.round((baseRental / totalMonthlyRental) * 100) : 0;
    const takafulPct = totalMonthlyRental > 0 ? Math.round((monthlyTakaful / totalMonthlyRental) * 100) : 0;
    const trackerPct = totalMonthlyRental > 0 ? Math.round((activeMonthlyTracker / totalMonthlyRental) * 100) : 0;
    $('#pct-base-rental').textContent = `${basePct}%`;
    $('#pct-monthly-takaful').textContent = `${takafulPct}%`;
    $('#pct-monthly-tracker').textContent = `${trackerPct}%`;

    // Render Donut Chart
    renderDonutChart($('#donut-chart-container'), {
      baseRental,
      takaful: monthlyTakaful,
      tracker: activeMonthlyTracker
    });

    // Initial Outflow Card
    $('#out-deposit-amt').textContent = formatPKR(depositAmount);
    $('#out-processing-fee').textContent = formatPKR(processingFee);
    $('#out-fed-amt').textContent = formatPKR(initialOutflow.fedAmount);
    $('#out-fed-row').style.display = applyFed ? 'flex' : 'none';
    $('#out-advance-rental').textContent = formatPKR(totalMonthlyRental);
    $('#out-upfront-tracker-row').style.display = trackerMode === 'upfront' ? 'flex' : 'none';
    $('#out-upfront-tracker').textContent = formatPKR(activeUpfrontTracker);
    $('#output-total-initial-outflow').textContent = formatPKR(initialOutflow.totalInitialOutflow);

    // Lifecycle Breakdown
    $('#out-total-outflow').textContent = formatPKR(lifecycle.totalOutflow);
    $('#out-total-profit').textContent = formatPKR(lifecycle.totalProfitPaid);
    $('#out-total-takaful').textContent = formatPKR(lifecycle.totalTakafulPaid);

    // SBP Financing Cap Alert
    const capAlert = $('#sbp-cap-alert');
    if (capCheck.exceedsCap) {
      capAlert.style.display = 'flex';
      capAlert.innerHTML = `${getIcon('alert-triangle')} <div><strong>SBP Financing Cap Exceeded:</strong> State Bank of Pakistan caps individual auto borrowing at Rs. 3,000,000. Your current financing is ${formatPKR(principal)}. Please increase deposit by at least <strong>${formatPKR(capCheck.excessAmount)}</strong> (total deposit ${formatPKR(capCheck.requiredDepositAmount)} / ${capCheck.requiredDepositPercent}%) to qualify.</div>`;
    } else {
      capAlert.style.display = 'none';
    }

    // SBP DBR Affordability Meter
    const dbrFill = $('#dbr-meter-fill');
    const dbrBadge = $('#dbr-status-badge');
    const dbrMessage = $('#dbr-status-message');
    const dbrPercentDisplay = $('#dbr-percentage-display');

    if (!dbrCheck.hasIncome) {
      dbrFill.style.width = '0%';
      dbrFill.className = 'meter-fill';
      dbrBadge.innerHTML = `<span class="badge" style="background: var(--bg-surface-elevated); color: var(--text-muted);">Income Pending</span>`;
      dbrMessage.textContent = 'Enter your net take-home salary to evaluate SBP 40% DBR affordability.';
      dbrPercentDisplay.textContent = '0%';
    } else {
      const fillWidth = Math.min(100, (dbrCheck.dbrPercent / 60) * 100);
      dbrFill.style.width = `${fillWidth}%`;
      dbrPercentDisplay.textContent = `${dbrCheck.dbrPercent}%`;

      if (dbrCheck.isEligible) {
        dbrFill.className = 'meter-fill eligible';
        dbrBadge.innerHTML = `<span class="badge badge-sbp">${getIcon('shield-check')} SBP Eligible</span>`;
        dbrMessage.textContent = `Affordable commitment: Debt burden is ${dbrCheck.dbrPercent}%, well within SBP's 40% maximum threshold.`;
      } else {
        dbrFill.className = 'meter-fill ineligible';
        dbrBadge.innerHTML = `<span class="badge badge-danger">${getIcon('alert-triangle')} Exceeds SBP Limit</span>`;
        dbrMessage.textContent = `Monthly installment exceeds 40% of salary by ${(dbrCheck.dbrPercent - 40).toFixed(1)}%. Minimum required monthly income to qualify is ${formatPKR(dbrCheck.requiredMonthlyIncome)}.`;
      }
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.ijarahApp = new IjarahApp();
});

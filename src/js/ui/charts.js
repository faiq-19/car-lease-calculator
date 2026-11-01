/**
 * Lightweight, Dependency-Free Reactive SVG Donut Gauge Chart
 * Visualizes the breakdown of the Monthly Ijarah Installment:
 * - Base Rental (Principal + Profit)
 * - Monthly Takaful (Asset Insurance)
 * - Monthly Tracker
 */

/**
 * Renders an SVG Donut Chart representing payment proportions.
 *
 * @param {HTMLElement} container - The container element to render into
 * @param {Object} breakdown - Breakdown values in PKR
 * @param {number} breakdown.baseRental - Base rental amount
 * @param {number} breakdown.takaful - Monthly Takaful amount
 * @param {number} breakdown.tracker - Monthly tracker amount
 */
export function renderDonutChart(container, { baseRental = 0, takaful = 0, tracker = 0 }) {
  if (!container) return;

  const total = baseRental + takaful + tracker;
  if (total <= 0) {
    container.innerHTML = `<div class="chart-empty">No payment data</div>`;
    return;
  }

  // Segment proportions
  const pBase = (baseRental / total);
  const pTakaful = (takaful / total);
  const pTracker = (tracker / total);

  // SVG parameters
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Dash arrays and offsets
  const dashBase = pBase * circumference;
  const dashTakaful = pTakaful * circumference;
  const dashTracker = pTracker * circumference;

  const offsetBase = 0;
  const offsetTakaful = -dashBase;
  const offsetTracker = -(dashBase + dashTakaful);

  const basePercent = Math.round(pBase * 100);
  const takafulPercent = Math.round(pTakaful * 100);
  const trackerPercent = Math.round(pTracker * 100);

  container.innerHTML = `
    <div class="chart-wrapper">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="donut-svg" aria-label="Monthly Payment Breakdown Chart">
        <circle
          cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="transparent"
          stroke="var(--chart-bg)"
          stroke-width="${strokeWidth}"
        />
        <!-- Base Rental Segment (Emerald) -->
        <circle
          cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="transparent"
          stroke="var(--color-primary)"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${dashBase} ${circumference}"
          stroke-dashoffset="${offsetBase}"
          class="donut-segment segment-base"
        >
          <title>Base Rental: ${basePercent}%</title>
        </circle>
        <!-- Takaful Segment (Cyan/Sky) -->
        <circle
          cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="transparent"
          stroke="var(--color-accent)"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${dashTakaful} ${circumference}"
          stroke-dashoffset="${offsetTakaful}"
          class="donut-segment segment-takaful"
        >
          <title>Takaful: ${takafulPercent}%</title>
        </circle>
        <!-- Tracker Segment (Amber) -->
        <circle
          cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="transparent"
          stroke="var(--color-warning)"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${dashTracker} ${circumference}"
          stroke-dashoffset="${offsetTracker}"
          class="donut-segment segment-tracker"
        >
          <title>Tracker: ${trackerPercent}%</title>
        </circle>
      </svg>
      <div class="donut-center-label">
        <span class="center-sub">Total / mo</span>
      </div>
    </div>
  `;
}

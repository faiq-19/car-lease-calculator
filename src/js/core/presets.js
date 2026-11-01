/**
 * Default Pakistani Market Presets
 *
 * Pre-configured with realistic Pakistani automotive market data and
 * benchmark rates from leading Islamic financial institutions.
 */

// Popular locally assembled Pakistani vehicle presets
export const VEHICLE_PRESETS = [
  {
    id: 'alto-vxl',
    name: 'Suzuki Alto VXL AGS',
    engineDisplacement: '658 cc',
    category: 'upto_1000cc',
    price: 3050000,
    badge: 'Popular Hatchback'
  },
  {
    id: 'cultus-vxl',
    name: 'Suzuki Cultus VXL',
    engineDisplacement: '998 cc',
    category: 'upto_1000cc',
    price: 4200000,
    badge: 'Family Hatchback'
  },
  {
    id: 'yaris-ativ',
    name: 'Toyota Yaris ATIV 1.3 CVT',
    engineDisplacement: '1,329 cc',
    category: 'above_1000cc',
    price: 4700000,
    badge: 'Sedan (3-Yr Max)'
  },
  {
    id: 'city-cvt',
    name: 'Honda City 1.2L CVT',
    engineDisplacement: '1,199 cc',
    category: 'above_1000cc',
    price: 4690000,
    badge: 'Sedan (3-Yr Max)'
  },
  {
    id: 'alsvin-lumiere',
    name: 'Changan Alsvin 1.5 Lumiere',
    engineDisplacement: '1,480 cc',
    category: 'above_1000cc',
    price: 4990000,
    badge: 'Feature-Rich Sedan'
  },
  {
    id: 'sportage-alpha',
    name: 'KIA Sportage Alpha',
    engineDisplacement: '1,999 cc',
    category: 'above_1000cc',
    price: 7300000,
    badge: 'Compact SUV (3-Yr Max)'
  }
];

// Major Pakistani Islamic Banks offering Car Ijarah facilities
export const DEFAULT_BANKS = [
  {
    id: 'meezan-bank',
    name: 'Meezan Bank Car Ijarah',
    shortName: 'Meezan Bank',
    isDefault: true,
    benchmarkKibor: 13.00,
    bankSpread: 2.50,
    takafulRate: 2.00,
    processingFee: 10000,
    monthlyTrackerFee: 1500,
    upfrontTrackerFee: 0,
    notes: 'Pakistan\'s largest Islamic bank; benchmarked to 1-Year KIBOR.'
  },
  {
    id: 'bankislami',
    name: 'BankIslami Auto Ijarah',
    shortName: 'BankIslami',
    isDefault: false,
    benchmarkKibor: 13.00,
    bankSpread: 2.75,
    takafulRate: 1.90,
    processingFee: 12000,
    monthlyTrackerFee: 1600,
    upfrontTrackerFee: 0,
    notes: 'Competitive Takaful rate with partner Islamic windows.'
  },
  {
    id: 'bank-alfalah-islamic',
    name: 'Bank Alfalah Islamic Auto Ijarah',
    shortName: 'Bank Alfalah',
    isDefault: false,
    benchmarkKibor: 13.00,
    bankSpread: 3.00,
    takafulRate: 2.10,
    processingFee: 11000,
    monthlyTrackerFee: 1500,
    upfrontTrackerFee: 0,
    notes: 'Fast turnaround and flexible documentation.'
  },
  {
    id: 'faysal-islamic',
    name: 'Faysal Bank Barkat Auto Ijarah',
    shortName: 'Faysal Bank',
    isDefault: false,
    benchmarkKibor: 13.00,
    bankSpread: 2.80,
    takafulRate: 2.00,
    processingFee: 10500,
    monthlyTrackerFee: 1500,
    upfrontTrackerFee: 0,
    notes: 'Comprehensive Shariah-compliant auto leasing.'
  },
  {
    id: 'custom-bank',
    name: 'Custom Bank / Manual Quote',
    shortName: 'Custom Bank',
    isDefault: false,
    benchmarkKibor: 13.00,
    bankSpread: 2.50,
    takafulRate: 2.00,
    processingFee: 10000,
    monthlyTrackerFee: 1500,
    upfrontTrackerFee: 0,
    notes: 'Enter your custom dealership or bank quote parameters.'
  }
];

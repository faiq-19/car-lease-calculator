/**
 * Client-Side LocalStorage Persistence for Custom Bank Profiles and User Preferences
 */

import { DEFAULT_BANKS } from '../core/presets.js';

const STORAGE_KEYS = {
  BANKS: 'pak_ijarah_custom_banks',
  THEME: 'pak_ijarah_theme_pref'
};

/**
 * Retrieves the active bank catalog (either customized from localStorage or default).
 * @returns {Array<Object>} List of bank objects
 */
export function getSavedBanks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BANKS);
    if (!raw) return [...DEFAULT_BANKS];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.warn('Could not read custom banks from localStorage, using defaults.', e);
  }
  return [...DEFAULT_BANKS];
}

/**
 * Saves a customized bank list to browser localStorage.
 * @param {Array<Object>} banksList - Updated array of banks
 * @returns {boolean} Success status
 */
export function saveBanks(banksList) {
  try {
    localStorage.setItem(STORAGE_KEYS.BANKS, JSON.stringify(banksList));
    return true;
  } catch (e) {
    console.error('Failed to save banks to localStorage.', e);
    return false;
  }
}

/**
 * Clears custom banks from localStorage and restores the original defaults.
 * @returns {Array<Object>} Default bank list
 */
export function restoreDefaultBanks() {
  try {
    localStorage.removeItem(STORAGE_KEYS.BANKS);
  } catch (e) {
    console.error('Failed to reset banks in localStorage.', e);
  }
  return [...DEFAULT_BANKS];
}

/**
 * Gets saved theme preference ('dark' or 'light')
 * @returns {string} Theme name
 */
export function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  } catch {
    return 'dark';
  }
}

/**
 * Saves theme preference ('dark' or 'light')
 * @param {string} theme - 'dark' or 'light'
 */
export function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.warn('Could not save theme preference.', e);
  }
}

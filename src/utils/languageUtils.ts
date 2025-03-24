// Core
import * as Localization from 'expo-localization';

// Types
type SupportedLanguage = 'fr-FR' | 'en-US' | 'es-ES' | 'de-DE' | 'it-IT';

/**
 * Détermine la langue à utiliser pour la reconnaissance vocale et la synthèse vocale
 * en se basant sur la langue de l'appareil.
 * 
 * @returns {SupportedLanguage} Code de langue au format 'langue-PAYS'
 */
export const getDeviceLanguage = (): SupportedLanguage => {
  // Récupérer la langue de l'appareil
  const deviceLocale = Localization.getLocales()[0].languageTag;
  return deviceLocale as SupportedLanguage;
}; 
import * as Speech from 'expo-speech';
import { SpeechOptions } from '../types/services';
import { getDeviceLanguage } from '../utils/languageUtils';

export const VoiceSpeech = {
  // Parle le texte fourni
  async speak(text: string, options: SpeechOptions = {}): Promise<void> {
    const defaultOptions: SpeechOptions = {
      language: getDeviceLanguage(),
      pitch: 1.0,
      rate: 0.9,
    };
    
    try {
      await Speech.speak(text, {
        ...defaultOptions,
        ...options
      });
    } catch (error) {
      console.error("Error speaking text:", error);
      throw new Error(`Failed to speak text: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  
  // Arrête la synthèse vocale
  stop(): void {
    try {
      Speech.stop();
    } catch (error) {
      console.error("Error stopping speech:", error);
    }
  },
  
  // Vérifie si la synthèse vocale est en cours
  async isSpeaking(): Promise<boolean> {
    try {
      return await Speech.isSpeakingAsync();
    } catch (error) {
      console.error("Error checking if speaking:", error);
      return false;
    }
  }
}; 
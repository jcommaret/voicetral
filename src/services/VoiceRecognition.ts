import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";

export interface RecognitionOptions {
  lang?: string;
  interimResults?: boolean;
  maxAlternatives?: number;
  continuous?: boolean;
  addsPunctuation?: boolean;
}

export const VoiceRecognition = {
  // Expose les événements de reconnaissance vocale
  useSpeechRecognitionEvent,
  
  // Demande les permissions pour utiliser le microphone
  async requestPermissions(): Promise<{ granted: boolean }> {
    try {
      return await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    } catch (error) {
      console.error("Error requesting microphone permissions:", error);
      return { granted: false };
    }
  },
  
  // Démarre la reconnaissance vocale
  start(options: RecognitionOptions = {}): void {
    const defaultOptions: RecognitionOptions = {
      lang: "fr-FR",
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      addsPunctuation: true,
    };
    
    try {
      ExpoSpeechRecognitionModule.start({
        ...defaultOptions,
        ...options
      });
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      throw new Error(`Failed to start voice recognition: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  
  // Arrête la reconnaissance vocale
  stop(): void {
    try {
      ExpoSpeechRecognitionModule.stop();
    } catch (error) {
      console.error("Error stopping voice recognition:", error);
    }
  }
}; 
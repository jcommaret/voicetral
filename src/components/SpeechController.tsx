import { useState, useEffect } from "react";
import * as Speech from 'expo-speech';

interface UseSpeechHookReturn {
  isSpeaking: boolean;
  speakResponse: (text: string) => Promise<void>;
  stopSpeaking: () => void;
}

export const useSpeech = (): UseSpeechHookReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<Speech.Voice | null>(null);

  // Chargement des voix au démarrage
  useEffect(() => {
    const loadVoices = async () => {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        const frenchVoices = voices.filter(voice => voice.language.startsWith('fr'));
        
        if (frenchVoices.length > 0) {
          setSelectedVoice(frenchVoices[0]);
        } else if (voices.length > 0) {
          setSelectedVoice(voices[0]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des voix:", error);
      }
    };
    
    loadVoices();
  }, []);

  const speakResponse = async (text: string) => {
    try {
      setIsSpeaking(true);
      await Speech.speak(text, {
        language: 'fr-FR',
        pitch: 1.0,
        rate: 0.9,
        voice: selectedVoice?.identifier,
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
    } catch (error) {
      console.error("Erreur de synthèse vocale:", error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  return {
    isSpeaking,
    speakResponse,
    stopSpeaking
  };
}; 
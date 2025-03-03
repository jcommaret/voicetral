import React, { useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { VoiceInput } from './components';
import { MistralQuery, VoiceRecognition, VoiceSpeech } from './services';
import styles from './styles/styles';

export default function App() {
  // State management
  const [spokenText, setSpokenText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech recognition event handlers
  VoiceRecognition.useSpeechRecognitionEvent("start", () => setIsListening(true));
  VoiceRecognition.useSpeechRecognitionEvent("end", () => {
    setIsListening(false);
    if (spokenText.trim()) {
      getMistralResponse();
    }
  });
  VoiceRecognition.useSpeechRecognitionEvent("result", (event) => {
    const transcript = event.results[0]?.transcript || "";
    setSpokenText(transcript);
  });

  const startListening = async () => {
    try {
      const result = await VoiceRecognition.requestPermissions();
      if (!result.granted) {
        alert("Microphone permission is required");
        return;
      }

      VoiceRecognition.start({
        lang: "fr-FR",
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
        addsPunctuation: true,
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred with voice recognition");
    }
  };

  const stopListening = () => {
    VoiceRecognition.stop();
  };

  const getMistralResponse = async () => {
    if (!spokenText.trim()) {
      alert("Please say or type something first");
      return;
    }

    setIsLoading(true);
    try {
      const response = await MistralQuery.sendMessage(spokenText);
      speakResponse(response);
    } catch (error) {
      console.error("Mistral API error:", error);
      speakResponse(`Erreur: ${error instanceof Error ? error.message : "Impossible d'obtenir une réponse"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = async (text: string) => {
    try {
      setIsSpeaking(true);
      await VoiceSpeech.speak(text, {
        language: 'fr-FR',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => {
          setIsSpeaking(false);
          setSpokenText(""); // Réinitialiser le texte après avoir parlé
        },
        onError: () => setIsSpeaking(false)
      });
    } catch (error) {
      console.error("Speech error:", error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    VoiceSpeech.stop();
    setIsSpeaking(false);
  };

  const resetAll = () => {
    setSpokenText("");
    stopSpeaking();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <VoiceInput
        isListening={isListening}
        onStartListening={startListening}
        onStopListening={stopListening}
        onReset={resetAll}
        isLoading={isLoading || isSpeaking}
      />
    </View>
  );
}

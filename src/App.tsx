import React, { useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { MicrophoneInput, ResetButton, VoiceResponse } from './components';
import { MistralQuery, VoiceRecognition, VoiceSpeech } from './services';
import styles from './styles/styles';

export default function App() {
  // State management
  const [spokenText, setSpokenText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [shouldSpeak, setShouldSpeak] = useState(false);

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
      setResponseText(response);
      setShouldSpeak(true);
    } catch (error) {
      console.error("Mistral API error:", error);
      setResponseText(`Erreur: ${error instanceof Error ? error.message : "Impossible d'obtenir une réponse"}`);
      setShouldSpeak(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = () => {
    setSpokenText("");
    setResponseText("");
    setShouldSpeak(false);
    setIsLoading(false);
    setIsListening(false);
    VoiceRecognition.stop();
    VoiceSpeech.stop();
  };

  const handleSpeakingStart = () => {
    setIsSpeaking(true);
  };

  const handleSpeakingEnd = () => {
    setIsSpeaking(false);
    setShouldSpeak(false);
    setResponseText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MicrophoneInput
        isListening={isListening}
        isLoading={isLoading || isSpeaking}
        onStartListening={startListening}
        onStopListening={stopListening}
      />
      <ResetButton onReset={resetAll} />
      <VoiceResponse
        text={responseText}
        shouldSpeak={shouldSpeak}
        onSpeakingStart={handleSpeakingStart}
        onSpeakingEnd={handleSpeakingEnd}
      />
    </View>
  );
}

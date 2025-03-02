import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import * as Speech from 'expo-speech';

import { VoiceInput, ResponseDisplay } from './components';
import { mistralApi } from './services/api';
import styles from './styles/styles';

export default function App() {
  // State management
  const [spokenText, setSpokenText] = useState("");
  const [mistralResponse, setMistralResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Speech.Voice | null>(null);

  // Load available voices on startup
  useEffect(() => {
    const loadVoices = async () => {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        const frenchVoices = voices.filter(voice => voice.language.startsWith('fr'));
        setAvailableVoices(frenchVoices.length > 0 ? frenchVoices : voices);
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

  // Speech recognition event handlers
  useSpeechRecognitionEvent("start", () => setIsListening(true));
  useSpeechRecognitionEvent("end", () => {
    setIsListening(false);
    if (spokenText.trim()) {
      getMistralResponse();
    }
  });
  useSpeechRecognitionEvent("result", (event) => {
    const transcript = event.results[0]?.transcript || "";
    setSpokenText(transcript);
  });

  const startListening = async () => {
    try {
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        alert("Microphone permission is required");
        return;
      }

      ExpoSpeechRecognitionModule.start({
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
    ExpoSpeechRecognitionModule.stop();
  };

  const getMistralResponse = async () => {
    if (!spokenText.trim()) {
      alert("Please say or type something first");
      return;
    }

    setIsLoading(true);
    try {
      const response = await mistralApi.sendMessage(spokenText);
      setMistralResponse(response);
      speakResponse(response);
    } catch (error) {
      console.error("Mistral API error:", error);
      setMistralResponse(`Error: ${error instanceof Error ? error.message : "Could not get a response"}`);
    } finally {
      setIsLoading(false);
    }
  };

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
      console.error("Speech error:", error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const resetAll = () => {
    setSpokenText("");
    setMistralResponse("");
    stopSpeaking();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <VoiceInput
        spokenText={spokenText}
        onTextChange={setSpokenText}
        isListening={isListening}
        onStartListening={startListening}
        onStopListening={stopListening}
        onReset={resetAll}
        onSend={getMistralResponse}
        isLoading={isLoading}
      />
      <ResponseDisplay
        response={mistralResponse}
        isSpeaking={isSpeaking}
        onToggleSpeech={isSpeaking ? stopSpeaking : () => speakResponse(mistralResponse)}
      />
    </View>
  );
}

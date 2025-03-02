import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";

// Import external modules
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import { MaterialIcons } from "@expo/vector-icons";
import * as Speech from 'expo-speech';

// Import local services and styles
import { mistralApi } from './services/api';
import styles from './styles/styles';

export default function App() {
  // State management
  const [spokenText, setSpokenText] = useState("");
  const [mistralResponse, setMistralResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech recognition event handlers
  useSpeechRecognitionEvent("start", () => setIsListening(true));
  useSpeechRecognitionEvent("end", () => setIsListening(false));
  useSpeechRecognitionEvent("result", (event) => {
    setSpokenText(event.results[0]?.transcript || "");
  });

  // Voice recognition functions
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

  // Mistral API integration
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

  // Text-to-Speech functions
  const speakResponse = async (text: string) => {
    try {
      setIsSpeaking(true);
      await Speech.speak(text, {
        language: 'fr-FR',
        pitch: 1.0,
        rate: 0.9,
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

  // Reset all states
  const resetAll = () => {
    setSpokenText("");
    setMistralResponse("");
    stopSpeaking();
  };

  // UI Render
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.recognizedText}
          value={spokenText}
          onChangeText={setSpokenText}
          multiline={true}
          placeholder="What can I help you with?"
          placeholderTextColor="#999"
        />
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.iconButton, styles.clearButton]}
            onPress={resetAll}
          >
            <MaterialIcons name="clear" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.iconButton, isListening ? styles.listeningButton : styles.micButton]}
            onPress={isListening ? stopListening : startListening}
          >
            <MaterialIcons name={isListening ? "mic-off" : "mic"} size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.iconButton, styles.sendButton, isLoading && styles.disabledButton]}
            onPress={getMistralResponse}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <MaterialIcons name="send" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>

        {mistralResponse ? (
          <View style={styles.responseContainer}>
            <View style={styles.responseHeader}>
              <Text style={styles.responseTitle}>Response:</Text>
              <TouchableOpacity 
                style={styles.speakButton} 
                onPress={isSpeaking ? stopSpeaking : () => speakResponse(mistralResponse)}
              >
                <MaterialIcons 
                  name={isSpeaking ? "volume-off" : "volume-up"} 
                  size={24} 
                  color="#007AFF" 
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.responseText}>{mistralResponse}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

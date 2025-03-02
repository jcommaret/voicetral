import React, { useState } from "react";
import { View, StatusBar as RNStatusBar, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

// Import components
import {
  ControlButtons,
  ResponseDisplay,
  startListening,
  stopListening,
  useSpeech,
  useMistral
} from './components';

export default function App() {
  // State pour le texte prononcé
  const [spokenText, setSpokenText] = useState("");
  const [isListening, setIsListening] = useState(false);
  
  // Hooks personnalisés
  const { isSpeaking, speakResponse, stopSpeaking } = useSpeech();
  const { mistralResponse, isLoading, getMistralResponse } = useMistral();

  // Fonctions
  const handleStartListening = async () => {
    setSpokenText(""); // Réinitialiser le texte précédent
    await startListening();
  };

  const handleStopListening = () => {
    stopListening();
    
    // Si du texte a été reconnu, envoyer automatiquement la requête
    if (spokenText.trim()) {
      handleGetMistralResponse();
    }
  };

  const handleGetMistralResponse = async () => {
    await getMistralResponse(spokenText, speakResponse);
  };

  const resetAll = () => {
    setSpokenText("");
    stopSpeaking();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <ControlButtons
          isListening={isListening}
          startListening={handleStartListening}
          stopListening={handleStopListening}
          resetAll={resetAll}
          styles={styles}
        />

        {/* La réponse est affichée par-dessus les boutons si disponible */}
        {mistralResponse ? (
          <View style={styles.responseOverlay}>
            <ResponseDisplay
              mistralResponse={mistralResponse}
              isSpeaking={isSpeaking}
              speakResponse={speakResponse}
              stopSpeaking={stopSpeaking}
              styles={styles}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    marginTop: RNStatusBar.currentHeight || 0,
  },
  responseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  responseContainer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  responseTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
  },
  responseText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#ffffff',
  },
  speakButton: {
    padding: 8,
  },
});

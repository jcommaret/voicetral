// React et React Native core
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, TouchableOpacity, Text, ActivityIndicator, ScrollView } from "react-native";

import './services/polyfill';
// Modules externes
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";
import { MaterialIcons } from "@expo/vector-icons";
import { Mistral } from "@mistralai/mistralai";
import * as Speech from 'expo-speech';
// Imports locaux
import styles from './styles/styles';

import { MISTRAL_API_KEY, MISTRAL_MODEL } from "@env";

const apiKey = MISTRAL_API_KEY;
const model = MISTRAL_MODEL;

export default function App() {
  // State
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [mistralResponse, setMistralResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Afficher les variables d'environnement au démarrage pour vérifier
  useEffect(() => {
    console.log('MISTRAL_API_KEY présente:', !!MISTRAL_API_KEY);
    console.log('Valeur de MISTRAL_MODEL:', MISTRAL_MODEL);
  }, []);
  
  // Hooks
  useSpeechRecognitionEvent("start", () => 
    setIsListening(true)
  );
  useSpeechRecognitionEvent("end", () => 
    setIsListening(false)
  );
  useSpeechRecognitionEvent("result", (event) => {
    setSpokenText(event.results[0]?.transcript || "");
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("Erreur:", event.error, "Message:", event.message);
  });

  // Fonctions
  const startListening = async () => {
    try {
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        alert("La permission d'utiliser le microphone est nécessaire");
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
      alert("Une erreur s'est produite");
    }
  };
  
  // Fonction pour arrêter la reconnaissance vocale
  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  // Mistral
  const mistral = new Mistral({
    apiKey: apiKey,
  });
  
  async function getMistralResponse() {
    if (!spokenText.trim()) {
      alert("Veuillez dire ou taper quelque chose d'abord");
      return;
    }

    setIsLoading(true);
    try {
      const result = await mistral.chat.complete({
        model: model,
        stream: false,
        messages: [
          {
            content: spokenText,
            role: "user",
          },
        ],
      });
    
      // Extraire le texte de la réponse et le définir dans l'état
      let responseText = "Pas de réponse disponible";
      if (result.choices && result.choices.length > 0) {
        const content = result.choices[0].message.content;
        responseText = typeof content === 'string' ? content : "Format de réponse non supporté";
      }
      
      setMistralResponse(responseText);
      console.log(result);
      
      // Lire la réponse à haute voix
      speakResponse(responseText);
    } catch (error) {
      console.error("Erreur lors de l'appel à Mistral:", error);
      setMistralResponse("Erreur: Impossible d'obtenir une réponse");
    } finally {
      setIsLoading(false);
    }
  }

  // Fonction pour lire la réponse à haute voix
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
      console.error("Erreur lors de la lecture vocale:", error);
      setIsSpeaking(false);
    }
  };

  // Fonction pour arrêter la lecture vocale
  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  // Fonction pour tout réinitialiser
  const resetAll = () => {
    setSpokenText("");
    setMistralResponse("");
    stopSpeaking();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* DEBUG: Affichage des variables d'environnement - À supprimer après test */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        <Text>API Key présente: {MISTRAL_API_KEY ? "✅" : "❌"}</Text>
        <Text>Modèle: {MISTRAL_MODEL || "Non défini"}</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput style={styles.recognizedText} value={spokenText} onChangeText={setSpokenText} multiline={true} placeholder="Que puis-je faire pour vous ?" placeholderTextColor="#999" />
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.iconButton, styles.clearButton]} onPress={resetAll}>
            <MaterialIcons name="clear" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, isListening ? styles.listeningButton : styles.micButton]} onPress={isListening ? stopListening : startListening}>
            <MaterialIcons name={isListening ? "mic-off" : "mic"} size={32} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, styles.sendButton, isLoading && styles.disabledButton]} onPress={getMistralResponse} disabled={isLoading}>
            {isLoading ? ( <ActivityIndicator color="white" size="small" />) : ( 
              <MaterialIcons name="send" size={24} color="white" /> 
            )}
          </TouchableOpacity>
        </View>

        {mistralResponse ? (
          <View style={styles.responseContainer}>
            <View style={styles.responseHeader}>
              <Text style={styles.responseTitle}>Réponse:</Text>
              {mistralResponse && (
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
              )}
            </View>
            <Text style={styles.responseText}>{mistralResponse}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

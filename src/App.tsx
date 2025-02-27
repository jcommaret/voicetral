// React et React Native core
import { useState  } from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, View, TouchableOpacity } from "react-native";

// Modules externes
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";

import { MaterialIcons } from "@expo/vector-icons";

// Imports locaux
import styles from "./styles/styles";

export default function App() {
  // State
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  
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

  return (
    <View style={[styles.container ]}>
      <StatusBar />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.recognizedText]}
          value={spokenText}
          onChangeText={setSpokenText}
          multiline={true}
          placeholder="Posez votre question !"
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.iconButton, styles.clearButton]}
            onPress={() => setSpokenText("")}
          >
            <MaterialIcons name="clear" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, isListening && styles.buttonListening]}
            onPress={isListening ? stopListening : startListening}
          >
            <MaterialIcons
              name={isListening ? "mic-off" : "mic"}
              size={32}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, styles.sendButton]}
            onPress={() => {
              /* Fonction d'envoi à implémenter */
            }}
          >
            <MaterialIcons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

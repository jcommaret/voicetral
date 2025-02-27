import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState } from "react";
import styles from "./styles/styles";

export default function App() {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");

  useSpeechRecognitionEvent("start", () => setIsListening(true));
  useSpeechRecognitionEvent("end", () => setIsListening(false));
  useSpeechRecognitionEvent("result", (event) => {
    setSpokenText(event.results[0]?.transcript || "");
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("Erreur:", event.error, "Message:", event.message);
  });

  const startListening = async () => {
    try {
      const result =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        alert("La permission d'utiliser le microphone est nécessaire");
        return;
      }

      ExpoSpeechRecognitionModule.start({
        lang: "fr-FR",
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
      });
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite");
    }
  };

  const stopListening = () => {
    ExpoSpeechRecognitionModule.stop();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Texte reconnu :</Text>
      <Text style={styles.recognizedText}>{spokenText}</Text>

      <TouchableOpacity
        style={[styles.button, isListening && styles.buttonListening]}
        onPress={isListening ? stopListening : startListening}
      >
        <Text style={styles.buttonText}>
          {isListening ? "Arrêter l'écoute" : "Commencer à écouter"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

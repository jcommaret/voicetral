import React from "react";
import { TextInput } from "react-native";
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "expo-speech-recognition";

interface VoiceRecognitionProps {
  spokenText: string;
  setSpokenText: (text: string) => void;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  onSpeechEnd?: () => void;
  styles: any;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({
  spokenText,
  setSpokenText,
  isListening,
  setIsListening,
  onSpeechEnd,
  styles,
}) => {
  // Speech recognition event handlers
  useSpeechRecognitionEvent("start", () => setIsListening(true));
  useSpeechRecognitionEvent("end", () => {
    setIsListening(false);
    if (spokenText.trim() && onSpeechEnd) {
      onSpeechEnd();
    }
  });
  useSpeechRecognitionEvent("result", (event) => {
    setSpokenText(event.results[0]?.transcript || "");
  });

  return (
    <TextInput
      style={styles.recognizedText}
      value={spokenText}
      onChangeText={setSpokenText}
      multiline={true}
      placeholder="Que puis-je faire pour vous ?"
      placeholderTextColor="#999"
    />
  );
};

// Fonctions de reconnaissance vocale exportées séparément
export const startListening = async (lang = "fr-FR") => {
  try {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      alert("Permission microphone requise");
      return false;
    }

    ExpoSpeechRecognitionModule.start({
      lang,
      interimResults: true,
      maxAlternatives: 1,
      continuous: false,
      addsPunctuation: true,
    });
    return true;
  } catch (error) {
    console.error(error);
    alert("Une erreur est survenue avec la reconnaissance vocale");
    return false;
  }
};

export const stopListening = () => {
  ExpoSpeechRecognitionModule.stop();
};

export default VoiceRecognition; 
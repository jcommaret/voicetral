import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ResponseDisplayProps {
  mistralResponse: string;
  isSpeaking: boolean;
  speakResponse: (text: string) => void;
  stopSpeaking: () => void;
  styles: any;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  mistralResponse,
  isSpeaking,
  speakResponse,
  stopSpeaking,
  styles,
}) => {
  if (!mistralResponse) {
    return null;
  }

  return (
    <View style={styles.responseContainer}>
      <View style={styles.responseHeader}>
        <Text style={styles.responseTitle}>Réponse</Text>
        <TouchableOpacity 
          style={styles.speakButton} 
          onPress={isSpeaking ? stopSpeaking : () => speakResponse(mistralResponse)}
        >
          <MaterialIcons 
            name={isSpeaking ? "volume-off" : "volume-up"} 
            size={32} 
            color="#007AFF" 
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.responseText}>{mistralResponse}</Text>
      </ScrollView>
    </View>
  );
};

export default ResponseDisplay; 
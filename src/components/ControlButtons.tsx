import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, GestureResponderEvent } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ControlButtonsProps {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetAll: () => void;
  styles: any;
}

const { height, width } = Dimensions.get('window');

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isListening,
  startListening,
  stopListening,
  resetAll,
  styles,
}) => {
  const handleStopButton = () => {
    stopListening();
    resetAll();
  };

  // Fonction vide pour éviter l'erreur TypeScript avec null
  const emptyFunction = () => {};

  return (
    <View style={localStyles.container}>
      <TouchableOpacity 
        style={[
          localStyles.button,
          localStyles.topButton,
          isListening ? localStyles.listeningButton : localStyles.micButton
        ]}
        onPress={isListening ? emptyFunction : startListening}
        disabled={isListening}
      >
        <MaterialIcons 
          name="mic" 
          size={64} 
          color="white" 
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          localStyles.button,
          localStyles.bottomButton,
          localStyles.stopButton
        ]}
        onPress={handleStopButton}
      >
        <MaterialIcons 
          name="stop" 
          size={64} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: height - 50, // Laisser un peu d'espace pour le statusbar
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  
  micButton: {
    backgroundColor: '#007AFF',
  },
  listeningButton: {
    backgroundColor: '#FF3B30',
  },
  stopButton: {
    backgroundColor: '#8E8E93',
  }
});

export default ControlButtons; 
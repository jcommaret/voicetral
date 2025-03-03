import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import styles from '../../styles/styles';

interface VoiceInputProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  isListening,
  onStartListening,
  onStopListening,
  onReset,
  isLoading,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.microphoneContainer,
          isListening ? styles.listeningButton : styles.micButton
        ]}
        onPress={isListening ? onStopListening : onStartListening}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <ActivityIndicator color="white" size="large" />
            <Text style={styles.microphoneText}>Traitement en cours...</Text>
          </>
        ) : (
          <>
            <MaterialIcons 
              name={isListening ? "hearing" : "mic"} 
              size={64} 
              color="white" 
            />
          </>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.clearButton} onPress={onReset}>
        <MaterialIcons name="clear" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
}; 
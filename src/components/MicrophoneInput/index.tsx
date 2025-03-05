// Core
import React from 'react';

// React Native Components
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

// External Libraries
import { MaterialIcons } from "@expo/vector-icons";

// Types
import { MicrophoneInputProps } from '../../types/components';

// Styles
import styles from '../../styles/styles';

export const MicrophoneInput: React.FC<MicrophoneInputProps> = ({
  isListening,
  isLoading,
  isSpeaking,
  onStartListening,
  onStopListening,
}) => {
  return (
    <TouchableOpacity style={[styles.microphoneContainer, isListening ? styles.listeningButton : styles.micButton]}
      onPress={isListening ? onStopListening : onStartListening}
      disabled={isLoading || isSpeaking}>
      { isSpeaking ? ( <MaterialIcons name="volume-up" size={64} color="white" />) : 
        isLoading ? (  <ActivityIndicator color="white" size="large" />
      ) : ( 
      <MaterialIcons name={isListening ? "hearing" : "mic"}  size={64} color="white" />
      )}
    </TouchableOpacity>
  );
}; 
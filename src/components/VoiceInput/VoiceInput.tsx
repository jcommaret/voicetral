import React from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import styles from './VoiceInput.styles';

interface VoiceInputProps {
  spokenText: string;
  onTextChange: (text: string) => void;
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onReset: () => void;
  onSend: () => void;
  isLoading: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  spokenText,
  onTextChange,
  isListening,
  onStartListening,
  onStopListening,
  onReset,
  onSend,
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
      >
        <MaterialIcons 
          name={isListening ? "mic-off" : "mic"} 
          size={64} 
          color="white" 
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.recognizedText}
          value={spokenText}
          onChangeText={onTextChange}
          multiline={true}
          placeholder="Appuyez sur le micro et parlez..."
          placeholderTextColor="#999"
        />
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.iconButton, styles.clearButton]}
            onPress={onReset}
          >
            <MaterialIcons name="clear" size={24} color="white" />
          </TouchableOpacity>

          {!isListening && spokenText.trim() && (
            <TouchableOpacity 
              style={[styles.iconButton, styles.sendButton, isLoading && styles.disabledButton]}
              onPress={onSend}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <MaterialIcons name="send" size={24} color="white" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}; 
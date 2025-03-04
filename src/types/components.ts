// Interfaces pour MicrophoneInput
export interface MicrophoneInputProps {
  isListening: boolean;
  isLoading: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

// Interfaces pour ResetButton
export interface ResetButtonProps {
  onReset: () => void;
}

// Interfaces pour VoiceResponse
export interface VoiceResponseProps {
  text: string;
  onSpeakingStart: () => void;
  onSpeakingEnd: () => void;
  shouldSpeak: boolean;
} 
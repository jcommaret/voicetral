// Interfaces pour VoiceRecognition
export interface RecognitionOptions {
  lang?: string;
  interimResults?: boolean;
  maxAlternatives?: number;
  continuous?: boolean;
  addsPunctuation?: boolean;
}

// Interfaces pour VoiceSpeech
export interface SpeechOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  onDone?: () => void;
  onError?: () => void;
}

// Interfaces pour MistralQuery
export interface MistralResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
} 
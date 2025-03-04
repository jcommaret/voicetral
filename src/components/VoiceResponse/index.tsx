// Core
import React, { useEffect } from 'react';

// Services
import { VoiceSpeech } from '../../services';

// Types
import { VoiceResponseProps } from '../../types/components';
import { SpeechOptions } from '../../types/services';

export const VoiceResponse: React.FC<VoiceResponseProps> = ({
  text,
  onSpeakingStart,
  onSpeakingEnd,
  shouldSpeak
}) => {
  useEffect(() => {
    if (shouldSpeak && text) {
      const speakText = async () => {
        try {
          onSpeakingStart();
          await VoiceSpeech.speak(text, {
            language: 'fr-FR',
            pitch: 1.0,
            rate: 0.9,
            onDone: () => {
              onSpeakingEnd();
            },
            onError: () => {
              onSpeakingEnd();
            }
          } as SpeechOptions);
        } catch (error) {
          console.error("Speech error:", error);
          onSpeakingEnd();
        }
      };

      speakText();
    }
  }, [text, shouldSpeak]);

  return null; // Ce composant n'a pas de rendu visuel
}; 
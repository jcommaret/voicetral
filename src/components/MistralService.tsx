import { useState } from "react";
import { mistralApi } from '../services/api';

interface UseMistralHookReturn {
  mistralResponse: string;
  isLoading: boolean;
  getMistralResponse: (text: string, onSuccess?: (response: string) => void) => Promise<void>;
}

export const useMistral = (): UseMistralHookReturn => {
  const [mistralResponse, setMistralResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getMistralResponse = async (text: string, onSuccess?: (response: string) => void) => {
    if (!text.trim()) {
      alert("Veuillez parler ou taper quelque chose d'abord");
      return;
    }

    setIsLoading(true);
    try {
      const response = await mistralApi.sendMessage(text);
      setMistralResponse(response);
      
      // Si une callback est fournie, l'appeler avec la réponse
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (error) {
      console.error("Erreur API Mistral:", error);
      setMistralResponse(`Erreur: ${error instanceof Error ? error.message : "Impossible de recevoir une réponse"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mistralResponse,
    isLoading,
    getMistralResponse
  };
}; 
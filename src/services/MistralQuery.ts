import { MISTRAL_API_KEY, MISTRAL_MODEL } from "@env";
import { MistralResponse } from "../types/services";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const MistralQuery = {
  async sendMessage(message: string): Promise<string> {
    try {

      const aiInstructions = "Soit concise, réponds comme dans une conversation naturelle, ne mets aucun smiley";

      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        },
        body: JSON.stringify({
          model: MISTRAL_MODEL,
          messages: [
            {
              role: 'user',
              content: aiInstructions + " " + message,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new ApiError(
          response.status,
          `API error: ${response.status} ${response.statusText}`
        );
      }

      const data: MistralResponse = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from Mistral');
      }

      return data.choices[0].message.content;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(
        `Failed to get response: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },
}; 
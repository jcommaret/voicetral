import { MISTRAL_API_KEY, MISTRAL_MODEL } from "@env";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MistralResponse {
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

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const mistralApi = {
  async sendMessage(message: string): Promise<string> {
    try {
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
              content: message,
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

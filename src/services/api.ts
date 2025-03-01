import {ChatMessage, MistralModel} from '../types';

class MistralAPI {
  private baseUrl = 'https://api.mistral.ai/v1';

  constructor(private apiKey: string) {}

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || `HTTP error! status: ${response.status}`,
      );
    }

    return response.json();
  }

  async sendChatMessage(
    modelId: string,
    messages: ChatMessage[],
  ): Promise<string> {
    const data = await this.fetchAPI('/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: modelId,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    });

    return data.choices[0].message.content;
  }

  async getAvailableModels(): Promise<MistralModel[]> {
    const data = await this.fetchAPI('/models');
    return data.data;
  }
}

export const createMistralAPI = (apiKey: string) => new MistralAPI(apiKey);

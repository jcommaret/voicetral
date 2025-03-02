export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface MistralModel {
  id: string;
  name: string;
  created: number;
}
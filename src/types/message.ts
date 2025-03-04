// Interfaces pour les messages
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
} 
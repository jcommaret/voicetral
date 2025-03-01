import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  private keys = {
    API_KEY: 'api_key',
    SELECTED_MODEL: 'selected_model',
  } as const;

  async saveApiKey(apiKey: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.keys.API_KEY, apiKey);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la clé API:', error);
      throw error;
    }
  }

  async getApiKey(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.keys.API_KEY);
    } catch (error) {
      console.error('Erreur lors de la récupération de la clé API:', error);
      throw error;
    }
  }

  async saveSelectedModel(modelId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.keys.SELECTED_MODEL, modelId);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du modèle:', error);
      throw error;
    }
  }

  async getSelectedModel(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.keys.SELECTED_MODEL);
    } catch (error) {
      console.error('Erreur lors de la récupération du modèle:', error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.keys.API_KEY,
        this.keys.SELECTED_MODEL,
      ]);
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error);
      throw error;
    }
  }
}

export const storage = new StorageService();

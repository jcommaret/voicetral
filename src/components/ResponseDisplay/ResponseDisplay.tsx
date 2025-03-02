import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/styles';

interface ResponseDisplayProps {
  response: string;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  if (!response) return null;

  return (
    <View style={styles.responseContainer}>
      <View style={styles.responseHeader}>
        <Text style={styles.responseTitle}>Réponse:</Text>
      </View>
      <Text style={styles.responseText}>{response}</Text>
    </View>
  );
}; 
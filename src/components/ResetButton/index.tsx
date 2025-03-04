// Core
import React from 'react';

// React Native Components
import { TouchableOpacity, Text } from 'react-native';

// External Libraries
import { MaterialIcons } from "@expo/vector-icons";

// Types
import { ResetButtonProps } from '../../types/components';

// Styles
import styles from '../../styles/styles';

export const ResetButton: React.FC<ResetButtonProps> = ({
  onReset
}) => {
  return (
    <TouchableOpacity 
      style={styles.clearButton}
      onPress={onReset}
    >
      <MaterialIcons name="clear" size={36} color="white" />
    </TouchableOpacity>
  );
}; 
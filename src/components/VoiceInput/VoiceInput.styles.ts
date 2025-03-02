import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  microphoneContainer: {
    height: height * 0.5, // Prend la moitié de la hauteur de l'écran
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    backgroundColor: '#007AFF',
  },
  listeningButton: {
    backgroundColor: '#FF3B30',
  },
  inputContainer: {
    padding: 20,
    gap: 10,
  },
  recognizedText: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    color: '#000',
    borderRadius: 12,
    fontSize: 18,
    minHeight: 100,
    textAlignVertical: "top",
    textAlign: "left",
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  iconButton: {
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: '#8E8E93',
  },
  sendButton: {
    backgroundColor: '#34C759',
  },
  disabledButton: {
    opacity: 0.6,
  },
}); 
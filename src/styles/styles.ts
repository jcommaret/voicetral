import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

// Styles centralisés pour toute l'application
const styles = StyleSheet.create({
  // Styles généraux
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  
  // Styles pour VoiceInput
  microphoneContainer: {
    height: height * 0.8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  microphoneText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 20,
    gap: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5BF42',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  instructionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fed700',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  instructionText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  // Styles pour les boutons
  clearButton: {
    height: height * 0.2,
    width: '100%',
    backgroundColor: '#e00500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  micButton: {
    backgroundColor: '#fed700',
  },
  listeningButton: {
    backgroundColor: '#ff8204',
  },
  loadingButton: {
    backgroundColor: '#0000ff',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default styles;

import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

// Styles centralisés pour toute l'application
const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  
  // Styles du microphone
  microphoneContainer: {
    height: height * 0.7,
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
  micButton: {
    backgroundColor: '#fed700',
  },
  listeningButton: {
    backgroundColor: '#ff8204',
  },
  
  // Styles du bouton de réinitialisation
  clearButton: {
    height: height * 0.3,
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
  
  // État désactivé
  disabledButton: {
    opacity: 0.6,
  }
});

export default styles;

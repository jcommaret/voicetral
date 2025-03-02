import { StyleSheet } from "react-native";

// Styles fixes sans thème
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    width: "100%",
    padding: 10,
    gap: 10,
  },
  recognizedText: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    color: '#000',
    borderRadius: 12,
    fontSize: 18,
    minHeight: 150,
    marginBottom: 10,
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
  micButton: {
    backgroundColor: '#007AFF',
  },
  listeningButton: {
    backgroundColor: '#FF3B30',
  },
  sendButton: {
    backgroundColor: '#34C759',
  },
  disabledButton: {
    opacity: 0.6,
  },
  responseContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  speakButton: {
    padding: 5,
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },
  containerDark: {
    backgroundColor: "#000",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    padding: 10,
    gap: 10,
  },
  recognizedText: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    fontSize: 18,
    minHeight: 150,
    marginBottom: 10,
    textAlignVertical: "top",
    color: "#000",
  },
  recognizedTextDark: {
    backgroundColor: "#222",
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  buttonListening: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#8E8E93",
  },
  sendButton: {
    backgroundColor: "#34C759",
  },
  themeToggle: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default styles;

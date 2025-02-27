import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  recognizedText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    minHeight: 100,
    padding: 10,
    backgroundColor: "#f0f0f0",
    width: "100%",
    borderRadius: 8,
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
});

export default styles;

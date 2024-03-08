import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useState, useContext } from "react";
import { auth } from "../../core/firebase/firebase";
import { useAuth } from "../../core/context/firebaseContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signin } = useAuth();

  async function handleSignin() {
    // Check if email and password are not empty
    if (email == "" || password == "") {
      setError("Email and password are required.");
      return;
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      // Call the signup function here with email and password
      const result = await signin(auth, email, password);
      console.log("User signed up successfully:", result);

      AsyncStorage.setItem("user", JSON.stringify(result));
    } catch (error) {
      // Handle signup error
      console.error("Error during signup:", error);
    }
  }

  return (
    <View>
      <Text>Login</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" />
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity onPress={handleSignin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text>{email}</Text>
      <Text>{password}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
});

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { useState, useContext } from "react";
import { AuthProvider, useAuth } from "../../core/context/firebaseContext";
import { auth } from "../../core/firebase/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signup } = useAuth();

  async function handleSignup() {
    // Check if email and password are not empty
    if (email == "" || password == "") {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
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
      const result = await signup(auth, email, password);
      console.log("User signed up successfully:", result);

      AsyncStorage.setItem("user", JSON.stringify(result));

      navigation.navigate("Home");
    } catch (error) {
      // Handle signup error
      console.error("Error during signup:", error);
    }
  }

  return (
    <View>
      <Text>Register components</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text>{email}</Text>
      <Text>{password}</Text>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
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

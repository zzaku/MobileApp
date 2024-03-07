<<<<<<< HEAD
import { SafeAreaView, StatusBar, View, Text, Button } from "react-native";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { useState } from "react";
import { AuthProvider } from "../core/context/firebaseContext";

export function Auth({navigation}) {
  const [login, setLogin] = useState(true);
=======
import Register from "../components/auth/Register";
import { SafeAreaView, StatusBar, TouchableOpacity, Text } from 'react-native';
>>>>>>> acb34d1 (home page & add project)

  return (
    <SafeAreaView>
<<<<<<< HEAD
      {login ? <Login navigation={navigation} /> : <Register navigation={navigation}/>}
      <Button onPress={() => setLogin(true)} title="Login" />
      <Button onPress={() => setLogin(false)} title="register" />
=======
      <Text>Auth</Text>
      <StatusBar style="Project" />
>>>>>>> acb34d1 (home page & add project)
    </SafeAreaView>
  );
}

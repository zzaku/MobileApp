import { SafeAreaView, StatusBar, View, Text, Button } from "react-native";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { useState } from "react";

export function Auth({navigation}) {
  const [login, setLogin] = useState(true);

  return (
    <SafeAreaView>
      {login ? <Login navigation={navigation} /> : <Register navigation={navigation}/>}
      <Button onPress={() => setLogin(true)} title="Login" />
      <Button onPress={() => setLogin(false)} title="register" />
      <Text>Auth</Text>
      <StatusBar style="Project" />
    </SafeAreaView>
  );
}

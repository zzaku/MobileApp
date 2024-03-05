import { SafeAreaView, StatusBar, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../core/context/firebaseContext";
import { useEffect, useState } from "react";

export function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user", (err, result) => {
      setUser(result);
    });
  }, []);

  return (
    <SafeAreaView>
      {user ? <Text>Logged in</Text> : <Text>Not logged in</Text>}
    </SafeAreaView>
  );
}

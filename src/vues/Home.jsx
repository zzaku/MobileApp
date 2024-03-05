import { SafeAreaView, StatusBar, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home() {
  try {
    const user = AsyncStorage.getItem("user");
    console.log("USER", user);
  } catch (error) {}

  return (
    <SafeAreaView>
      <Text>Home</Text>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

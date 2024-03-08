import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { AuthProvider } from "./core/context/firebaseContext";
import { Auth } from "./vues/Auth";
import { Home } from "./vues/Home";
import { Project } from "./vues/Project";

import HomeHeader from "./core/header/HomeHeader";

const Stack = createStackNavigator();

const headerBackground = () => {
  return <View style={{ backgroundColor: "#2B339B", flex: 1 }} />;
};

const StackNav = () => {
  return (
    <GluestackUIProvider config={config}>
      <Stack.Navigator>
        <Stack.Screen name="Boards" component={Home} options={{
          headerStyle: {
            height: 150,
          },
          headerTitle: '',
          headerBackground: () => <HomeHeader />,
          headerTintColor: '#FBFAF9',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Project" component={Project} options={{
          headerStyle: {
            backgroundColor: '#2B339B',
          },
          headerTintColor: '#FBFAF9',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </GluestackUIProvider>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        // Simulate checking if user is authenticated (e.g., checking AsyncStorage)
        const isAuthenticated = await AsyncStorage.getItem("user");
        setUser(isAuthenticated);
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
      {user ? <StackNav /> : <Auth />}
      </AuthProvider>
    </NavigationContainer>
  );
}

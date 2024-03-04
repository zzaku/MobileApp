import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Home } from "./vues/Home";
import { Project} from "./vues/Project";
import { Auth } from "./vues/Auth";
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Page1" component={Home} />
      <Stack.Screen name="Page2" component={Vue2} />
    </Stack.Navigator>
  );
};
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if the user is already logged in
    checkLoggedInStatus();
  }, []);
  const checkLoggedInStatus = async () => {
    setIsLoggedIn(true);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={StackNav} />
          <Stack.Screen name="Anim" component={Home} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Auth} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

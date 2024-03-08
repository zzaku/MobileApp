import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

import { View } from 'react-native';

import { Auth } from "./vues/Auth";
import { Home } from "./vues/Home";
import { Project } from "./vues/Project";

import HomeHeader from "./core/header/HomeHeader";
import { AuthProvider, useAuth } from "./core/context/firebaseContext";

const Stack = createStackNavigator();

const headerBackground = () => {
  return <View style={{ backgroundColor: "#2B339B", flex: 1 }} />;
};

const StackNav = () => {

  const { currentUserID } = useAuth();
  
  return (
    <GluestackUIProvider config={config}>
      <Stack.Navigator>
        {
          !currentUserID ?
          <Stack.Screen name="Authentification" component={Auth} options={{
            headerStyle: {
              height: 150,
              backgroundColor: "#140F3F"
            },
            headerTitle: 'Authentification',
            headerTintColor: '#FBFAF9',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
          :
          <>
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
          </>
        }
      </Stack.Navigator>
    </GluestackUIProvider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer >
        <StackNav/>
      </NavigationContainer>
    </AuthProvider>
  );
}

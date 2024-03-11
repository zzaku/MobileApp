import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

import { View } from 'react-native';

import { Auth } from "./vues/Auth";
import { Home } from "./vues/Home";
import { Project } from "./vues/Project";

import HomeHeader from "./core/header/HomeHeader";
import { AuthProvider, useAuth } from "./core/context/firebaseContext";
import { LoadingProvider } from "./core/context/LoadingContext";

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
            <Stack.Screen name="Project" component={Project} options={({ route }) => (
              {
                headerStyle: {
                  backgroundColor: '#2B339B',
                },
                title: `Project : ${route.params.project.projectTitle}`,
                headerTintColor: '#FBFAF9',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                url: `/project/${route.params.project.id}`
              }
            )} />
          </>
        }
      </Stack.Navigator>
    </GluestackUIProvider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <NavigationContainer >
          <StackNav/>
        </NavigationContainer>
      </LoadingProvider>
    </AuthProvider>
  );
}

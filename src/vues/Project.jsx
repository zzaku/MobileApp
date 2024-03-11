import { StyleSheet, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeProject from '../components/project/homeProject';
import SettingsProject from '../components/project/settingsProject';
import { Icon } from '@gluestack-ui/themed';
import { ClipboardList, Component } from 'lucide-react-native';

export function Project({route}) {
  const { project } = route.params;

  const Tab = createMaterialBottomTabNavigator();

  const styles = StyleSheet.create({
    whiteColor: {
        color: "#FBFAF9",
    },
    container: {
      margin: 0,
        flex: 1,
        height: "100%",
    }
  });

  return (
    <>
      <Tab.Navigator 
      barStyle={{ 
        backgroundColor: "#262551",
        borderColor:  "#F5FCFF",
        borderRadius: 3,
        borderTopWidth: 2,
      }}
      >
        <Tab.Screen name="Tableau de bord" component={HomeProject} initialParams={{ project }}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon as={ClipboardList} color={'#FAB425'} size="lg" />
          ),
          tabBarLabel: <Text style={{color: "#F5FCFF"}}>Tableau de bord</Text>,
        }}
        />
        <Tab.Screen name="Composants" component={SettingsProject} initialParams={{ project }}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon as={Component} color={'#FAB425'} size="lg" />
          ),
          tabBarLabel: <Text style={{color: "#F5FCFF"}}>Composants</Text>,
        }}
        />
      </Tab.Navigator>
    </>
  );
}


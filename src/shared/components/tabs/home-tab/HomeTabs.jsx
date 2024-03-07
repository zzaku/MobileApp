// HomeTab.jsx
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from "@gluestack-ui/themed";
import { PlusCircle } from 'lucide-react-native';
import { Auth } from '../../../../vues/Auth';
import { Project } from '../../../../vues/Project';
import HomeHeader from '../../../../core/header/HomeHeader';

const Tab = createMaterialBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      tabBarOptions={{
        activeTintColor: '#D4AF37',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen
        name="ProfildePage"
        component={HomeHeader}
        options={{
          tabBarLabel: 'Profile Page',
          tabBarIcon: () => (
            <Icon as={PlusCircle} size="md" />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Auth}
        options={{
          tabBarLabel: 'Profile Page',
          tabBarIcon: () => (
            <Icon as={PlusCircle} size="md" />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Project}
        options={{
          tabBarLabel: 'Setting',
          tabBarOptions: {
            activeTintColor: '#006600',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;

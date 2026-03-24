import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

import TonightScreen from '../screens/TonightScreen';
import VenuesScreen from '../screens/VenuesScreen';
import EventsScreen from '../screens/EventsScreen';
import MapScreen from '../screens/MapScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

const getTabIcon = (routeName, focused) => {
  const icons = {
    Tonight: focused ? 'moon' : 'moon-outline',
    Venues: focused ? 'beer' : 'beer-outline',
    Events: focused ? 'calendar' : 'calendar-outline',
    Map: focused ? 'map' : 'map-outline',
    More: focused ? 'ellipsis-horizontal-circle' : 'ellipsis-horizontal-circle-outline',
  };
  return icons[routeName] || 'help-circle-outline';
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabIcon(route.name, focused);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.tabBar,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 85,
          paddingTop: SIZES.sm,
          paddingBottom: SIZES.lg,
        },
        tabBarLabelStyle: {
          fontSize: SIZES.caption,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Tonight" component={TonightScreen} />
      <Tab.Screen name="Venues" component={VenuesScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;

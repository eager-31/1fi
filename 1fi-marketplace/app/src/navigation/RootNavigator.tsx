import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from './ShopStack';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { colors, spacing } from '../theme';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const ICONS: Record<keyof RootTabParamList, IoniconName> = {
  Home: 'home-outline',
  Shop: 'bag-handle-outline',
  EmiDues: 'calendar-outline',
  Limit: 'speedometer-outline',
  Profile: 'person-outline',
};

const LABELS: Record<keyof RootTabParamList, string> = {
  Home: 'Home',
  Shop: 'Shop',
  EmiDues: 'EMI Dues',
  Limit: 'Limit',
  Profile: 'Profile',
};

export function RootNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarIcon: ({ focused, color, size }) => (
          <View style={styles.iconWrap}>
            <View style={[styles.indicator, focused && styles.indicatorActive]} />
            <Ionicons name={ICONS[route.name]} size={size} color={color} />
          </View>
        ),
        tabBarLabel: LABELS[route.name],
      })}
    >
      <Tab.Screen name="Home" component={PlaceholderScreen} />
      <Tab.Screen name="Shop" component={ShopStack} />
      <Tab.Screen name="EmiDues" component={PlaceholderScreen} />
      <Tab.Screen name="Limit" component={PlaceholderScreen} />
      <Tab.Screen name="Profile" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopColor: colors.border,
    height: 64,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
  tabItem: {
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: -spacing.sm - 2,
    width: 22,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  indicatorActive: {
    backgroundColor: colors.primary,
  },
});

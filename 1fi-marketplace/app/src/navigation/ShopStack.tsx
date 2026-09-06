import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopScreen } from '../screens/ShopScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { OrderConfirmationScreen } from '../screens/OrderConfirmationScreen';
import { colors } from '../theme';
import type { ShopStackParamList } from './types';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export function ShopStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="ShopHome" component={ShopScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: '', headerBackTitle: 'Shop' }}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ title: '', headerBackTitle: 'Back' }}
      />
    </Stack.Navigator>
  );
}

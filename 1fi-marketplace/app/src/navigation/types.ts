import type { NavigatorScreenParams } from '@react-navigation/native';

export type ShopStackParamList = {
  ShopHome: undefined;
  ProductDetail: { productId: string };
  OrderConfirmation: { productId: string; variantId: string; planId: string };
};

export type RootTabParamList = {
  Home: undefined;
  Shop: NavigatorScreenParams<ShopStackParamList> | undefined;
  EmiDues: undefined;
  Limit: undefined;
  Profile: undefined;
};

/**
 * Ambient typing for the Expo "public" environment variables this app reads.
 * Expo inlines any `EXPO_PUBLIC_*` var into the bundle at build time.
 * See https://docs.expo.dev/guides/environment-variables/
 */
declare const process: {
  env: {
    EXPO_PUBLIC_API_URL?: string;
  } & Record<string, string | undefined>;
};

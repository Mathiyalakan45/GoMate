
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { store, persistor } from '@/store/store';
import { useAppSelector } from '@/store/hooks';

function RootLayoutNav() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (isAuthenticated && inAuthGroup) {
      // If user is signed in and trying to access auth screens, redirect to home
      router.replace('/(tabs)');
    } else if (!isAuthenticated && inTabsGroup) {
      // If user is not signed in and trying to access protected tabs, redirect to login
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ presentation: 'card', headerShown: true, title: 'Route Details' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        } 
        persistor={persistor}
      >
        <RootLayoutNav />
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}

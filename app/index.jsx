import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // For now, redirect to login screen
  // Later we'll add authentication check here
  return <Redirect href="/(auth)/login" />;
}


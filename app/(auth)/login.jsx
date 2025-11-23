import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    dispatch(loginStart());
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = { id: 1, email: email, name: 'Traveler' }; // Mock user
      dispatch(loginSuccess(user));
      // Auth Guard in _layout will handle redirect, but we can force it for UX
      router.replace('/(tabs)');
    } catch (error) {
      dispatch(loginFailure());
      Alert.alert('Error', 'Login failed.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <ThemedText type="title" style={styles.title}>Welcome to GoMate</ThemedText>
              <ThemedText style={styles.subtitle}>Sign in to explore routes</ThemedText>
            </View>
            <View style={styles.form}>
              <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <Feather name="mail" size={20} color={colors.icon} style={styles.inputIcon} />
                <TextInput 
                  style={[styles.input, { color: colors.text }]} 
                  placeholder="Email" 
                  placeholderTextColor={colors.icon} 
                  value={email} 
                  onChangeText={setEmail} 
                  autoCapitalize="none" 
                />
              </View>
              <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <Feather name="lock" size={20} color={colors.icon} style={styles.inputIcon} />
                <TextInput 
                  style={[styles.input, { color: colors.text }]} 
                  placeholder="Password" 
                  placeholderTextColor={colors.icon} 
                  value={password} 
                  onChangeText={setPassword} 
                  secureTextEntry 
                />
              </View>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: colors.tint, opacity: isLoading ? 0.7 : 1 }]} 
                onPress={handleLogin} 
                disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.buttonText}>Login</ThemedText>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')} style={styles.linkButton}>
                <ThemedText style={{ color: colors.tint }}>Don't have an account? Sign Up</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 28, marginBottom: 8 },
  subtitle: { fontSize: 16, opacity: 0.7 },
  form: { gap: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, height: 50 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16 },
  button: { height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  linkButton: { alignItems: 'center', marginTop: 16 },
});
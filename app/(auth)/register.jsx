import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginStart, registerSuccess, loginFailure } from '@/store/slices/authSlice';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    dispatch(loginStart());
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = { id: Date.now(), email, name };
      dispatch(registerSuccess(user));
      router.replace('/(tabs)');
    } catch (error) {
      dispatch(loginFailure());
      Alert.alert('Error', 'Registration failed.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
          </View>
          <View style={styles.form}>
            {/* Name Input */}
            <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <Feather name="user" size={20} color={colors.icon} style={styles.inputIcon} />
              <TextInput style={[styles.input, { color: colors.text }]} placeholder="Full Name" placeholderTextColor={colors.icon} value={name} onChangeText={setName} />
            </View>
            {/* Email Input */}
            <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <Feather name="mail" size={20} color={colors.icon} style={styles.inputIcon} />
              <TextInput style={[styles.input, { color: colors.text }]} placeholder="Email" placeholderTextColor={colors.icon} value={email} onChangeText={setEmail} autoCapitalize="none" />
            </View>
            {/* Password Input */}
            <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <Feather name="lock" size={20} color={colors.icon} style={styles.inputIcon} />
              <TextInput style={[styles.input, { color: colors.text }]} placeholder="Password" placeholderTextColor={colors.icon} value={password} onChangeText={setPassword} secureTextEntry />
            </View>
            {/* Confirm Password */}
            <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.card }]}>
              <Feather name="lock" size={20} color={colors.icon} style={styles.inputIcon} />
              <TextInput style={[styles.input, { color: colors.text }]} placeholder="Confirm Password" placeholderTextColor={colors.icon} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: colors.tint }]} onPress={handleRegister} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.buttonText}>Sign Up</ThemedText>}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.linkButton}>
              <ThemedText style={{ color: colors.tint }}>Already have an account? Sign In</ThemedText>
            </TouchableOpacity>
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
  title: { fontSize: 28 },
  form: { gap: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, height: 50 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16 },
  button: { height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  linkButton: { alignItems: 'center', marginTop: 16 },
});
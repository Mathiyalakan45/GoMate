import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { toggleTheme, setThemeMode } from '@/store/slices/themeSlice';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { mode, currentTheme } = useAppSelector((state) => state.theme);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleThemeModeChange = (newMode) => {
    dispatch(setThemeMode(newMode));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Profile
          </ThemedText>
          {user && (
            <ThemedText style={styles.subtitle}>
              {user.name || user.email}
            </ThemedText>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Appearance
          </ThemedText>

          {/* Dark Mode Toggle */}
          <View
            style={[
              styles.settingItem,
              {
                backgroundColor: colorScheme === 'dark' ? '#1E293B' : '#F8FAFC',
                borderColor: colors.icon + '20',
              },
            ]}>
            <View style={styles.settingLeft}>
              <Feather
                name={currentTheme === 'dark' ? 'moon' : 'sun'}
                size={24}
                color={colors.tint}
                style={styles.settingIcon}
              />
              <View style={styles.settingText}>
                <ThemedText style={styles.settingTitle}>Dark Mode</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  {mode === 'system'
                    ? 'Follow system'
                    : currentTheme === 'dark'
                    ? 'Always on'
                    : 'Always off'}
                </ThemedText>
              </View>
            </View>
            <Switch
              value={currentTheme === 'dark'}
              onValueChange={handleThemeToggle}
              trackColor={{ false: '#767577', true: colors.tint }}
              thumbColor={currentTheme === 'dark' ? '#fff' : '#f4f3f4'}
            />
          </View>

          {/* Theme Mode Options */}
          <View style={styles.themeModeContainer}>
            <TouchableOpacity
              style={[
                styles.themeModeButton,
                {
                  backgroundColor:
                    mode === 'light'
                      ? colors.tint + '20'
                      : colorScheme === 'dark'
                      ? '#1E293B'
                      : '#F8FAFC',
                  borderColor: mode === 'light' ? colors.tint : colors.icon + '20',
                  borderWidth: mode === 'light' ? 2 : 1,
                },
              ]}
              onPress={() => handleThemeModeChange('light')}>
              <Feather
                name="sun"
                size={20}
                color={mode === 'light' ? colors.tint : colors.icon}
              />
              <ThemedText
                style={[
                  styles.themeModeText,
                  { color: mode === 'light' ? colors.tint : colors.text },
                ]}>
                Light
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeModeButton,
                {
                  backgroundColor:
                    mode === 'system'
                      ? colors.tint + '20'
                      : colorScheme === 'dark'
                      ? '#1E293B'
                      : '#F8FAFC',
                  borderColor: mode === 'system' ? colors.tint : colors.icon + '20',
                  borderWidth: mode === 'system' ? 2 : 1,
                },
              ]}
              onPress={() => handleThemeModeChange('system')}>
              <Feather
                name="smartphone"
                size={20}
                color={mode === 'system' ? colors.tint : colors.icon}
              />
              <ThemedText
                style={[
                  styles.themeModeText,
                  { color: mode === 'system' ? colors.tint : colors.text },
                ]}>
                System
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeModeButton,
                {
                  backgroundColor:
                    mode === 'dark'
                      ? colors.tint + '20'
                      : colorScheme === 'dark'
                      ? '#1E293B'
                      : '#F8FAFC',
                  borderColor: mode === 'dark' ? colors.tint : colors.icon + '20',
                  borderWidth: mode === 'dark' ? 2 : 1,
                },
              ]}
              onPress={() => handleThemeModeChange('dark')}>
              <Feather
                name="moon"
                size={20}
                color={mode === 'dark' ? colors.tint : colors.icon}
              />
              <ThemedText
                style={[
                  styles.themeModeText,
                  { color: mode === 'dark' ? colors.tint : colors.text },
                ]}>
                Dark
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Account
          </ThemedText>

          {user && (
            <View
              style={[
                styles.settingItem,
                {
                  backgroundColor: colorScheme === 'dark' ? '#1E293B' : '#F8FAFC',
                  borderColor: colors.icon + '20',
                },
              ]}>
              <View style={styles.settingLeft}>
                <Feather
                  name="mail"
                  size={24}
                  color={colors.icon}
                  style={styles.settingIcon}
                />
                <View style={styles.settingText}>
                  <ThemedText style={styles.settingTitle}>Email</ThemedText>
                  <ThemedText style={styles.settingDescription}>
                    {user.email}
                  </ThemedText>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.logoutButton,
              { backgroundColor: '#EF4444' + '20', borderColor: '#EF4444' + '40' },
            ]}
            onPress={handleLogout}>
            <Feather name="log-out" size={20} color="#EF4444" style={{ marginRight: 8 }} />
            <ThemedText style={[styles.logoutText, { color: '#EF4444' }]}>
              Logout
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: '700',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    opacity: 0.6,
  },
  themeModeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  themeModeButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },
  themeModeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

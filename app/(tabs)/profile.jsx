import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
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
  const theme = Colors[colorScheme ?? 'light'];

  // Placeholder image for profile - in a real app this would come from user data
  const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => {
          dispatch(logout());
          router.replace('/(auth)/login');
      }},
    ]);
  };

  const handleThemeToggle = () => dispatch(toggleTheme());

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* New Profile Header Design */}
        <View style={styles.headerContainer}>
          <View style={[styles.imageWrapper, { borderColor: theme.card }]}>
            <Image 
              source={{ uri: PROFILE_IMAGE }} 
              style={styles.profileImage} 
            />
            <View style={[styles.editBadge, { backgroundColor: theme.tint }]}>
              <Feather name="edit-2" size={12} color="#FFF" />
            </View>
          </View>
          
          <ThemedText type="title" style={[styles.userName, { color: theme.text }]}>
            {user?.name || 'Guest User'}
          </ThemedText>
          <ThemedText style={[styles.userEmail, { color: theme.subtext }]}>
            {user?.email}
          </ThemedText>

          <View style={[styles.statsContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.statItem}>
              <ThemedText style={[styles.statNumber, { color: theme.text }]}>12</ThemedText>
              <ThemedText style={[styles.statLabel, { color: theme.subtext }]}>Trips</ThemedText>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <ThemedText style={[styles.statNumber, { color: theme.text }]}>4.9</ThemedText>
              <ThemedText style={[styles.statLabel, { color: theme.subtext }]}>Rating</ThemedText>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <ThemedText style={[styles.statNumber, { color: theme.text }]}>3</ThemedText>
              <ThemedText style={[styles.statLabel, { color: theme.subtext }]}>Saved</ThemedText>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionHeader, { color: theme.subtext }]}>PREFERENCES</ThemedText>
          
          <View style={[styles.settingCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.settingRow, { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconContainer, { backgroundColor: theme.background }]}>
                  <Feather name="moon" size={18} color={theme.text} />
                </View>
                <ThemedText style={styles.settingText}>Dark Mode</ThemedText>
              </View>
              <Switch
                value={currentTheme === 'dark'}
                onValueChange={handleThemeToggle}
                trackColor={{ false: theme.border, true: theme.tint }}
                thumbColor="#FFF"
              />
            </View>

            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.rowLeft}>
                <View style={[styles.iconContainer, { backgroundColor: theme.background }]}>
                  <Feather name="bell" size={18} color={theme.text} />
                </View>
                <ThemedText style={styles.settingText}>Notifications</ThemedText>
              </View>
              <Feather name="chevron-right" size={20} color={theme.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { borderColor: theme.error }]} 
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color={theme.error} />
          <ThemedText style={[styles.logoutText, { color: theme.error }]}>Log Out</ThemedText>
        </TouchableOpacity>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 60 },
  
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 60,
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'space-evenly',
  },
  statItem: {
    alignItems: 'center',
    width: '30%',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: '100%',
  },

  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '600',
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
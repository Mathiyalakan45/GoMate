import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import RouteCard from '@/components/RouteCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRoutesStart, fetchRoutesSuccess, fetchRoutesFailure } from '@/store/slices/routesSlice';
import { fetchRoutes } from '@/services/api';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

const CATEGORIES = ['All', 'Bus', 'Train', 'Metro'];

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { routes, isLoading, error } = useAppSelector((state) => state.routes);
  const { user } = useAppSelector((state) => state.auth);
  const { favourites } = useAppSelector((state) => state.favourites);
  
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [activeCategory, setActiveCategory] = useState('All');

  const loadRoutes = async () => {
    dispatch(fetchRoutesStart());
    try {
      const data = await fetchRoutes();
      dispatch(fetchRoutesSuccess(data));
    } catch (err) {
      dispatch(fetchRoutesFailure(err.message));
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const onRefresh = () => {
    loadRoutes();
  };

  // Simple filtering logic for the UI
  const filteredRoutes = activeCategory === 'All' 
    ? routes 
    : routes.filter(r => r.type === activeCategory);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor={theme.tint} />
        }>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <ThemedText style={[styles.greeting, { color: theme.subtext }]}>
              Hello, {user?.name || 'Traveler'} 👋
            </ThemedText>
            <ThemedText type="title" style={[styles.title, { color: theme.text }]}>
              Where to next?
            </ThemedText>
          </View>
          <TouchableOpacity style={[styles.notificationBtn, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Feather name="bell" size={20} color={theme.icon} />
            <View style={[styles.notificationDot, { backgroundColor: theme.error }]} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Feather name="search" size={20} color={theme.icon} style={styles.searchIcon} />
          <TextInput
            placeholder="Search routes, stops..."
            placeholderTextColor={theme.icon}
            style={[styles.searchInput, { color: theme.text }]}
          />
          <View style={[styles.filterBtn, { backgroundColor: theme.background }]}>
            <Feather name="sliders" size={18} color={theme.tint} />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setActiveCategory(cat)}
                  style={[
                    styles.categoryChip,
                    { 
                      backgroundColor: isActive ? theme.tint : theme.card,
                      borderColor: isActive ? theme.tint : theme.border,
                      borderWidth: 1,
                    }
                  ]}>
                  <ThemedText style={[
                    styles.categoryText, 
                    { color: isActive ? '#FFFFFF' : theme.subtext, fontWeight: isActive ? '700' : '500' }
                  ]}>
                    {cat}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Content Section */}
        <View style={styles.sectionHeader}>
          <ThemedText style={[styles.sectionTitle, { color: theme.text }]}>
            Popular Routes
          </ThemedText>
          <TouchableOpacity>
            <ThemedText style={[styles.seeAll, { color: theme.tint }]}>See All</ThemedText>
          </TouchableOpacity>
        </View>

        {isLoading && routes.length === 0 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={theme.tint} />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Feather name="alert-circle" size={40} color={theme.error} style={{marginBottom: 10}} />
            <ThemedText style={{ color: theme.subtext }}>Failed to load routes</ThemedText>
            <ThemedText style={[styles.retryText, { color: theme.tint }]} onPress={loadRoutes}>
              Try Again
            </ThemedText>
          </View>
        ) : filteredRoutes.length === 0 ? (
          <View style={styles.centerContainer}>
            <Feather name="map" size={40} color={theme.icon} style={{marginBottom: 10}} />
            <ThemedText style={{ color: theme.subtext }}>No routes found</ThemedText>
          </View>
        ) : (
          <View style={styles.routesContainer}>
            {filteredRoutes.map((route) => {
              const isFavourite = favourites.some((fav) => fav.id === route.id);
              return <RouteCard key={route.id} route={route} isFavourite={isFavourite} />;
            })}
          </View>
        )}
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
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  searchContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  filterBtn: {
    padding: 8,
    borderRadius: 10,
  },
  categoriesContainer: {
    marginBottom: 28,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 4,
  },
  categoryText: {
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  routesContainer: {
    paddingHorizontal: 24,
  },
  centerContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryText: {
    marginTop: 12,
    fontWeight: '600',
  },
});
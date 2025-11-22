import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import RouteCard from '@/components/RouteCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRoutesStart, fetchRoutesSuccess, fetchRoutesFailure } from '@/store/slices/routesSlice';
import { fetchRoutes } from '@/services/api';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { routes, isLoading, error } = useAppSelector((state) => state.routes);
  const { user } = useAppSelector((state) => state.auth);
  const { favourites } = useAppSelector((state) => state.favourites);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

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

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor={colors.tint} />
        }>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Welcome{user?.name ? `, ${user.name}` : ''}!
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Explore available routes
          </ThemedText>
        </View>

        {isLoading && routes.length === 0 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.tint} />
            <ThemedText style={styles.loadingText}>Loading routes...</ThemedText>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
            <ThemedText style={styles.retryText} onPress={loadRoutes}>
              Tap to retry
            </ThemedText>
          </View>
        ) : routes.length === 0 ? (
          <View style={styles.centerContainer}>
            <ThemedText style={styles.emptyText}>No routes available</ThemedText>
          </View>
        ) : (
          <View style={styles.routesContainer}>
            {routes.map((route) => {
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
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  routesContainer: {
    marginTop: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.7,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 12,
    textAlign: 'center',
  },
  retryText: {
    fontSize: 14,
    opacity: 0.7,
    textDecorationLine: 'underline',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
  },
});

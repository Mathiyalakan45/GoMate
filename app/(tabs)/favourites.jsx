import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import RouteCard from '@/components/RouteCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFavourite, clearFavourites } from '@/store/slices/favouritesSlice';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function FavouritesScreen() {
  const dispatch = useAppDispatch();
  const { favourites } = useAppSelector((state) => state.favourites);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleRemoveFavourite = (routeId) => {
    Alert.alert(
      'Remove from Favourites',
      'Are you sure you want to remove this route from your favourites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => dispatch(removeFavourite(routeId)),
        },
      ]
    );
  };

  const handleClearAll = () => {
    if (favourites.length === 0) {
      return;
    }

    Alert.alert(
      'Clear All Favourites',
      'Are you sure you want to remove all favourites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => dispatch(clearFavourites()),
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <ThemedText type="title" style={styles.title}>
              Favourites
            </ThemedText>
            {favourites.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearAll}>
                <Feather name="trash-2" size={16} color={colors.tint} style={{ marginRight: 4 }} />
                <ThemedText style={[styles.clearButtonText, { color: colors.tint }]}>
                  Clear All
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>
          <ThemedText style={styles.subtitle}>
            {favourites.length === 0
              ? 'No saved routes yet'
              : `${favourites.length} saved route${favourites.length > 1 ? 's' : ''}`}
          </ThemedText>
        </View>

        {favourites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="heart" size={64} color={colors.icon} style={{ opacity: 0.3, marginBottom: 16 }} />
            <ThemedText type="subtitle" style={styles.emptyTitle}>
              No Favourites Yet
            </ThemedText>
            <ThemedText style={styles.emptyText}>
              Start exploring routes and add your favourites to see them here!
            </ThemedText>
          </View>
        ) : (
          <View style={styles.routesContainer}>
            {favourites.map((route) => (
              <View key={route.id} style={styles.routeWrapper}>
                <RouteCard route={route} />
                <TouchableOpacity
                  style={[styles.removeButton, { backgroundColor: '#EF4444' + '20' }]}
                  onPress={() => handleRemoveFavourite(route.id)}>
                  <Feather name="x" size={16} color="#EF4444" style={{ marginRight: 6 }} />
                  <ThemedText style={[styles.removeButtonText, { color: '#EF4444' }]}>
                    Remove
                  </ThemedText>
                </TouchableOpacity>
              </View>
            ))}
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
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 34,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
  },
  routesContainer: {
    marginTop: 8,
    gap: 24,
  },
  routeWrapper: {
    marginBottom: 0,
  },
  removeButton: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    marginBottom: 12,
    fontSize: 22,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 24,
  },
});

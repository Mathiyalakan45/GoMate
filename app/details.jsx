import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavourite } from '@/store/slices/favouritesSlice';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const { routes } = useAppSelector((state) => state.routes);
  const { favourites } = useAppSelector((state) => state.favourites);
  
  const [route, setRoute] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (id && routes.length > 0) {
      const foundRoute = routes.find((r) => r.id === parseInt(id));
      if (foundRoute) {
        setRoute(foundRoute);
        const favouriteExists = favourites.some((fav) => fav.id === foundRoute.id);
        setIsFavourite(favouriteExists);
      }
    }
  }, [id, routes, favourites]);

  const handleToggleFavourite = () => {
    if (route) {
      dispatch(toggleFavourite(route));
      // State will update automatically via Redux
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Available') {
      return '#10B981'; // Green
    }
    return '#F59E0B'; // Orange/Amber
  };

  if (!route) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
          <ThemedText style={styles.loadingText}>Loading route details...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.container}>
        {/* Route Image */}
        <View style={styles.imageContainer}>
          {imageLoading && (
            <View style={styles.imageLoader}>
              <ActivityIndicator size="large" color={colors.tint} />
            </View>
          )}
          <Image
            source={{ uri: route.image }}
            style={styles.image}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
          <View style={styles.imageOverlay}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(route.status) },
              ]}>
              <ThemedText style={styles.statusText}>{route.status}</ThemedText>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>
                {route.title}
              </ThemedText>
              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: colors.tint + '20' },
                ]}>
                <ThemedText style={[styles.typeText, { color: colors.tint }]}>
                  {route.type}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Description */}
          <ThemedText style={styles.description}>{route.description}</ThemedText>

          {/* Route Details Grid */}
          <View style={styles.detailsSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Route Information
            </ThemedText>
            
            <View style={styles.detailsGrid}>
              <View
                style={[
                  styles.detailCard,
                  { backgroundColor: colorScheme === 'dark' ? '#1E293B' : '#F8FAFC' },
                ]}>
                <Feather name="clock" size={20} color={colors.icon} style={styles.detailIcon} />
                <ThemedText style={styles.detailLabel}>Duration</ThemedText>
                <ThemedText style={styles.detailValue}>{route.duration}</ThemedText>
              </View>

              <View
                style={[
                  styles.detailCard,
                  { backgroundColor: colorScheme === 'dark' ? '#1E293B' : '#F8FAFC' },
                ]}>
                <Feather name="map-pin" size={20} color={colors.icon} style={styles.detailIcon} />
                <ThemedText style={styles.detailLabel}>Distance</ThemedText>
                <ThemedText style={styles.detailValue}>{route.distance}</ThemedText>
              </View>

              <View
                style={[
                  styles.detailCard,
                  { backgroundColor: colorScheme === 'dark' ? '#1E293B' : '#F8FAFC' },
                ]}>
                <Feather name="dollar-sign" size={20} color={colors.tint} style={styles.detailIcon} />
                <ThemedText style={styles.detailLabel}>Cost</ThemedText>
                <ThemedText style={[styles.detailValue, { color: colors.tint }]}>
                  {route.cost}
                </ThemedText>
              </View>

              <View
                style={[
                  styles.detailCard,
                  { backgroundColor: colorScheme === 'dark' ? '#1E293B' : '#F8FAFC' },
                ]}>
                <Feather name="layers" size={20} color={colors.icon} style={styles.detailIcon} />
                <ThemedText style={styles.detailLabel}>Stops</ThemedText>
                <ThemedText style={styles.detailValue}>{route.stops}</ThemedText>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <TouchableOpacity
              style={[
                styles.favouriteButton,
                {
                  backgroundColor: isFavourite ? colors.tint : 'transparent',
                  borderColor: colors.tint,
                  borderWidth: 2,
                },
              ]}
              onPress={handleToggleFavourite}>
              <Feather
                name={isFavourite ? 'star' : 'star'}
                size={18}
                color={isFavourite ? '#FFFFFF' : colors.tint}
                fill={isFavourite ? '#FFFFFF' : 'none'}
                style={{ marginRight: 8 }}
              />
              <ThemedText
                style={[
                  styles.favouriteButtonText,
                  { color: isFavourite ? '#FFFFFF' : colors.tint },
                ]}>
                {isFavourite ? 'Added to Favourites' : 'Add to Favourites'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    opacity: 0.7,
  },
  imageContainer: {
    width: '100%',
    height: 320,
    position: 'relative',
  },
  imageLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    backgroundColor: 'transparent', // This will be handled by ThemedView
  },
  header: {
    marginBottom: 24,
  },
  titleContainer: {
    marginBottom: 12,
  },
  title: {
    marginBottom: 12,
    fontSize: 32,
    fontWeight: 'bold',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    opacity: 0.8,
    marginBottom: 32,
  },
  detailsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: '700',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  detailCard: {
    width: '47%',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  detailIcon: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  actionsSection: {
    marginTop: 8,
    marginBottom: 40,
  },
  favouriteButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  favouriteButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

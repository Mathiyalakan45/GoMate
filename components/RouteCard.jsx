import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Feather } from '@expo/vector-icons';
 import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function RouteCard({ route, isFavourite = false }) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    router.push({
      pathname: '/details',
      params: { id: route.id.toString() },
    });
  };

  const getStatusColor = (status) => {
    if (status === 'Available') {
      return '#10B981'; // Green
    }
    return '#F59E0B'; // Orange/Amber
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <ThemedView
        style={[
          styles.card,
          {
            backgroundColor: colorScheme === 'dark' ? '#1E293B' : '#FFFFFF',
            borderColor: colors.icon + '30',
          },
        ]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: route.image }} style={styles.image} />
          {isFavourite && (
            <View style={styles.favouriteBadge}>
              <Feather name="star" size={18} color="#FBBF24" fill="#FBBF24" />
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <ThemedText type="defaultSemiBold" style={styles.title}>
                {route.title}
              </ThemedText>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(route.status) + '20' },
                ]}>
                <ThemedText
                  style={[
                    styles.statusText,
                    { color: getStatusColor(route.status) },
                  ]}>
                  {route.status}
                </ThemedText>
              </View>
            </View>
            <View
              style={[
                styles.typeBadge,
                { backgroundColor: colors.tint + '20' },
              ]}>
              <Feather
                name={
                  route.type === 'Bus'
                    ? 'navigation'
                    : route.type === 'Train'
                    ? 'train'
                    : 'map-pin'
                }
                size={12}
                color={colors.tint}
                style={{ marginRight: 4 }}
              />
              <ThemedText style={[styles.typeText, { color: colors.tint }]}>
                {route.type}
              </ThemedText>
            </View>
          </View>

          <ThemedText style={styles.description} numberOfLines={2}>
            {route.description}
          </ThemedText>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Feather name="clock" size={14} color={colors.icon} style={styles.detailIcon} />
              <ThemedText style={styles.detailLabel}>Duration</ThemedText>
              <ThemedText style={styles.detailValue}>{route.duration}</ThemedText>
            </View>
            <View style={styles.detailItem}>
              <Feather name="map-pin" size={14} color={colors.icon} style={styles.detailIcon} />
              <ThemedText style={styles.detailLabel}>Distance</ThemedText>
              <ThemedText style={styles.detailValue}>{route.distance}</ThemedText>
            </View>
            <View style={styles.detailItem}>
              <Feather name="dollar-sign" size={14} color={colors.icon} style={styles.detailIcon} />
              <ThemedText style={styles.detailLabel}>Cost</ThemedText>
              <ThemedText style={[styles.detailValue, { color: colors.tint }]}>
                {route.cost}
              </ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favouriteBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  favouriteIcon: {
    color: '#FBBF24',
    fontSize: 18,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
    lineHeight: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});


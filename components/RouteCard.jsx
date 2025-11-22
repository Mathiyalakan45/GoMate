import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function RouteCard({ route }) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: '/details', params: { id: route.id.toString() }})}
      activeOpacity={0.9}
    >
      <View style={[styles.container, { backgroundColor: theme.card }]}>
        {/* Left Side: Image & Info */}
        <View style={styles.leftSection}>
          <Image source={{ uri: route.image }} style={styles.thumbnail} />
          <View style={styles.info}>
            <View style={[styles.tag, { backgroundColor: theme.highlight }]}>
              <ThemedText style={[styles.tagText, { color: theme.tint }]}>{route.type}</ThemedText>
            </View>
            <ThemedText style={[styles.title, { color: theme.text }]} numberOfLines={1}>
              {route.title}
            </ThemedText>
            <View style={styles.row}>
              <Feather name="clock" size={12} color={theme.subtext} />
              <ThemedText style={[styles.meta, { color: theme.subtext }]}>{route.duration}</ThemedText>
            </View>
          </View>
        </View>

        {/* Divider (Dashed Line Effect) */}
        <View style={styles.dividerContainer}>
          <View style={[styles.circle, styles.topCircle, { backgroundColor: theme.background }]} />
          <View style={[styles.dashedLine, { borderColor: theme.border }]} />
          <View style={[styles.circle, styles.bottomCircle, { backgroundColor: theme.background }]} />
        </View>

        {/* Right Side: Price & Action */}
        <View style={styles.rightSection}>
          <ThemedText style={[styles.price, { color: theme.tint }]}>{route.cost}</ThemedText>
          <View style={[styles.goBtn, { borderColor: theme.border }]}>
            <Feather name="arrow-right" size={16} color={theme.text} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 110,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 4, // Spacing handled by parent
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 86,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  info: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
    height: 80,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  title: { fontSize: 16, fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  meta: { fontSize: 12 },
  
  // The "Ticket" Divider
  dividerContainer: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dashedLine: {
    height: '70%',
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 1,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    left: 0,
  },
  topCircle: { top: -10 },
  bottomCircle: { bottom: -10 },

  rightSection: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 12,
  },
  price: { fontSize: 18, fontWeight: '900' },
  goBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
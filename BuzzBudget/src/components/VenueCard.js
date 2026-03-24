import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const getVenueIcon = (type) => {
  if (type.includes('Nightclub')) return 'musical-notes';
  if (type.includes('Brewery')) return 'beer';
  if (type.includes('Cocktail')) return 'wine';
  if (type.includes('Sports')) return 'football';
  if (type.includes('Cidery')) return 'leaf';
  if (type.includes('Italian') || type.includes('Restaurant')) return 'restaurant';
  return 'beer';
};

const VenueCard = ({ venue, onPress }) => {
  const priceString = '$'.repeat(venue.priceLevel);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name={getVenueIcon(venue.type)} size={36} color={COLORS.accent} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{venue.name}</Text>
        <Text style={styles.type}>{venue.type}</Text>
        <Text style={styles.address} numberOfLines={1}>{venue.address}</Text>
        <View style={styles.footer}>
          <View style={styles.stat}>
            <Ionicons name="star" size={14} color={COLORS.happy} />
            <Text style={styles.statText}>{venue.rating}</Text>
          </View>
          <Text style={styles.price}>{priceString}</Text>
          <View style={styles.stat}>
            <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.statText}>{venue.hours.open} - {venue.hours.close}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.sm,
    marginHorizontal: SIZES.md,
    overflow: 'hidden',
    ...SHADOWS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: COLORS.cardLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SIZES.md,
  },
  name: {
    fontSize: SIZES.subtitle,
    fontWeight: '700',
    color: COLORS.text,
  },
  type: {
    fontSize: SIZES.caption,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: 2,
  },
  address: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.sm,
    gap: SIZES.md,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  price: {
    fontSize: SIZES.body,
    color: COLORS.open,
    fontWeight: '600',
  },
});

export default VenueCard;

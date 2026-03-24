import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const SpecialCard = ({ venue, onPress }) => {
  const priceString = '$'.repeat(venue.priceLevel);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Ionicons name="beer" size={28} color={COLORS.accent} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{venue.name}</Text>
          <Text style={styles.price}>{priceString}</Text>
        </View>
        <Text style={styles.type}>{venue.type}</Text>
        {venue.tonightDeal && (
          <View style={styles.dealBadge}>
            <Ionicons name="flash" size={14} color={COLORS.accent} />
            <Text style={styles.dealText}>{venue.tonightDeal}</Text>
          </View>
        )}
        <View style={styles.footer}>
          <View style={styles.hours}>
            <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.hoursText}>{venue.hours.open} - {venue.hours.close}</Text>
          </View>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={COLORS.happy} />
            <Text style={styles.ratingText}>{venue.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    marginHorizontal: SIZES.md,
    ...SHADOWS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.cardLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: SIZES.bodyLarge,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  price: {
    fontSize: SIZES.body,
    color: COLORS.open,
    fontWeight: '600',
    marginLeft: SIZES.sm,
  },
  type: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dealBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(232, 155, 62, 0.12)',
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    marginTop: SIZES.sm,
    alignSelf: 'flex-start',
  },
  dealText: {
    fontSize: SIZES.caption,
    color: COLORS.accent,
    fontWeight: '600',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.sm,
  },
  hours: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: SIZES.caption,
    color: COLORS.happy,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default SpecialCard;

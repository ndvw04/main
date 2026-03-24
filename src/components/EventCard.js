import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Live Music': return 'mic';
    case 'DJ Night': return 'headset';
    case 'Trivia': return 'help-circle';
    case 'Theme Night': return 'color-palette';
    case 'Karaoke': return 'musical-notes';
    case 'Food & Drink': return 'restaurant';
    case 'Special Release': return 'sparkles';
    case 'Sports': return 'football';
    default: return 'calendar';
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'Live Music': return '#a78bfa';
    case 'DJ Night': return '#f472b6';
    case 'Trivia': return '#60a5fa';
    case 'Theme Night': return '#fb923c';
    case 'Karaoke': return '#34d399';
    case 'Food & Drink': return '#fbbf24';
    case 'Special Release': return '#c084fc';
    case 'Sports': return '#4ade80';
    default: return COLORS.accent;
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.getTime() === today.getTime()) return 'Tonight';
  if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';

  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const EventCard = ({ event, onPress }) => {
  const categoryColor = getCategoryColor(event.category);
  const dateLabel = formatDate(event.date);
  const isTonight = dateLabel === 'Tonight';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
        <Ionicons name={getCategoryIcon(event.category)} size={24} color={categoryColor} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
        </View>
        <Text style={styles.venue}>{event.venue}</Text>
        <View style={styles.detailsRow}>
          <View style={[styles.dateBadge, isTonight && styles.tonightBadge]}>
            <Text style={[styles.dateText, isTonight && styles.tonightText]}>{dateLabel}</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons name="time-outline" size={12} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons name="ticket-outline" size={12} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{event.cover}</Text>
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
  title: {
    fontSize: SIZES.bodyLarge,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  venue: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.sm,
    gap: SIZES.sm,
  },
  dateBadge: {
    backgroundColor: COLORS.cardLight,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.sm,
    paddingVertical: 2,
  },
  tonightBadge: {
    backgroundColor: 'rgba(232, 155, 62, 0.15)',
  },
  dateText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  tonightText: {
    color: COLORS.accent,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginLeft: 3,
  },
});

export default EventCard;

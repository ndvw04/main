import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { getUpcomingEvents } from '../data/venues';
import EventCard from '../components/EventCard';

const EVENT_FILTERS = [
  { id: 'all', label: 'All Events' },
  { id: 'Live Music', label: 'Live Music' },
  { id: 'DJ Night', label: 'DJ Nights' },
  { id: 'Trivia', label: 'Trivia' },
  { id: 'Karaoke', label: 'Karaoke' },
  { id: 'Food & Drink', label: 'Food & Drink' },
  { id: 'Sports', label: 'Sports' },
];

const EventsScreen = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const events = useMemo(() => getUpcomingEvents(), []);

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return events;
    return events.filter(e => e.category === activeFilter);
  }, [events, activeFilter]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Events</Text>
      <Text style={styles.subtitle}>What's happening this week</Text>
      <View style={styles.filterRow}>
        {EVENT_FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterChip, isActive && styles.activeChip]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => <EventCard event={item} onPress={() => {}} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={48} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>No events found</Text>
            <Text style={styles.emptySubtext}>Check back soon for new events!</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    paddingBottom: SIZES.xxl,
  },
  headerContainer: {
    paddingHorizontal: SIZES.md,
    paddingTop: SIZES.xxl + SIZES.lg,
    paddingBottom: SIZES.sm,
  },
  title: {
    fontSize: SIZES.header,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.md,
    gap: SIZES.sm,
  },
  filterChip: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeChip: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: COLORS.background,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: SIZES.subtitle,
    color: COLORS.textMuted,
    marginTop: SIZES.md,
  },
  emptySubtext: {
    fontSize: SIZES.body,
    color: COLORS.textMuted,
    marginTop: SIZES.xs,
  },
});

export default EventsScreen;

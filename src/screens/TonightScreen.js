import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { getTonightSpecials, getTodayEvents, getDayName } from '../data/venues';
import SpecialCard from '../components/SpecialCard';
import EventCard from '../components/EventCard';

const TonightScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const dayName = getDayName();
  const specials = useMemo(() => getTonightSpecials(), [key]);
  const todayEvents = useMemo(() => getTodayEvents(), [key]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setKey(k => k + 1);
      setRefreshing(false);
    }, 800);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.greeting}>Good evening</Text>
          <Text style={styles.title}>Tonight in State College</Text>
        </View>
        <View style={styles.dayBadge}>
          <Ionicons name="calendar" size={16} color={COLORS.accent} />
          <Text style={styles.dayText}>{dayName}</Text>
        </View>
      </View>

      {todayEvents.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flash" size={20} color={COLORS.accent} />
            <Text style={styles.sectionTitle}>Tonight's Events</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{todayEvents.length}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderSpecialsHeader = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name="pricetag" size={20} color={COLORS.accent} />
        <Text style={styles.sectionTitle}>{dayName} Specials</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{specials.length}</Text>
        </View>
      </View>
    </View>
  );

  const allData = [
    { type: 'header', id: 'header' },
    ...todayEvents.map(e => ({ type: 'event', id: e.id, data: e })),
    { type: 'specials-header', id: 'specials-header' },
    ...specials.map(v => ({ type: 'special', id: v.id, data: v })),
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return renderHeader();
      case 'event':
        return <EventCard event={item.data} onPress={() => {}} />;
      case 'specials-header':
        return renderSpecialsHeader();
      case 'special':
        return <SpecialCard venue={item.data} onPress={() => {}} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <FlatList
        data={allData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.accent}
            colors={[COLORS.accent]}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="moon-outline" size={48} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>No specials tonight</Text>
            <Text style={styles.emptySubtext}>Check back tomorrow!</Text>
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  title: {
    fontSize: SIZES.header,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
  },
  dayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dayText: {
    fontSize: SIZES.body,
    color: COLORS.accent,
    fontWeight: '600',
  },
  section: {
    marginTop: SIZES.lg,
    paddingHorizontal: SIZES.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
    gap: SIZES.sm,
  },
  sectionTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  countBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.sm,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  countText: {
    fontSize: SIZES.caption,
    color: COLORS.background,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
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

export default TonightScreen;

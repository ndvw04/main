import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { VENUES, CATEGORIES } from '../data/venues';
import VenueCard from '../components/VenueCard';
import CategoryFilter from '../components/CategoryFilter';

const VenuesScreen = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredVenues = useMemo(() => {
    let filtered = VENUES;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(v => v.tags.includes(activeCategory));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        v =>
          v.name.toLowerCase().includes(q) ||
          v.type.toLowerCase().includes(q) ||
          v.tags.some(t => t.includes(q))
      );
    }

    return filtered;
  }, [search, activeCategory]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Venues</Text>
      <Text style={styles.subtitle}>Explore State College nightlife</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bars, clubs, restaurants..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Ionicons
            name="close-circle"
            size={20}
            color={COLORS.textMuted}
            onPress={() => setSearch('')}
          />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <FlatList
        data={filteredVenues}
        renderItem={({ item }) => <VenueCard venue={item} onPress={() => {}} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            {renderHeader()}
            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color={COLORS.textMuted} />
            <Text style={styles.emptyText}>No venues found</Text>
            <Text style={styles.emptySubtext}>Try a different search or category</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.md,
    marginTop: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: SIZES.body,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.sm,
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

export default VenuesScreen;

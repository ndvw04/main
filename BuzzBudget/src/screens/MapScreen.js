import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { VENUES } from '../data/venues';

const MapScreen = () => {
  const openInMaps = (venue) => {
    const { latitude, longitude, name } = venue;
    const label = encodeURIComponent(name);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
    });
    Linking.openURL(url);
  };

  const openAllInMaps = () => {
    const url = Platform.select({
      ios: 'maps:0,0?q=bars+near+State+College+PA',
      android: 'geo:0,0?q=bars+near+State+College+PA',
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Map</Text>
          <Text style={styles.subtitle}>Find venues near you</Text>
        </View>

        {/* Map placeholder */}
        <TouchableOpacity style={styles.mapPlaceholder} onPress={openAllInMaps}>
          <Ionicons name="map" size={64} color={COLORS.accent} />
          <Text style={styles.mapText}>Tap to open in Maps</Text>
          <Text style={styles.mapSubtext}>View all venues in State College</Text>
        </TouchableOpacity>

        {/* Venue list with directions */}
        <Text style={styles.listTitle}>All Venues</Text>
        {VENUES.map((venue) => (
          <TouchableOpacity
            key={venue.id}
            style={styles.venueRow}
            onPress={() => openInMaps(venue)}
            activeOpacity={0.7}
          >
            <View style={styles.venueInfo}>
              <Text style={styles.venueName}>{venue.name}</Text>
              <Text style={styles.venueAddress}>{venue.address}</Text>
            </View>
            <View style={styles.directionsButton}>
              <Ionicons name="navigate" size={20} color={COLORS.accent} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
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
  mapPlaceholder: {
    margin: SIZES.md,
    height: 200,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  mapText: {
    fontSize: SIZES.subtitle,
    color: COLORS.text,
    fontWeight: '600',
    marginTop: SIZES.md,
  },
  mapSubtext: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listTitle: {
    fontSize: SIZES.subtitle,
    fontWeight: '700',
    color: COLORS.text,
    paddingHorizontal: SIZES.md,
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SIZES.md,
    marginBottom: SIZES.sm,
    padding: SIZES.md,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: SIZES.bodyLarge,
    fontWeight: '600',
    color: COLORS.text,
  },
  venueAddress: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  directionsButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.cardLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;

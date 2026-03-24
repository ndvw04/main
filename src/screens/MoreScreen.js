import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const MENU_ITEMS = [
  {
    section: 'Info',
    items: [
      { icon: 'information-circle-outline', label: 'About Nittany Nights', action: 'about' },
      { icon: 'globe-outline', label: 'Visit Website', action: 'website' },
      { icon: 'logo-instagram', label: 'Follow on Instagram', action: 'instagram' },
    ],
  },
  {
    section: 'Resources',
    items: [
      { icon: 'car-outline', label: 'Safe Ride Options', action: 'rides' },
      { icon: 'shield-checkmark-outline', label: 'Safety Tips', action: 'safety' },
      { icon: 'bus-outline', label: 'CATA Bus Schedule', action: 'bus' },
    ],
  },
  {
    section: 'App',
    items: [
      { icon: 'notifications-outline', label: 'Notification Preferences', action: 'notifications' },
      { icon: 'star-outline', label: 'Rate This App', action: 'rate' },
      { icon: 'chatbubble-outline', label: 'Send Feedback', action: 'feedback' },
    ],
  },
];

const MoreScreen = () => {
  const handleAction = (action) => {
    switch (action) {
      case 'website':
        Linking.openURL('https://nittanynights.com');
        break;
      case 'instagram':
        Linking.openURL('https://instagram.com');
        break;
      case 'bus':
        Linking.openURL('https://www.catabus.com');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>More</Text>
          <Text style={styles.subtitle}>Settings & resources</Text>
        </View>

        {/* Branding card */}
        <View style={styles.brandCard}>
          <Ionicons name="moon" size={40} color={COLORS.accent} />
          <View style={styles.brandInfo}>
            <Text style={styles.brandName}>Nittany Nights</Text>
            <Text style={styles.brandTagline}>State College Nightlife Guide</Text>
          </View>
        </View>

        {/* Menu sections */}
        {MENU_ITEMS.map((section) => (
          <View key={section.section} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuItem,
                    index < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={() => handleAction(item.action)}
                  activeOpacity={0.7}
                >
                  <Ionicons name={item.icon} size={22} color={COLORS.accent} />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.version}>Nittany Nights v1.0.0</Text>
        <Text style={styles.disclaimer}>
          Please drink responsibly. Must be 21+ to consume alcohol.
        </Text>
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
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    margin: SIZES.md,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  brandInfo: {
    marginLeft: SIZES.md,
  },
  brandName: {
    fontSize: SIZES.title,
    fontWeight: '800',
    color: COLORS.text,
  },
  brandTagline: {
    fontSize: SIZES.body,
    color: COLORS.accent,
    marginTop: 2,
  },
  section: {
    marginTop: SIZES.md,
    paddingHorizontal: SIZES.md,
  },
  sectionTitle: {
    fontSize: SIZES.caption,
    fontWeight: '600',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SIZES.sm,
  },
  sectionCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.md,
    gap: SIZES.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuLabel: {
    flex: 1,
    fontSize: SIZES.bodyLarge,
    color: COLORS.text,
  },
  version: {
    textAlign: 'center',
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    marginTop: SIZES.xl,
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: SIZES.caption,
    color: COLORS.textMuted,
    marginTop: SIZES.sm,
    paddingHorizontal: SIZES.xl,
  },
});

export default MoreScreen;

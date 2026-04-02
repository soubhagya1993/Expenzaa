import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOWS, FONT_SIZES } from '../constants';

interface MenuItemProps {
  icon: string;
  label: string;
  onPress?: () => void;
  isDestructive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress, isDestructive }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View
      style={[
        styles.menuIconBox,
        isDestructive && { backgroundColor: `${COLORS.error}10` },
      ]}
    >
      <Ionicons
        name={icon as any}
        size={20}
        color={isDestructive ? COLORS.error : COLORS.textSecondary}
      />
    </View>
    <Text
      style={[
        styles.menuLabel,
        isDestructive && { color: COLORS.error },
      ]}
    >
      {label}
    </Text>
    {!isDestructive && (
      <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
    )}
  </TouchableOpacity>
);

export const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const handleComingSoon = () => {
    Alert.alert('Coming Soon', 'This feature will be available in a future update.');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + SPACING.lg }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.screenTitle}>Settings</Text>

      {/* Profile Card - matching Figma */}
      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person-outline" size={32} color={COLORS.textWhite} />
        </View>
        <Text style={styles.profileName}>My Account</Text>
        <Text style={styles.profileEmail}>Personal Expenses</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuGroup}>
        <MenuItem icon="person-outline" label="Profile" onPress={handleComingSoon} />
        <MenuItem icon="notifications-outline" label="Notifications" onPress={handleComingSoon} />
        <MenuItem icon="lock-closed-outline" label="Privacy & Security" onPress={handleComingSoon} />
        <MenuItem icon="help-circle-outline" label="Help & Support" onPress={handleComingSoon} />
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
  },
  screenTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xl,
  },
  // Profile card
  profileCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING['2xl'],
    alignItems: 'center',
    ...SHADOWS.md,
    marginBottom: SPACING['2xl'],
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  profileName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  // Menu
  menuGroup: {
    marginBottom: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

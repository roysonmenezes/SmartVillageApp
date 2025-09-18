import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Fund } from '@/blockchain/types/contracts';

interface DonationCardProps {
  fund: Fund;
  isSelected: boolean;
  onSelect: () => void;
}

export const DonationCard: React.FC<DonationCardProps> = ({
  fund,
  isSelected,
  onSelect
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selected]}
      onPress={onSelect}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{fund.name}</Text>
        <View style={[styles.badge, isSelected && styles.selectedBadge]}>
          <Text style={[styles.badgeText, isSelected && styles.selectedBadgeText]}>
            {isSelected ? '✓' : '○'}
          </Text>
        </View>
      </View>
      <Text style={styles.stats}>💰 Raised: {fund.totalDonated} ETH</Text>
      <Text style={styles.stats}>🤝 Donations: {fund.donationCount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  selected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBadge: {
    backgroundColor: '#3b82f6',
  },
  badgeText: {
    color: '#6b7280',
    fontSize: 12,
  },
  selectedBadgeText: {
    color: 'white',
  },
  stats: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
});

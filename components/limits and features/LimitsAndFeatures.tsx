import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LimitsAndFeatures = () => {
  return (
    <View style={styles.container}>
      {/* Feature 1 */}
      <View style={styles.featureItem}>
        <Ionicons name="lock-closed-outline" size={24} color="#FFD700" style={styles.icon} />
        <Text style={styles.featureText}>3D Secure purchases</Text>
        <Text style={styles.featureStatus}>SGD 150/week</Text>
      </View>

      {/* Feature 2 */}
      <View style={styles.featureItem}>
        <Ionicons name="paper-plane-outline" size={24} color="#FFD700" style={styles.icon} />
        <Text style={styles.featureText}>Send cryptocurrency</Text>
        <Text style={styles.featureStatus}>Enabled</Text>
      </View>

      {/* Feature 3 */}
      <View style={styles.featureItem}>
        <Ionicons name="download-outline" size={24} color="#FFD700" style={styles.icon} />
        <Text style={styles.featureText}>Receive cryptocurrency</Text>
        <Text style={styles.featureStatus}>Enabled</Text>
      </View>

      {/* Notice */}
      <View style={styles.noticeContainer}>
        <Text style={styles.noticeText}>
          You currently have the highest level of account limits and features available
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  icon: {
    marginRight: 10,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#ccc',
    
    fontFamily:'MonsterReg'
  },
  featureStatus: {
    fontSize: 16,
    color: '#888',
    fontFamily:'MonsterReg',
    
  },
  noticeContainer: {
    marginTop: 20,
    padding: 25,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  noticeText: {
    fontSize: 14,
    color: '#666',
    fontFamily:'MonsterReg'
  },
});

export default LimitsAndFeatures;

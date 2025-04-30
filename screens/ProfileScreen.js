// screens/ProfileScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../AuthContext';

export default function ProfileScreen() {
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      // The AuthNavigator will handle the redirection
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#6200ee" barStyle="light-content" />

      {/* Gradient Header */}
      <LinearGradient
        colors={['#6200ee', '#7c4dff']}
        style={styles.header}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View style={styles.headerContent}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
      </LinearGradient>

      <View style={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {currentUser?.photoURL ? (
              <Image 
                source={{ uri: currentUser.photoURL }} 
                style={styles.avatar} 
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {currentUser?.email?.[0]?.toUpperCase() || '?'}
                </Text>
              </View>
            )}
          </View>
          
          <Text style={styles.emailText}>{currentUser?.email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Quizzes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>

        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="settings-outline" size={24} color="#6200ee" />
            <Text style={styles.optionText}>Settings</Text>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="star-outline" size={24} color="#6200ee" />
            <Text style={styles.optionText}>Rate the App</Text>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="help-circle-outline" size={24} color="#6200ee" />
            <Text style={styles.optionText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    marginBottom: 20,
  },
  avatarContainer: {
    marginVertical: 10,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80, 
    height: 80, 
    borderRadius: 40
  },
  avatarText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  optionsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2,
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 16,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useRouter } from 'expo-router';
import { User } from 'firebase/auth';

import {
  checkAuthState,
  logoutUser,
} from '../../services/Authservices';

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = checkAuthState((currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        router.replace('/register' as any);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.replace('/login' as any);
    } catch (error: any) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  if (loading || !user) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#16865B" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>CleanGo</Text>

      <Text style={styles.title}>
        Welcome, {user.displayName || 'User'}!
      </Text>

      <View style={styles.card}>

        <Text style={styles.heading}>My Account</Text>

        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>
          {user.displayName || 'Not available'}
        </Text>

        <Text style={styles.label}>Email Address</Text>
        <Text style={styles.value}>
          {user.email}
        </Text>

        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value}>
          {user.uid}
        </Text>

      </View>

      <Text style={styles.message}>
        Together, let's keep our rivers and environment clean!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#F0F8F5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#16865B',
    textAlign: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    padding: 22,
    borderRadius: 15,
    elevation: 3,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16865B',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginTop: 5,
  },
  message: {
    textAlign: 'center',
    color: '#555',
    marginTop: 25,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#D93636',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
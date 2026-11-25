
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useRouter } from 'expo-router';
import { loginUser } from '../../services/Authservices';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setLoading(true);

      await loginUser(email.trim(), password);

      Alert.alert('Success', 'Login successful!');
      router.replace('/(drawer)/(tabs)/home');

    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>CleanGo</Text>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Login to continue cleaning our environment
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.normalText}>
          Don't have an account?
        </Text>

        <TouchableOpacity
          onPress={() => router.push('/register' as any)}
        >
          <Text style={styles.link}> Register</Text>
        </TouchableOpacity>
      </View>

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
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#16865B',
    textAlign: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#16865B',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  normalText: {
    color: '#555',
  },
  link: {
    color: '#16865B',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../stores/authStore';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      navigation.navigate('Tournaments' as never);
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-gray-50 justify-center px-6">
        <View className="bg-white rounded-lg p-6 shadow-sm">
          <Text className="text-2xl font-bold text-center text-gray-900 mb-2">
            Cricket Tournament App
          </Text>
          <Text className="text-center text-gray-600 mb-8">
            Sign in to your account
          </Text>

          <TextInput
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            className={`w-full py-3 rounded-lg ${
              isLoading ? 'bg-gray-400' : 'bg-blue-600'
            }`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className="text-white text-center font-semibold">
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen; 
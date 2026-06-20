import { Platform, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const triggerHaptic = (type) => {
  if (Platform.OS === 'web') return;
  try {
    switch (type) {
      case 'light':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      default:
        break;
    }
  } catch (e) {
  }
};

export const LinearGradient = ({ children, style, ...props }) => {
  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          style,
          { backgroundImage: 'linear-gradient(135deg, #2ea84c, #4cd96b)' },
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }
  return <ExpoLinearGradient style={style} {...props}>{children}</ExpoLinearGradient>;
};

export const storage = {
  async getItem(key) {
    if (Platform.OS === 'web') {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    }
    try { return AsyncStorage.getItem(key); } catch (e) { return null; }
  },
  async setItem(key, value) {
    if (Platform.OS === 'web') {
      try { localStorage.setItem(key, value); } catch (e) {}
      return;
    }
    try { await AsyncStorage.setItem(key, value); } catch (e) {}
  },
  async removeItem(key) {
    if (Platform.OS === 'web') {
      try { localStorage.removeItem(key); } catch (e) {}
      return;
    }
    try { await AsyncStorage.removeItem(key); } catch (e) {}
  },
  async getAllKeys() {
    if (Platform.OS === 'web') {
      try { return Object.keys(localStorage); } catch (e) { return []; }
    }
    try { return AsyncStorage.getAllKeys(); } catch (e) { return []; }
  },
  async clear() {
    if (Platform.OS === 'web') {
      try { localStorage.clear(); } catch (e) {}
      return;
    }
    try { await AsyncStorage.clear(); } catch (e) {}
  },
};

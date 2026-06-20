import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

// Simple static list of subjects matching the folder structure
const SUBJECTS = [
  { id: 'economics', title: 'Economics' },
  { id: 'business', title: 'Business' },
  { id: 'ict', title: 'ICT' },
];

const SubjectListScreen = ({ navigation }) => {
  const { triggerHaptic } = useContext(AppContext);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        triggerHaptic('light');
        navigation.navigate('LessonList', { subjectId: item.id, subjectTitle: item.title });
      }}
    >
      <Ionicons name="book-outline" size={24} color={"#ff9f43"} style={styles.icon} />
      <Text style={styles.title}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} color={"#8ba2b9"} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Study Hub</Text>
      </View>
      <FlatList
        data={SUBJECTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080b12',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  list: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#111625',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  icon: {
    marginRight: 12,
  },
  title: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SpaceGrotesk-Bold',
  },
});

export default SubjectListScreen;

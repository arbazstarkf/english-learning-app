import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const lessons = [
  { id: 1, title: '👋 Greetings & Introductions', objective: 'Learn how to greet and introduce yourself.' },
  { id: 2, title: '💬 Common Expressions', objective: 'Useful daily phrases and expressions.' },
  { id: 3, title: '❓ Asking Questions', objective: 'How to ask basic questions politely.' },
  { id: 4, title: '🙋 Talking About Yourself', objective: 'Describe your name, age, job, hobbies.' },
  { id: 5, title: '🏠 Everyday Vocabulary', objective: 'Words related to home, food, places, and things.' },
  { id: 6, title: '📝 Making Requests', objective: 'Learn how to ask for help or something you want.' },
  { id: 7, title: '🙏 Politeness & Manners', objective: 'Saying please, thank you, sorry, excuse me.' },
  { id: 8, title: '🕐 Numbers, Time & Dates', objective: 'Talk about time, age, dates, and money.' },
  { id: 9, title: '🔤 Basic Grammar', objective: 'Understand nouns, verbs, articles, and sentence structure.' },
  { id: 10, title: '🗣️ Simple Conversations', objective: 'Practice short dialogues and responses.' },
];

export default function LessonsScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#6200ee" barStyle="light-content" />

      {/* Gradient Header */}
      <LinearGradient
        colors={['#6200ee', '#6200ee']}
        style={styles.header}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View style={styles.headerContent}>
          <Ionicons name="book-outline" size={32} color="#fff" />
          <Text style={styles.headerTitle}>Start Learning</Text>
        </View>
      </LinearGradient>

      {/* Lessons List */}
      <ScrollView contentContainerStyle={styles.container}>
        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.card}
            onPress={() => navigation.navigate('LessonDetail', { lessonId: lesson.id })}
          >
            <Text style={styles.title}>{lesson.title}</Text>
            <Text style={styles.objective}>{lesson.objective}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  objective: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
});

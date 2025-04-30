import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import lessonsMap from '../lessons/_lessonMap';

export default function LessonDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { lessonId } = route.params;
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const data = await lessonsMap[lessonId]();
      setLesson(data[0]);
    };
    fetchLesson();
  }, [lessonId]);

  if (!lesson) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        {/* Custom Back Button inside Header */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.description}>{lesson.objective}</Text>
      </View>

      {lesson.content.map((item, idx) => (
        <View key={idx} style={styles.card}>
          {item.type === 'header' && <Text style={styles.sectionHeader}>{item.data}</Text>}

          {item.type === 'text' && <Text style={styles.text}>{item.data}</Text>}

          {item.type === 'example' && (
            <View style={styles.exampleBox}>
              <Text style={styles.exampleLabel}>Example</Text>
              <Text style={styles.text}>{item.data}</Text>
            </View>
          )}

          {item.type === 'quiz' && (
            <View style={styles.quizBox}>
              <Text style={styles.quizQuestion}>{item.question}</Text>
              {item.options.map((opt, optIdx) => (
                <Text key={optIdx} style={styles.quizOption}>• {opt}</Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f4f4f4' },
  loading: { padding: 20, fontSize: 16 },
  headerCard: {
    backgroundColor: '#6200ee',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  description: { fontSize: 16, color: '#e0e0e0', marginTop: 8 },

  card: {
    backgroundColor: '#ffffff',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 8,
  },

  text: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },

  exampleBox: {
    backgroundColor: '#f0f4ff',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  exampleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },

  quizBox: {
    backgroundColor: '#fff8e1',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  quizQuestion: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#444',
  },

  quizOption: {
    fontSize: 14,
    color: '#333',
    paddingLeft: 8,
    paddingTop: 2,
  },
});

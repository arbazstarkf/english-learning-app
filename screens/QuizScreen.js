import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const quizData = [
  {
    question: '👋 What do you say when you meet someone for the first time?',
    options: ['Goodbye', 'Hello', 'Later'],
    answer: 'Hello',
  },
  {
    question: '🤔 What do you say when you want to ask how someone is doing?',
    options: ['How are you?', 'Where are you?', 'What is this?'],
    answer: 'How are you?',
  },
  {
    question: '👋 What do you say when you are leaving?',
    options: ['Hello', 'Goodbye', 'Thank you'],
    answer: 'Goodbye',
  },
  {
    question: '🌅 Which word is used to greet someone in the morning?',
    options: ['Good morning', 'Good night', 'See you'],
    answer: 'Good morning',
  },
  {
    question: '🙏 What do you say when someone helps you?',
    options: ['Sorry', 'Please', 'Thank you'],
    answer: 'Thank you',
  },
  {
    question: '❓ Which one is a question?',
    options: ['I am fine', 'What is your name?', 'See you later'],
    answer: 'What is your name?',
  },
  {
    question: '😓 What do you say when you make a mistake?',
    options: ['Thank you', 'Sorry', 'Hello'],
    answer: 'Sorry',
  },
  {
    question: '💬 Choose the correct response to "How are you?"',
    options: ['I am fine', 'Good night', 'Goodbye'],
    answer: 'I am fine',
  },
  {
    question: '🙇 Which word is used to show politeness?',
    options: ['Now', 'Please', 'No'],
    answer: 'Please',
  },
  {
    question: '🌙 What do you say before going to sleep?',
    options: ['Good night', 'Good morning', 'Welcome'],
    answer: 'Good night',
  },
];

const motivationalQuotes = [
  "✨ Keep going, you're doing amazing!",
  "💡 Every question is a step forward!",
  "🚀 Believe in your learning journey!",
  "📚 Great minds start with small lessons!",
  "🔥 One step closer to mastering English!",
];

export default function QuizScreen() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = quizData[index];
  const progress = ((index + 1) / quizData.length) * 100;
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleAnswer = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === current.answer) {
      setScore((prev) => prev + 1);
    }

    if (index < quizData.length - 1) {
      setIndex((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor="#6200ee" barStyle="light-content" />
      <LinearGradient
        colors={['#6200ee', '#6200ee']}
        style={styles.header}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View style={styles.headerContent}>
          <Ionicons name="school-outline" size={30} color="#fff" />
          <Text style={styles.headerTitle}>Quiz</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.introText}>
          📘 This quiz is based on the lessons you just explored. It's a fun way to test your understanding and practice what you've learned!
        </Text>

        <View style={styles.progressBarWrapper}>
          <Text style={styles.progressText}>{index + 1}/{quizData.length}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
          </View>
        </View>

        {!finished ? (
          <>
            <Text style={styles.question}>{current.question}</Text>
            {current.options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.option,
                  selected === opt && styles.selectedOption,
                ]}
                onPress={() => handleAnswer(opt)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected === opt && styles.selectedOptionText,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={handleNext}
              style={styles.nextButton}
              disabled={selected === null}
            >
              <Text style={styles.nextButtonText}>
                {index < quizData.length - 1 ? 'Next' : 'Finish'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.motivationalText}>{randomQuote}</Text>
          </>
        ) : (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>🎉 Quiz Completed!</Text>
            <Text style={styles.resultText}>
              Your Score: {score} / {quizData.length}
            </Text>

            <TouchableOpacity onPress={handleRestart} style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fdfdfd',
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
  inner: {
    padding: 20,
    paddingTop: 140,
    paddingBottom: 40,
  },
  introText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
    fontStyle: 'italic',
  },
  progressBarWrapper: {
    marginBottom: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginTop: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  option: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  motivationalText: {
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#6200ee',
  },
  resultBox: {
    marginTop: 40,
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  tryAgainButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
  tryAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

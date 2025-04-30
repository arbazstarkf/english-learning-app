import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  Animated,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import MotivationalTip from './MotivationalTip'; // Import the component

export default function TranslatorScreen() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [micScale] = useState(new Animated.Value(1));

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    try {
      const res = await axios.get(
        `https://lingva.ml/api/v1/en/hi/${encodeURIComponent(inputText)}`
      );
      setTranslatedText(res.data.translation);
    } catch (err) {
      Alert.alert('Translation Error', 'Failed to fetch translation.');
      console.error('Translation error:', err);
    }
  };

  const handleSpeak = () => {
    if (translatedText) {
      Speech.speak(translatedText, { language: 'hi-IN' });
    }
  };

  const handleMicPress = () => {
    Keyboard.dismiss();
    Alert.alert(
      'Voice Input',
      'Use your keyboard’s mic button to speak directly into the input.'
    );
  };

  const animateMic = () => {
    Animated.sequence([
      Animated.spring(micScale, {
        toValue: 1.2,
        friction: 3,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(micScale, {
        toValue: 1,
        friction: 3,
        tension: 80,
        useNativeDriver: true,
      })
    ]).start();
  };

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
          <Ionicons name="language-outline" size={32} color="#fff" />
          <Text style={styles.headerTitle}>Translator</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Motivational Tip Component */}
        <MotivationalTip />

        <Text style={styles.label}>Enter English Text:</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type something in English"
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <Animated.View style={{ transform: [{ scale: micScale }] }}>
            <TouchableOpacity onPress={handleMicPress} style={styles.micButton} onPressIn={animateMic}>
              <Ionicons name="mic-outline" size={26} color="#6200ee" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <TouchableOpacity style={styles.translateButton} onPress={handleTranslate}>
          <Text style={styles.buttonText}>Translate to Hindi</Text>
        </TouchableOpacity>

        {/* Show the translated text even before translation */}
        <View style={styles.outputBox}>
          <Text style={styles.translatedLabel}>Translated Text:</Text>
          <Text style={styles.translated}>
            {translatedText || "Your translation will appear here."}
          </Text>
          {translatedText && (
            <TouchableOpacity style={styles.speakBtn} onPress={handleSpeak}>
              <Ionicons name="volume-high" size={24} color="#fff" />
              <Text style={styles.speakText}>Speak</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
  content: {
    padding: 20,
    marginTop: 6,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 40,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 60,
    elevation: 3,
  },
  micButton: {
    marginLeft: 12,
    backgroundColor: '#e8e8e8',
    padding: 12,
    borderRadius: 50,
    elevation: 4,
  },
  translateButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  outputBox: {
    marginTop: 30,
    padding: 18,
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
    elevation: 3,
  },
  translatedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  translated: {
    fontSize: 20,
    color: '#6200ee',
    fontWeight: '600',
    lineHeight: 30,
    letterSpacing: 0.5,
  },
  speakBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 30,
    alignSelf: 'flex-start',
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  speakText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});

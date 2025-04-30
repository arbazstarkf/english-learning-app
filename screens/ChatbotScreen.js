import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = 'AIzaSyBYltHosOCe3EwoQYka0oVevCyqsCNTTCY';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: input }] }],
        }),
      });

      const json = await response.json();
      const botText = json?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response.';
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Error fetching response.' }]);
    }

    setLoading(false);
  };

  const handleMicPress = () => {
    Keyboard.dismiss();
    Alert.alert(
      'Voice Input',
      'Use your keyboard’s mic button to speak directly into the input.'
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.message, item.role === 'user' ? styles.user : styles.bot]}>
      <Text style={[styles.messageText, item.role === 'user' ? styles.userText : styles.botText]}>
        {item.text}
      </Text>
    </View>
  );

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
          <Ionicons name="chatbubble-ellipses-outline" size={32} color="#fff" />
          <Text style={styles.headerTitle}>AI Chatbot</Text>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.tipCard}>
          <Text style={styles.tipText}> AI chatbot powered by Google to ask anything and practice English!</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.chat}
        />

        <View style={styles.inputArea}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            style={styles.input}
            multiline
          />

          <TouchableOpacity onPress={sendMessage} style={styles.iconButton}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleMicPress} style={styles.iconButton}>
            <Ionicons name="mic-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  container: { flex: 1 },
  tipCard: {
    margin: 16,
    backgroundColor: '#ede7f6',
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  tipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a148c',
    textAlign: 'center',
  },
  chat: { padding: 16, paddingBottom: 80 },
  message: {
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  user: {
    alignSelf: 'flex-end',
    backgroundColor: '#6200ee',
    borderBottomRightRadius: 0,
  },
  bot: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: '#fff',  // User's text will remain white for better contrast
  },
  botText: {
    color: '#333',  // Bot's text will be dark for better visibility
  },
  inputArea: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 45,
  },
  iconButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 25,
    elevation: 2,
  },
});

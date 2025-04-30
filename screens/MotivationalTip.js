import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const quotes = [
  "Believe in yourself and all that you are.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Your limitation—it’s only your imagination.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction."
];

const MotivationalTip = ({ refreshTrigger }) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(newQuote);
  }, [refreshTrigger]); // triggers whenever refreshTrigger changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tip of the Moment</Text>
      <Text style={styles.text}>{quote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#6200ee',
  },
});

export default MotivationalTip;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 added this

export default function RandomWordScreen() {
  const [word, setWord] = useState('');
  const [englishDefinition, setEnglishDefinition] = useState('');
  const [hindiDefinition, setHindiDefinition] = useState('');
  const [wordType, setWordType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const FAVORITES_KEY = '@favorites'; // 👈 storage key

  const fetchRandomWord = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://random-word-api.herokuapp.com/word');
      if (response.data.length > 0) {
        const randomWord = response.data[0];
        setWord(randomWord);

        const meaningResponse = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
        const meaning = meaningResponse.data[0].meanings[0];
        const enDef = meaning.definitions[0].definition;
        const pos = meaning.partOfSpeech;

        setEnglishDefinition(enDef);
        setWordType(pos);

        const lingvaRes = await axios.get(`https://lingva.ml/api/v1/en/hi/${encodeURIComponent(enDef)}`);
        const hiDef = lingvaRes.data.translation;
        setHindiDefinition(hiDef);
      } else {
        throw new Error('Word API returned an empty response.');
      }
    } catch (err) {
      console.error('Error fetching word or translation:', err);
      if (retryCount < 3) {
        setRetryCount(prev => prev + 1);
      } else {
        setError('Failed to fetch word or translation after multiple attempts.');
      }
    } finally {
      setLoading(false);
    }
  };

  const speakEnglish = () => {
    if (englishDefinition) {
      Speech.speak(englishDefinition, { language: 'en-US' });
    }
  };

  const speakHindi = () => {
    if (hindiDefinition) {
      Speech.speak(hindiDefinition, { language: 'hi-IN' });
    }
  };

  const saveFavoritesToStorage = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const loadFavoritesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const addToFavorites = () => {
    const exists = favorites.find(fav => fav.word === word);
    if (!exists) {
      const newFavorites = [...favorites, {
        word,
        englishDefinition,
        hindiDefinition,
        wordType,
      }];
      setFavorites(newFavorites);
      saveFavoritesToStorage(newFavorites); // 👈 save after adding
    }
  };

  const removeFromFavorites = () => {
    const updatedFavorites = favorites.filter(fav => fav.word !== word);
    setFavorites(updatedFavorites);
    saveFavoritesToStorage(updatedFavorites); // 👈 save after removing
  };

  const clearFavorites = () => {
    setFavorites([]);
    saveFavoritesToStorage([]); // 👈 save after clearing
  };

  useEffect(() => {
    fetchRandomWord();
    loadFavoritesFromStorage(); // 👈 load once on start
  }, [retryCount]);

  const renderFavoriteCard = ({ item }) => (
    <View style={styles.favoriteCard}>
      <Text style={styles.favoriteWord}>{item.word.toUpperCase()}</Text>
      <Text style={styles.favoriteDef}>{item.englishDefinition}</Text>
    </View>
  );

  const isFavorited = favorites.some(fav => fav.word === word);

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
          <Ionicons name="cube-outline" size={32} color="#fff" />
          <Text style={styles.headerTitle}>Random Word</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" color="#6200ee" />
          ) : error ? (
            <View>
              <Text style={styles.error}>{error}</Text>
              <TouchableOpacity style={styles.button} onPress={fetchRandomWord}>
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.rowBetween}>
                <Text style={styles.word}>{word.toUpperCase()}</Text>
                <TouchableOpacity onPress={isFavorited ? removeFromFavorites : addToFavorites}>
                  <Ionicons
                    name={isFavorited ? "heart" : "heart-outline"}
                    size={28}
                    color="#6200ee"
                  />
                </TouchableOpacity>
              </View>

              {wordType !== '' && (
                <Text style={styles.partOfSpeech}>Type: {wordType}</Text>
              )}

              <Text style={styles.label}>Meaning (English)</Text>
              <View style={styles.row}>
                <Text style={styles.definition}>{englishDefinition}</Text>
                <TouchableOpacity onPress={speakEnglish} style={styles.speakerButton}>
                  <Ionicons name="volume-high-outline" size={24} color="#6200ee" />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Meaning (Hindi)</Text>
              <View style={styles.row}>
                <Text style={styles.definition}>{hindiDefinition}</Text>
                <TouchableOpacity onPress={speakHindi} style={styles.speakerButton}>
                  <Ionicons name="volume-high-outline" size={24} color="#6200ee" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={fetchRandomWord}>
                <Text style={styles.buttonText}>Get New Word</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {favorites.length > 0 && (
          <>
            <Text style={[styles.label, { marginTop: 25 }]}>Favorite Words</Text>
            <FlatList
              data={favorites}
              renderItem={renderFavoriteCard}
              keyExtractor={(item, index) => `${item.word}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 15 }}
            />

            <TouchableOpacity style={styles.clearButton} onPress={clearFavorites}>
              <Text style={styles.clearButtonText}>Clear Favorites</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

// your same styles continue here...


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
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  word: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  partOfSpeech: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
    marginTop: 15,
  },
  definition: {
    fontSize: 18,
    color: '#333',
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  speakerButton: {
    marginLeft: 10,
    padding: 5,
  },
  favoriteCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
    elevation: 2,
    minWidth: 120,
    maxWidth: 150,
  },
  favoriteWord: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 5,
  },
  favoriteDef: {
    fontSize: 14,
    color: '#555',
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

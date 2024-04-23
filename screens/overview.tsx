import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {Image, Text, FlatList, TouchableOpacity, ActivityIndicator,StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigation';

const Overview = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          'https://www.mmobomb.com/api1/games'
        );
        const json = await response.json();
        setGames(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
    data={games}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({item }) => (
      <TouchableOpacity
        style={styles.gameContainer}
        onPress={() => navigation.navigate('Details', {gamesDetails: item})}>
        {item.thumbnail ? <Image source={{ uri: item.thumbnail }} style={styles.image} /> : null}
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    )}
    />
  );
};

export default Overview;

const styles = StyleSheet.create({
  gameContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 5 },
  textContainer: { marginLeft: 12 },
  title: { fontSize: 18, fontWeight: 'bold' },
});
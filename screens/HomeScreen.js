// Este é o arquivo HomeScreen.js já estilizado com fundo colorido e layout moderno

import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Alert, TouchableOpacity, ScrollView, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEvents, getUser } from '../services/Storage';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const [evs, user] = await Promise.all([getEvents(), getUser()]);
      const eventsWithUser = evs.map(e => ({ ...e, user: user || {} }));
      setEvents(eventsWithUser);
    });
    return unsubscribe;
  }, [navigation]);

  const clearData = async () => {
    await AsyncStorage.removeItem('@energy_events');
    setEvents([]);
    Alert.alert('Sucesso', 'Todos os eventos foram apagados!');
  };

  const renderEvent = ({ item }) => (
    <View style={styles.eventBox}>
      <Text style={styles.user}>{item.user?.name} ({item.user?.email})</Text>
      <Text style={styles.location}>{item.location} – {item.duration}</Text>
      {Array.isArray(item.losses) && item.losses.length > 0 && (
        <View style={styles.lossesList}>
          {item.losses.map((loss, i) => (
            <Text key={i} style={styles.lossItem}>• {loss}</Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📋 Eventos Registrados</Text>

      {events.length === 0 ? (
        <Text style={styles.noData}>Nenhum evento registrado ainda.</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
          scrollEnabled={false}
        />
      )}

      <TouchableOpacity style={styles.buttonPrimary} onPress={() =>
        navigation.navigate('User', { redirectTo: 'Localização Atingida' })
      }>
        <Text style={styles.buttonText}>➕ Novo Registro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDanger} onPress={clearData}>
        <Text style={styles.buttonText}>🗑️ Apagar Todos os Eventos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#e3f2fd', // azul claro suave
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0d47a1'
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginVertical: 20
  },
  eventBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  user: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
    color: '#0d47a1'
  },
  location: {
    fontSize: 15,
    marginBottom: 6,
    color: '#333'
  },
  lossesList: {
    paddingLeft: 10,
    marginTop: 4
  },
  lossItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2
  },
  buttonPrimary: {
    backgroundColor: '#1976d2',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  buttonDanger: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});

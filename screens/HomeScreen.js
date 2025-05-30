import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEvents, getUser } from '../services/Storage';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const [evs, user] = await Promise.all([getEvents(), getUser()]);
      
      // Anexa os dados do usuário atual em cada evento
      const eventsWithUser = evs.map(e => ({
        ...e,
        user: user || {}
      }));
      
      setEvents(eventsWithUser);
    });

    return unsubscribe;
  }, [navigation]);

  const renderEvent = ({ item }) => (
    <View style={styles.eventBox}>
      {/* Exibe nome e e-mail */}
      {item.user?.name && item.user?.email && (
        <Text style={styles.userLine}>
          {item.user.name} ({item.user.email})
        </Text>
      )}
      
      {/* Exibe localização e duração */}
      <Text style={styles.location}>
        {item.location} - {item.duration}
      </Text>

      {/* Lista de prejuízos */}
      {Array.isArray(item.losses) && item.losses.length > 0 && (
        <View style={styles.lossesList}>
          {item.losses.map((loss, index) => (
            <Text key={index} style={styles.lossItem}>• {loss}</Text>
          ))}
        </View>
      )}

      {typeof item.losses === 'string' && (
        <Text style={styles.lossItem}>• {item.losses}</Text>
      )}
    </View>
  );

  const clearData = async () => {
    await AsyncStorage.removeItem('@energy_events');
    setEvents([]);
    Alert.alert('Sucesso', 'Todos os eventos foram apagados!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Registrados</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        ListEmptyComponent={<Text>Nenhum evento registrado ainda.</Text>}
      />

      <View style={styles.buttonGroup}>
        <Button
          title="Novo Registro"
          onPress={() =>
            navigation.navigate('User', { redirectTo: 'Localização Atingida' })
          }
        />
        <View style={{ marginTop: 10 }}>
          <Button title="Apagar Eventos" color="red" onPress={clearData} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  eventBox: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  userLine: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2
  },
  location: {
    fontSize: 15,
    marginBottom: 4
  },
  lossesList: {
    marginTop: 5,
    paddingLeft: 10
  },
  lossItem: {
    fontSize: 14,
    color: '#444'
  },
  buttonGroup: {
    marginTop: 20
  }
});
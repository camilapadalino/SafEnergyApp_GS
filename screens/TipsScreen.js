import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { saveEvent } from '../services/Storage';

const tips = [
  "Tenha lanternas e baterias sempre disponíveis.",
  "Desligue equipamentos sensíveis ao notar quedas.",
  "Evite abrir a geladeira durante apagões.",
  "Armazene água se a bomba for elétrica.",
  "Use nobreaks ou geradores quando possível."
];

export default function TipsScreen({ route, navigation }) {
  const event = route.params?.event;

  const handleSave = async () => {
    if (event) {
      await saveEvent(event);
    }
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recomendações</Text>

      {tips.map((tip, index) => (
        <Text key={index} style={styles.tip}>• {tip}</Text>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Evento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e3f2fd',
    flexGrow: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0d47a1'
  },
  tip: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444'
  },
  button: {
    backgroundColor: '#388e3c',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});

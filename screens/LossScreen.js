import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

export default function LossesScreen({ route, navigation }) {
  const { location, duration } = route.params;
  const [losses, setLosses] = useState(['']);

  const handleChangeLoss = (text, index) => {
    const updated = [...losses];
    updated[index] = text;
    setLosses(updated);
  };

  const addLossField = () => {
    setLosses([...losses, '']);
  };

  const goToTips = () => {
    const event = {
      id: Date.now().toString(),
      location,
      duration,
      losses: losses.filter(loss => loss.trim() !== ''),
      date: new Date().toLocaleDateString()
    };
    navigation.navigate('Recomendações', { event });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Prejuízos Causados</Text>

      {losses.map((loss, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Prejuízo ${index + 1}`}
          value={loss}
          onChangeText={(text) => handleChangeLoss(text, index)}
        />
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addLossField}>
        <Text style={styles.buttonText}>+ Adicionar Prejuízo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={goToTips}>
        <Text style={styles.buttonText}>Salvar e Ver Recomendações</Text>
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    elevation: 2
  },
  addButton: {
    backgroundColor: '#64b5f6',
    padding: 15,
    borderRadius: 10,
    marginTop: 10
  },
  nextButton: {
    backgroundColor: '#1976d2',
    padding: 15,
    borderRadius: 10,
    marginTop: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});

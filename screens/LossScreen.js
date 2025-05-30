import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function LossesScreen({ route, navigation }) {
  const { location, duration } = route.params;
  const [losses, setLosses] = useState(['']);

  const handleChangeLoss = (text, index) => {
    const newLosses = [...losses];
    newLosses[index] = text;
    setLosses(newLosses);
  };

  const addLossField = () => {
    setLosses([...losses, '']);
  };

  const handleTips = () => {
    const event = {
      id: Date.now().toString(),
      location,
      duration,
      losses: losses.filter(loss => loss.trim() !== ''),
      date: new Date().toLocaleDateString(),
    };

    navigation.navigate('Recomendações', { event });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {losses.map((loss, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Prejuízo ${index + 1}`}
          value={loss}
          onChangeText={(text) => handleChangeLoss(text, index)}
        />
      ))}

      <Button title="Adicionar Prejuízo" onPress={addLossField} />
      <View style={styles.button}>
        <Button title="Ver Recomendações" onPress={handleTips} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  button: {
    marginTop: 20
  }
});
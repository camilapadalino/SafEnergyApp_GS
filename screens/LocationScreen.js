import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function LocationScreen({ navigation }) {
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const handleNext = () => {
    if (!bairro || !cidade) {
      alert('Preencha os dois campos!');
      return;
    }

    const location = `${bairro}, ${cidade}`;
    navigation.navigate('Tempo de Interrupção', { location });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Bairro afetado"
        value={bairro}
        onChangeText={setBairro}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <Button title="Próximo" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  }
});
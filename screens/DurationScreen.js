import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function DurationScreen({ route, navigation }) {
  const { location } = route.params;
  const [duration, setDuration] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Duração estimada ou real (ex: 2h30)"
        value={duration}
        onChangeText={setDuration}
      />
      <Button title="Próximo" onPress={() => navigation.navigate('Prejuízos Causados', { location, duration })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
});
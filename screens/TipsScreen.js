import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { saveEvent } from '../services/Storage';

const tips = [
  "Tenha lanternas e baterias sempre disponíveis.",
  "Desligue equipamentos sensíveis ao notar quedas.",
  "Evite abrir a geladeira durante apagões.",
  "Armazene água se a bomba for elétrica.",
  "Use nobreaks ou geradores quando possível.",
];

export default function TipsScreen({ route, navigation }) {
  const event = route.params?.event;

  const handleSaveFromTips = async () => {
    if (event) {
      await saveEvent(event);
    }
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recomendações</Text>
      {tips.map((tip, index) => (
        <Text key={index} style={styles.tip}>• {tip}</Text>
      ))}
      <View style={{ marginTop: 20 }}>
        <Button title="Salvar Evento" onPress={handleSaveFromTips} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  tip: { marginBottom: 8, fontSize: 16 },
});
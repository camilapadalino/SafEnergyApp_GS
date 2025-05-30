import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveUser } from '../services/Storage';

export default function UserScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const redirectTo = route.params?.redirectTo || 'Home';

  const handleSave = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    await saveUser({ name, email, phone }); // sempre sobrescreve
    navigation.replace(redirectTo);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <View style={styles.button}>
        <Button title="Continuar" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, justifyContent:'center' },
  input: {
    borderWidth:1,
    padding:10,
    marginBottom:15,
    borderRadius:5
  },
  button: {
    marginTop:10
  }
});
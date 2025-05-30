import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserScreen from './screens/UserScreen';
import HomeScreen from './screens/HomeScreen';
import LocationScreen from './screens/LocationScreen';
import DurationScreen from './screens/DurationScreen';
import LossesScreen from './screens/LossScreen';
import TipsScreen from './screens/TipsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1976d2',
          },
          headerTintColor: '#fff', // cor dos ícones e texto
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerBackTitleVisible: false, // remove o texto da seta de voltar
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="User" component={UserScreen} options={{ title: 'Perfil do Usuário' }} />
              <Stack.Screen name="Localização Atingida" component={LocationScreen} />
              <Stack.Screen name="Tempo de Interrupção" component={DurationScreen} />
              <Stack.Screen name="Prejuízos Causados" component={LossesScreen} />
              <Stack.Screen name="Recomendações" component={TipsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

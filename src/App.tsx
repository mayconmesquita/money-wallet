import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar, Platform } from 'react-native';
import Home from './screens/Home';
import SendMoney from './screens/SendMoney';
import PaymentHistory from './screens/PaymentHistory';

const Stack = createStackNavigator();

StatusBar.setBarStyle('light-content');

/* istanbul ignore if */
if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('#39586a60');
  StatusBar.setTranslucent(true);
}

function App() {
  const headerStyles = {
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 27,
      marginTop: -39,
    },
    headerBackTitle: '',
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SendMoney"
          component={SendMoney}
          options={{ title: 'Enviar Dinheiro', ...headerStyles }}
        />

        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{ title: 'Histórico de Envios', ...headerStyles }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import CardapioScreen from '../screens/CardapioScreen';
import CarrinhoScreen from '../screens/CarrinhoScreen';
import CheckoutScreen from '../screens/CheckoutScreen'; 
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isReady, setIsReady] = useState(false);

useEffect(() => {
  const timeout = setTimeout(() => {
    console.log('Rotas carregadas:', navigation?.getState()?.routeNames || 'N/A');
    setIsReady(true);
  }, 1000); // Delay proposital

  return () => clearTimeout(timeout);
}, [navigation]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cardapio" component={CardapioScreen} />
        <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
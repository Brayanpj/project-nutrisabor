import { View, Text, StyleSheet, Image } from 'react-native';
import Login from '../src/screens/Login';
import { useEffect } from 'react';


export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja Bem-vindo(a)!</Text>
      <Image
        source={require('../assets/images/LogoNutriSabor.png')} // Substitua pelo caminho correto da sua imagem
        style={styles.image}
        resizeMode="contain"
      /> 
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',     // ocupa a largura total da tela
    height: 200,        // altura controlada
    marginBottom: 90, 
  },
});
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CarrinhoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Carrinho</Text>
      <Button title="Finalizar Pedido" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});

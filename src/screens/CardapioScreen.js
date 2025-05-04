import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default function CardapioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio de Marmitas</Text>
      <Button title="Ver Carrinho" onPress={() => navigation.navigate('Carrinho')} />
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
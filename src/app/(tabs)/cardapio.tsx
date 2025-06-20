import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CardapioScreen() {
  const [carrinho, setCarrinho] = useState<
    { id: number; quantidade: number }[]
  >([]);
  const router = useRouter();

  const cardapio = [
    {
      id: 1,
      nome: "Sopa",
      preco: "R$ 45,90",
      imagem: require("../../assets/images/sopa.jpeg"),
    },
    {
      id: 2,
      nome: "Marmita Fit com Carne moída",
      preco: "R$ 50,00",
      imagem: require("../../assets/images/marmita fit com carne muida.jpeg"),
    },
    {
      id: 3,
      nome: "Almondegas",
      preco: "R$ 38,90",
      imagem: require("../../assets/images/almondegas.jpeg"),
    },
    {
      id: 4,
      nome: "Espaguete",
      preco: "R$ 39,90",
      imagem: require("../../assets/images/espaguete.jpeg"),
    },
    {
      id: 5,
      nome: "Yakisoba",
      preco: "R$ 23,00",
      imagem: require("../../assets/images/yakisoba.jpeg"),
    },
  ];

  const adicionarAoCarrinho = (itemId: number) => {
    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.id === itemId);
      if (itemExistente) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { id: itemId, quantidade: 1 }];
    });
    Alert.alert("Sucesso", "Item adicionado ao carrinho!");
  };

  const irParaCheckout = () => {
    if (carrinho.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione itens ao carrinho");
      return;
    }

    // Criar array com informações completas para o checkout
    const itensParaCheckout = carrinho.map((itemCarrinho) => {
      const itemCardapio = cardapio.find((item) => item.id === itemCarrinho.id);
      return {
        id: itemCarrinho.id,
        nome: itemCardapio?.nome || "",
        preco: itemCardapio?.preco || "R$ 0,00",
        quantidade: itemCarrinho.quantidade,
      };
    });

    router.push({
      pathname: "/checkout",
      params: {
        itens: encodeURIComponent(JSON.stringify(itensParaCheckout)),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Cardápio</Text>
          <TouchableOpacity
            style={styles.carrinhoButton}
            onPress={irParaCheckout}
          >
            <Ionicons name="cart" size={24} color="#fff" />
            {carrinho.length > 0 && (
              <View style={styles.carrinhoBadge}>
                <Text style={styles.carrinhoBadgeText}>
                  {carrinho.reduce((total, item) => total + item.quantidade, 0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView>
          {cardapio.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <TouchableOpacity
                onPress={() => console.log("Imagem clicada:", item.id)}
                style={styles.touchableArea}
              >
                <Image source={item.imagem} style={styles.itemImage} />
              </TouchableOpacity>
              <View style={styles.itemInfo}>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemPreco}>{item.preco}</Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => adicionarAoCarrinho(item.id)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Mantenha todos os estilos exatamente como estão
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  touchableArea: {
    borderRadius: 8,
    overflow: "hidden",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemPreco: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carrinhoButton: {
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 50,
    position: "relative",
  },
  carrinhoBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  carrinhoBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#27ae60",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

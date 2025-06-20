import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

type ItemCarrinho = {
  id: number;
  nome: string;
  preco: string;
  quantidade: number;
};

const CarrinhoScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      // Carregar itens do carrinho (substitua por seus dados reais)
      const carregarCarrinho = async () => {
        // Exemplo com dados mockados - substitua pela sua lógica de carregamento
        const mockItens = [
          {
            id: 1,
            nome: "Sopa",
            preco: "R$ 45,90",
            quantidade: 2,
          },
          {
            id: 2,
            nome: "Almondegas",
            preco: "R$ 32,50",
            quantidade: 1,
          },
        ];
        setItensCarrinho(mockItens);
      };
      carregarCarrinho();
    }
  }, [user, router]);

  const calcularTotal = () => {
    return itensCarrinho
      .reduce((total, item) => {
        const precoNumerico = parseFloat(
          item.preco.replace("R$ ", "").replace(",", ".")
        );
        return total + precoNumerico * item.quantidade;
      }, 0)
      .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleFinalizarCompra = () => {
    if (!user) {
      Alert.alert(
        "Atenção",
        "Você precisa estar logado para finalizar a compra."
      );
      router.push("/login");
      return;
    }

    if (itensCarrinho.length === 0) {
      Alert.alert(
        "Carrinho vazio",
        "Adicione itens ao carrinho antes de finalizar"
      );
      return;
    }

    router.push({
      pathname: "/checkout",
      params: {
        itens: encodeURIComponent(JSON.stringify(itensCarrinho)),
      },
    });
  };

  const renderItem = ({ item }: { item: ItemCarrinho }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemNome}>{item.nome}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.itemPreco}>{item.preco}</Text>
        <Text style={styles.itemQuantidade}>Qtd: {item.quantidade}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Carrinho</Text>

      {itensCarrinho.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      ) : (
        <>
          <FlatList
            data={itensCarrinho}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: {calcularTotal()}</Text>
          </View>
        </>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          itensCarrinho.length === 0 && styles.buttonDisabled,
        ]}
        onPress={handleFinalizarCompra}
        disabled={itensCarrinho.length === 0}
      >
        <Text style={styles.buttonText}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemNome: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  itemPreco: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
  itemQuantidade: {
    fontSize: 16,
    color: "#666",
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 15,
    marginBottom: 15,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#27ae60",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#95a5a6",
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CarrinhoScreen;

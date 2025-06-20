import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      {user ? (
        <>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{user.nome}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </>
      ) : (
        <Text style={styles.info}>Usuário não está logado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

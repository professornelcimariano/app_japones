import React from "react";
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando o ícone
import { Link } from 'expo-router';

export default function Index() {
  return (
    <ImageBackground
      source={require("../assets/images/bkg-home.jpg")} // Certifique-se de que o caminho da imagem está correto
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40, color: "#FFF", marginTop: 20 }}>
        oJaponês!
      </Text>
      <Icon name="cutlery" size={32} color="#FFFFFF" style={styles.icon} />
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20, width: '100%', alignItems: 'center' }}>
        <Link href="/products" style={{ backgroundColor: "#FF3737", padding: 15, borderRadius: 10, width: '95%' }} asChild>
          <TouchableOpacity >
            <Text style={{ fontSize: 22, color: "#FFFFFF", textAlign: "center" }}>Cardápio</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/about"> <Text> Enviar </Text> </Link>
        <Link href="/about"> <Text> Enviar </Text> </Link>
        <Link href="/about"> <Text> Enviar </Text> </Link>
        <Link href="/about"> <Text> Enviar </Text> </Link>
      </View>

    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  background: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "#FFF",
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#FF3737",
    padding: 15,
    borderRadius: 10,
    width: '95%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
  },
  icon: {
    marginRight: 10, // Espaçamento entre o ícone e o texto
  },
});

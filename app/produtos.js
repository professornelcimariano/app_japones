import React from "react";
import { Text, View, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text>
            Conteúdo do arquivo products.json via node
        </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  }  
});

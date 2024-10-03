import React from "react";
import { Text, View, StyleSheet } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
        <Text>
            Conteúdo do arquivo products.json via node
        </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15
  }
});

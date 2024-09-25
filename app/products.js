import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { API_URL } from './config';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(API_URL + '/products')
      .then(response => {
        setProducts(response.data.list);
      })
      .catch(error => {
        console.error('Erro ao carregar Produtos:', error);
        alert('Erro ao carregar Produtos: ' + error.message); // Exibe o erro no celular
      });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map(item => (
        <View key={item.id}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          </View>
          <View>
            <Text style={{ textAlign: 'justify' }}>{item.description}</Text>
          </View>
          <View style={{
            height: 1, backgroundColor: '#ccc', marginTop: 20,
            width: '80%', alignSelf: 'center'
          }}> </View>
        </View>
      ))
      }

    </ScrollView >
  )
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  }

});
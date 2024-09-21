import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { API_URL } from './config';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

export default function Products() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    // axios.get('http://10.55.51.42:4000/products')
    axios.get(API_URL + '/products') 
      .then(response => {
        setproducts(response.data.listProduct);
      })
      .catch(error => console.error('Erro ao carregar Produtos:', error));
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map(item => (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Text>{item.description} </Text>
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: '#ccc', marginTop: 20, width: '80%', alignSelf: 'center' }} />

        </View>
      ))}

    </ScrollView>
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
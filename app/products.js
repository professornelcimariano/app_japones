import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { API_URL } from './config';
import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    fetch(API_URL + '/products')
      .then(response => response.json())
      .then(data => {
        setproducts(data.listProduct);
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
            {/* <View style={{ flex: 1, alignItems: 'center' }}>
              <Image style={{ width: 100, height: 100 }}
                source={require('../assets/images/frameworks/django.webp')}
              />
            </View> */}
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

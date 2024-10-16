import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { API_URL } from './config';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import styles from './styles';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(API_URL + '/products')
      .then(response => {
        setProducts(response.data.list);
      })
      .catch(error => console.error('Erro ao carregar Products:', error));
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map(item => (
        <View key={item.id}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))
      }

    </ScrollView >
  )
}

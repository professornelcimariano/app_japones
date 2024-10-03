// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Importa o Firestore configurado

export default function App() {
    const [users, setUsers] = useState([]);

    // Função para buscar dados da coleção "users" no Firestore
    const fetchUsers = async () => {
        try {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
        }
    };

    // Executa a função ao carregar o componente
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Usuários do Firestore</Text>
            {users.map(user => (
                <View key={user.id} style={{ marginVertical: 10 }}>
                    {/* Verifica se o campo "name" existe */}
                    {user.name && (
                        <Text style={{ fontSize: 18 }}>Nome: {user.name}</Text>
                    )}
                    {/* Verifica se o campo "email" existe */}
                    {user.email && (
                        <Text>Email: {user.email}</Text>
                    )}
                    {/* Verifica se o campo "phone" existe */}
                    {user.phone && (
                        <Text>Telefone: {user.phone}</Text>
                    )}
                </View>
            ))}

        </View>
    );
}

// Com map sem validação
{/**
<View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Usuários do Firestore</Text>
      {users.map(user => (
        <View key={user.id} style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 18 }}>Nome: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      ))}

    </View>
*/}

// Com flatList
{/*
<View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Usuários do Firestore</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18 }}>Nome: {item.name}</Text>
            <Text>Email: {item.email}</Text>
          </View>
        )}
      />
    </View>
*/}

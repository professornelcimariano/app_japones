/* 
Firebase App (necessário para inicializar o Firebase):
    npm install @react-native-firebase/app
Firebase Firestore:
    npm install @react-native-firebase/firestore
 */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collection, getDocs, onSnapshot  } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Importa o Firestore configurado

export default function App() {
    const [users, setUsers] = useState([]);
    /*
        const fetchUsers -> Função para buscar dados da coleção "users" no Firestore
        getDocs -> é uma função assíncrona do Firestore que retorna todos os documentos de uma coleção.
        usersCollection -> é passado como parâmetro, então ele busca todos os documentos dessa coleção.
        await -> faz com que o código espere até que a operação de busca seja concluída antes de continuar. O resultado dessa busca é armazenado na variável usersSnapshot.
        O usersSnapshot.docs contém um array de documentos retornados pela consulta.
        O método map() percorre esse array e, para cada documento (doc), cria um novo objeto que:
        Pega o ID do documento (doc.id) e coloca no objeto.
        Usa o operador spread (...doc.data()) para adicionar todos os campos e valores do documento retornado pelo Firestore ao objeto.
    */

    // Forma abaixo sem atualização na tela do app com o registro inserido no firebase
    /* const fetchUsers = async () => { // Função assíncrona (async) - não bloqueia a execução do restante do código enquanto espera pela resposta
        try {
            const usersCollection = collection(db, 'users'); // A função collection é usada para fazer referência à coleção "users" dentro do banco de dados Firestore.
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    */

    // Função para escutar em tempo real os dados da coleção "users"
    /*
    onSnapshot: Substitui o getDocs pelo onSnapshot, que permite ouvir as mudanças em tempo real na coleção de usuários.
    Limpeza do listener: Adicionamos uma função de "cleanup" no useEffect para cancelar a escuta quando o componente for desmontado, evitando vazamento de memória.
    */
    useEffect(() => {
        const usersCollection = collection(db, 'users');
        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
            const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        }, (error) => {
            console.error("Erro ao buscar usuários: ", error);
        });
        // Cleanup function para cancelar a escuta quando o componente for desmontado
        return () => unsubscribe();
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

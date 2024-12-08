import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import api from "./src/services/api";

export default function App() {

  const [cep, setCep] = useState("")
  const [logradouro, setLogradouro] = useState('')
  const [bairro, setBairro] = useState('')
  const [localidade, setLocalidade] = useState('')
  const [uf, setUf] = useState('')
  const [loading, setLoading] = useState(false);


  async function buscarCep() {
    if (cep === '') {
      Alert.alert('CEP inválido', 'Por favor, insira um CEP.');
      return;
    }
  
    setLoading(true); // Ativa o indicador de carregamento
    try {
      const response = await api.get(`/${cep}/json/`);
      if (response.data.erro) {
        Alert.alert('CEP não encontrado');
      } else {
        setLogradouro(response.data.logradouro);
        setBairro(response.data.bairro);
        setLocalidade(response.data.localidade);
        setUf(response.data.uf);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP.');
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Text style={styles.textTopBar}>Buscador de Cep</Text>
      </View>

      <View style={styles.viewCep}>
        <TextInput
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder="Cep"
          editable={true}
          placeholderTextColor='#333'
          style={{ padding:15,borderColor: '#000', borderWidth: 2, width: 200, fontSize: 18, marginTop: 20, marginEnd: 20, borderRadius: 10 }}
        />
        <TouchableOpacity style={styles.buttonBuscar} onPress={buscarCep}>
          <Text style={styles.textButtonBuscar}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={logradouro}
        onChangeText={(texto) => setLogradouro(texto)}
        placeholder="Logradouro"
        style={styles.input}
        placeholderTextColor='#333'
        editable={false}
      />


      <TextInput
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder="Bairro"
        style={styles.input}
        placeholderTextColor='#333'
        editable={false}
      />


      <TextInput
        value={localidade}
        onChangeText={(texto) => setLocalidade(texto)}
        placeholder="Cidade"
        placeholderTextColor='#333'
        editable={false}
        style={styles.input}
      />


      <TextInput
        value={uf}
        onChangeText={(texto) => setUf(texto)}
        placeholder="Estado"
        editable={false}
        placeholderTextColor='#333'
        style={{ borderColor: '#000', borderWidth: 2, width: 100, fontSize: 18, marginTop: 10, marginEnd: 20, borderRadius: 10,marginHorizontal:20,padding:15 }}
      />



    </View>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    topBar: {
      backgroundColor: '#0288d1',
      paddingVertical: 20,
      alignItems: 'center',
    },
    textTopBar: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    viewCep: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 20,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: '#fff',
      marginBottom: 10,
    },
    buttonBuscar: {
      backgroundColor: '#0288d1',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textButtonBuscar: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
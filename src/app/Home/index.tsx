import { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';

import { Item } from '@/components/Item';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';
import { itensStorage, ItemStorage } from '@/storage/itensStorage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [itens, setItens] = useState<ItemStorage[]>([])

  function showEmptyDescriptionAlert() {
    if (Platform.OS === 'web') {
      window.alert('A descrição do item não pode ser vazia.')
      return
    }

    Alert.alert('Atenção', 'A descrição do item não pode ser vazia.')
  }

  function handleAddItem() {
    if (!description.trim()) {
      showEmptyDescriptionAlert()
      return
    }

    const newItem = {
      id: Math.random().toString(2),
      description,
      status: FilterStatus.PENDING,
    }

  }

  async function getItens() {
    try {
      const response = await itensStorage.get()
      setItens(response)
    } catch (error) {
      console.error("Erro ao obter itens:", error)
      if (Platform.OS === 'web') {
        window.alert('Não foi possível obter os itens. Por favor, tente novamente mais tarde.')
        return
      }
      Alert.alert('Erro', 'Não foi possível obter os itens. Por favor, tente novamente mais tarde.')
    }
  }

  useEffect(() => {
    getItens()
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input 
          placeholder='O que você precisa comprar?'
          onChangeText={setDescription}
        />
        <Button title="Entrar" onPress={handleAddItem}/>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter 
                key={status} 
                status={status} 
                isActive={status === filter} 
                onPress={() => setFilter(status)}
              />
            ))
          }
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={itens}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item 
              data={item} 
              onStatus={() => {console.log("Muda Status")}}
              onRemove={() => {console.log("Remover")}}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={ styles.separator } />}
          contentContainerStyle={ styles.listContent }
          ListEmptyComponent={() => <Text style={ styles.empty }>Nenhum item aqui. ☹ </Text>}
        />
      </View>
    </View>
  );
}

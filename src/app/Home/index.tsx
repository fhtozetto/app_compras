import { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';

import { Item } from '@/components/Item';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';
import { itensStorage, ItemStorage } from '@/storage/itemsStorage';

// Define os filtros exibidos no cabecalho da tela.
const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  // Estados locais de filtro, campo de texto e itens renderizados.
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [itens, setItens] = useState<ItemStorage[]>([])

  // Exibe mensagem de validacao quando a descricao esta vazia.
  function showEmptyDescriptionAlert() {
    if (Platform.OS === 'web') {
      window.alert('A descrição do item não pode ser vazia.')
      return
    }

    Alert.alert('Atenção', 'A descrição do item não pode ser vazia.')
  }

  // Cria um novo item, salva e atualiza a lista filtrada.
  async function handleAddItem() {
    if (!description.trim()) {
      showEmptyDescriptionAlert()
      return
    }

    const newItem = {
      id: Math.random().toString(2),
      description,
      status: FilterStatus.PENDING,
    }

    await itensStorage.add(newItem)
    await itemsByStatus()

    if (Platform.OS === 'web') {
      window.alert(`O item "${description}" foi adicionado com sucesso!`)
    } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
      Alert.alert('Adicionado', `O item "${description}" foi adicionado com sucesso!`)
    }
    setDescription("")
    setFilter(FilterStatus.PENDING)
  }

  // Busca itens no storage com base no filtro atual.
  async function itemsByStatus() {
    try {
      const response = await itensStorage.getByStatus(filter)
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

  // Remove item por id e recarrega a lista.
  async function handleRemoveItem(id: string) {
    try {
      await itensStorage.remove(id)
      await itemsByStatus()
    } catch (error) {
      console.error("Erro ao remover item:", error)
      if (Platform.OS === 'web') {
        window.alert('Não foi possível remover o item. Por favor, tente novamente mais tarde.')
        return
      }
      Alert.alert('Erro', 'Não foi possível remover o item. Por favor, tente novamente mais tarde.')
    }
  }

  // Solicita confirmacao para limpar toda a lista.
  function handleClear() {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Deseja realmente limpar todos os itens?')
      if (confirmed) onClear()
      return
    }
    Alert.alert('Limpar', 'Deseja realmente limpar todos os itens?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {onClear()}
      },
    ])
  }

  // Executa a limpeza no storage e reseta o estado local.
  async function onClear() {
    try {
      await itensStorage.clear()
      setItens([])
    } catch (error) {
        console.error("Erro ao limpar itens:", error)
        if (Platform.OS === 'web') {
          window.alert('Não foi possível limpar os itens. Por favor, tente novamente mais tarde.')
          return
        }
        Alert.alert('Erro', 'Não foi possível limpar os itens. Por favor, tente novamente mais tarde.')
    } 
  } 
  
  // Alterna o status do item e atualiza os dados da tela.
  async function handleToggleStatus(id: string) {
    try {
      await itensStorage.toggleStatus(id)
      await itemsByStatus()
    } catch (error) {
      console.error("Erro ao atualizar status do item:", error)
      if (Platform.OS === 'web') {
        window.alert('Não foi possível atualizar o status do item. Por favor, tente novamente mais tarde.')
        return
      }
      Alert.alert('Erro', 'Não foi possível atualizar o status do item. Por favor, tente novamente mais tarde.')
    }
  }

  // Recarrega os itens sempre que o filtro for alterado.
  useEffect(() => {
    itemsByStatus()
  }, [filter])

  // Estrutura visual da tela principal.
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input 
          placeholder='O que você precisa comprar?'
          onChangeText={setDescription}
          value={description}
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
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={itens}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item 
              data={item} 
              onStatus={() => {handleToggleStatus(item.id)}}
              onRemove={() => {handleRemoveItem(item.id)}}
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

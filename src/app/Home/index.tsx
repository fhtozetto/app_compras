import { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Item } from '@/components/Item';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [itens, setItens] = useState<any>([])

  function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert("Atenção", "A descrição do item não pode ser vazia.")
    }

    const newItem = {
      id: Math.random().toString(2),
      description,
      status: FilterStatus.PENDING,
    }

    setItens((prevState) => [...prevState, newItem])

  }
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

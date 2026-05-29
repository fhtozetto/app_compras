import { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import { Item } from '@/components/Item';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITENS = [
  {id: "1", status: FilterStatus.DONE, description: "Café"},
  {id: "2", status: FilterStatus.DONE, description: "Pão"},
  {id: "3", status: FilterStatus.PENDING, description: "Leite"},
  {id: "4", status: FilterStatus.PENDING, description: "Ovos"},
  {id: "5", status: FilterStatus.DONE, description: "Frutas"},
  {id: "6", status: FilterStatus.PENDING, description: "Legumes"},
  {id: "7", status: FilterStatus.DONE, description: "Carne"},
  {id: "8", status: FilterStatus.PENDING, description: "Peixe"},
  {id: "9", status: FilterStatus.DONE, description: "Arroz"},
  {id: "10", status: FilterStatus.PENDING, description: "Feijão"},
]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input 
          placeholder='O que você precisa comprar?'
          onChangeText={setDescription}
        />
        <Button title="Entrar" />
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
          data={ITENS}
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

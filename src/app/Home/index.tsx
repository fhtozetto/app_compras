import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import { Item } from '@/components/Item';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?'/>
        <Button title="Entrar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter key={status} status={status} isActive={true} />
            ))
          }
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
          <ScrollView>
            {/* Lista de itens */
              Array.from({ length: 100 }).map((_, index) => (
                <Item 
                  key={index}
                  data={{status: FilterStatus.DONE, description: "Café"}} 
                  onStatus={() => {console.log("Muda Status")}}
                  onRemove={() => {console.log("Remover")}}
                />
              ))
            }

          </ScrollView>
      </View>
    </View>
  );
}

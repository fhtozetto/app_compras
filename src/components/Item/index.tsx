import { View, Text, TouchableOpacity } from "react-native"
import { Trash2 } from "lucide-react-native"

import { styles } from "./style"
import { StatusIcon } from "../StatusIcon"
import { FilterStatus } from "@/types/FilterStatus"

// Dados minimos necessarios para renderizar um item da lista.
type ItemData = {
    status: FilterStatus
    description: string
}

// Propriedades do componente de item com callbacks de acao.
type Props = { 
    data: ItemData
    onRemove: () => void
    onStatus: () => void
}

// Componente que exibe item, alterna status e permite remocao.
export function Item({ data, onStatus, onRemove }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
                <StatusIcon status={data.status} />
            </TouchableOpacity>

            <Text style={styles.description}>
                {data.description}
            </Text>

            <TouchableOpacity onPress={onRemove}>
                <Trash2 size={18} color="#828282" />
            </TouchableOpacity>
        </View>
    )
}
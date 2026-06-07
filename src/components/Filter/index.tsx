import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { CircleCheck } from "lucide-react-native"

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

// Propriedades do botao de filtro, incluindo estado visual ativo.
type Props = TouchableOpacityProps & {
    status: FilterStatus
    isActive: boolean
}

// Componente de filtro para alternar entre pendentes e comprados.
export function Filter({ status, isActive, ...rest }: Props) {
    return (
        <TouchableOpacity 
        style={[styles.container, {opacity: isActive ? 1 : 0.5}]} 
        activeOpacity={0.8}
        {...rest}>

            <StatusIcon status={status} />
            <Text style={styles.title}>
                { status === FilterStatus.DONE ? 'Comprados' : 'Pendentes' }
            </Text>
        </TouchableOpacity>
    )
}
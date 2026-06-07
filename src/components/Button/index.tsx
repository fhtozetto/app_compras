import { TouchableOpacityProps, TouchableOpacity, Text } from "react-native"

import { styles } from "./styles"

// Propriedades do botao reutilizavel da aplicacao.
type Props = TouchableOpacityProps & {
    title: string
}

// Componente de botao padrao com texto centralizado.
export function Button({title, ...rest}: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}
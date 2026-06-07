import { TextInput, TextInputProps } from "react-native"

import { styles } from "./styles"

// Campo de texto reutilizavel com estilo padrao da aplicacao.
export function Input({...rest}: TextInputProps) {
    return (
        <TextInput style={styles.container} {...rest} placeholderTextColor="#74794b"/>
    )
}
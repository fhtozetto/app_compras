import { StyleSheet } from 'react-native';

// Estilos de layout para cada linha de item da lista.
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    description: {
        flex: 1,
        fontSize: 14,
        fontWeight: 600,
    },
});
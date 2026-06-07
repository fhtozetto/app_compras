import AsyncStorage from "@react-native-async-storage/async-storage"
import { FilterStatus } from "@/types/FilterStatus"

// Chave unica usada para persistir os itens no AsyncStorage.
const ITEMS_STORAGE_KEY = "@comprar:itens"

// Contrato dos itens salvos localmente.
export type ItemStorage = {
    id: string
    status: FilterStatus
    description: string
}


// Busca todos os itens salvos no dispositivo.
async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)

        return storage ? JSON.parse(storage) : []
    } catch (error) {
        throw new Error("ITENS_GET: " + error)
    }
}

// Retorna somente os itens com o status selecionado.
async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const itens = await get()

    return itens.filter((item) => item.status === status)
}

// Persiste a lista completa de itens.
async function save(itens: ItemStorage[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(itens))
    } catch (error) {
        throw new Error("ITENS_SAVE: " + error)
    }
}

// Remove um item especifico pelo id.
async function remove(id: string): Promise<void> {
    try {
        const itens = await get()
        const updatedItens = itens.filter((item) => item.id !== id)
        await save(updatedItens)
    } catch (error) {
        throw new Error("ITENS_REMOVE: " + error)
    }
}

// Adiciona um novo item ao final da lista.
async function add(item: ItemStorage): Promise<void> {
    try {
        const itens = await get()
        const updatedItens = [...itens, item]
        await save(updatedItens)
    } catch (error) {
        throw new Error("ITENS_ADD: " + error)
    } 
} 

// Limpa todos os itens salvos.
async function clear(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
    } catch (error) {
        throw new Error("ITENS_CLEAR: " + error)
    }
}

// Alterna o status de um item entre pendente e concluido.
async function toggleStatus(id: string): Promise<void> {
    try {
        const itens = await get()
        const updatedItens = itens.map((item) => {
            if (item.id === id) {
                return { ...item, status: item.status === FilterStatus.PENDING ? FilterStatus.DONE : FilterStatus.PENDING }
            } else {
                return item
            }
        })
        await save(updatedItens)
    } catch (error) {
        throw new Error("ITENS_TOGGLE_STATUS: " + error)
    }
} 

// API publica de armazenamento usada pela aplicacao.
export const itensStorage = {
    get,
    getByStatus,
    add,
    remove,
    clear,
    toggleStatus
}
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FilterStatus } from "@/types/FilterStatus"

const ITEMS_STORAGE_KEY = "@comprar:itens"

export type ItemStorage = {
    id: string
    status: FilterStatus
    description: string
}


async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)

        return storage ? JSON.parse(storage) : []
    } catch (error) {
        throw new Error("ITENS_GET: " + error)
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const itens = await get()

    return itens.filter((item) => item.status === status)
}

async function save(itens: ItemStorage[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(itens))
    } catch (error) {
        throw new Error("ITENS_SAVE: " + error)
    }
}

async function remove(id: string): Promise<void> {
    try {
        const itens = await get()
        const updatedItens = itens.filter((item) => item.id !== id)
        await save(updatedItens)
    } catch (error) {
        throw new Error("ITENS_REMOVE: " + error)
    }
}

async function add(item: ItemStorage): Promise<void> {
    try {
        const itens = await get()
        const updatedItens = [...itens, item]
        await save(updatedItens)
    } catch (error) {
        throw new Error("ITENS_ADD: " + error)
    } 
} 

async function clear(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
    } catch (error) {
        throw new Error("ITENS_CLEAR: " + error)
    }
}

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

export const itensStorage = {
    get,
    getByStatus,
    add,
    remove,
    clear,
    toggleStatus
}
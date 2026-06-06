import AsyncStorage from "@react-native-async-storage/async-storage"
import { FilterStatus } from "@/types/FilterStatus"

const ITENS_STORAGE_KEY = "@comprar:itens"

export type ItemStorage = {
    id: string
    status: FilterStatus
    description: string
}


async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITENS_STORAGE_KEY)

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
        await AsyncStorage.setItem(ITENS_STORAGE_KEY, JSON.stringify(itens))
    } catch (error) {
        throw new Error("ITENS_SAVE: " + error)
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

export const itensStorage = {
    get,
    getByStatus,
    add,
}
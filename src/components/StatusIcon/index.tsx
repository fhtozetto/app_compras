import { FilterStatus } from '@/types/FilterStatus';
import { CircleDashed, CircleCheck } from "lucide-react-native";

// Renderiza o icone de acordo com o status atual do item.
export function StatusIcon({ status }: { status: FilterStatus }) {
    return status === FilterStatus.DONE ? (
        <CircleCheck size={18} color="#2C46B1" />
    ) : (
        <CircleDashed size={18} color="#000000" />
    )
}
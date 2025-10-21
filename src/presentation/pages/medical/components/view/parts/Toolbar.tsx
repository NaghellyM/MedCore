import { Button } from "../../../../../components/ui/button"

type Props = {
    onEdit?: () => void
    onExport: () => void
    onPrint: () => void
    onBack?: () => void
}

export default function Toolbar({ onPrint, onBack }: Props) {
    return (
        <div className="flex gap-2 print:hidden">
            <Button variant="outline" onClick={onPrint}>Imprimir</Button>
            <Button variant="ghost" onClick={onBack ?? (() => history.back())}>Volver</Button>
        </div>
    )
}

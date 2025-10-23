import { useNavigate } from "react-router-dom"
import { Button } from "../../../../../components/ui/button"

type Props = {
    onEdit?: () => void
    onExport: () => void
    onPrint: () => void
    onBack?: () => void
}
    

export default function Toolbar({ onPrint, onBack }: Props) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-2 print:hidden">
            <Button className="btn" variant="outline" onClick={onPrint}>Imprimir</Button>
            <Button className="bg-slate-100" variant="ghost" onClick={onBack ?? (() => navigate("/medicalHistory"))}>Volver</Button>
        </div>
    )
}

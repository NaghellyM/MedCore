// src/presentation/medical/components/view/parts/JsonPane.tsx
export default function JsonPane({ data }: { data: unknown }) {
    return (
        <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
            {JSON.stringify(data, null, 2)}
        </pre>
    )
}

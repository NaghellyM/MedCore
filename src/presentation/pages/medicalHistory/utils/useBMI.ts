// src/presentation/medical/utils/useBMI.ts
import { useMemo } from "react"
export function useBMI(height?: number | null, weight?: number | null, fallback?: number | null) {
    return useMemo(() => {
        const h = Number(height)
        const w = Number(weight)
        if (!h || !w) return fallback ?? null
        return +(w / Math.pow(h / 100, 2)).toFixed(2)
    }, [height, weight, fallback])
}

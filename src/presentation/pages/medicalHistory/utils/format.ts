// src/presentation/medical/utils/format.ts
export const fmt = (v?: string | number | null): string => {
    if (v == null) return "—";                 // cubre null y undefined
    if (typeof v === "string") return v || "—"; // permite "", si quieres tratarla como vacío
    return String(v);                           // números, incluyendo 0
}

export const fmtDateTime = (s?: string | null): string =>
    s ? new Date(s).toLocaleString() : "—"

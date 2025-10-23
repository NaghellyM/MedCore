import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../core/context/authContext";


type Role = "admin" | "doctor" | "nurse" | "patient";
const mapRoleToEnglish = (role: string): Role => {
    const roleMap: Record<string, Role> = {
        'ADMINISTRADOR': 'admin',
        'ADMIN': 'admin',
        'MEDICO': 'doctor',
        'DOCTOR': 'doctor',
        'ENFERMERO': 'nurse',
        'ENFERMERA': 'nurse',
        'NURSE': 'nurse',
        'PACIENTE': 'patient',
        'PATIENT': 'patient',
    };
    return roleMap[role?.toUpperCase()] || 'patient';
};

export function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();
    const loc = useLocation();
    if (loading) return <div className="p-6">Verificando sesión…</div>;
    if (!isAuthenticated) {
        const to = `/login?redirect=${encodeURIComponent(loc.pathname + loc.search)}`;
        console.log(`Usuario no autenticado. Redirigiendo a ${to}`);
        return <Navigate to={to} replace />;
    }
    return <Outlet />;
}

export function RoleRoute({ allow }: { allow: Role[] }) {
    const { loading, isAuthenticated, user } = useAuth();
    const loc = useLocation();

    if (loading) return <div className="p-6">Cargando…</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    const rawRole = (user?.role ?? user?.rol ?? user?.userRole) as string | undefined;
    console.log("RoleRoute - User role from context:", rawRole);
    const role: Role = rawRole ? mapRoleToEnglish(rawRole) : 'patient';

    console.log("RoleRoute - Raw role:", rawRole, "Mapped role:", role, "Allowed:", allow);

    if (!role || !allow.includes(role)) {
        if (role === "admin") {
            return <Navigate to="/adminPage" replace />;
        }
        if (role === "doctor") {
            return <Navigate to="/doctorPage" replace />;
        }
        if (role === "nurse") {
            return <Navigate to="/nursePage" replace />;
        }
        if (role === "patient") {
            return <Navigate to="/patientPage" replace />;
        }
        // Si no tiene rol definido, redirigir a home
        return (
            <Navigate
                to="/"
                replace
                state={{ from: loc.pathname, reason: "forbidden" }}
            />
        );
    }

    // Si el rol está permitido, mostrar el contenido
    return <Outlet />;
}

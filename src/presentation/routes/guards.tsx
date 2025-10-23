import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../core/context/authContext";


type Role = "admin" | "doctor" | "nurse" | "patient";

export function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();
    const loc = useLocation();
    if (loading) return <div className="p-6">Verificando sesión…</div>;
    if (!isAuthenticated) {
        const to = `/login?redirect=${encodeURIComponent(loc.pathname + loc.search)}`;
        return <Navigate to={to} replace />;
    }
    return <Outlet />;
}

export function RoleRoute({ allow }: { allow: Role[] }) {
    const { loading, isAuthenticated, user } = useAuth();
    const loc = useLocation();

    if (loading) return <div className="p-6">Cargando…</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    const role = (user?.role ?? user?.rol ?? user?.userRole) as Role | undefined;
    if (!role || !allow.includes(role)) {
        return (
            <Navigate
                to="/"
                replace
                state={{ from: loc.pathname, reason: "forbidden" }}
            />
        );
    }
    return <Outlet />;
}

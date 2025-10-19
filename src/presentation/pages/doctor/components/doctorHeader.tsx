import { Button } from "../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { useAuth } from "../../../../core/context/authContext";
import { getCurrentUser } from "../../../../core/services/authService";

export default function DoctorHeader() {
  const user = getCurrentUser();
      const { logoutUser } = useAuth();
  return (
    <header
      className="w-full bg-white shadow-sm px-6 py-3 flex items-center"
      style={{ "--header-height": "64px" } as React.CSSProperties}
    >

      <Avatar className="w-10 h-10 mr-3">
        <AvatarImage src="https://i.pravatar.cc/48?img=12" alt="Avatar" />
        <AvatarFallback>CG</AvatarFallback>
      </Avatar>


      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-900 truncate">{user?.fullname}</div>
        <div className="text-xs text-slate-500">{user?.role}</div>
      </div>

      <div className="flex-1" />
      <div className="flex items-center gap-3">
        <div className="w-px h-6 bg-slate-200" />
        <Button variant="ghost" size="icon">🔔</Button>
        <Button variant="ghost" size="icon">💬</Button>
        <Button variant="ghost" size="icon">⚙️</Button>
        <Button onClick={logoutUser} variant="ghost" size="icon">↪️</Button>
      </div>
    </header>
  )
}

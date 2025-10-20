import * as React from "react";
import {
    SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarTrigger
} from "../components/ui/sidebar";
import UserHeader from "../components/globals/header";
import { useIsCompact } from "../hooks/useBreakpoint";
import { cn } from "../../core/utils/decodeToken";

export function DashboardLayout({
    sidebar,
    children,
    showSearch = true,
    headerHeightClass = "pt-[80px]",
    contentMaxWidthClass = "max-w-7xl",
    mainClassName = "",
    sidebarContentClassName = "",
    variant = "inset",
    collapsible = "offcanvas",
}: {
    sidebar: React.ReactNode;
    children: React.ReactNode;
    showSearch?: boolean;
    headerHeightClass?: string;
    contentMaxWidthClass?: string;
    mainClassName?: string;
    sidebarClassName?: string;
    sidebarContentClassName?: string;
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
}) {
    const isCompact = useIsCompact();

    return (
        <SidebarProvider defaultOpen={!isCompact}>
            {/* Header */}
            <div className="sticky top-0 z-50">
                <div className="relative">
                    <UserHeader showSearch={showSearch} />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                        <SidebarTrigger className="mr-2" />
                    </div>
                </div>
            </div>


            <div className={cn(headerHeightClass, "md:px-2")} style={{ ['--header-h' as any]: '80px' }}>
                <Sidebar
                    side="left"
                    variant={variant}
                    collapsible={collapsible}
                    className="
                    data-[mobile=true]:top-[var(--header-h)]
                    data-[mobile=true]:h-[calc(100vh-var(--header-h))]
                    data-[mobile=true]:rounded-t-none
                    data-[mobile=true]:border-t-0
                    "
                >

                    <SidebarContent className={cn("", sidebarContentClassName)}>
                        {sidebar}
                    </SidebarContent>
                </Sidebar>

                {/* 👇 el Inset reacciona al estado del peer */}
                <SidebarInset
                    className={cn(
                        "relative flex w-full flex-1 flex-col ",
                        // cuando el sidebar está expandido en md+, reserva su ancho
                        "md:peer-data-[state=expanded]:pl-[--sidebar-width]",
                        // opcional: cuando está colapsado, deja un rail mini (ajusta si usas 'icon')
                        "md:peer-data-[state=collapsed]:pl-[--sidebar-width-icon]",
                        // si usas floating, quita el padding:
                        variant === "floating" && "md:pl-0",
                        mainClassName
                    )}
                >
                    <div className={cn("mx-auto w-full px-4", contentMaxWidthClass)}>
                        {children}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
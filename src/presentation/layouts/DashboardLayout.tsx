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
            <div className="sticky top-0 z-50">
                <div className="relative">
                    <UserHeader showSearch={showSearch} />
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

                <SidebarInset >
                    <SidebarTrigger className="" />
                    <div className={cn("mx-auto w-full px-4", contentMaxWidthClass)}>
                        {children}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
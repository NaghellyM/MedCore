import { Sidebar, SidebarContent, SidebarTrigger } from "../../ui/sidebar";

export function SidebarBase({ children, }: any) {
    return (
        <Sidebar className="ml-3 mb-3 self-start w-fit min-w-[14rem] max-w-[18rem] h-auto bg-white pt-40" collapsible="icon" >
            <SidebarContent className="mt-20 m-4 bg-white  sticky top-[88px]">
                <SidebarTrigger className="flex justify-start md:hidden"  />
                {children}
            </SidebarContent>
        </Sidebar>
    );
}

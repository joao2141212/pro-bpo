import { NavLink } from "react-router-dom";
import {
  Building2,
  BarChart3,
  Users,
  UserCog,
  Clock,
  ListChecks,
  CheckSquare,
  MessageSquare,
  Plug,
  Wallet,
  FolderOpen,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainMenuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Empresas", url: "/empresas", icon: Building2 },
  { title: "Indicadores", url: "/indicadores", icon: BarChart3 },
  { title: "Usuários", url: "/usuarios", icon: Users },
  { title: "Empresa por Operador", url: "/empresa-operador", icon: UserCog },
];

const operacionalItems = [
  { title: "Ajuste de Tempo", url: "/timesheet", icon: Clock },
  { title: "Tarefas Padrão", url: "/tarefas", icon: ListChecks },
  { title: "Checklist Padrão", url: "/checklist", icon: CheckSquare },
  { title: "Gestão de Arquivos", url: "/arquivos", icon: FolderOpen },
];

const integracoesItems = [
  { title: "WhatsApp Pro", url: "/whatsapp", icon: MessageSquare },
  { title: "Integrações", url: "/integracoes", icon: Plug },
  { title: "Financeiro na Mão", url: "/financeiro", icon: Wallet },
];

const outrosItems = [
  // Itens removidos temporariamente: PlayBox e Comece a Indicar
];

export function AppSidebar() {
  const { open } = useSidebar();

  const renderMenuItems = (items: typeof mainMenuItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink
              to={item.url}
              end={item.url === "/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "hover:bg-sidebar-accent/50"
              }
            >
              <item.icon className="h-5 w-5" />
              {open && <span>{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar className={open ? "w-64" : "w-16"} collapsible="icon">
      <SidebarContent className="pt-4">
        <div className="px-4 pb-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg overflow-hidden">
            <img
              src="/logo-pb.png"
              alt="ProBPO Logo"
              className="h-full w-full object-cover"
            />
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-sidebar-foreground">ProBPO</span>
              <span className="text-xs text-sidebar-foreground/70">Sistema de Gestão</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>{renderMenuItems(mainMenuItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Operacional</SidebarGroupLabel>
          <SidebarGroupContent>{renderMenuItems(operacionalItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Integrações</SidebarGroupLabel>
          <SidebarGroupContent>{renderMenuItems(integracoesItems)}</SidebarGroupContent>
        </SidebarGroup>

        {outrosItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Outros</SidebarGroupLabel>
            <SidebarGroupContent>{renderMenuItems(outrosItems)}</SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

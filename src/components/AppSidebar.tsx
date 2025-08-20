import { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  Settings, 
  User, 
  LogOut, 
  Users,
  Plus,
  GraduationCap,
  FileText
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { title: 'Home', url: '/dashboard', icon: Home },
      { title: 'Cursos', url: '/courses', icon: BookOpen },
      { title: 'Fórum', url: '/forum', icon: MessageSquare },
      { title: 'Calendário', url: '/calendar', icon: Calendar },
    ];

    const formadorItems = [
      { title: 'Criar Curso', url: '/create-course', icon: Plus },
      { title: 'Meus Cursos', url: '/my-courses', icon: GraduationCap },
      { title: 'Materiais', url: '/materials', icon: FileText },
    ];

    const adminItems = [
      { title: 'Utilizadores', url: '/users', icon: Users },
    ];

    let items = [...baseItems];
    
    if (user?.role === 'formador') {
      items = [...items, ...formadorItems];
    } else if (user?.role === 'admin') {
      items = [...items, ...formadorItems, ...adminItems];
    }

    return items;
  };

  const navigationItems = getNavigationItems();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Logo */}
        <div className="flex items-center justify-center p-4 border-b">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EduPlatform
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-accent'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        <div className="mt-auto border-t">
          <SidebarGroup>
            <SidebarGroupLabel>Conta</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/profile" 
                      className={({ isActive }) =>
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-accent'
                        }`
                      }
                    >
                      <User className="w-5 h-5" />
                      {!collapsed && <span>Perfil</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/settings" 
                      className={({ isActive }) =>
                        `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-accent'
                        }`
                      }
                    >
                      <Settings className="w-5 h-5" />
                      {!collapsed && <span>Configurações</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start space-x-3 p-3 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="w-5 h-5" />
                      {!collapsed && <span>Sair</span>}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
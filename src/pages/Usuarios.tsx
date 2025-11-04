import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, MoreVertical, Mail, Phone, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@playbpo.com",
    telefone: "(11) 98765-4321",
    role: "Operador",
    empresas: 12,
    ativo: true,
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@playbpo.com",
    telefone: "(11) 98765-4322",
    role: "Operador",
    empresas: 8,
    ativo: true,
  },
  {
    id: 3,
    nome: "Pedro Costa",
    email: "pedro.costa@playbpo.com",
    telefone: "(11) 98765-4323",
    role: "Supervisor",
    empresas: 5,
    ativo: true,
  },
  {
    id: 4,
    nome: "Ana Lima",
    email: "ana.lima@playbpo.com",
    telefone: "(11) 98765-4324",
    role: "Operador",
    empresas: 15,
    ativo: true,
  },
  {
    id: 5,
    nome: "Carlos Mendes",
    email: "carlos.mendes@playbpo.com",
    telefone: "(11) 98765-4325",
    role: "Admin",
    empresas: 0,
    ativo: true,
  },
  {
    id: 6,
    nome: "Juliana Souza",
    email: "juliana.souza@playbpo.com",
    telefone: "(11) 98765-4326",
    role: "Operador",
    empresas: 6,
    ativo: false,
  },
];

export default function Usuarios() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-destructive text-destructive-foreground";
      case "Supervisor":
        return "bg-primary text-primary-foreground";
      case "Operador":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground">Gerencie usuários e operadores</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou função..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsuarios.map((usuario, index) => (
          <Card
            key={usuario.id}
            className="hover-lift animate-scale-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(usuario.nome)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{usuario.nome}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getRoleBadge(usuario.role)}>{usuario.role}</Badge>
                    {!usuario.ativo && (
                      <Badge variant="outline" className="text-muted-foreground">
                        Inativo
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem>Ver Empresas</DropdownMenuItem>
                  <DropdownMenuItem>Permissões</DropdownMenuItem>
                  <DropdownMenuItem>
                    {usuario.ativo ? "Desativar" : "Ativar"}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{usuario.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{usuario.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>{usuario.empresas} empresas associadas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, Building2, User, Calendar, TrendingUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const empresas = [
  {
    id: 1,
    nome: "Tech Solutions LTDA",
    cnpj: "12.345.678/0001-90",
    operador: "João Silva",
    status: "Ativo",
    tarefas: 12,
    ultimaAtualizacao: "2024-01-15",
    produtividade: 95,
  },
  {
    id: 2,
    nome: "Comércio XYZ S.A.",
    cnpj: "98.765.432/0001-10",
    operador: "Maria Santos",
    status: "Ativo",
    tarefas: 8,
    ultimaAtualizacao: "2024-01-14",
    produtividade: 88,
  },
  {
    id: 3,
    nome: "Indústria ABC",
    cnpj: "11.222.333/0001-44",
    operador: "Pedro Costa",
    status: "Pendente",
    tarefas: 5,
    ultimaAtualizacao: "2024-01-10",
    produtividade: 72,
  },
  {
    id: 4,
    nome: "Serviços 123 ME",
    cnpj: "55.666.777/0001-88",
    operador: "Ana Lima",
    status: "Ativo",
    tarefas: 15,
    ultimaAtualizacao: "2024-01-16",
    produtividade: 92,
  },
  {
    id: 5,
    nome: "Logística Express",
    cnpj: "22.333.444/0001-99",
    operador: "João Silva",
    status: "Ativo",
    tarefas: 10,
    ultimaAtualizacao: "2024-01-15",
    produtividade: 85,
  },
  {
    id: 6,
    nome: "Consultoria Premium",
    cnpj: "33.444.555/0001-00",
    operador: "Maria Santos",
    status: "Inativo",
    tarefas: 0,
    ultimaAtualizacao: "2024-01-05",
    produtividade: 0,
  },
];

export default function Empresas() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmpresas = empresas.filter(
    (empresa) =>
      empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.cnpj.includes(searchTerm) ||
      empresa.operador.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-accent text-accent-foreground";
      case "Pendente":
        return "bg-yellow-500 text-white";
      case "Inativo":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getProdutividadeColor = (valor: number) => {
    if (valor >= 90) return "text-accent";
    if (valor >= 70) return "text-primary";
    return "text-destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
          <p className="text-muted-foreground">Gerencie suas empresas clientes</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CNPJ ou operador..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmpresas.map((empresa, index) => (
          <Card
            key={empresa.id}
            className="hover-lift animate-scale-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{empresa.nome}</CardTitle>
                  <p className="text-sm text-muted-foreground">{empresa.cnpj}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem>Ver Tarefas</DropdownMenuItem>
                  <DropdownMenuItem>Ver Documentos</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(empresa.status)}>{empresa.status}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <TrendingUp className={`h-4 w-4 ${getProdutividadeColor(empresa.produtividade)}`} />
                  <span className={getProdutividadeColor(empresa.produtividade)}>
                    {empresa.produtividade}%
                  </span>
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{empresa.operador}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Atualizado em {new Date(empresa.ultimaAtualizacao).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tarefas ativas</span>
                  <span className="font-semibold text-primary">{empresa.tarefas}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

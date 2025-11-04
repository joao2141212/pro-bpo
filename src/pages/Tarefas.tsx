import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, FileText, Calendar, Clock, Building2, CheckSquare, AlertCircle, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tarefasPadrao = [
  {
    id: 1,
    nome: "Processamento de NF-e",
    descricao: "Template completo para processamento de notas fiscais eletrônicas",
    categoria: "Fiscal",
    prioridade: "Alta",
    prazoPadrao: 2, // dias
    passos: 5,
    empresasAssociadas: 8,
    status: "Ativo",
    ultimaAtualizacao: "2024-01-15",
    eficienciaMedia: 94,
  },
  {
    id: 2,
    nome: "Conciliação Bancária",
    descricao: "Template para conciliação mensal de extratos bancários",
    categoria: "Financeiro",
    prioridade: "Média",
    prazoPadrao: 5,
    passos: 8,
    empresasAssociadas: 12,
    status: "Ativo",
    ultimaAtualizacao: "2024-01-14",
    eficienciaMedia: 89,
  },
  {
    id: 3,
    nome: "Emissão de Boletos",
    descricao: "Processo padrão para emissão e controle de boletos",
    categoria: "Cobrança",
    prioridade: "Alta",
    prazoPadrao: 1,
    passos: 4,
    empresasAssociadas: 6,
    status: "Ativo",
    ultimaAtualizacao: "2024-01-13",
    eficienciaMedia: 96,
  },
  {
    id: 4,
    nome: "Relatório de IRRF",
    descricao: "Geração de relatório de imposto de renda retido na fonte",
    categoria: "Fiscal",
    prioridade: "Média",
    prazoPadrao: 3,
    passos: 6,
    empresasAssociadas: 4,
    status: "Inativo",
    ultimaAtualizacao: "2024-01-10",
    eficienciaMedia: 0,
  },
  {
    id: 5,
    nome: "Análise de Crédito",
    descricao: "Avaliação de risco e análise de crédito para novos clientes",
    categoria: "Comercial",
    prioridade: "Alta",
    prazoPadrao: 7,
    passos: 9,
    empresasAssociadas: 3,
    status: "Ativo",
    ultimaAtualizacao: "2024-01-16",
    eficienciaMedia: 87,
  },
  {
    id: 6,
    nome: "Backup de Dados",
    descricao: "Procedimento mensal de backup e verificação de dados",
    categoria: "TI",
    prioridade: "Baixa",
    prazoPadrao: 1,
    passos: 3,
    empresasAssociadas: 15,
    status: "Ativo",
    ultimaAtualizacao: "2024-01-15",
    eficienciaMedia: 98,
  },
];

export default function Tarefas() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTarefas = tarefasPadrao.filter(
    (tarefa) =>
      tarefa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarefa.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarefa.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return "bg-destructive text-destructive-foreground";
      case "Média":
        return "bg-yellow-500 text-white";
      case "Baixa":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-accent text-accent-foreground";
      case "Inativo":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getEficienciaColor = (valor: number) => {
    if (valor >= 95) return "text-accent";
    if (valor >= 85) return "text-primary";
    return "text-destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Tarefas Padrão
          </h1>
          <p className="text-muted-foreground">Gerencie templates de tarefas recorrentes</p>
        </div>
        <Button className="gap-2 animate-scale-in">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, descrição ou categoria..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTarefas.map((tarefa, index) => (
          <Card
            key={tarefa.id}
            className="hover-lift animate-scale-in cursor-pointer group"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{tarefa.nome}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{tarefa.descricao}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                  <DropdownMenuItem>Editar Template</DropdownMenuItem>
                  <DropdownMenuItem>Duplicar</DropdownMenuItem>
                  <DropdownMenuItem>Associar Empresas</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getPrioridadeColor(tarefa.prioridade)}>{tarefa.prioridade}</Badge>
                <Badge className={getStatusColor(tarefa.status)}>{tarefa.status}</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>{tarefa.categoria}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Prazo: {tarefa.prazoPadrao} dias</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckSquare className="h-4 w-4" />
                  <span>{tarefa.passos} passos</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{tarefa.empresasAssociadas} empresas</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Eficiência média</span>
                  <div className="flex items-center gap-1">
                    <Zap className={`h-4 w-4 ${getEficienciaColor(tarefa.eficienciaMedia)}`} />
                    <span className={`font-semibold ${getEficienciaColor(tarefa.eficienciaMedia)}`}>
                      {tarefa.eficienciaMedia}%
                    </span>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-slide-in"
                    style={{ width: `${tarefa.eficienciaMedia}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

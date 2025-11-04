import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, CheckSquare, ListChecks, Building2, Copy, Check, Circle, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const checklistsPadrao = [
  {
    id: 1,
    nome: "Onboarding de Empresa",
    descricao: "Checklist completo para integração de nova empresa cliente",
    categoria: "Onboarding",
    prioridade: "Alta",
    passos: [
      { id: 1, titulo: "Cadastro inicial da empresa", concluido: false },
      { id: 2, titulo: "Configuração de acesso ao sistema", concluido: false },
      { id: 3, titulo: "Coleta de documentos necessários", concluido: false },
      { id: 4, titulo: "Treinamento inicial da equipe", concluido: false },
      { id: 5, titulo: "Primeira sincronização de dados", concluido: false },
      { id: 6, titulo: "Validação de processos", concluido: false },
    ],
    empresasAssociadas: 5,
    status: "Ativo",
    ultimaAtualizacao: "2024-01-15",
    eficienciaMedia: 92,
  },
  {
    id: 2,
    nome: "Processamento Fiscal Mensal",
    descricao: "Checklist para fechamento fiscal mensal",
    categoria: "Fiscal",
    prioridade: "Alta",
    passos: [
      { id: 1, titulo: "Recebimento de NF-e", concluido: false },
      { id: 2, titulo: "Verificação de dados fiscais", concluido: false },
      { id: 3, titulo: "Cálculo de impostos", concluido: false },
      { id: 4, titulo: "Geração de guias", concluido: false },
      { id: 5, titulo: "Envio para contador", concluido: false },
    ],
    empresasAssociadas: 12,
    status: "Ativo",
    ultimaAtualizacao: "2024-01-14",
    eficienciaMedia: 88,
  },
  {
    id: 3,
    nome: "Backup e Segurança",
    descricao: "Procedimentos de backup e verificação de segurança",
    categoria: "TI",
    prioridade: "Média",
    passos: [
      { id: 1, titulo: "Execução de backup automático", concluido: false },
      { id: 2, titulo: "Verificação de integridade dos dados", concluido: false },
      { id: 3, titulo: "Teste de restauração", concluido: false },
      { id: 4, titulo: "Atualização de antivírus", concluido: false },
    ],
    empresasAssociadas: 8,
    status: "Ativo",
    ultimaAtualizacao: "2024-01-13",
    eficienciaMedia: 95,
  },
  {
    id: 4,
    nome: "Reunião de Acompanhamento",
    descricao: "Checklist para reuniões mensais de acompanhamento",
    categoria: "Gestão",
    prioridade: "Média",
    passos: [
      { id: 1, titulo: "Preparação da agenda", concluido: false },
      { id: 2, titulo: "Revisão de indicadores", concluido: false },
      { id: 3, titulo: "Discussão de pendências", concluido: false },
      { id: 4, titulo: "Definição de próximos passos", concluido: false },
      { id: 5, titulo: "Registro da ata", concluido: false },
    ],
    empresasAssociadas: 6,
    status: "Ativo",
    ultimaAtualizacao: "2024-01-12",
    eficienciaMedia: 85,
  },
  {
    id: 5,
    nome: "Auditoria Interna",
    descricao: "Checklist para auditoria interna trimestral",
    categoria: "Compliance",
    prioridade: "Alta",
    passos: [
      { id: 1, titulo: "Planejamento da auditoria", concluido: false },
      { id: 2, titulo: "Coleta de evidências", concluido: false },
      { id: 3, titulo: "Análise de conformidade", concluido: false },
      { id: 4, titulo: "Elaboração de relatório", concluido: false },
      { id: 5, titulo: "Apresentação de achados", concluido: false },
      { id: 6, titulo: "Ação corretiva", concluido: false },
    ],
    empresasAssociadas: 3,
    status: "Inativo",
    ultimaAtualizacao: "2024-01-10",
    eficienciaMedia: 0,
  },
];

export default function Checklist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [checklistStates, setChecklistStates] = useState<{[key: number]: {[key: number]: boolean}}>({});

  const filteredChecklists = checklistsPadrao.filter(
    (checklist) =>
      checklist.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePasso = (checklistId: number, passoId: number) => {
    setChecklistStates(prev => ({
      ...prev,
      [checklistId]: {
        ...prev[checklistId],
        [passoId]: !prev[checklistId]?.[passoId]
      }
    }));
  };

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

  const calculateCompletion = (checklist: any) => {
    const checklistState = checklistStates[checklist.id] || {};
    const completed = checklist.passos.filter((passo: any) =>
      checklistState[passo.id] || passo.concluido
    ).length;
    return Math.round((completed / checklist.passos.length) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Checklist Padrão
          </h1>
          <p className="text-muted-foreground">Configure checklists modelo por processo</p>
        </div>
        <Button className="gap-2 animate-scale-in">
          <Plus className="h-4 w-4" />
          Novo Checklist
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
        {filteredChecklists.map((checklist, index) => {
          const completion = calculateCompletion(checklist);
          const checklistState = checklistStates[checklist.id] || {};

          return (
            <Card
              key={checklist.id}
              className="hover-lift animate-scale-in cursor-pointer group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ListChecks className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{checklist.nome}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{checklist.descricao}</p>
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
                    <DropdownMenuItem>Editar Checklist</DropdownMenuItem>
                    <DropdownMenuItem>Duplicar</DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      Copiar para Empresa
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Remover</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getPrioridadeColor(checklist.prioridade)}>{checklist.prioridade}</Badge>
                  <Badge className={getStatusColor(checklist.status)}>{checklist.status}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckSquare className="h-4 w-4" />
                    <span>{checklist.categoria}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>{checklist.empresasAssociadas} empresas</span>
                  </div>
                </div>

                {/* Preview dos passos */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Passos ({checklist.passos.length})</span>
                    <span className="font-medium">{completion}%</span>
                  </div>
                  <div className="space-y-1">
                    {checklist.passos.slice(0, 3).map((passo: any) => {
                      const isCompleted = checklistState[passo.id] || passo.concluido;
                      return (
                        <div
                          key={passo.id}
                          className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => togglePasso(checklist.id, passo.id)}
                        >
                          {isCompleted ? (
                            <Check className="h-4 w-4 text-accent animate-scale-in" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className={`text-sm ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                            {passo.titulo}
                          </span>
                        </div>
                      );
                    })}
                    {checklist.passos.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{checklist.passos.length - 3} passos
                      </div>
                    )}
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-slide-in transition-all duration-500"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Eficiência média</span>
                    <div className="flex items-center gap-1">
                      <Zap className={`h-4 w-4 ${getEficienciaColor(checklist.eficienciaMedia)}`} />
                      <span className={`font-semibold ${getEficienciaColor(checklist.eficienciaMedia)}`}>
                        {checklist.eficienciaMedia}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

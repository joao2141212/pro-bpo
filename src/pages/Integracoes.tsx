import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Plug,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Key,
  Database,
  Cloud,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";

const integracoes = [
  {
    id: 1,
    nome: "Omie ERP",
    descricao: "Integração completa com o sistema Omie para gestão empresarial",
    logo: "🧠", // Placeholder para logo
    categoria: "ERP",
    status: "ativo",
    ultimaSincronizacao: "2024-01-15 14:30",
    metricas: {
      pedidos: 1247,
      clientes: 89,
      produtos: 456,
    },
    configuracao: {
      apiKey: "omie_api_key_123",
      appKey: "omie_app_key_456",
      endpoint: "https://app.omie.com.br/api/v1/",
    },
  },
  {
    id: 2,
    nome: "Conta Azul",
    descricao: "Sincronização automática de financeiro e contabilidade",
    logo: "💰",
    categoria: "Financeiro",
    status: "ativo",
    ultimaSincronizacao: "2024-01-15 13:45",
    metricas: {
      faturas: 234,
      receitas: 156,
      despesas: 78,
    },
    configuracao: {
      clientId: "conta_azul_client_789",
      clientSecret: "conta_azul_secret_012",
      redirectUri: "https://app.contazul.com/oauth/callback",
    },
  },
  {
    id: 3,
    nome: "Domínio Sistemas",
    descricao: "Integração com sistema de gestão Domínio",
    logo: "🏢",
    categoria: "ERP",
    status: "erro",
    ultimaSincronizacao: "2024-01-14 16:20",
    erro: "Falha na autenticação - token expirado",
    metricas: {
      vendas: 0,
      estoque: 0,
      financeiro: 0,
    },
    configuracao: {
      usuario: "dominio_user",
      senha: "dominio_pass",
      empresa: "12345",
    },
  },
  {
    id: 4,
    nome: "SAP B1",
    descricao: "Integração avançada com SAP Business One",
    logo: "🏭",
    categoria: "ERP",
    status: "inativo",
    ultimaSincronizacao: "Nunca",
    metricas: {
      pedidos: 0,
      clientes: 0,
      produtos: 0,
    },
    configuracao: {
      server: "sap.company.com",
      database: "SBO_PROD",
      username: "",
      password: "",
    },
  },
  {
    id: 5,
    nome: "QuickBooks",
    descricao: "Integração com QuickBooks Online para contabilidade",
    logo: "📊",
    categoria: "Financeiro",
    status: "inativo",
    ultimaSincronizacao: "Nunca",
    metricas: {
      faturas: 0,
      receitas: 0,
      despesas: 0,
    },
    configuracao: {
      companyId: "",
      accessToken: "",
      refreshToken: "",
    },
  },
  {
    id: 6,
    nome: "PagSeguro",
    descricao: "Integração com gateway de pagamentos PagSeguro",
    logo: "💳",
    categoria: "Pagamentos",
    status: "ativo",
    ultimaSincronizacao: "2024-01-15 12:00",
    metricas: {
      transacoes: 189,
      valorTotal: 45678.90,
      sucesso: 96,
    },
    configuracao: {
      email: "financeiro@empresa.com",
      token: "pagseguro_token_345",
      appId: "pagseguro_app_678",
      appKey: "pagseguro_key_901",
    },
  },
];

const estatisticasIntegracao = {
  totalIntegracoes: 6,
  ativas: 3,
  erro: 1,
  inativas: 2,
  sincronizacoesHoje: 47,
  dadosSincronizados: "2.3 GB",
};

export default function Integracoes() {
  const [integracaoSelecionada, setIntegracaoSelecionada] = useState<any>(null);
  const [configOpen, setConfigOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ativo":
        return <CheckCircle className="h-5 w-5 text-accent" />;
      case "erro":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "inativo":
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-accent text-accent-foreground";
      case "erro":
        return "bg-destructive text-destructive-foreground";
      case "inativo":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case "ERP":
        return <Database className="h-4 w-4" />;
      case "Financeiro":
        return <BarChart3 className="h-4 w-4" />;
      case "Pagamentos":
        return <Shield className="h-4 w-4" />;
      default:
        return <Plug className="h-4 w-4" />;
    }
  };

  const handleToggleIntegracao = (id: number) => {
    // Simular toggle
    console.log("Toggle integração:", id);
  };

  const handleSyncIntegracao = (id: number) => {
    // Simular sincronização
    console.log("Sincronizando integração:", id);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Integrações
          </h1>
          <p className="text-muted-foreground">Conecte ERPs e sistemas externos</p>
        </div>
        <Button className="gap-2 animate-scale-in">
          <Plug className="h-4 w-4" />
          Nova Integração
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Integrações</p>
                <p className="text-3xl font-bold">{estatisticasIntegracao.totalIntegracoes}</p>
              </div>
              <Plug className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent w-[100%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ativas</p>
                <p className="text-3xl font-bold text-accent">{estatisticasIntegracao.ativas}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary w-[50%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sincronizações Hoje</p>
                <p className="text-3xl font-bold">{estatisticasIntegracao.sincronizacoesHoje}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-primary animate-spin" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent w-[78%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dados Sincronizados</p>
                <p className="text-3xl font-bold">{estatisticasIntegracao.dadosSincronizados}</p>
              </div>
              <Cloud className="h-8 w-8 text-accent" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary w-[92%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Integrações */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integracoes.map((integracao, index) => (
          <Card
            key={integracao.id}
            className="hover-lift animate-scale-in group cursor-pointer"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl">
                  {integracao.logo}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {integracao.nome}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {integracao.descricao}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(integracao.status)}
                <Switch
                  checked={integracao.status === "ativo"}
                  onCheckedChange={() => handleToggleIntegracao(integracao.id)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(integracao.status)}>
                  {integracao.status}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getCategoriaIcon(integracao.categoria)}
                  <span className="text-sm">{integracao.categoria}</span>
                </div>
              </div>

              {integracao.erro && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium">Erro de Integração</p>
                  <p className="text-xs text-destructive/80">{integracao.erro}</p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Última sync:</span>
                  <span className="font-medium">
                    {integracao.ultimaSincronizacao === "Nunca"
                      ? "Nunca"
                      : new Date(integracao.ultimaSincronizacao).toLocaleString("pt-BR")
                    }
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(integracao.metricas).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      <p className="text-sm font-semibold">
                        {typeof value === 'number' && value > 1000
                          ? `${(value / 1000).toFixed(1)}k`
                          : value
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <Dialog open={configOpen && integracaoSelecionada?.id === integracao.id} onOpenChange={setConfigOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setIntegracaoSelecionada(integracao)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Configurar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <span className="text-2xl">{integracaoSelecionada?.logo}</span>
                        Configuração - {integracaoSelecionada?.nome}
                      </DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="config" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="config">Configuração</TabsTrigger>
                        <TabsTrigger value="logs">Logs</TabsTrigger>
                        <TabsTrigger value="metricas">Métricas</TabsTrigger>
                      </TabsList>
                      <TabsContent value="config" className="space-y-4">
                        <div className="grid gap-4">
                          {integracaoSelecionada && Object.entries(integracaoSelecionada.configuracao).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <Label htmlFor={key} className="text-sm font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              <Input
                                id={key}
                                type={key.includes('senha') || key.includes('secret') || key.includes('token') ? 'password' : 'text'}
                                defaultValue={value as string}
                                placeholder={`Digite ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button className="flex-1">
                            <Key className="h-4 w-4 mr-1" />
                            Salvar Configuração
                          </Button>
                          <Button variant="outline" onClick={() => handleSyncIntegracao(integracaoSelecionada?.id || 0)}>
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Testar Conexão
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="logs" className="space-y-4">
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          <div className="p-3 bg-muted rounded text-sm">
                            [2024-01-15 14:30:15] ✓ Sincronização concluída - 1.247 registros
                          </div>
                          <div className="p-3 bg-muted rounded text-sm">
                            [2024-01-15 13:45:22] ✓ Autenticação realizada com sucesso
                          </div>
                          <div className="p-3 bg-destructive/10 text-destructive rounded text-sm">
                            [2024-01-14 16:20:10] ✗ Falha na autenticação - token expirado
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="metricas" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          {integracaoSelecionada && Object.entries(integracaoSelecionada.metricas).map(([key, value]) => (
                            <Card key={key}>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground capitalize">{key}</span>
                                  <Zap className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-2xl font-bold">{value}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleSyncIntegracao(integracao.id)}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Sincronizar
                </Button>

                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

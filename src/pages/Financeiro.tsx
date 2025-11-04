import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  CreditCard,
  Banknote,
  PiggyBank,
  Receipt,
  Wallet,
  Target,
  Zap
} from "lucide-react";

const dadosFinanceiro = {
  saldo: 45678.90,
  receber: 23456.78,
  pagar: 12345.67,
  fluxoCaixa: [
    { mes: "Jan", receitas: 45000, despesas: 32000 },
    { mes: "Fev", receitas: 52000, despesas: 38000 },
    { mes: "Mar", receitas: 48000, despesas: 35000 },
    { mes: "Abr", receitas: 55000, despesas: 42000 },
    { mes: "Mai", receitas: 49000, despesas: 36000 },
    { mes: "Jun", receitas: 53000, despesas: 39000 },
  ],
  distribuicao: [
    { name: "Receitas", value: 65, color: "hsl(var(--accent))" },
    { name: "Despesas", value: 35, color: "hsl(var(--destructive))" },
  ],
};

const contasReceber = [
  {
    id: 1,
    cliente: "Tech Solutions LTDA",
    valor: 12500.00,
    vencimento: "2024-01-20",
    status: "Em dia",
    diasAtraso: 0,
  },
  {
    id: 2,
    cliente: "Comércio XYZ S.A.",
    valor: 8900.00,
    vencimento: "2024-01-18",
    status: "Vencido",
    diasAtraso: 2,
  },
  {
    id: 3,
    cliente: "Indústria ABC",
    valor: 15600.00,
    vencimento: "2024-01-25",
    status: "Em dia",
    diasAtraso: 0,
  },
  {
    id: 4,
    cliente: "Consultoria Premium",
    valor: 7800.00,
    vencimento: "2024-01-15",
    status: "Vencido",
    diasAtraso: 5,
  },
];

const contasPagar = [
  {
    id: 1,
    fornecedor: "Microsoft Azure",
    valor: 4500.00,
    vencimento: "2024-01-22",
    status: "Em dia",
    categoria: "Cloud",
  },
  {
    id: 2,
    fornecedor: "Escritório Central",
    valor: 3200.00,
    vencimento: "2024-01-19",
    status: "Vencido",
    categoria: "Aluguel",
  },
  {
    id: 3,
    fornecedor: "Contabilidade Silva",
    valor: 2800.00,
    vencimento: "2024-01-28",
    status: "Em dia",
    categoria: "Serviços",
  },
];

const alertas = [
  {
    tipo: "warning",
    titulo: "Contas a receber vencidas",
    descricao: "2 contas com atraso totalizando R$ 16.700,00",
    acao: "Ver detalhes",
  },
  {
    tipo: "info",
    titulo: "Próximos vencimentos",
    descricao: "3 contas vencem nos próximos 7 dias",
    acao: "Ver agenda",
  },
  {
    tipo: "success",
    titulo: "Meta mensal atingida",
    descricao: "Receitas do mês superaram a meta em 12%",
    acao: "Ver relatório",
  },
];

export default function Financeiro() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em dia":
        return "bg-accent text-accent-foreground";
      case "Vencido":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case "success":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calcularTotalVencido = () => {
    return contasReceber
      .filter(conta => conta.status === "Vencido")
      .reduce((total, conta) => total + conta.valor, 0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Financeiro na Mão
          </h1>
          <p className="text-muted-foreground">Gestão financeira simplificada</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Receipt className="h-4 w-4" />
            Relatório
          </Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <DollarSign className="h-4 w-4" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Alertas */}
      <div className="space-y-3">
        {alertas.map((alerta, index) => (
          <Alert
            key={index}
            className={`animate-slide-up border-l-4 ${
              alerta.tipo === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
              alerta.tipo === 'info' ? 'border-l-blue-500 bg-blue-50' :
              'border-l-green-500 bg-green-50'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {getAlertIcon(alerta.tipo)}
            <AlertDescription className="flex items-center justify-between">
              <div>
                <p className="font-medium">{alerta.titulo}</p>
                <p className="text-sm text-muted-foreground">{alerta.descricao}</p>
              </div>
              <Button variant="ghost" size="sm">
                {alerta.acao}
              </Button>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Cards Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift animate-scale-in bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Saldo Atual</p>
                <p className="text-3xl font-bold text-green-800">{formatCurrency(dadosFinanceiro.saldo)}</p>
              </div>
              <PiggyBank className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge className="bg-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.5%
              </Badge>
              <span className="text-xs text-green-700">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-scale-in bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">A Receber</p>
                <p className="text-3xl font-bold text-blue-800">{formatCurrency(dadosFinanceiro.receber)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-4">
              <Progress value={75} className="h-2" />
              <p className="text-xs text-blue-700 mt-1">75% das contas em dia</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-scale-in bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">A Pagar</p>
                <p className="text-3xl font-bold text-red-800">{formatCurrency(dadosFinanceiro.pagar)}</p>
              </div>
              <Banknote className="h-8 w-8 text-red-600" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="destructive">
                <TrendingDown className="h-3 w-3 mr-1" />
                {formatCurrency(calcularTotalVencido())}
              </Badge>
              <span className="text-xs text-red-700">em atraso</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-scale-in bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Fluxo de Caixa</p>
                <p className="text-3xl font-bold text-purple-800">+{formatCurrency(dadosFinanceiro.saldo - dadosFinanceiro.pagar)}</p>
              </div>
              <Wallet className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge className="bg-purple-600">
                <Target className="h-3 w-3 mr-1" />
                Meta OK
              </Badge>
              <span className="text-xs text-purple-700">este mês</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Fluxo de Caixa Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosFinanceiro.fluxoCaixa}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), ""]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="receitas" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="despesas" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribuição Receitas x Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dadosFinanceiro.distribuicao}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {dadosFinanceiro.distribuicao.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {dadosFinanceiro.distribuicao.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <Badge variant="outline">{item.value}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contas a Receber e Pagar */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Contas a Receber
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver Todas
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contasReceber.map((conta, index) => (
                <div
                  key={conta.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{conta.cliente}</p>
                      <Badge className={getStatusColor(conta.status)}>
                        {conta.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(conta.vencimento).toLocaleDateString("pt-BR")}
                      </span>
                      {conta.diasAtraso > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conta.diasAtraso} dias atraso
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{formatCurrency(conta.valor)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-red-600" />
              Contas a Pagar
            </CardTitle>
            <Button variant="outline" size="sm">
              Ver Todas
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contasPagar.map((conta, index) => (
                <div
                  key={conta.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{conta.fornecedor}</p>
                      <Badge variant="outline" className="text-xs">
                        {conta.categoria}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(conta.vencimento).toLocaleDateString("pt-BR")}
                      </span>
                      <Badge className={getStatusColor(conta.status)}>
                        {conta.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">{formatCurrency(conta.valor)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

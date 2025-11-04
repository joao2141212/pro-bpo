import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Activity, Users, Clock, Target } from "lucide-react";

const performanceData = [
  { mes: "Jul", meta: 100, realizado: 95, eficiencia: 92 },
  { mes: "Ago", meta: 100, realizado: 98, eficiencia: 94 },
  { mes: "Set", meta: 100, realizado: 102, eficiencia: 96 },
  { mes: "Out", meta: 100, realizado: 97, eficiencia: 93 },
  { mes: "Nov", meta: 100, realizado: 105, eficiencia: 98 },
  { mes: "Dez", meta: 100, realizado: 108, eficiencia: 99 },
];

const operadoresData = [
  { nome: "João", tarefas: 45, tempo: 168, qualidade: 95 },
  { nome: "Maria", tarefas: 42, tempo: 152, qualidade: 92 },
  { nome: "Pedro", tarefas: 38, tempo: 145, qualidade: 89 },
  { nome: "Ana", tarefas: 48, tempo: 160, qualidade: 96 },
  { nome: "Carlos", tarefas: 35, tempo: 140, qualidade: 88 },
];

const rotividadeData = [
  { mes: "Jan", novos: 12, saidas: 3, total: 135 },
  { mes: "Fev", novos: 8, saidas: 5, total: 138 },
  { mes: "Mar", novos: 15, saidas: 4, total: 149 },
  { mes: "Abr", novos: 10, saidas: 2, total: 157 },
  { mes: "Mai", novos: 7, saidas: 6, total: 158 },
  { mes: "Jun", novos: 6, saidas: 4, total: 160 },
];

const kpis = [
  {
    titulo: "Produtividade Média",
    valor: "96.8%",
    variacao: "+4.2%",
    trending: "up",
    icon: Activity,
  },
  {
    titulo: "Taxa de Retenção",
    valor: "94.5%",
    variacao: "+2.1%",
    trending: "up",
    icon: Users,
  },
  {
    titulo: "Tempo Médio/Tarefa",
    valor: "3.2h",
    variacao: "-0.5h",
    trending: "down",
    icon: Clock,
  },
  {
    titulo: "Atingimento de Metas",
    valor: "102%",
    variacao: "+12%",
    trending: "up",
    icon: Target,
  },
];

export default function Indicadores() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Indicadores</h1>
        <p className="text-muted-foreground">Business Intelligence e métricas de desempenho</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.titulo}</CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.valor}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {kpi.trending === "up" ? (
                    <TrendingUp className="h-3 w-3 text-accent" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-accent" />
                  )}
                  <span className="text-accent">{kpi.variacao}</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance vs Meta</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRealizado" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="meta"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorMeta)"
              />
              <Area
                type="monotone"
                dataKey="realizado"
                stroke="hsl(var(--accent))"
                fillOpacity={1}
                fill="url(#colorRealizado)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Operador</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={operadoresData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tarefas" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                <Bar dataKey="qualidade" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rotatividade de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rotividadeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="novos"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="saidas"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Building2, Users, Clock, CheckCircle2, TrendingUp, TrendingDown, Activity, Target, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const taskData = [
  { name: "Jan", tarefas: 45, concluidas: 38 },
  { name: "Fev", tarefas: 52, concluidas: 48 },
  { name: "Mar", tarefas: 61, concluidas: 55 },
  { name: "Abr", tarefas: 58, concluidas: 52 },
  { name: "Mai", tarefas: 67, concluidas: 61 },
  { name: "Jun", tarefas: 71, concluidas: 68 },
];

const produtividadeData = [
  { name: "João Silva", horas: 168, eficiencia: 92 },
  { name: "Maria Santos", horas: 152, eficiencia: 88 },
  { name: "Pedro Costa", horas: 145, eficiencia: 85 },
  { name: "Ana Lima", horas: 160, eficiencia: 90 },
];

const statusData = [
  { name: "Em Dia", value: 68, color: "hsl(var(--accent))" },
  { name: "Atrasadas", value: 12, color: "hsl(var(--destructive))" },
  { name: "Pendentes", value: 20, color: "hsl(var(--muted-foreground))" },
];

const recentActivities = [
  { id: 1, empresa: "Tech Solutions", acao: "Tarefa concluída", tempo: "5 min atrás", tipo: "success" },
  { id: 2, empresa: "Financial Corp", acao: "Documento anexado", tempo: "12 min atrás", tipo: "info" },
  { id: 3, empresa: "Digital Systems", acao: "Prazo próximo", tempo: "25 min atrás", tipo: "warning" },
  { id: 4, empresa: "Business Group", acao: "Nova tarefa criada", tempo: "1 hora atrás", tipo: "info" },
];

export default function Dashboard() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>("all");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">Visão geral da operação em tempo real</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedMetric === "all" ? "default" : "outline"}
            onClick={() => setSelectedMetric("all")}
            className="animate-scale-in"
          >
            Todas
          </Button>
          <Button 
            variant={selectedMetric === "month" ? "default" : "outline"}
            onClick={() => setSelectedMetric("month")}
            className="animate-scale-in"
          >
            Este Mês
          </Button>
          <Button 
            variant={selectedMetric === "week" ? "default" : "outline"}
            onClick={() => setSelectedMetric("week")}
            className="animate-scale-in"
          >
            Esta Semana
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="hover-lift hover-glow cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredCard("empresas")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => window.location.href = "/empresas"}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
            <Building2 className={`h-5 w-5 text-primary transition-transform duration-300 ${hoveredCard === "empresas" ? "scale-125" : ""}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              142
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </Badge>
              <p className="text-xs text-muted-foreground">desde o mês passado</p>
            </div>
            <div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary/80 w-[87%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover-lift hover-glow cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredCard("operadores")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => window.location.href = "/usuarios"}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operadores Ativos</CardTitle>
            <Users className={`h-5 w-5 text-primary transition-transform duration-300 ${hoveredCard === "operadores" ? "scale-125 rotate-12" : ""}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              28
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2
              </Badge>
              <p className="text-xs text-muted-foreground">novos este mês</p>
            </div>
            <div className="mt-3 flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-8 flex-1 bg-primary/20 rounded animate-scale-in"
                  style={{ 
                    animationDelay: `${i * 50}ms`,
                    height: `${Math.random() * 24 + 8}px` 
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover-lift hover-glow cursor-pointer transition-all duration-300"
          onMouseEnter={() => setHoveredCard("horas")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => window.location.href = "/timesheet"}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Trabalhadas</CardTitle>
            <Clock className={`h-5 w-5 text-primary transition-transform duration-300 ${hoveredCard === "horas" ? "scale-125 -rotate-12" : ""}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              4.892h
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Badge variant="destructive" className="bg-destructive/10 text-destructive border border-destructive/20">
                <TrendingDown className="h-3 w-3 mr-1" />
                -3%
              </Badge>
              <p className="text-xs text-muted-foreground">vs mês anterior</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Live tracking ativo</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover-lift hover-glow cursor-pointer transition-all duration-300 pulse-glow"
          onMouseEnter={() => setHoveredCard("conclusao")}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => window.location.href = "/indicadores"}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <CheckCircle2 className={`h-5 w-5 text-primary transition-transform duration-300 ${hoveredCard === "conclusao" ? "scale-125 rotate-360" : ""}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              95.7%
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                <Target className="h-3 w-3 mr-1" />
                +2.3%
              </Badge>
              <p className="text-xs text-muted-foreground">vs mês anterior</p>
            </div>
            <div className="mt-3 relative h-2 bg-secondary rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 w-[96%] rounded-full animate-slide-in" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Tarefas por Mês
            </CardTitle>
            <Button variant="outline" size="sm" className="hover-scale">
              Exportar
            </Button>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                />
                <Bar 
                  dataKey="tarefas" 
                  fill="hsl(var(--primary))" 
                  radius={[8, 8, 0, 0]}
                  animationBegin={0}
                  animationDuration={800}
                />
                <Bar 
                  dataKey="concluidas" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.7}
                  radius={[8, 8, 0, 0]}
                  animationBegin={100}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Status das Tarefas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={statusData}
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
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.name === "Em Dia" ? "hsl(var(--primary))" :
                      entry.name === "Atrasadas" ? "hsl(var(--destructive))" :
                      "hsl(var(--muted-foreground))"
                    } />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {statusData.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer hover-scale"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ 
                        backgroundColor: item.name === "Em Dia" ? "hsl(var(--primary))" :
                                        item.name === "Atrasadas" ? "hsl(var(--destructive))" :
                                        "hsl(var(--muted-foreground))"
                      }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <Badge variant="outline">{item.value}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Produtividade por Operador
            </CardTitle>
            <Button variant="outline" size="sm" className="hover-scale">
              Ver Todos
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={produtividadeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="horas" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  activeDot={{ r: 8 }}
                  animationDuration={1000}
                />
                <Line 
                  type="monotone" 
                  dataKey="eficiencia" 
                  stroke="hsl(var(--primary))" 
                  strokeOpacity={0.7}
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", fillOpacity: 0.7, r: 5 }}
                  activeDot={{ r: 8 }}
                  animationDuration={1000}
                  animationBegin={200}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Atividades Recentes
            </CardTitle>
            <Button variant="ghost" size="sm" className="hover-scale">
              Limpar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer hover-lift animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.tipo === "success" ? "bg-primary animate-pulse" :
                    activity.tipo === "warning" ? "bg-destructive animate-pulse" :
                    "bg-primary animate-pulse"
                  }`} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.empresa}</p>
                      <span className="text-xs text-muted-foreground">{activity.tempo}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.acao}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 hover-scale">
              Ver Todas Atividades
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, Clock, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const registros = [
  {
    id: 1,
    tarefa: "Conciliação Bancária - Tech Solutions",
    inicio: "09:00",
    fim: "11:30",
    duracao: "2h 30m",
    status: "Concluído",
    data: "2024-01-15",
  },
  {
    id: 2,
    tarefa: "Lançamentos Contábeis - Comércio XYZ",
    inicio: "13:00",
    fim: "15:45",
    duracao: "2h 45m",
    status: "Concluído",
    data: "2024-01-15",
  },
  {
    id: 3,
    tarefa: "Fechamento Mensal - Indústria ABC",
    inicio: "16:00",
    fim: null,
    duracao: "1h 15m",
    status: "Em Andamento",
    data: "2024-01-15",
  },
];

const estatisticas = [
  { label: "Hoje", valor: "6h 30m", progresso: 81 },
  { label: "Semana", valor: "32h 15m", progresso: 80 },
  { label: "Mês", valor: "142h 30m", progresso: 89 },
];

export default function Timesheet() {
  const [isRunning, setIsRunning] = useState(true);
  const [currentTime, setCurrentTime] = useState("01:15:23");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ajuste de Tempo</h1>
        <p className="text-muted-foreground">Controle e registro de horas trabalhadas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {estatisticas.map((stat, index) => (
          <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold">{stat.valor}</div>
              <Progress value={stat.progresso} className="h-2" />
              <p className="text-xs text-muted-foreground">{stat.progresso}% da meta</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Timer Atual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-4 font-mono">{currentTime}</div>
            <p className="text-muted-foreground">Fechamento Mensal - Indústria ABC</p>
          </div>

          <div className="flex justify-center gap-3">
            {!isRunning ? (
              <Button
                size="lg"
                className="gap-2"
                onClick={() => setIsRunning(true)}
              >
                <Play className="h-5 w-5" />
                Iniciar
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => setIsRunning(false)}
                >
                  <Pause className="h-5 w-5" />
                  Pausar
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="gap-2"
                  onClick={() => {
                    setIsRunning(false);
                    setCurrentTime("00:00:00");
                  }}
                >
                  <Square className="h-5 w-5" />
                  Finalizar
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Registros Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {registros.map((registro, index) => (
              <div
                key={registro.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-1">
                  <p className="font-medium">{registro.tarefa}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {registro.inicio} {registro.fim && `- ${registro.fim}`}
                    </span>
                    <span>{new Date(registro.data).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-semibold">{registro.duracao}</div>
                    <Badge
                      className={
                        registro.status === "Concluído"
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary text-primary-foreground"
                      }
                    >
                      {registro.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

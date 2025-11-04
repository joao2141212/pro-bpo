import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2, User } from "lucide-react";

const vinculosData = [
  {
    operador: "João Silva",
    empresas: ["Tech Solutions LTDA", "Logística Express", "Serviços 123 ME"],
    totalTarefas: 37,
  },
  {
    operador: "Maria Santos",
    empresas: ["Comércio XYZ S.A.", "Consultoria Premium"],
    totalTarefas: 16,
  },
  {
    operador: "Pedro Costa",
    empresas: ["Indústria ABC", "Tech Solutions LTDA"],
    totalTarefas: 17,
  },
  {
    operador: "Ana Lima",
    empresas: ["Serviços 123 ME", "Logística Express", "Indústria ABC"],
    totalTarefas: 30,
  },
];

export default function EmpresaOperador() {
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Empresa por Operador</h1>
        <p className="text-muted-foreground">Visualize o relacionamento entre operadores e empresas</p>
      </div>

      <div className="grid gap-4">
        {vinculosData.map((vinculo, index) => (
          <Card key={index} className="hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {getInitials(vinculo.operador)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    {vinculo.operador}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {vinculo.empresas.length} empresas • {vinculo.totalTarefas} tarefas ativas
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {vinculo.empresas.map((empresa, idx) => (
                  <Badge key={idx} variant="outline" className="px-3 py-1.5 gap-2">
                    <Building2 className="h-3 w-3" />
                    {empresa}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

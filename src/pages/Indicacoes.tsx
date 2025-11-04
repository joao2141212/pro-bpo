import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Share2,
  Gift,
  Trophy,
  Users,
  DollarSign,
  Star,
  CheckCircle,
  Clock,
  Target,
  Zap,
  TrendingUp,
  Award
} from "lucide-react";

const indicacoes = [
  {
    id: 1,
    nome: "João Silva",
    empresa: "Tech Solutions LTDA",
    email: "joao.silva@techsolutions.com",
    status: "Ativo",
    dataIndicacao: "2024-01-10",
    bonus: 500.00,
    nivel: "Bronze",
  },
  {
    id: 2,
    nome: "Maria Santos",
    empresa: "Comércio XYZ S.A.",
    email: "maria.santos@comercioxyz.com",
    status: "Convertido",
    dataIndicacao: "2024-01-08",
    bonus: 1500.00,
    nivel: "Ouro",
  },
  {
    id: 3,
    nome: "Pedro Costa",
    empresa: "Indústria ABC",
    email: "pedro.costa@industriaabc.com",
    status: "Pendente",
    dataIndicacao: "2024-01-12",
    bonus: 0,
    nivel: "Iniciante",
  },
  {
    id: 4,
    nome: "Ana Lima",
    empresa: "Consultoria Premium",
    email: "ana.lima@consultoriapremium.com",
    status: "Ativo",
    dataIndicacao: "2024-01-05",
    bonus: 750.00,
    nivel: "Prata",
  },
];

const estatisticasIndicacao = {
  totalIndicacoes: 24,
  indicacoesAtivas: 18,
  indicacoesConvertidas: 6,
  bonusTotal: 8750.00,
  bonusDisponivel: 3250.00,
  nivelAtual: "Ouro",
  proximasIndicacoesParaProximoNivel: 4,
};

const beneficios = [
  {
    nivel: "Bronze",
    indicacoesNecessarias: 1,
    bonusPorIndicacao: 500,
    beneficios: ["Badge Bronze", "Certificado de Indicador", "Acesso ao grupo VIP"],
    cor: "bg-amber-500",
  },
  {
    nivel: "Prata",
    indicacoesNecessarias: 5,
    bonusPorIndicacao: 750,
    beneficios: ["Todos os benefícios Bronze", "15% desconto em serviços", "Suporte prioritário"],
    cor: "bg-gray-400",
  },
  {
    nivel: "Ouro",
    indicacoesNecessarias: 10,
    bonusPorIndicacao: 1500,
    beneficios: ["Todos os benefícios Prata", "25% desconto em serviços", "Consultoria gratuita", "Acesso antecipado a novas features"],
    cor: "bg-yellow-500",
  },
  {
    nivel: "Diamante",
    indicacoesNecessarias: 25,
    bonusPorIndicacao: 2500,
    beneficios: ["Todos os benefícios Ouro", "35% desconto vitalício", "Parceria estratégica", "Nome no hall da fama"],
    cor: "bg-blue-500",
  },
];

export default function Indicacoes() {
  const [novaIndicacaoOpen, setNovaIndicacaoOpen] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Convertido":
        return "bg-accent text-accent-foreground";
      case "Ativo":
        return "bg-blue-500 text-white";
      case "Pendente":
        return "bg-yellow-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Bronze":
        return "bg-amber-500 text-white";
      case "Prata":
        return "bg-gray-400 text-white";
      case "Ouro":
        return "bg-yellow-500 text-white";
      case "Diamante":
        return "bg-blue-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleSubmitIndicacao = () => {
    // Simular envio
    setCelebration(true);
    setTimeout(() => setCelebration(false), 3000);
    setNovaIndicacaoOpen(false);
    setFormData({ nome: "", empresa: "", email: "", telefone: "", mensagem: "" });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent">
            Comece a Indicar
          </h1>
          <p className="text-muted-foreground">Programa de indicações e recompensas</p>
        </div>
        <Dialog open={novaIndicacaoOpen} onOpenChange={setNovaIndicacaoOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-yellow-600 to-orange-500 hover:from-yellow-700 hover:to-orange-600">
              <Share2 className="h-4 w-4" />
              Nova Indicação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-yellow-600" />
                Indicar um Contato
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Digite o nome da pessoa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa</Label>
                <Input
                  id="empresa"
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@empresa.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone (opcional)</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mensagem">Mensagem Personalizada (opcional)</Label>
                <Textarea
                  id="mensagem"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  placeholder="Conte por que você indica o PlayBPO..."
                  rows={3}
                />
              </div>
              <Button
                onClick={handleSubmitIndicacao}
                className="w-full gap-2 bg-gradient-to-r from-yellow-600 to-orange-500 hover:from-yellow-700 hover:to-orange-600"
                disabled={!formData.nome || !formData.empresa || !formData.email}
              >
                <Send className="h-4 w-4" />
                Enviar Indicação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Animação de Celebração */}
      {celebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 animate-fade-in">
          <div className="bg-white rounded-lg p-8 text-center animate-bounce">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-600 mb-2">🎉 Indicação Enviada!</h2>
            <p className="text-muted-foreground">Obrigado por compartilhar o PlayBPO!</p>
            <div className="mt-4 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Indicações</p>
                <p className="text-3xl font-bold">{estatisticasIndicacao.totalIndicacoes}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
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
                <p className="text-sm font-medium text-muted-foreground">Convertidas</p>
                <p className="text-3xl font-bold text-accent">{estatisticasIndicacao.indicacoesConvertidas}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary w-[25%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bônus Total</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(estatisticasIndicacao.bonusTotal)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[87%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Disponível</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(estatisticasIndicacao.bonusDisponivel)}</p>
              </div>
              <Gift className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-[37%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Seu Nível</p>
                <p className="text-3xl font-bold text-yellow-600">{estatisticasIndicacao.nivelAtual}</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 w-[40%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progresso para Próximo Nível */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-yellow-800">Progresso para Diamante</h3>
              <p className="text-sm text-yellow-700">
                Mais {estatisticasIndicacao.proximasIndicacoesParaProximoNivel} indicações para alcançar o próximo nível
              </p>
            </div>
            <Target className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-yellow-700">Progresso</span>
              <span className="font-medium">{estatisticasIndicacao.totalIndicacoes}/25</span>
            </div>
            <div className="h-3 bg-yellow-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 w-[96%] animate-slide-in" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Níveis e Benefícios */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {beneficios.map((beneficio, index) => (
          <Card
            key={beneficio.nivel}
            className={`hover-lift animate-scale-in ${
              estatisticasIndicacao.nivelAtual === beneficio.nivel
                ? 'ring-2 ring-yellow-500 bg-yellow-50'
                : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="text-center">
              <div className={`h-16 w-16 rounded-full ${beneficio.cor} flex items-center justify-center mx-auto mb-2`}>
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-lg">{beneficio.nivel}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {beneficio.indicacoesNecessarias} indicações
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(beneficio.bonusPorIndicacao)}
                </p>
                <p className="text-sm text-muted-foreground">por indicação</p>
              </div>
              <ul className="space-y-1 text-sm">
                {beneficio.beneficios.map((benef, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span>{benef}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lista de Indicações */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Suas Indicações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {indicacoes.map((indicacao, index) => (
              <div
                key={indicacao.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-yellow-700">
                      {indicacao.nome.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{indicacao.nome}</h4>
                      <Badge className={getStatusColor(indicacao.status)}>
                        {indicacao.status}
                      </Badge>
                      <Badge className={getNivelColor(indicacao.nivel)}>
                        {indicacao.nivel}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{indicacao.empresa}</p>
                    <p className="text-xs text-muted-foreground">
                      Indicado em {new Date(indicacao.dataIndicacao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{formatCurrency(indicacao.bonus)}</p>
                  <p className="text-xs text-muted-foreground">bônus ganho</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white border-0">
        <CardContent className="p-8">
          <div className="text-center">
            <Share2 className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Quanto mais você indica, mais ganha!</h3>
            <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Cada indicação que se converte em cliente gera bônus para você. Além disso, você sobe de nível
              e desbloqueia benefícios exclusivos. Comece agora e construa sua rede de indicações!
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-white text-yellow-600 hover:bg-gray-50"
              onClick={() => setNovaIndicacaoOpen(true)}
            >
              <Zap className="h-5 w-5" />
              Fazer Minha Primeira Indicação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

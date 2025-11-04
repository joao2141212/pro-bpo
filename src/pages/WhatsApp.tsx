import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Phone, Video, MoreVertical, Search, MessageSquare, Bell, Settings, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const conversas = [
  {
    id: 1,
    contato: "Tech Solutions LTDA",
    ultimaMensagem: "Obrigado pelo suporte!",
    hora: "14:30",
    naoLidas: 2,
    avatar: "TS",
    status: "online",
    tipo: "empresa",
  },
  {
    id: 2,
    contato: "João Silva",
    ultimaMensagem: "Quando será o próximo contato?",
    hora: "13:45",
    naoLidas: 0,
    avatar: "JS",
    status: "offline",
    tipo: "operador",
  },
  {
    id: 3,
    contato: "Comércio XYZ",
    ultimaMensagem: "Documentos enviados com sucesso",
    hora: "12:20",
    naoLidas: 1,
    avatar: "CX",
    status: "online",
    tipo: "empresa",
  },
  {
    id: 4,
    contato: "Maria Santos",
    ultimaMensagem: "Reunião confirmada para amanhã",
    hora: "11:15",
    naoLidas: 0,
    avatar: "MS",
    status: "away",
    tipo: "operador",
  },
];

const mensagens = [
  {
    id: 1,
    texto: "Olá! Como posso ajudar hoje?",
    hora: "14:25",
    enviada: true,
    tipo: "texto",
  },
  {
    id: 2,
    texto: "Preciso de ajuda com a conciliação bancária do mês passado.",
    hora: "14:26",
    enviada: false,
    tipo: "texto",
  },
  {
    id: 3,
    texto: "Claro! Vou verificar os lançamentos. Você tem o extrato disponível?",
    hora: "14:27",
    enviada: true,
    tipo: "texto",
  },
  {
    id: 4,
    texto: "Sim, acabei de enviar por email.",
    hora: "14:28",
    enviada: false,
    tipo: "texto",
  },
  {
    id: 5,
    texto: "Perfeito! Vou analisar e retorno em breve.",
    hora: "14:29",
    enviada: true,
    tipo: "texto",
  },
  {
    id: 6,
    texto: "Obrigado pelo suporte!",
    hora: "14:30",
    enviada: false,
    tipo: "texto",
  },
];

const estatisticasWhatsApp = {
  totalConversas: 145,
  mensagensHoje: 234,
  tempoRespostaMedio: "2.3 min",
  satisfacao: 94,
};

export default function WhatsApp() {
  const [conversaAtiva, setConversaAtiva] = useState(1);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const conversaAtual = conversas.find(c => c.id === conversaAtiva);
  const mensagensAtuais = mensagens; // Simulando mensagens da conversa ativa

  const filteredConversas = conversas.filter(
    (conversa) =>
      conversa.contato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversa.ultimaMensagem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enviarMensagem = () => {
    if (novaMensagem.trim()) {
      // Simular envio
      console.log("Mensagem enviada:", novaMensagem);
      setNovaMensagem("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-accent";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-muted";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            WhatsApp Pro
          </h1>
          <p className="text-muted-foreground">Integração com WhatsApp Business API</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <MessageSquare className="h-4 w-4" />
            Nova Conversa
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversas Ativas</p>
                <p className="text-3xl font-bold">{estatisticasWhatsApp.totalConversas}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[85%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mensagens Hoje</p>
                <p className="text-3xl font-bold">{estatisticasWhatsApp.mensagensHoje}</p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[72%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tempo Resposta</p>
                <p className="text-3xl font-bold">{estatisticasWhatsApp.tempoRespostaMedio}</p>
              </div>
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[94%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfação</p>
                <p className="text-3xl font-bold">{estatisticasWhatsApp.satisfacao}%</p>
              </div>
              <Bell className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[94%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interface do Chat */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lista de Conversas */}
        <Card className="lg:col-span-1 hover-lift">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-1">
                {filteredConversas.map((conversa) => (
                  <div
                    key={conversa.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-4 ${
                      conversaAtiva === conversa.id
                        ? 'bg-muted/30 border-l-green-500'
                        : 'border-l-transparent'
                    }`}
                    onClick={() => setConversaAtiva(conversa.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/avatars/${conversa.avatar}.png`} />
                          <AvatarFallback className="bg-green-100 text-green-700">
                            {conversa.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${getStatusColor(conversa.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">{conversa.contato}</h4>
                          <span className="text-xs text-muted-foreground">{conversa.hora}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversa.ultimaMensagem}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs">
                            {conversa.tipo}
                          </Badge>
                          {conversa.naoLidas > 0 && (
                            <Badge className="bg-green-600 text-white text-xs animate-pulse">
                              {conversa.naoLidas}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Área de Chat */}
        <Card className="lg:col-span-2 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/avatars/${conversaAtual?.avatar}.png`} />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {conversaAtual?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(conversaAtual?.status || 'offline')}`} />
              </div>
              <div>
                <h3 className="font-semibold">{conversaAtual?.contato}</h3>
                <p className="text-sm text-muted-foreground capitalize">{conversaAtual?.status}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Arquivar Conversa</DropdownMenuItem>
                  <DropdownMenuItem>Silenciar</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Bloquear</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mensagens */}
            <ScrollArea className="h-[400px] p-4">
              <div className="space-y-4">
                {mensagensAtuais.map((mensagem) => (
                  <div
                    key={mensagem.id}
                    className={`flex ${mensagem.enviada ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        mensagem.enviada
                          ? 'bg-green-600 text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{mensagem.texto}</p>
                      <p className={`text-xs mt-1 ${
                        mensagem.enviada ? 'text-green-100' : 'text-muted-foreground'
                      }`}>
                        {mensagem.hora}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input de Mensagem */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                  className="flex-1"
                />
                <Button
                  onClick={enviarMensagem}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!novaMensagem.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                💡 Pressione Enter para enviar • Simulação de WhatsApp Business API
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Área de Demonstração */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-800">Integração WhatsApp Business API</h3>
              <p className="text-sm text-green-700">
                Esta é uma demonstração da interface. A integração completa com WhatsApp Business API
                será implementada nas próximas fases, incluindo webhooks, automação e relatórios avançados.
              </p>
            </div>
            <Badge className="bg-green-600">Em Desenvolvimento</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Search,
  Play,
  BookOpen,
  HelpCircle,
  Video,
  FileText,
  Users,
  Star,
  Trophy,
  Lightbulb,
  MessageCircle,
  ExternalLink,
  Download,
  Zap
} from "lucide-react";

const videos = [
  {
    id: 1,
    titulo: "Primeiros Passos no PlayBPO",
    descricao: "Aprenda a navegar pelo sistema e configurar seu primeiro cliente",
    duracao: "5:32",
    categoria: "Onboarding",
    visualizacoes: 1250,
    thumbnail: "🎬",
    nivel: "Básico",
  },
  {
    id: 2,
    titulo: "Gerenciando Empresas e Operadores",
    descricao: "Como cadastrar empresas e vincular operadores de forma eficiente",
    duracao: "8:45",
    categoria: "Gestão",
    visualizacoes: 890,
    thumbnail: "🏢",
    nivel: "Intermediário",
  },
  {
    id: 3,
    titulo: "Criando Templates de Tarefas",
    descricao: "Como criar e gerenciar templates de tarefas recorrentes",
    duracao: "6:18",
    categoria: "Tarefas",
    visualizacoes: 654,
    thumbnail: "📋",
    nivel: "Intermediário",
  },
  {
    id: 4,
    titulo: "Relatórios e Indicadores",
    descricao: "Entenda como interpretar os dashboards e gerar relatórios",
    duracao: "7:22",
    categoria: "Análises",
    visualizacoes: 432,
    thumbnail: "📊",
    nivel: "Avançado",
  },
];

const guias = [
  {
    id: 1,
    titulo: "Guia Completo: Cadastro de Empresa",
    descricao: "Passo a passo detalhado para cadastrar uma nova empresa cliente",
    categoria: "Cadastro",
    tempoLeitura: "5 min",
    dificuldade: "Fácil",
    icon: "🏢",
  },
  {
    id: 2,
    titulo: "Checklist de Onboarding",
    descricao: "Lista completa de verificações para integração de novos clientes",
    categoria: "Processos",
    tempoLeitura: "8 min",
    dificuldade: "Médio",
    icon: "✅",
  },
  {
    id: 3,
    titulo: "Gestão de Timesheet",
    descricao: "Como registrar e controlar horas trabalhadas em tarefas",
    categoria: "Controle",
    tempoLeitura: "6 min",
    dificuldade: "Fácil",
    icon: "⏰",
  },
  {
    id: 4,
    titulo: "Integrações com ERPs",
    descricao: "Como conectar o sistema com Omie, Conta Azul e outros ERPs",
    categoria: "Integração",
    tempoLeitura: "12 min",
    dificuldade: "Avançado",
    icon: "🔗",
  },
];

const faqs = [
  {
    pergunta: "Como cadastrar uma nova empresa?",
    resposta: "Acesse o menu Empresas e clique em 'Nova Empresa'. Preencha os dados básicos da empresa (CNPJ, razão social, etc.) e vincule um operador responsável.",
    categoria: "Cadastro",
  },
  {
    pergunta: "Como criar um template de tarefa?",
    resposta: "No menu Tarefas, clique em 'Nova Tarefa'. Defina nome, descrição, categoria, prioridade e prazo padrão. Você pode associar a tarefa a empresas específicas.",
    categoria: "Tarefas",
  },
  {
    pergunta: "Como funciona o controle de tempo?",
    resposta: "Use o Timesheet para registrar horas trabalhadas. Você pode iniciar/pausar o timer manualmente ou configurar regras automáticas por tarefa.",
    categoria: "Controle",
  },
  {
    pergunta: "Como gerar relatórios?",
    resposta: "Acesse Indicadores para ver dashboards em tempo real. Para relatórios customizados, use os filtros disponíveis e exporte em PDF ou Excel.",
    categoria: "Relatórios",
  },
];

const dicas = [
  {
    titulo: "Dica do Dia",
    conteudo: "Use templates de tarefas para padronizar processos e ganhar eficiência. Crie um template para cada tipo de serviço recorrente.",
    tipo: "dica",
  },
  {
    titulo: "Atualização Importante",
    conteudo: "Nova integração com WhatsApp Business API disponível! Configure em Integrações > WhatsApp.",
    tipo: "novidade",
  },
  {
    titulo: "Melhor Prática",
    conteudo: "Revise diariamente as tarefas pendentes e priorize aquelas com prazo próximo para manter a produtividade alta.",
    tipo: "pratica",
  },
];

export default function PlayBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const filteredVideos = videos.filter(
    (video) =>
      (selectedCategory === "todos" || video.categoria.toLowerCase() === selectedCategory) &&
      (video.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
       video.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredGuias = guias.filter(
    (guia) =>
      (selectedCategory === "todos" || guia.categoria.toLowerCase() === selectedCategory) &&
      (guia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
       guia.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "Básico":
        return "bg-green-500 text-white";
      case "Intermediário":
        return "bg-yellow-500 text-white";
      case "Avançado":
        return "bg-red-500 text-white";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case "Fácil":
        return "bg-green-100 text-green-800";
      case "Médio":
        return "bg-yellow-100 text-yellow-800";
      case "Avançado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getDicaIcon = (tipo: string) => {
    switch (tipo) {
      case "dica":
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case "novidade":
        return <Zap className="h-5 w-5 text-blue-500" />;
      case "pratica":
        return <Trophy className="h-5 w-5 text-purple-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            PlayBox
          </h1>
          <p className="text-muted-foreground">Central de ajuda e documentação</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Suporte
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
            <Star className="h-4 w-4" />
            Favoritos
          </Button>
        </div>
      </div>

      {/* Dicas e Novidades */}
      <div className="grid gap-4 md:grid-cols-3">
        {dicas.map((dica, index) => (
          <Card
            key={index}
            className="hover-lift animate-scale-in bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {getDicaIcon(dica.tipo)}
                <div className="flex-1">
                  <h4 className="font-semibold text-purple-800">{dica.titulo}</h4>
                  <p className="text-sm text-purple-700 mt-1">{dica.conteudo}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar tutoriais, guias e FAQs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "todos" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("todos")}
          >
            Todos
          </Button>
          <Button
            variant={selectedCategory === "onboarding" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("onboarding")}
          >
            Onboarding
          </Button>
          <Button
            variant={selectedCategory === "gestão" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("gestão")}
          >
            Gestão
          </Button>
          <Button
            variant={selectedCategory === "tarefas" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("tarefas")}
          >
            Tarefas
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Vídeos
          </TabsTrigger>
          <TabsTrigger value="guias" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Guias
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="comunidade" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Comunidade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video, index) => (
              <Card
                key={video.id}
                className="hover-lift animate-scale-in cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="pb-2">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center text-4xl mb-3">
                    {video.thumbnail}
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors line-clamp-2">
                        {video.titulo}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {video.descricao}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getNivelColor(video.nivel)}>
                      {video.nivel}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{video.duracao}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{video.categoria}</span>
                    <span>{video.visualizacoes} visualizações</span>
                  </div>
                  <Button className="w-full mt-3 gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                    <Play className="h-4 w-4" />
                    Assistir Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guias" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGuias.map((guia, index) => (
              <Card
                key={guia.id}
                className="hover-lift animate-scale-in cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="flex flex-row items-start gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-2xl">
                    {guia.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                      {guia.titulo}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {guia.descricao}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getDificuldadeColor(guia.dificuldade)}>
                      {guia.dificuldade}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{guia.tempoLeitura} de leitura</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{guia.categoria}</span>
                  </div>
                  <Button variant="outline" className="w-full gap-2 hover:bg-purple-50 hover:border-purple-300">
                    <FileText className="h-4 w-4" />
                    Ler Guia Completo
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{faq.pergunta}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {faq.categoria}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8">
                  <p className="text-muted-foreground">{faq.resposta}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="comunidade" className="space-y-4">
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comunidade PlayBPO</h3>
            <p className="text-muted-foreground mb-6">
              Em breve! Conecte-se com outros usuários, compartilhe experiências e aprenda juntos.
            </p>
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
              <ExternalLink className="h-4 w-4" />
              Ser Notificado
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Área de Destaque */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Precisa de Ajuda Personalizada?</h3>
              <p className="text-purple-100 mb-4">
                Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida ou dificuldade.
              </p>
              <div className="flex gap-4">
                <Button variant="secondary" className="gap-2 bg-white text-purple-600 hover:bg-gray-50">
                  <MessageCircle className="h-4 w-4" />
                  Chat com Suporte
                </Button>
                <Button variant="outline" className="gap-2 border-white text-white hover:bg-white/10">
                  <Download className="h-4 w-4" />
                  Baixar Manual
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
                <HelpCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

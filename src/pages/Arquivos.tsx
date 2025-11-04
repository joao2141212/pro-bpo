import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Upload, Download, MoreVertical, FileText, Image, File, Building2, FileCheck, HardDrive, Zap, Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const arquivos = [
  {
    id: 1,
    nome: "contrato_social.pdf",
    tipo: "pdf",
    tamanho: 2048000, // 2MB
    empresa: "Tech Solutions LTDA",
    tarefa: "Onboarding Empresa",
    dataUpload: "2024-01-15",
    status: "Processado",
    downloads: 5,
  },
  {
    id: 2,
    nome: "extrato_bancario.xlsx",
    tipo: "xlsx",
    tamanho: 512000, // 512KB
    empresa: "Comércio XYZ S.A.",
    tarefa: "Conciliação Bancária",
    dataUpload: "2024-01-14",
    status: "Em Processamento",
    downloads: 2,
  },
  {
    id: 3,
    nome: "nota_fiscal.jpg",
    tipo: "jpg",
    tamanho: 1024000, // 1MB
    empresa: "Indústria ABC",
    tarefa: "Processamento NF-e",
    dataUpload: "2024-01-13",
    status: "Processado",
    downloads: 8,
  },
  {
    id: 4,
    nome: "relatorio_fiscal.docx",
    tipo: "docx",
    tamanho: 768000, // 768KB
    empresa: "Consultoria Premium",
    tarefa: "Relatório IRRF",
    dataUpload: "2024-01-12",
    status: "Erro",
    downloads: 0,
  },
  {
    id: 5,
    nome: "backup_mensal.zip",
    tipo: "zip",
    tamanho: 10485760, // 10MB
    empresa: "Logística Express",
    tarefa: "Backup Dados",
    dataUpload: "2024-01-11",
    status: "Processado",
    downloads: 3,
  },
  {
    id: 6,
    nome: "certificado_digital.pfx",
    tipo: "pfx",
    tamanho: 256000, // 256KB
    empresa: "Serviços 123 ME",
    tarefa: "Emissão Boletos",
    dataUpload: "2024-01-10",
    status: "Pendente",
    downloads: 1,
  },
];

const estatisticasArquivos = {
  totalArquivos: 1247,
  totalTamanho: 25.8, // GB
  tipos: {
    pdf: 45,
    xlsx: 32,
    jpg: 15,
    docx: 5,
    zip: 3,
  },
  status: {
    processado: 68,
    processamento: 20,
    erro: 8,
    pendente: 4,
  }
};

export default function Arquivos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploads, setUploads] = useState<{[key: string]: number}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredArquivos = arquivos.filter(
    (arquivo) =>
      arquivo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arquivo.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arquivo.tarefa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file, index) => {
      const fileId = `${file.name}-${Date.now()}-${index}`;
      setUploads(prev => ({ ...prev, [fileId]: 0 }));

      // Simular upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploads(prev => ({ ...prev, [fileId]: progress }));
      }, 200);
    });
  };

  const getFileIcon = (tipo: string) => {
    switch (tipo) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "xlsx":
      case "xls":
        return <File className="h-5 w-5 text-green-500" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <Image className="h-5 w-5 text-blue-500" />;
      case "docx":
      case "doc":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "zip":
        return <File className="h-5 w-5 text-yellow-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processado":
        return "bg-accent text-accent-foreground";
      case "Em Processamento":
        return "bg-yellow-500 text-white";
      case "Erro":
        return "bg-destructive text-destructive-foreground";
      case "Pendente":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Gestão de Arquivos
          </h1>
          <p className="text-muted-foreground">Upload e organização de documentos</p>
        </div>
        <Button
          className="gap-2 animate-scale-in"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
          Upload Arquivo
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* Estatísticas BI */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Arquivos</p>
                <p className="text-3xl font-bold">{estatisticasArquivos.totalArquivos}</p>
              </div>
              <HardDrive className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent w-[75%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Espaço Utilizado</p>
                <p className="text-3xl font-bold">{estatisticasArquivos.totalTamanho}GB</p>
              </div>
              <FileCheck className="h-8 w-8 text-accent" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary w-[60%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tipos de Arquivo</p>
                <p className="text-3xl font-bold">{Object.keys(estatisticasArquivos.tipos).length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4 space-y-1">
              {Object.entries(estatisticasArquivos.tipos).slice(0, 3).map(([tipo, count]) => (
                <div key={tipo} className="flex justify-between text-xs">
                  <span className="text-muted-foreground uppercase">{tipo}</span>
                  <span className="font-medium">{count}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Sucesso</p>
                <p className="text-3xl font-bold">{estatisticasArquivos.status.processado}%</p>
              </div>
              <Zap className="h-8 w-8 text-accent" />
            </div>
            <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-primary w-[68%] animate-slide-in" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Área de Drag and Drop */}
      <Card
        className={`border-2 border-dashed transition-all duration-300 ${
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className={`h-12 w-12 mx-auto mb-4 ${dragActive ? 'text-primary animate-bounce' : 'text-muted-foreground'}`} />
          <h3 className="text-lg font-semibold mb-2">
            {dragActive ? 'Solte os arquivos aqui' : 'Arraste e solte arquivos aqui'}
          </h3>
          <p className="text-muted-foreground mb-4">
            ou clique em "Upload Arquivo" para selecionar
          </p>
          <p className="text-sm text-muted-foreground">
            Suportamos PDF, Excel, Word, imagens e arquivos ZIP
          </p>
        </CardContent>
      </Card>

      {/* Uploads em Progresso */}
      {Object.keys(uploads).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Uploads em Progresso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(uploads).map(([fileId, progress]) => (
              <div key={fileId} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{fileId.split('-')[0]}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="animate-pulse" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Filtros e Lista */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, empresa ou tarefa..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredArquivos.map((arquivo, index) => (
          <Card
            key={arquivo.id}
            className="hover-lift animate-scale-in group"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                  {getFileIcon(arquivo.tipo)}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                    {arquivo.nome}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{formatFileSize(arquivo.tamanho)}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Visualizar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>Associar a Tarefa</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(arquivo.status)}>{arquivo.status}</Badge>
                <span className="text-sm text-muted-foreground">{arquivo.downloads} downloads</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span className="truncate">{arquivo.empresa}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileCheck className="h-4 w-4" />
                  <span className="truncate">{arquivo.tarefa}</span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Upload em</span>
                  <span className="font-medium">
                    {new Date(arquivo.dataUpload).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

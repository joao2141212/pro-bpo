import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Empresas from "./pages/Empresas";
import Indicadores from "./pages/Indicadores";
import Usuarios from "./pages/Usuarios";
import EmpresaOperador from "./pages/EmpresaOperador";
import Timesheet from "./pages/Timesheet";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/indicadores" element={<Indicadores />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/empresa-operador" element={<EmpresaOperador />} />
            <Route path="/timesheet" element={<Timesheet />} />
            <Route
              path="/tarefas"
              element={<ComingSoon title="Tarefas Padrão" description="Gerencie templates de tarefas recorrentes" />}
            />
            <Route
              path="/checklist"
              element={<ComingSoon title="Checklist Padrão" description="Configure checklists modelo por processo" />}
            />
            <Route
              path="/arquivos"
              element={<ComingSoon title="Gestão de Arquivos" description="Upload e organização de documentos" />}
            />
            <Route
              path="/whatsapp"
              element={<ComingSoon title="WhatsApp Pro" description="Integração com WhatsApp Business API" />}
            />
            <Route
              path="/integracoes"
              element={<ComingSoon title="Integrações" description="Conecte ERPs e sistemas externos" />}
            />
            <Route
              path="/financeiro"
              element={<ComingSoon title="Financeiro na Mão" description="Gestão financeira simplificada" />}
            />
            <Route
              path="/playbox"
              element={<ComingSoon title="PlayBox" description="Central de ajuda e documentação" />}
            />
            <Route
              path="/indicacoes"
              element={<ComingSoon title="Comece a Indicar" description="Programa de indicações e recompensas" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlunosList from "./pages/AlunosList";
import AlunoForm from "./pages/AlunoForm";
import AlunoView from "./pages/AlunoView";
import ProfessoresList from "./pages/ProfessoresList";
import ProfessorForm from "./pages/ProfessorForm";
import ProfessorView from "./pages/ProfessorView";
import DisciplinasList from "./pages/DisciplinasList";
import DisciplinaForm from "./pages/DisciplinaForm";
import DisciplinaView from "./pages/DisciplinaView";
import SalasList from "./pages/SalasList";
import SalaForm from "./pages/SalaForm";
import SalaView from "./pages/SalaView";
import TurmasList from "./pages/TurmasList";
import TurmaForm from "./pages/TurmaForm";
import TurmaAlunoList from "./pages/TurmaAlunoList";
import TurmaAlunoForm from "./pages/TurmaAlunoForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Rotas de Alunos */}
          <Route path="/alunos" element={<AlunosList />} />
          <Route path="/alunos/cadastrar" element={<AlunoForm />} />
          <Route path="/alunos/editar/:id" element={<AlunoForm />} />
          <Route path="/alunos/visualizar/:id" element={<AlunoView />} />
          
          {/* Rotas de Professores */}
          <Route path="/professores" element={<ProfessoresList />} />
          <Route path="/professores/cadastrar" element={<ProfessorForm />} />
          <Route path="/professores/editar/:id" element={<ProfessorForm />} />
          <Route path="/professores/visualizar/:id" element={<ProfessorView />} />
          
          {/* Rotas de Disciplinas */}
          <Route path="/disciplinas" element={<DisciplinasList />} />
          <Route path="/disciplinas/cadastrar" element={<DisciplinaForm />} />
          <Route path="/disciplinas/editar/:id" element={<DisciplinaForm />} />
          <Route path="/disciplinas/visualizar/:id" element={<DisciplinaView />} />
          
          {/* Rotas de Salas */}
          <Route path="/salas" element={<SalasList />} />
          <Route path="/salas/cadastrar" element={<SalaForm />} />
          <Route path="/salas/editar/:id" element={<SalaForm />} />
          <Route path="/salas/visualizar/:id" element={<SalaView />} />
          
          {/* Rotas de Turmas */}
          <Route path="/turmas" element={<TurmasList />} />
          <Route path="/turmas/cadastrar" element={<TurmaForm />} />
          <Route path="/turmas/editar/:id" element={<TurmaForm />} />
          
          {/* Rotas de Turma-Alunos */}
          <Route path="/turma-alunos" element={<TurmaAlunoList />} />
          <Route path="/turma-alunos/cadastrar" element={<TurmaAlunoForm />} />
          <Route path="/turma-alunos/editar/:id" element={<TurmaAlunoForm />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

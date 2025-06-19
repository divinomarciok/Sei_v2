
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Home } from 'lucide-react';
import { AlunoService } from '../services/AlunoService';
import { Aluno } from '../types/Aluno';

const AlunoView = () => {
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    if (id) {
      const alunoEncontrado = AlunoService.getById(Number(id));
      setAluno(alunoEncontrado || null);
    }
  }, [id]);

  const formatarData = (data?: Date) => {
    if (!data) return 'Não informado';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  if (!aluno) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <p>Aluno não encontrado.</p>
              <Link to="/alunos">
                <Button className="mt-4">Voltar à Lista</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Visualizar Aluno</h1>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link to="/alunos">
              <Button variant="outline">Voltar à Lista</Button>
            </Link>
            {aluno.ativo && (
              <Link to={`/alunos/editar/${aluno.id}`}>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </Link>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {aluno.nome}
              <Badge variant={aluno.ativo ? "default" : "secondary"}>
                {aluno.ativo ? 'Ativo' : 'Inativo'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">Matrícula:</Label>
                <p className="text-gray-700">{aluno.matricula}</p>
              </div>
              
              <div>
                <Label className="font-semibold">CPF:</Label>
                <p className="text-gray-700">{aluno.cpf}</p>
              </div>
              
              <div>
                <Label className="font-semibold">Email:</Label>
                <p className="text-gray-700">{aluno.email || 'Não informado'}</p>
              </div>
              
              <div>
                <Label className="font-semibold">Data de Nascimento:</Label>
                <p className="text-gray-700">{formatarData(aluno.dataNascimento)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Label = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <span className={`text-sm font-medium ${className || ''}`}>{children}</span>
);

export default AlunoView;


import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Home } from 'lucide-react';
import { ProfessorService } from '../services/ProfessorService';
import { Professor } from '../types/Professor';

const ProfessorView = () => {
  const { id } = useParams();
  const [professor, setProfessor] = useState<Professor | null>(null);

  useEffect(() => {
    if (id) {
      const professorEncontrado = ProfessorService.getById(Number(id));
      setProfessor(professorEncontrado || null);
    }
  }, [id]);

  if (!professor) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <p>Professor não encontrado.</p>
              <Link to="/professores">
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
          <h1 className="text-3xl font-bold text-gray-800">Visualizar Professor</h1>
          <div className="flex gap-3">
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link to="/professores">
              <Button variant="outline">Voltar à Lista</Button>
            </Link>
            {professor.ativo && (
              <Link to={`/professores/editar/${professor.id}`}>
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
              {professor.nome}
              <Badge variant={professor.ativo ? "default" : "secondary"}>
                {professor.ativo ? 'Ativo' : 'Inativo'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="font-semibold">Matrícula:</Label>
                <p className="text-gray-700">{professor.matricula}</p>
              </div>
              
              <div>
                <Label className="font-semibold">CPF:</Label>
                <p className="text-gray-700">{professor.cpf}</p>
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

export default ProfessorView;

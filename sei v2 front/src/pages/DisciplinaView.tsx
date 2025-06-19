import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { DisciplinaService } from '../services/DisciplinaService';
import { Disciplina } from '../types/Disciplina';
import { useToast } from '@/hooks/use-toast';

const DisciplinaView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [disciplina, setDisciplina] = useState<Disciplina | null>(null);

  useEffect(() => {
    const loadDisciplina = async () => {
      try {
        const data = await DisciplinaService.getById(Number(id));
        setDisciplina(data);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao carregar disciplina",
          variant: "destructive"
        });
      }
    };
    if (id) loadDisciplina();
  }, [id, toast]);

  if (!disciplina) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/disciplinas">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Disciplina</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="font-semibold">Nome:</label>
              <p>{disciplina.nome}</p>
            </div>
            <div>
              <label className="font-semibold">Carga Horária:</label>
              <p>{disciplina.carga_horaria}h</p>
            </div>
            <div>
              <label className="font-semibold">Status:</label>
              <div className="mt-1">
                <Badge variant={disciplina.ativo ? "default" : "secondary"}>
                  {disciplina.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DisciplinaView;
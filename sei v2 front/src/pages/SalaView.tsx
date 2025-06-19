import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { SalaService } from '../services/SalaService';
import { Sala } from '../types/Sala';
import { useToast } from '@/hooks/use-toast';

const SalaView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [sala, setSala] = useState<Sala | null>(null);

  useEffect(() => {
    const loadSala = async () => {
      try {
        const data = await SalaService.getById(Number(id));
        setSala(data);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao carregar sala",
          variant: "destructive"
        });
      }
    };
    if (id) loadSala();
  }, [id, toast]);

  if (!sala) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link to="/salas">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Sala</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="font-semibold">Número:</label>
              <p>{sala.numero}</p>
            </div>
            <div>
              <label className="font-semibold">Capacidade:</label>
              <p>{sala.capacidade} pessoas</p>
            </div>
            <div>
              <label className="font-semibold">Status:</label>
              <div className="mt-1">
                <Badge variant={sala.ativo ? "default" : "secondary"}>
                  {sala.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalaView;
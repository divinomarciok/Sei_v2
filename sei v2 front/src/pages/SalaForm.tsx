import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { SalaService } from '../services/SalaService';
import { useToast } from '@/hooks/use-toast';

const SalaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    numero: 0,
    capacidade: 0,
    ativo: true
  });

  useEffect(() => {
    if (isEditing) {
      const loadSala = async () => {
        try {
          const sala = await SalaService.getById(Number(id));
          setFormData({
            numero: sala.numero,
            capacidade: sala.capacidade,
            ativo: sala.ativo
          });
        } catch (error) {
          toast({
            title: "Erro",
            description: "Erro ao carregar sala",
            variant: "destructive"
          });
        }
      };
      loadSala();
    }
  }, [id, isEditing, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        await SalaService.update(Number(id), formData);
        toast({
          title: "Sucesso",
          description: "Sala atualizada com sucesso!",
        });
      } else {
        await SalaService.create(formData);
        toast({
          title: "Sucesso",
          description: "Sala cadastrada com sucesso!",
        });
      }
      navigate('/salas');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar sala!",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              {isEditing ? 'Editar Sala' : 'Cadastrar Nova Sala'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="numero">Número *</Label>
                <Input
                  id="numero"
                  type="number"
                  min="1"
                  value={formData.numero}
                  onChange={(e) => setFormData({...formData, numero: Number(e.target.value)})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="capacidade">Capacidade *</Label>
                <Input
                  id="capacidade"
                  type="number"
                  min="1"
                  value={formData.capacidade}
                  onChange={(e) => setFormData({...formData, capacidade: Number(e.target.value)})}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ativo"
                  checked={formData.ativo}
                  onCheckedChange={(checked) => setFormData({...formData, ativo: !!checked})}
                />
                <Label htmlFor="ativo">Ativo</Label>
              </div>

              <div className="flex justify-between pt-4">
                <Link to="/salas">
                  <Button variant="outline">Cancelar</Button>
                </Link>
                <Button type="submit">
                  {isEditing ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalaForm;
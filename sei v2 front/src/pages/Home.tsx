
import { Link } from 'react-router-dom';
import { Users, UserCheck, BookOpen, Building, GraduationCap, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
           SEI V2
          </h1>
          <p className="text-xl text-gray-600">
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Alunos</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4 text-sm">
                Gerencie informações dos alunos e matrículas
              </p>
              <Link to="/alunos">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Acessar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Professores</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4 text-sm">
                Gerencie informações dos professores
              </p>
              <Link to="/professores">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Acessar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Disciplinas</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4 text-sm">
                Gerencie disciplinas e cargas horárias
              </p>
              <Link to="/disciplinas">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Acessar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Building className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Salas</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4 text-sm">
                Gerencie salas e capacidades
              </p>
              <Link to="/salas">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Acessar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Turmas</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4 text-sm">
                Gerencie turmas e horários
              </p>
              <Link to="/turmas">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Acessar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-xl text-gray-800">Turma-Alunos</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4 text-sm">
                Gerencie associações turma-aluno
              </p>
              <Link to="/turma-alunos">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Acessar
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;

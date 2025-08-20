import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Users, TrendingUp, Play, Calendar, MessageSquare, Plus } from 'lucide-react';

// Mock data for courses
const enrolledCourses = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Aprenda os conceitos básicos do React',
    progress: 75,
    instructor: 'Maria Santos',
    duration: '8 semanas',
    nextClass: '2025-01-15 14:00',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'JavaScript Avançado',
    description: 'Conceitos avançados de JavaScript',
    progress: 45,
    instructor: 'João Silva',
    duration: '6 semanas',
    nextClass: '2025-01-16 16:00',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop',
  },
];

const recommendedCourses = [
  {
    id: 3,
    title: 'Node.js Backend Development',
    description: 'Desenvolva APIs com Node.js',
    instructor: 'Carlos Ferreira',
    duration: '10 semanas',
    rating: 4.8,
    students: 1234,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop',
  },
  {
    id: 4,
    title: 'TypeScript Essentials',
    description: 'Domine TypeScript do zero',
    instructor: 'Ana Costa',
    duration: '4 semanas',
    rating: 4.9,
    students: 856,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=200&fit=crop',
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getDashboardStats = () => {
    switch (user?.role) {
      case 'formador':
        return [
          { label: 'Cursos Criados', value: '8', icon: BookOpen, color: 'text-primary' },
          { label: 'Estudantes', value: '324', icon: Users, color: 'text-secondary' },
          { label: 'Aulas Hoje', value: '3', icon: Calendar, color: 'text-warning' },
          { label: 'Rating Médio', value: '4.8', icon: TrendingUp, color: 'text-success' },
        ];
      case 'admin':
        return [
          { label: 'Total Utilizadores', value: '1,247', icon: Users, color: 'text-primary' },
          { label: 'Cursos Ativos', value: '89', icon: BookOpen, color: 'text-secondary' },
          { label: 'Mensagens Forum', value: '156', icon: MessageSquare, color: 'text-warning' },
          { label: 'Taxa Conclusão', value: '78%', icon: TrendingUp, color: 'text-success' },
        ];
      default:
        return [
          { label: 'Cursos Inscritos', value: '4', icon: BookOpen, color: 'text-primary' },
          { label: 'Horas Estudadas', value: '24', icon: Clock, color: 'text-secondary' },
          { label: 'Certificados', value: '2', icon: TrendingUp, color: 'text-warning' },
          { label: 'Próxima Aula', value: 'Hoje', icon: Calendar, color: 'text-success' },
        ];
    }
  };

  const stats = getDashboardStats();

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            {getGreeting()}, {user?.name}!
          </h2>
          <p className="text-white/90">
            {user?.role === 'formador' 
              ? 'Pronto para inspirar os seus estudantes hoje?'
              : user?.role === 'admin'
              ? 'Gerir a plataforma nunca foi tão fácil.'
              : 'Continue a sua jornada de aprendizagem!'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {user?.role === 'formando' && (
          <>
            {/* Enrolled Courses */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cursos Inscritos</CardTitle>
                    <CardDescription>Continue a sua aprendizagem</CardDescription>
                  </div>
                  <Button variant="outline">Ver Todos</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex space-x-4">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {course.instructor}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.duration}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Progresso</span>
                              <span className="text-sm font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                            <div className="flex items-center justify-between pt-2">
                              <Badge variant="outline">
                                Próxima aula: {new Date(course.nextClass).toLocaleDateString('pt')}
                              </Badge>
                              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                                <Play className="w-4 h-4 mr-1" />
                                Continuar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cursos Recomendados</CardTitle>
                    <CardDescription>Baseado no seu histórico de aprendizagem</CardDescription>
                  </div>
                  <Button variant="outline">Ver Todos</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex space-x-4">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {course.instructor}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.duration}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">⭐ {course.rating}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {course.students} estudantes
                              </span>
                            </div>
                            <Button size="sm" variant="outline">
                              Inscrever-se
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {user?.role === 'formador' && (
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Gerir os seus cursos e conteúdos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-16 flex-col space-y-2 bg-gradient-to-r from-primary to-secondary">
                  <Plus className="w-6 h-6" />
                  <span>Criar Novo Curso</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col space-y-2">
                  <Calendar className="w-6 h-6" />
                  <span>Agendar Aula</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col space-y-2">
                  <MessageSquare className="w-6 h-6" />
                  <span>Responder Fórum</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
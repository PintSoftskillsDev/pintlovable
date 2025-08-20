import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  Play,
  Calendar
} from 'lucide-react';

// Mock data for courses
const allCourses = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Aprenda os conceitos básicos do React e construa aplicações modernas',
    instructor: 'Maria Santos',
    duration: '8 semanas',
    level: 'Iniciante',
    category: 'Frontend',
    topic: 'React',
    rating: 4.8,
    students: 1234,
    price: 'Gratuito',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    enrolled: true,
    progress: 75,
  },
  {
    id: 2,
    title: 'JavaScript Avançado',
    description: 'Domine conceitos avançados de JavaScript e ES6+',
    instructor: 'João Silva',
    duration: '6 semanas',
    level: 'Avançado',
    category: 'Frontend',
    topic: 'JavaScript',
    rating: 4.7,
    students: 856,
    price: '€89',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    enrolled: true,
    progress: 45,
  },
  {
    id: 3,
    title: 'Node.js Backend Development',
    description: 'Desenvolva APIs robustas com Node.js e Express',
    instructor: 'Carlos Ferreira',
    duration: '10 semanas',
    level: 'Intermédio',
    category: 'Backend',
    topic: 'Node.js',
    rating: 4.9,
    students: 567,
    price: '€129',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    enrolled: false,
  },
  {
    id: 4,
    title: 'TypeScript Essentials',
    description: 'Domine TypeScript do zero ao avançado',
    instructor: 'Ana Costa',
    duration: '4 semanas',
    level: 'Iniciante',
    category: 'Frontend',
    topic: 'TypeScript',
    rating: 4.6,
    students: 432,
    price: '€69',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
    enrolled: false,
  },
  {
    id: 5,
    title: 'Python para Data Science',
    description: 'Análise de dados e machine learning com Python',
    instructor: 'Pedro Oliveira',
    duration: '12 semanas',
    level: 'Intermédio',
    category: 'Data Science',
    topic: 'Python',
    rating: 4.8,
    students: 789,
    price: '€149',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
    enrolled: false,
  },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const categories = ['all', 'Frontend', 'Backend', 'Data Science', 'Mobile'];
  const levels = ['all', 'Iniciante', 'Intermédio', 'Avançado'];

  const filteredCourses = allCourses.filter(course => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || course.category === selectedCategory) &&
      (selectedLevel === 'all' || course.level === selectedLevel)
    );
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const enrolledCourses = sortedCourses.filter(course => course.enrolled);
  const availableCourses = sortedCourses.filter(course => !course.enrolled);

  const CourseCard = ({ course, showProgress = false }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge variant={course.enrolled ? 'default' : 'secondary'}>
            {course.enrolled ? 'Inscrito' : course.price}
          </Badge>
        </div>
        {course.enrolled && (
          <div className="absolute top-4 left-4">
            <Button size="sm" className="bg-primary/80 hover:bg-primary">
              <Play className="w-4 h-4 mr-1" />
              Continuar
            </Button>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="mb-2">
            {course.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            {course.rating}
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {course.instructor}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </span>
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>
        </div>

        {showProgress && course.enrolled && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Progresso</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {course.students} estudantes
          </span>
          <Button 
            size="sm" 
            variant={course.enrolled ? "outline" : "default"}
            className={!course.enrolled ? "bg-gradient-to-r from-primary to-secondary" : ""}
          >
            {course.enrolled ? 'Ver Detalhes' : 'Inscrever-se'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout title="Cursos">
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Pesquisar cursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'Todas' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level === 'all' ? 'Todos' : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="students">Estudantes</SelectItem>
                    <SelectItem value="title">Título</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Tabs */}
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList>
            <TabsTrigger value="available" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Disponíveis ({availableCourses.length})</span>
            </TabsTrigger>
            <TabsTrigger value="enrolled" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Inscritos ({enrolledCourses.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            {availableCourses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum curso disponível</h3>
                  <p className="text-muted-foreground">
                    Tente ajustar os filtros para ver mais cursos.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="enrolled">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <CourseCard key={course.id} course={course} showProgress />
              ))}
            </div>
            {enrolledCourses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum curso inscrito</h3>
                  <p className="text-muted-foreground mb-4">
                    Inscreva-se em cursos para começar a sua jornada de aprendizagem.
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-secondary">
                    Explorar Cursos
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
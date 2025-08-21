import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Users, Filter, Search, Bell, Video } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - Expanded events with more details
const events = [
  {
    id: 1,
    title: 'Aula de React Avançado',
    description: 'Aprenda hooks avançados, context API e performance optimization no React',
    type: 'aula',
    date: '2024-01-15',
    time: '14:00',
    endTime: '16:00',
    duration: '2h',
    instructor: 'Prof. João Silva',
    instructorAvatar: null,
    location: 'Sala Virtual 1',
    participants: 25,
    maxParticipants: 30,
    color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    status: 'scheduled',
    isLive: false,
    category: 'Programação',
    tags: ['react', 'javascript', 'frontend'],
  },
  {
    id: 2,
    title: 'Workshop de UX Design',
    description: 'Metodologias de design thinking e prototipagem para criação de interfaces',
    type: 'workshop',
    date: '2024-01-16',
    time: '10:00',
    endTime: '14:00',
    duration: '4h',
    instructor: 'Prof. Maria Santos',
    instructorAvatar: null,
    location: 'Sala Virtual 2',
    participants: 15,
    maxParticipants: 20,
    color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    status: 'scheduled',
    isLive: false,
    category: 'Design',
    tags: ['ux', 'design', 'prototipagem'],
  },
  {
    id: 3,
    title: 'Prova Final - JavaScript',
    description: 'Avaliação final dos conhecimentos em JavaScript ES6+ e frameworks',
    type: 'prova',
    date: '2024-01-18',
    time: '15:00',
    endTime: '16:30',
    duration: '1.5h',
    instructor: 'Prof. Pedro Costa',
    instructorAvatar: null,
    location: 'Sala Virtual 3',
    participants: 30,
    maxParticipants: 30,
    color: 'bg-gradient-to-r from-red-500 to-red-600',
    status: 'scheduled',
    isLive: false,
    category: 'Avaliação',
    tags: ['javascript', 'avaliacao', 'prova'],
  },
  {
    id: 4,
    title: 'Sessão de Dúvidas - Python',
    description: 'Esclarecimento de dúvidas sobre Python e desenvolvimento web com Django',
    type: 'sessao',
    date: '2024-01-19',
    time: '16:00',
    endTime: '17:00',
    duration: '1h',
    instructor: 'Prof. Ana Oliveira',
    instructorAvatar: null,
    location: 'Sala Virtual 1',
    participants: 12,
    maxParticipants: 25,
    color: 'bg-gradient-to-r from-green-500 to-green-600',
    status: 'scheduled',
    isLive: false,
    category: 'Suporte',
    tags: ['python', 'django', 'duvidas'],
  },
  {
    id: 5,
    title: 'Masterclass: Inteligência Artificial',
    description: 'Introdução ao Machine Learning e suas aplicações práticas',
    type: 'masterclass',
    date: '2024-01-20',
    time: '19:00',
    endTime: '21:00',
    duration: '2h',
    instructor: 'Dr. Carlos Tech',
    instructorAvatar: null,
    location: 'Auditório Virtual',
    participants: 85,
    maxParticipants: 100,
    color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    status: 'live',
    isLive: true,
    category: 'Especial',
    tags: ['ai', 'ml', 'tecnologia'],
  },
];

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const todayEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === today.toDateString();
  });

  const liveEvents = events.filter(event => event.isLive);

  return (
    <DashboardLayout title="Calendário de Eventos">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h1>
              <p className="text-muted-foreground">
                Gerencie seus eventos, aulas e compromissos acadêmicos
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mês</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="day">Dia</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Novo Evento
              </Button>
            </div>
          </div>
        </div>

        {/* Live Events Banner */}
        {liveEvents.length > 0 && (
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <Badge variant="destructive">AO VIVO</Badge>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                    {liveEvents[0].title}
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-200">
                    {liveEvents[0].instructor} • {liveEvents[0].participants} participantes online
                  </p>
                </div>
                <Button variant="destructive">
                  <Video className="w-4 h-4 mr-2" />
                  Entrar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Categorias</SelectItem>
              <SelectItem value="programacao">Programação</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="avaliacao">Avaliação</SelectItem>
              <SelectItem value="suporte">Suporte</SelectItem>
              <SelectItem value="especial">Especial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Calendar Views */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="month">Mês</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="day">Dia</TabsTrigger>
          </TabsList>

          <TabsContent value="month" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Calendar Grid */}
              <div className="xl:col-span-3">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    {/* Week days header */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {weekDays.map((day) => (
                        <div key={day} className="p-3 text-center text-sm font-semibold text-muted-foreground bg-muted/30 rounded-lg">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentDate).map((day, index) => {
                        const dayEvents = getEventsForDate(day);
                        const isToday = day && 
                          new Date().getDate() === day && 
                          new Date().getMonth() === currentDate.getMonth() && 
                          new Date().getFullYear() === currentDate.getFullYear();

                        return (
                          <div
                            key={index}
                            className={`min-h-[120px] p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                              isToday ? 'bg-primary/10 border-primary shadow-md' : 'border-border hover:bg-accent/50'
                            } ${!day ? 'border-transparent cursor-default' : ''}`}
                            onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                          >
                            {day && (
                              <>
                                <div className={`text-sm font-bold mb-2 ${isToday ? 'text-primary text-base' : ''}`}>
                                  {day}
                                </div>
                                <div className="space-y-1">
                                  {dayEvents.slice(0, 2).map((event) => (
                                    <div
                                      key={event.id}
                                      className={`text-xs p-1.5 rounded-md text-white truncate shadow-sm ${event.color}`}
                                      title={`${event.title} - ${event.time}`}
                                    >
                                      <div className="font-medium">{event.time}</div>
                                      <div className="truncate">{event.title}</div>
                                    </div>
                                  ))}
                                  {dayEvents.length > 2 && (
                                    <div className="text-xs text-muted-foreground font-medium bg-muted/50 p-1 rounded text-center">
                                      +{dayEvents.length - 2} eventos
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Today's Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      Hoje ({todayEvents.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {todayEvents.length > 0 ? (
                      todayEvents.map((event) => (
                        <div key={event.id} className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-4 h-4 rounded-full ${event.color.replace('bg-gradient-to-r from-', 'bg-').split(' ')[0]}`}></div>
                            <span className="font-semibold text-sm">{event.title}</span>
                            {event.isLive && <Badge variant="destructive" className="text-xs px-2 py-0">LIVE</Badge>}
                          </div>
                          <div className="space-y-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time} - {event.endTime} ({event.duration})
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {event.participants}/{event.maxParticipants} participantes
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="text-xs flex-1">
                              <Bell className="w-3 h-3 mr-1" />
                              Lembrar
                            </Button>
                            {event.isLive && (
                              <Button size="sm" variant="destructive" className="text-xs flex-1">
                                <Video className="w-3 h-3 mr-1" />
                                Entrar
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">Nenhum evento hoje</p>
                    )}
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Próximos Eventos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${event.color.replace('bg-gradient-to-r from-', 'bg-').split(' ')[0]}`}></div>
                          <span className="font-medium text-sm">{event.title}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            {new Date(event.date).toLocaleDateString('pt-PT', { 
                              day: '2-digit', 
                              month: 'short',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time} - {event.endTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {event.participants}/{event.maxParticipants}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-xs">
                              {event.instructor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{event.instructor}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Event Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Categorias</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Aulas</span>
                      <span className="ml-auto text-muted-foreground">12</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>Workshops</span>
                      <span className="ml-auto text-muted-foreground">5</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Provas</span>
                      <span className="ml-auto text-muted-foreground">3</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Sessões</span>
                      <span className="ml-auto text-muted-foreground">8</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      <span>Masterclass</span>
                      <span className="ml-auto text-muted-foreground">2</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="week" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vista Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Vista Semanal</h3>
                  <p className="text-muted-foreground">A vista semanal estará disponível em breve</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="day" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vista Diária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Vista Diária</h3>
                  <p className="text-muted-foreground">A vista diária estará disponível em breve</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

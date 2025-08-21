import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Mock data
const events = [
  {
    id: 1,
    title: 'Aula de React Avançado',
    type: 'aula',
    date: '2024-01-15',
    time: '14:00',
    duration: '2h',
    instructor: 'Prof. João Silva',
    location: 'Sala Virtual 1',
    participants: 25,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Workshop de UX Design',
    type: 'workshop',
    date: '2024-01-16',
    time: '10:00',
    duration: '4h',
    instructor: 'Prof. Maria Santos',
    location: 'Sala Virtual 2',
    participants: 15,
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Prova Final - JavaScript',
    type: 'prova',
    date: '2024-01-18',
    time: '15:00',
    duration: '1.5h',
    instructor: 'Prof. Pedro Costa',
    location: 'Sala Virtual 3',
    participants: 30,
    color: 'bg-red-500',
  },
  {
    id: 4,
    title: 'Sessão de Dúvidas - Python',
    type: 'sessao',
    date: '2024-01-19',
    time: '16:00',
    duration: '1h',
    instructor: 'Prof. Ana Oliveira',
    location: 'Sala Virtual 1',
    participants: 12,
    color: 'bg-green-500',
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

  return (
    <DashboardLayout title="Calendário">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-2xl font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="xl:col-span-3">
            <Card>
              <CardContent className="p-6">
                {/* Week days header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {weekDays.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
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
                        className={`min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                          isToday ? 'bg-primary/10 border-primary' : ''
                        } ${!day ? 'border-transparent' : ''}`}
                        onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                      >
                        {day && (
                          <>
                            <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 3).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                                  title={event.title}
                                >
                                  {event.time} {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  +{dayEvents.length - 3} mais
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
                  Hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {events
                  .filter(event => {
                    const today = new Date();
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === today.toDateString();
                  })
                  .map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                        <span className="font-medium text-sm">{event.title}</span>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time} ({event.duration})
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                {events.filter(event => {
                  const today = new Date();
                  const eventDate = new Date(event.date);
                  return eventDate.toDateString() === today.toDateString();
                }).length === 0 && (
                  <p className="text-sm text-muted-foreground">Nenhum evento hoje</p>
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
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
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
                          month: 'short' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time} ({event.duration})
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.participants} participantes
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

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Legenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Aulas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Workshops</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Provas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Sessões</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
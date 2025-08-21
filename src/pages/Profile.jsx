import { useState } from 'react';
import { Edit, Save, X, Upload, Mail, Phone, MapPin, Linkedin, Calendar, BookOpen, Award, User, Camera, Share2, MessageCircle, Heart, Trophy } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'João Silva',
    email: user?.email || 'joao@exemplo.com',
    phone: '912 345 678',
    address: 'Lisboa, Portugal',
    linkedin: 'https://linkedin.com/in/joaosilva',
    website: 'https://joaosilva.dev',
    bio: 'Entusiasta de tecnologia com paixão por aprender e ensinar. Especializado em desenvolvimento web e design UX/UI com mais de 3 anos de experiência.',
    profileImage: null,
    coverImage: null,
    skills: ['React', 'JavaScript', 'UX Design', 'Python', 'Node.js'],
    interests: ['Tecnologia', 'Design', 'Inovação', 'Educação'],
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    // Here you would typically send the data to your backend
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Mock data for achievements and activity
  const achievements = [
    { id: 1, name: 'Primeiro Curso Concluído', icon: '🎓', date: '2024-01-10', description: 'Completou o primeiro curso com sucesso', points: 100, rarity: 'common' },
    { id: 2, name: 'Participação Ativa no Fórum', icon: '💬', date: '2024-01-15', description: 'Participou ativamente nas discussões da comunidade', points: 150, rarity: 'uncommon' },
    { id: 3, name: 'Projeto Destacado', icon: '⭐', date: '2024-01-20', description: 'Projeto foi selecionado como destaque da semana', points: 250, rarity: 'rare' },
    { id: 4, name: 'Mentor da Comunidade', icon: '🏆', date: '2024-01-25', description: 'Ajudou outros estudantes com dúvidas', points: 300, rarity: 'epic' },
  ];

  const enrolledCourses = [
    { id: 1, name: 'React Avançado', progress: 75, instructor: 'Prof. João Silva', category: 'Frontend', totalLessons: 24, completedLessons: 18, rating: 4.8 },
    { id: 2, name: 'UX Design Fundamentals', progress: 40, instructor: 'Prof. Maria Santos', category: 'Design', totalLessons: 16, completedLessons: 6, rating: 4.9 },
    { id: 3, name: 'Python para Iniciantes', progress: 90, instructor: 'Prof. Ana Costa', category: 'Backend', totalLessons: 20, completedLessons: 18, rating: 4.7 },
  ];

  const recentActivity = [
    { id: 1, action: 'Completou a lição "Hooks em React"', date: '2 horas atrás', type: 'lesson', icon: BookOpen },
    { id: 2, action: 'Participou no fórum "Melhores práticas React"', date: '1 dia atrás', type: 'forum', icon: MessageCircle },
    { id: 3, action: 'Enviou projeto final do curso Python', date: '3 dias atrás', type: 'project', icon: Upload },
    { id: 4, action: 'Recebeu badge "Participação Ativa"', date: '5 dias atrás', type: 'achievement', icon: Award },
    { id: 5, action: 'Iniciou o curso "UX Design"', date: '1 semana atrás', type: 'course', icon: BookOpen },
  ];

  const stats = {
    coursesCompleted: 8,
    totalPoints: 2450,
    forumPosts: 23,
    streak: 15,
    rank: 'Avançado'
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'uncommon': return 'bg-green-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout title="Meu Perfil">
      <div className="space-y-8">
        {/* Profile Header with Cover */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 relative">
            {isEditing && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-4 right-4"
              >
                <Camera className="w-4 h-4 mr-2" />
                Alterar Capa
              </Button>
            )}
          </div>
          <CardContent className="pt-0">
            <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 -mt-16 relative">
              {/* Avatar */}
              <div className="relative z-10">
                <Avatar className="w-32 h-32 border-4 border-background ring-4 ring-primary/20">
                  <AvatarImage src={profileData.profileImage} />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-secondary text-white">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-2 right-2 rounded-full w-10 h-10"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 lg:ml-6 space-y-4">
                <div className="space-y-2">
                  {isEditing ? (
                    <Input
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-2xl font-bold bg-transparent border-none p-0 h-auto"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant={user?.role === 'admin' ? 'destructive' : user?.role === 'formador' ? 'default' : 'secondary'} className="text-sm">
                      {user?.role === 'admin' ? 'Administrador' : user?.role === 'formador' ? 'Formador' : 'Estudante'}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      Nível {stats.rank}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {stats.totalPoints} pontos
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Membro desde Jan 2024
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="max-w-2xl">
                  {isEditing ? (
                    <Textarea
                      value={tempData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Conte-nos sobre você..."
                      rows={3}
                      className="resize-none"
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={tempData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        type="email"
                        className="w-48"
                      />
                    ) : (
                      <span>{profileData.email}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={tempData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-48"
                      />
                    ) : (
                      <span>{profileData.address}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={tempData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="w-48"
                      />
                    ) : (
                      <a href={profileData.linkedin} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="lg">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="lg">
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleEdit} size="lg">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share2 className="w-4 h-4 mr-2" />
                      Partilhar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.coursesCompleted}</div>
              <div className="text-sm text-muted-foreground">Cursos Completos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Pontos Totais</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.forumPosts}</div>
              <div className="text-sm text-muted-foreground">Posts no Fórum</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.streak}</div>
              <div className="text-sm text-muted-foreground">Dias Consecutivos</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="courses" className="text-sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Cursos
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-sm">
              <Award className="w-4 h-4 mr-2" />
              Conquistas
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Atividade
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-sm">
              <Trophy className="w-4 h-4 mr-2" />
              Competências
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          <Badge variant="outline" className="text-xs">{course.category}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{course.progress}%</div>
                          <div className="text-xs text-muted-foreground">Completo</div>
                        </div>
                      </div>
                      
                      <Progress value={course.progress} className="h-2" />
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{course.completedLessons}/{course.totalLessons} lições</span>
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Continuar Curso
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <div className={`w-3 h-3 rounded-full ${getRarityColor(achievement.rarity)}`}></div>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {new Date(achievement.date).toLocaleDateString('pt-PT')}
                          </span>
                          <Badge variant="secondary">+{achievement.points} pts</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Competências Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-sm px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Interesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-sm px-3 py-1">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
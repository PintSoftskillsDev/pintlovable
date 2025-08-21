import { useState } from 'react';
import { Edit, Save, X, Upload, Mail, Phone, MapPin, Linkedin, Calendar, BookOpen, Award, User } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'João Silva',
    email: user?.email || 'joao@exemplo.com',
    phone: '912 345 678',
    address: 'Lisboa, Portugal',
    linkedin: 'https://linkedin.com/in/joaosilva',
    bio: 'Entusiasta de tecnologia com paixão por aprender e ensinar. Especializado em desenvolvimento web e design UX/UI.',
    profileImage: null,
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
    { id: 1, name: 'Primeiro Curso Concluído', icon: '🎓', date: '2024-01-10' },
    { id: 2, name: 'Participação Ativa no Fórum', icon: '💬', date: '2024-01-15' },
    { id: 3, name: 'Projeto Destacado', icon: '⭐', date: '2024-01-20' },
  ];

  const enrolledCourses = [
    { id: 1, name: 'React Avançado', progress: 75, instructor: 'Prof. João Silva' },
    { id: 2, name: 'UX Design', progress: 40, instructor: 'Prof. Maria Santos' },
    { id: 3, name: 'Python para Iniciantes', progress: 90, instructor: 'Prof. Ana Costa' },
  ];

  const recentActivity = [
    { id: 1, action: 'Completou a lição "Hooks em React"', date: '2 horas atrás' },
    { id: 2, action: 'Participou no fórum "Melhores práticas React"', date: '1 dia atrás' },
    { id: 3, action: 'Enviou projeto final do curso Python', date: '3 dias atrás' },
  ];

  return (
    <DashboardLayout title="Perfil">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={profileData.profileImage} />
                      <AvatarFallback className="text-2xl">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="text-center space-y-2">
                    {isEditing ? (
                      <Input
                        value={tempData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="text-center text-xl font-semibold"
                      />
                    ) : (
                      <h2 className="text-xl font-semibold">{profileData.name}</h2>
                    )}
                    <Badge variant={user?.role === 'admin' ? 'destructive' : user?.role === 'formador' ? 'default' : 'secondary'}>
                      {user?.role === 'admin' ? 'Administrador' : user?.role === 'formador' ? 'Formador' : 'Formando'}
                    </Badge>
                  </div>

                  {isEditing ? (
                    <Textarea
                      value={tempData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Biografia"
                      className="text-center"
                      rows={3}
                    />
                  ) : (
                    <p className="text-muted-foreground text-center">{profileData.bio}</p>
                  )}

                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={tempData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          type="email"
                        />
                      ) : (
                        <span className="text-sm">{profileData.email}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={tempData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      ) : (
                        <span className="text-sm">{profileData.phone}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={tempData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      ) : (
                        <span className="text-sm">{profileData.address}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={tempData.linkedin}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        />
                      ) : (
                        <a href={profileData.linkedin} className="text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 w-full">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSave} className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          Guardar
                        </Button>
                        <Button onClick={handleCancel} variant="outline" className="flex-1">
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleEdit} className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Perfil
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="courses" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="courses">Cursos</TabsTrigger>
                <TabsTrigger value="achievements">Conquistas</TabsTrigger>
                <TabsTrigger value="activity">Atividade</TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Cursos Inscritos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          </div>
                          <Badge variant="outline">{course.progress}%</Badge>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Conquistas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Conquistado em {new Date(achievement.date).toLocaleDateString('pt-PT')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Atividade Recente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
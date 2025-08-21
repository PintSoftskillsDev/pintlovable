import { useState } from 'react';
import { Bell, Shield, Palette, Globe, Eye, Lock, Mail, Smartphone, Monitor, Moon, Sun, Download, Trash2, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    // Notificações
    emailNotifications: true,
    pushNotifications: false,
    forumNotifications: true,
    courseUpdates: true,
    weeklyDigest: false,
    assignmentReminders: true,
    eventReminders: true,
    
    // Privacidade
    profileVisibility: 'public',
    showEmail: false,
    showProgress: true,
    allowMessages: true,
    showOnlineStatus: true,
    dataCollection: false,
    
    // Aparência
    theme: 'system',
    language: 'pt',
    dateFormat: 'dd/mm/yyyy',
    timeFormat: '24',
    fontSize: 'medium',
    compactMode: false,
    
    // Segurança
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    deviceTracking: true,
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    // Here you would save settings to backend
    toast({
      title: "Configurações guardadas",
      description: "As suas preferências foram atualizadas com sucesso.",
    });
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Erro na alteração da senha",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    if (passwords.new.length < 8) {
      toast({
        title: "Senha muito fraca",
        description: "A senha deve ter pelo menos 8 caracteres.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Senha alterada",
      description: "A sua senha foi alterada com sucesso.",
    });
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os seus dados serão enviados por email em breve.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Conta eliminada",
      description: "A sua conta foi marcada para eliminação.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout title="Configurações">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Configurações da Conta</h1>
          <p className="text-muted-foreground">Gerencie as suas preferências e configurações de segurança</p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-14">
            <TabsTrigger value="notifications" className="text-sm">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="privacy" className="text-sm">
              <Eye className="w-4 h-4 mr-2" />
              Privacidade
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-sm">
              <Palette className="w-4 h-4 mr-2" />
              Aparência
            </TabsTrigger>
            <TabsTrigger value="security" className="text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Segurança
            </TabsTrigger>
          </TabsList>

          {/* Notificações */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Preferências de Notificação
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Controle como e quando quer ser notificado sobre atividades da plataforma
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Email Notifications */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Notificações por Email</h3>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-medium">Emails Gerais</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações importantes por email
                        </p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-medium">Atualizações de Cursos</Label>
                        <p className="text-sm text-muted-foreground">
                          Novos materiais e aulas disponíveis
                        </p>
                      </div>
                      <Switch
                        checked={settings.courseUpdates}
                        onCheckedChange={(checked) => handleSettingChange('courseUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-medium">Lembretes de Tarefas</Label>
                        <p className="text-sm text-muted-foreground">
                          Lembretes sobre prazos de entregas
                        </p>
                      </div>
                      <Switch
                        checked={settings.assignmentReminders}
                        onCheckedChange={(checked) => handleSettingChange('assignmentReminders', checked)}
                      />
                    </div>

                    <div className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-medium">Resumo Semanal</Label>
                        <p className="text-sm text-muted-foreground">
                          Resumo das suas atividades semanais
                        </p>
                      </div>
                      <Switch
                        checked={settings.weeklyDigest}
                        onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Notificações Push</h3>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-medium">Notificações no Navegador</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações push no navegador
                        </p>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-medium">Fórum de Discussão</Label>
                        <p className="text-sm text-muted-foreground">
                          Novas discussões e respostas
                        </p>
                      </div>
                      <Switch
                        checked={settings.forumNotifications}
                        onCheckedChange={(checked) => handleSettingChange('forumNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-base font-medium">Lembretes de Eventos</Label>
                        <p className="text-sm text-muted-foreground">
                          Aulas e eventos próximos
                        </p>
                      </div>
                      <Switch
                        checked={settings.eventReminders}
                        onCheckedChange={(checked) => handleSettingChange('eventReminders', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} size="lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Guardar Preferências
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacidade */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Configurações de Privacidade
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Controle quem pode ver as suas informações e como os seus dados são utilizados
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Profile Visibility */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Visibilidade do Perfil</h3>
                  <div className="grid gap-4">
                    <div className="space-y-3">
                      <Label>Quem pode ver o seu perfil?</Label>
                      <Select
                        value={settings.profileVisibility}
                        onValueChange={(value) => handleSettingChange('profileVisibility', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">
                            <div className="space-y-1">
                              <div className="font-medium">Público</div>
                              <div className="text-xs text-muted-foreground">Todos podem ver</div>
                            </div>
                          </SelectItem>
                          <SelectItem value="students">
                            <div className="space-y-1">
                              <div className="font-medium">Apenas Estudantes</div>
                              <div className="text-xs text-muted-foreground">Só membros da plataforma</div>
                            </div>
                          </SelectItem>
                          <SelectItem value="private">
                            <div className="space-y-1">
                              <div className="font-medium">Privado</div>
                              <div className="text-xs text-muted-foreground">Apenas você</div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <Label className="text-base font-medium">Mostrar Email</Label>
                          <p className="text-sm text-muted-foreground">
                            Outros podem ver o seu email
                          </p>
                        </div>
                        <Switch
                          checked={settings.showEmail}
                          onCheckedChange={(checked) => handleSettingChange('showEmail', checked)}
                        />
                      </div>

                      <div className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <Label className="text-base font-medium">Mostrar Progresso</Label>
                          <p className="text-sm text-muted-foreground">
                            Progresso nos cursos é visível
                          </p>
                        </div>
                        <Switch
                          checked={settings.showProgress}
                          onCheckedChange={(checked) => handleSettingChange('showProgress', checked)}
                        />
                      </div>

                      <div className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <Label className="text-base font-medium">Status Online</Label>
                          <p className="text-sm text-muted-foreground">
                            Mostrar quando está online
                          </p>
                        </div>
                        <Switch
                          checked={settings.showOnlineStatus}
                          onCheckedChange={(checked) => handleSettingChange('showOnlineStatus', checked)}
                        />
                      </div>

                      <div className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <Label className="text-base font-medium">Permitir Mensagens</Label>
                          <p className="text-sm text-muted-foreground">
                            Outros podem enviar mensagens
                          </p>
                        </div>
                        <Switch
                          checked={settings.allowMessages}
                          onCheckedChange={(checked) => handleSettingChange('allowMessages', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Data Collection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recolha de Dados</h3>
                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Análises e Melhorias</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir recolha de dados para melhorar a plataforma
                      </p>
                    </div>
                    <Switch
                      checked={settings.dataCollection}
                      onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} size="lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Guardar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aparência */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Personalização da Aparência
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Customize a aparência da plataforma de acordo com as suas preferências
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Theme Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tema</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${settings.theme === 'light' ? 'border-primary' : 'border-border'}`}
                         onClick={() => handleSettingChange('theme', 'light')}>
                      <div className="flex items-center justify-center w-12 h-12 bg-white border rounded-lg mb-3">
                        <Sun className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="text-sm font-medium">Claro</div>
                      <div className="text-xs text-muted-foreground">Tema claro</div>
                    </div>
                    
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${settings.theme === 'dark' ? 'border-primary' : 'border-border'}`}
                         onClick={() => handleSettingChange('theme', 'dark')}>
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-900 border rounded-lg mb-3">
                        <Moon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-sm font-medium">Escuro</div>
                      <div className="text-xs text-muted-foreground">Tema escuro</div>
                    </div>
                    
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${settings.theme === 'system' ? 'border-primary' : 'border-border'}`}
                         onClick={() => handleSettingChange('theme', 'system')}>
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-white to-gray-900 border rounded-lg mb-3">
                        <Monitor className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="text-sm font-medium">Sistema</div>
                      <div className="text-xs text-muted-foreground">Seguir sistema</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Language and Format */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label>Idioma</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => handleSettingChange('language', value)}
                    >
                      <SelectTrigger>
                        <Globe className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">🇵🇹 Português</SelectItem>
                        <SelectItem value="en">🇬🇧 English</SelectItem>
                        <SelectItem value="es">🇪🇸 Español</SelectItem>
                        <SelectItem value="fr">🇫🇷 Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Formato de Data</Label>
                    <Select
                      value={settings.dateFormat}
                      onValueChange={(value) => handleSettingChange('dateFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/AAAA</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/AAAA</SelectItem>
                        <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Formato de Hora</Label>
                    <Select
                      value={settings.timeFormat}
                      onValueChange={(value) => handleSettingChange('timeFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24">24 Horas (14:30)</SelectItem>
                        <SelectItem value="12">12 Horas (2:30 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Tamanho da Fonte</Label>
                    <Select
                      value={settings.fontSize}
                      onValueChange={(value) => handleSettingChange('fontSize', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequena</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Interface Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Opções de Interface</h3>
                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Modo Compacto</Label>
                      <p className="text-sm text-muted-foreground">
                        Interface mais densa com menos espaçamento
                      </p>
                    </div>
                    <Switch
                      checked={settings.compactMode}
                      onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} size="lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aplicar Mudanças
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segurança */}
          <TabsContent value="security" className="space-y-6">
            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Alterar Senha
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Mantenha a sua conta segura com uma senha forte
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwords.current}
                      onChange={(e) => handlePasswordChange('current', e.target.value)}
                      placeholder="Digite a senha atual"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwords.new}
                      onChange={(e) => handlePasswordChange('new', e.target.value)}
                      placeholder="Digite a nova senha"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                      placeholder="Confirme a nova senha"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleChangePassword} disabled={!passwords.current || !passwords.new || !passwords.confirm}>
                    <Lock className="w-4 h-4 mr-2" />
                    Alterar Senha
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Configurações de Segurança
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure opões avançadas de segurança para proteger a sua conta
                </p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">
                        Camada extra de segurança para login
                      </p>
                      {settings.twoFactorAuth && <Badge variant="secondary">Ativo</Badge>}
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                    />
                  </div>

                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Alertas de Login</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações sobre novos acessos
                      </p>
                    </div>
                    <Switch
                      checked={settings.loginAlerts}
                      onCheckedChange={(checked) => handleSettingChange('loginAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Rastreamento de Dispositivos</Label>
                      <p className="text-sm text-muted-foreground">
                        Monitorizar dispositivos conectados
                      </p>
                    </div>
                    <Switch
                      checked={settings.deviceTracking}
                      onCheckedChange={(checked) => handleSettingChange('deviceTracking', checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Timeout de Sessão</Label>
                    <Select
                      value={settings.sessionTimeout}
                      onValueChange={(value) => handleSettingChange('sessionTimeout', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="120">2 horas</SelectItem>
                        <SelectItem value="never">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Expiração da Senha</Label>
                    <Select
                      value={settings.passwordExpiry}
                      onValueChange={(value) => handleSettingChange('passwordExpiry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 dias</SelectItem>
                        <SelectItem value="60">60 dias</SelectItem>
                        <SelectItem value="90">90 dias</SelectItem>
                        <SelectItem value="never">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} size="lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Guardar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Gestão de Dados
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Exporte ou elimine os seus dados pessoais
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-6 border rounded-lg space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Exportar Dados</h3>
                      <p className="text-sm text-muted-foreground">
                        Descarregue uma cópia de todos os seus dados
                      </p>
                    </div>
                    <Button onClick={handleExportData} variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Dados
                    </Button>
                  </div>

                  <div className="p-6 border border-destructive/20 bg-destructive/5 rounded-lg space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-destructive">Eliminar Conta</h3>
                      <p className="text-sm text-muted-foreground">
                        Eliminar permanentemente a sua conta e dados
                      </p>
                    </div>
                    <Button onClick={handleDeleteAccount} variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar Conta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
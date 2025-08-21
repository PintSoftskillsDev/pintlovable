import { useState } from 'react';
import { Bell, Shield, Palette, Globe, Eye, Lock, Mail, Smartphone } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  const [settings, setSettings] = useState({
    // Notificações
    emailNotifications: true,
    pushNotifications: false,
    forumNotifications: true,
    courseUpdates: true,
    weeklyDigest: false,
    
    // Privacidade
    profileVisibility: 'public',
    showEmail: false,
    showProgress: true,
    allowMessages: true,
    
    // Aparência
    theme: 'system',
    language: 'pt',
    dateFormat: 'dd/mm/yyyy',
    
    // Segurança
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30',
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
    console.log('Saving settings:', settings);
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert('As senhas não coincidem');
      return;
    }
    // Here you would change password via backend
    console.log('Changing password');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <DashboardLayout title="Configurações">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="privacy">Privacidade</TabsTrigger>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>

          {/* Notificações */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Preferências de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações importantes por email
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações push no navegador
                      </p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Notificações do Fórum</Label>
                      <p className="text-sm text-muted-foreground">
                        Ser notificado sobre novas discussões e respostas
                      </p>
                    </div>
                    <Switch
                      checked={settings.forumNotifications}
                      onCheckedChange={(checked) => handleSettingChange('forumNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Atualizações de Cursos</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificações sobre novos materiais e aulas
                      </p>
                    </div>
                    <Switch
                      checked={settings.courseUpdates}
                      onCheckedChange={(checked) => handleSettingChange('courseUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Resumo Semanal</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber um resumo semanal das atividades
                      </p>
                    </div>
                    <Switch
                      checked={settings.weeklyDigest}
                      onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveSettings}>
                  Guardar Preferências
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacidade */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Configurações de Privacidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Visibilidade do Perfil</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) => handleSettingChange('profileVisibility', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Público</SelectItem>
                        <SelectItem value="students">Apenas Estudantes</SelectItem>
                        <SelectItem value="private">Privado</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Controle quem pode ver o seu perfil
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Mostrar Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir que outros vejam o seu email
                      </p>
                    </div>
                    <Switch
                      checked={settings.showEmail}
                      onCheckedChange={(checked) => handleSettingChange('showEmail', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Mostrar Progresso</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir que outros vejam o seu progresso nos cursos
                      </p>
                    </div>
                    <Switch
                      checked={settings.showProgress}
                      onCheckedChange={(checked) => handleSettingChange('showProgress', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Permitir Mensagens</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir que outros utilizadores lhe enviem mensagens
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowMessages}
                      onCheckedChange={(checked) => handleSettingChange('allowMessages', checked)}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveSettings}>
                  Guardar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aparência */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Personalização da Aparência
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) => handleSettingChange('theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => handleSettingChange('language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
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
                </div>

                <Button onClick={handleSaveSettings}>
                  Aplicar Mudanças
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segurança */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* Alteração de Senha */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Alterar Senha
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwords.current}
                      onChange={(e) => handlePasswordChange('current', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwords.new}
                      onChange={(e) => handlePasswordChange('new', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                    />
                  </div>

                  <Button onClick={handleChangePassword}>
                    Alterar Senha
                  </Button>
                </CardContent>
              </Card>

              {/* Configurações de Segurança */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Configurações de Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Autenticação de Dois Fatores</Label>
                        <p className="text-sm text-muted-foreground">
                          Adicione uma camada extra de segurança à sua conta
                        </p>
                      </div>
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Alertas de Login</Label>
                        <p className="text-sm text-muted-foreground">
                          Ser notificado sobre novos acessos à sua conta
                        </p>
                      </div>
                      <Switch
                        checked={settings.loginAlerts}
                        onCheckedChange={(checked) => handleSettingChange('loginAlerts', checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Timeout de Sessão (minutos)</Label>
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
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings}>
                    Guardar Configurações
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
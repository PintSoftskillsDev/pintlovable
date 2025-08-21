import { useState } from 'react';
import { Search, Plus, MessageSquare, Users, Clock, Pin, Filter, ChevronDown } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const categories = [
  { id: 1, name: 'Programação', posts: 245, color: 'bg-blue-500' },
  { id: 2, name: 'Design', posts: 128, color: 'bg-purple-500' },
  { id: 3, name: 'Marketing', posts: 89, color: 'bg-green-500' },
  { id: 4, name: 'Gestão', posts: 156, color: 'bg-orange-500' },
];

const recentPosts = [
  {
    id: 1,
    title: 'Como começar com React em 2024?',
    author: 'João Silva',
    avatar: null,
    category: 'Programação',
    replies: 12,
    views: 234,
    lastActivity: '2 horas atrás',
    isPinned: true,
  },
  {
    id: 2,
    title: 'Melhores práticas de UX Design',
    author: 'Maria Santos',
    avatar: null,
    category: 'Design',
    replies: 8,
    views: 156,
    lastActivity: '4 horas atrás',
    isPinned: false,
  },
  {
    id: 3,
    title: 'Estratégias de Marketing Digital para 2024',
    author: 'Pedro Costa',
    avatar: null,
    category: 'Marketing',
    replies: 15,
    views: 289,
    lastActivity: '1 dia atrás',
    isPinned: false,
  },
];

const popularTags = ['javascript', 'react', 'nodejs', 'css', 'html', 'python', 'design', 'marketing'];

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  return (
    <DashboardLayout title="Fórum">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Pesquisar discussões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Discussão
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Categories Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Categorias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center p-4 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                    >
                      <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                      <div className="flex-1">
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.posts} discussões</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Discussões Recentes</CardTitle>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recentes</SelectItem>
                      <SelectItem value="popular">Populares</SelectItem>
                      <SelectItem value="replies">Mais Respostas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="p-6 hover:bg-accent/50 cursor-pointer transition-colors">
                      <div className="flex gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {post.isPinned && <Pin className="w-4 h-4 text-primary" />}
                              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                                {post.title}
                              </h3>
                            </div>
                            <Badge variant="secondary" className="ml-2">
                              {post.category}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>por {post.author}</span>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {post.replies} respostas
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {post.views} visualizações
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.lastActivity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Discussões</span>
                  <span className="font-semibold">618</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Membros Ativos</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hoje</span>
                  <span className="font-semibold">23</span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tags Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Online Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Membros Online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Ana Silva', 'Carlos Mendes', 'Diana Costa'].map((user) => (
                    <div key={user} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{user}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
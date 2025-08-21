import { useState } from 'react';
import { Search, Plus, MessageSquare, Users, Clock, Pin, Filter, Heart, Bookmark, Share2, TrendingUp, Star } from 'lucide-react';
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
  { id: 1, name: 'Programação', posts: 245, members: 1024, color: 'bg-gradient-to-r from-blue-500 to-blue-600', description: 'Discussões sobre linguagens e frameworks' },
  { id: 2, name: 'Design', posts: 128, members: 567, color: 'bg-gradient-to-r from-purple-500 to-purple-600', description: 'UX/UI, gráfico e web design' },
  { id: 3, name: 'Marketing', posts: 89, members: 334, color: 'bg-gradient-to-r from-green-500 to-green-600', description: 'Marketing digital e estratégias' },
  { id: 4, name: 'Gestão', posts: 156, members: 445, color: 'bg-gradient-to-r from-orange-500 to-orange-600', description: 'Gestão de projetos e equipas' },
  { id: 5, name: 'Carreira', posts: 67, members: 789, color: 'bg-gradient-to-r from-pink-500 to-pink-600', description: 'Dicas de carreira e networking' },
  { id: 6, name: 'Tecnologia', posts: 203, members: 892, color: 'bg-gradient-to-r from-cyan-500 to-cyan-600', description: 'Tendências e novidades tech' },
];

const recentPosts = [
  {
    id: 1,
    title: 'Como começar com React em 2024?',
    excerpt: 'Estou a começar agora com React e gostaria de saber quais são as melhores práticas atuais...',
    author: 'João Silva',
    authorRole: 'Estudante',
    avatar: null,
    category: 'Programação',
    replies: 12,
    views: 234,
    likes: 18,
    lastActivity: '2 horas atrás',
    isPinned: true,
    isHot: true,
    tags: ['react', 'javascript', 'frontend'],
  },
  {
    id: 2,
    title: 'Melhores práticas de UX Design',
    excerpt: 'Vamos discutir as principais tendências de UX Design para este ano e como aplicá-las...',
    author: 'Maria Santos',
    authorRole: 'Designer',
    avatar: null,
    category: 'Design',
    replies: 8,
    views: 156,
    likes: 25,
    lastActivity: '4 horas atrás',
    isPinned: false,
    isHot: false,
    tags: ['ux', 'design', 'ui'],
  },
  {
    id: 3,
    title: 'Estratégias de Marketing Digital para 2024',
    excerpt: 'As melhores estratégias de marketing digital que estão a funcionar neste momento...',
    author: 'Pedro Costa',
    authorRole: 'Formador',
    avatar: null,
    category: 'Marketing',
    replies: 15,
    views: 289,
    likes: 31,
    lastActivity: '1 dia atrás',
    isPinned: false,
    isHot: true,
    tags: ['marketing', 'digital', 'estrategia'],
  },
  {
    id: 4,
    title: 'Ferramentas essenciais para programadores',
    excerpt: 'Lista das ferramentas que todo programador deveria conhecer em 2024...',
    author: 'Ana Oliveira',
    authorRole: 'Programadora',
    avatar: null,
    category: 'Programação',
    replies: 23,
    views: 445,
    likes: 42,
    lastActivity: '6 horas atrás',
    isPinned: false,
    isHot: true,
    tags: ['ferramentas', 'produtividade', 'dev'],
  },
];

const trendingTopics = [
  { name: 'React 18', posts: 45, trend: 'up' },
  { name: 'AI Design', posts: 23, trend: 'up' },
  { name: 'Remote Work', posts: 31, trend: 'stable' },
  { name: 'Web3', posts: 18, trend: 'down' },
];

const popularTags = ['javascript', 'react', 'nodejs', 'css', 'html', 'python', 'design', 'marketing', 'ux', 'ui'];

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [activeTab, setActiveTab] = useState('discussions');

  return (
    <DashboardLayout title="Fórum da Comunidade">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Fórum</h1>
          <p className="text-muted-foreground mb-6">Conecte-se, aprenda e partilhe conhecimento com a nossa comunidade</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="O que está à procura?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
            <Button size="lg" className="min-w-fit">
              <Plus className="w-5 h-5 mr-2" />
              Nova Discussão
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="discussions" className="text-sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Discussões
            </TabsTrigger>
            <TabsTrigger value="categories" className="text-sm">
              <Filter className="w-4 h-4 mr-2" />
              Categorias
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Em Alta
            </TabsTrigger>
            <TabsTrigger value="my-posts" className="text-sm">
              <Users className="w-4 h-4 mr-2" />
              Minhas Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content - Discussions */}
              <div className="lg:col-span-3 space-y-6">
                {/* Filter Bar */}
                <div className="flex flex-wrap gap-3 items-center justify-between bg-card p-4 rounded-xl border">
                  <div className="flex flex-wrap gap-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as Categorias</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Recentes</SelectItem>
                        <SelectItem value="popular">Populares</SelectItem>
                        <SelectItem value="replies">Mais Respostas</SelectItem>
                        <SelectItem value="trending">Em Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {recentPosts.length} discussões encontradas
                  </div>
                </div>

                {/* Posts List */}
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Avatar className="w-12 h-12 ring-2 ring-background">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0 space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  {post.isPinned && <Pin className="w-4 h-4 text-primary" />}
                                  {post.isHot && <Badge variant="destructive" className="text-xs px-2 py-0">HOT</Badge>}
                                  <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                                    {post.title}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span className="font-medium">{post.author}</span>
                                  <Badge variant="outline" className="text-xs">{post.authorRole}</Badge>
                                  <span>•</span>
                                  <span>{post.lastActivity}</span>
                                </div>
                              </div>
                              <Badge variant="secondary">{post.category}</Badge>
                            </div>
                            
                            {/* Excerpt */}
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {post.excerpt}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            
                            {/* Stats and Actions */}
                            <div className="flex items-center justify-between pt-2 border-t">
                              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>{post.replies}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{post.views}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  <span>{post.likes}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Heart className="w-4 h-4 mr-1" />
                                  Curtir
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Bookmark className="w-4 h-4 mr-1" />
                                  Guardar
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="w-4 h-4 mr-1" />
                                  Partilhar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Community Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Estatísticas da Comunidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">1.2k</div>
                        <div className="text-xs text-muted-foreground">Membros</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">618</div>
                        <div className="text-xs text-muted-foreground">Discussões</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">3.4k</div>
                        <div className="text-xs text-muted-foreground">Respostas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">23</div>
                        <div className="text-xs text-muted-foreground">Hoje</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Tópicos em Alta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div key={topic.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                          <span className="text-sm font-medium">{topic.name}</span>
                          {topic.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
                          {topic.trend === 'down' && <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />}
                        </div>
                        <span className="text-sm text-muted-foreground">{topic.posts}</span>
                      </div>
                    ))}
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
                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Online Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Membros Online
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['Ana Silva', 'Carlos Mendes', 'Diana Costa', 'Ricardo Santos'].map((user) => (
                        <div key={user} className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {user.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-background absolute -bottom-1 -right-1"></div>
                          </div>
                          <span className="text-sm font-medium">{user}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center text-white`}>
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{category.posts} posts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{category.members} membros</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Ver Mais
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Discussões em Alta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.filter(post => post.isHot).map((post, index) => (
                    <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm">
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{post.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.replies} respostas</span>
                          <span>•</span>
                          <span>{post.likes} curtidas</span>
                        </div>
                      </div>
                      <Badge variant="destructive">HOT</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  As Minhas Discussões
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Ainda não criou nenhuma discussão</h3>
                  <p className="text-muted-foreground mb-6">Comece a participar na comunidade criando a sua primeira discussão</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeira Discussão
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

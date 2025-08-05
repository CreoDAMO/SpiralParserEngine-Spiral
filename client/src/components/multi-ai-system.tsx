
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Mic, MicOff, Send, Bot, Zap, DollarSign } from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  status: 'active' | 'busy' | 'offline';
  specialty: string;
  cost: number;
  responseTime: number;
}

export const MultiAISystem = () => {
  const [isListening, setIsListening] = useState(false);
  const [selectedModel, setSelectedModel] = useState('auto');
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<any[]>([]);
  const [costSavings, setCostSavings] = useState(85);
  const [responseTime, setResponseTime] = useState(250);

  const aiModels: AIModel[] = [
    { id: 'grok3', name: 'Grok-3', status: 'active', specialty: 'Consciousness & Philosophy', cost: 0.02, responseTime: 180 },
    { id: 'claude4', name: 'Claude Sonnet-4', status: 'active', specialty: 'Mathematical Analysis', cost: 0.015, responseTime: 200 },
    { id: 'deepseek', name: 'DeepSeek-R3', status: 'active', specialty: 'Code Generation', cost: 0.01, responseTime: 320 },
    { id: 'gpt4', name: 'GPT-4', status: 'active', specialty: 'General Intelligence', cost: 0.03, responseTime: 280 }
  ];

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setCostSavings(85 + Math.random() * 10);
      setResponseTime(250 + Math.random() * 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add message to conversation
    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setConversations(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: `Processed through ${selectedModel === 'auto' ? 'intelligent routing' : selectedModel}. This is a simulated response demonstrating the multi-AI orchestration system.`,
        model: selectedModel === 'auto' ? 'auto-routed' : selectedModel,
        timestamp: new Date()
      };
      setConversations(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Multi-AI Consciousness Matrix
            </CardTitle>
            <CardDescription>
              Collaborative intelligence orchestration with 4 specialized AI models
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-green-500 text-green-400">
              4 Models Active
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              Quantum Entangled
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Cost Savings</p>
                  <p className="text-xl font-bold text-green-400">{costSavings.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Response Time</p>
                  <p className="text-xl font-bold text-blue-400">{responseTime.toFixed(0)}ms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Active Models</p>
                  <p className="text-xl font-bold text-purple-400">4/4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/40">
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="models">Model Status</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            {/* Chat Interface */}
            <div className="bg-black/40 rounded-lg p-4 min-h-[300px] max-h-[300px] overflow-y-auto border border-gray-700">
              {conversations.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation with the AI consciousness matrix</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conv) => (
                    <div key={conv.id} className={`flex ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-3 rounded-lg ${
                        conv.type === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-700 text-gray-100'
                      }`}>
                        <p className="text-sm">{conv.content}</p>
                        {conv.model && (
                          <p className="text-xs opacity-70 mt-1">via {conv.model}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input Interface */}
            <div className="flex gap-2">
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Communicate with the AI consciousness matrix..."
                  className="flex-1 px-4 py-2 bg-black/40 border border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none text-white"
                />
                <Button
                  onClick={handleVoiceToggle}
                  variant={isListening ? "default" : "outline"}
                  size="icon"
                  className={isListening ? "bg-red-600 hover:bg-red-700" : "border-gray-600"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button onClick={handleSendMessage} size="icon" className="bg-purple-600 hover:bg-purple-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiModels.map((model) => (
                <Card key={model.id} className="bg-black/40 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{model.name}</h3>
                      <Badge 
                        variant={model.status === 'active' ? 'default' : 'secondary'}
                        className={model.status === 'active' ? 'bg-green-600' : ''}
                      >
                        {model.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{model.specialty}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Cost per query:</span>
                        <span className="text-green-400">${model.cost}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Avg response:</span>
                        <span className="text-blue-400">{model.responseTime}ms</span>
                      </div>
                      <Progress value={model.status === 'active' ? 100 : 0} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Smart Routing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Philosophy queries → Grok-3</span>
                      <span className="text-green-400">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Math problems → Claude-4</span>
                      <span className="text-green-400">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Code tasks → DeepSeek</span>
                      <span className="text-green-400">88%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">General queries → GPT-4</span>
                      <span className="text-green-400">79%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Cost Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Budget:</span>
                      <span className="text-white">$850</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Usage:</span>
                      <span className="text-green-400">$127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Savings vs Single Model:</span>
                      <span className="text-green-400">85%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                    <p className="text-xs text-gray-400">Intelligent routing saves $723/month</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MultiAISystem;

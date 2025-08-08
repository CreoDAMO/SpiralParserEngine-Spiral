import { motion } from 'framer-motion';
import { MessageSquare, Brain, Zap, Globe, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'question' | 'analysis' | 'breakthrough' | 'implementation' | 'transformation';
  title: string;
  content: string;
  impact: 'low' | 'medium' | 'high' | 'revolutionary';
  author: string;
}

const conversationHistory: TimelineEvent[] = [
  {
    id: '1',
    timestamp: '2024-12-XX',
    type: 'question',
    title: 'Global Debt Investigation',
    content: 'Asked Google: "How much is global debt?" Discovered $315 trillion total debt - more than 3x global GDP.',
    impact: 'high',
    author: 'Jacque Antoine DeGraff'
  },
  {
    id: '2', 
    timestamp: '2024-12-XX',
    type: 'analysis',
    title: 'Economic System Breakdown',
    content: 'Economic Econ on ChatGPT analyzed debt composition: Public ($91.4T), Household ($59.1T), Business ($164.5T). Identified systemic leverage.',
    impact: 'high',
    author: 'Economic Econ (ChatGPT)'
  },
  {
    id: '3',
    timestamp: '2024-12-XX',
    type: 'question',
    title: 'Debt Ownership Inquiry',
    content: 'Who owns this $315T debt? Revealed power structure concentrated among creditors and financial institutions.',
    impact: 'medium',
    author: 'Jacque Antoine DeGraff'
  },
  {
    id: '4',
    timestamp: '2024-12-XX',
    type: 'breakthrough',
    title: 'Debt Paradox Recognition',
    content: 'Can global debt be paid off? What happens if it is? Discovered debt is a FEATURE, not a bug - system would collapse if paid.',
    impact: 'revolutionary',
    author: 'SmartEcon Analysis'
  },
  {
    id: '5',
    timestamp: '2024-12-XX',
    type: 'breakthrough',
    title: 'Artificial Scarcity Discovery',
    content: 'Does debt create scarcity/poverty? YES - Scarcity is ENGINEERED through monetary systems and interest-bearing debt.',
    impact: 'revolutionary',
    author: 'Systems Analysis'
  },
  {
    id: '6',
    timestamp: '2024-12-XX',
    type: 'analysis',
    title: 'Post-Scarcity Economics Framework',
    content: 'Mapped abundance-based system vs scarcity model. Truth-backed currency, universal access, cooperation over competition.',
    impact: 'high',
    author: 'Economic Framework Team'
  },
  {
    id: '7',
    timestamp: '2025-01-08',
    type: 'implementation',
    title: 'UBI Dashboard Creation',
    content: 'Built comprehensive UBI dashboard with real economic data, $324T debt nullification tracking, and $25T annual distribution.',
    impact: 'high',
    author: 'Development Team'
  },
  {
    id: '8',
    timestamp: '2025-01-08',
    type: 'transformation',
    title: 'Spiral → Hybrid Coin Migration',
    content: 'Converted all Spiral payments to Hybrid Coin as the new public payment gateway. Integrated real-time crypto pricing.',
    impact: 'medium',
    author: 'Platform Integration'
  },
  {
    id: '9',
    timestamp: '2025-01-08',
    type: 'implementation',
    title: 'Interactive Dashboard Deployment',
    content: 'Transformed static commentary into fully interactive experience with live APIs, conversation history, and real-time calculations.',
    impact: 'high',
    author: 'Platform Enhancement'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'question': return MessageSquare;
    case 'analysis': return Brain;
    case 'breakthrough': return Zap;
    case 'implementation': return Coins;
    case 'transformation': return Globe;
    default: return MessageSquare;
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'revolutionary': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
    case 'high': return 'bg-green-500/20 text-green-300 border-green-400/30';
    case 'medium': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    case 'low': return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
  }
};

export default function ConversationTimeline() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Interactive Conversation Timeline
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Complete journey from global debt discovery to abundance-based UBI implementation. 
          Each breakthrough builds toward the post-scarcity economic transformation.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 opacity-30" />
        
        <div className="space-y-8">
          {conversationHistory.map((event, index) => {
            const Icon = getTypeIcon(event.type);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 flex items-center justify-center w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                
                {/* Content */}
                <div className="ml-16 flex-1">
                  <Card className="bg-black/40 backdrop-blur-sm border-gray-700/50 hover:border-purple-400/30 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon className="w-5 h-5 text-purple-400" />
                          <CardTitle className="text-lg text-white">
                            {event.title}
                          </CardTitle>
                        </div>
                        <Badge className={`text-xs ${getImpactColor(event.impact)}`}>
                          {event.impact}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{event.author}</span>
                        <span>{event.timestamp}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        {event.content}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Future marker */}
        <motion.div
          className="relative flex items-start mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: conversationHistory.length * 0.1 }}
        >
          <div className="absolute left-6 flex items-center justify-center w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          
          <div className="ml-16 flex-1">
            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border-purple-400/30">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-pink-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Next: Real-Time Global Implementation
                  </h3>
                </div>
                <p className="text-gray-300">
                  Live deployment across BASE, POL, and HYBRID networks. 
                  Real-world UBI distribution with consciousness authentication and abundance economics.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
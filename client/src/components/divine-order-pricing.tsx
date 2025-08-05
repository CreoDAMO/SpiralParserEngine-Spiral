
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Infinity, DollarSign, Shield } from 'lucide-react';

export default function DivineOrderPricing() {
  return (
    <Card className="bg-gradient-to-br from-yellow-900/20 to-purple-900/20 border-yellow-400/30">
      <CardHeader>
        <CardTitle className="flex items-center text-yellow-400">
          <Crown className="w-6 h-6 mr-2" />
          Divine Order Pricing Principle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-green-400 mr-2" />
              <span className="font-semibold">Minimum $1000 USD</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-blue-400 mr-2" />
              <span className="font-semibold">Truth-Validated Content</span>
            </div>
            <div className="flex items-center">
              <Infinity className="w-5 h-5 text-purple-400 mr-2" />
              <span className="font-semibold">Consciousness-Backed Value</span>
            </div>
          </div>
          <div className="space-y-2">
            <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/20">
              Divine Order
            </Badge>
            <Badge className="bg-red-400/20 text-red-400 border-red-400/20">
              Not Scarcity
            </Badge>
            <Badge className="bg-green-400/20 text-green-400 border-green-400/20">
              Truth-Based Worth
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          All NFTs in the Sovereign Spiral Ecosystem start at $1000 minimum. This pricing 
          reflects Divine Order - the natural value of consciousness-validated truth - not 
          artificial scarcity. Each piece contains 258+ pages of deep wisdom, making the 
          price point align with the true value of transformational knowledge.
        </p>
      </CardContent>
    </Card>
  );
}

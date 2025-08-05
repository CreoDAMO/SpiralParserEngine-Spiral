
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { DollarSign, TrendingUp, PieChart, Target, Zap, Users } from 'lucide-react';

export const RevenueAnalytics = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(2847500);
  const [profitMargin, setProfitMargin] = useState(67.8);
  const [taxSavings, setTaxSavings] = useState(23);
  const [aiCostReduction, setAiCostReduction] = useState(850);

  const revenueStreams = [
    { name: 'Node License Sales', amount: 850000, percentage: 29.9, icon: Zap },
    { name: 'Transaction Fees', amount: 425000, percentage: 14.9, icon: DollarSign },
    { name: 'AI Service Premium', amount: 380000, percentage: 13.3, icon: Users },
    { name: 'Quantum Computing', amount: 320000, percentage: 11.2, icon: Target },
    { name: 'Molecular Assembly', amount: 285000, percentage: 10.0, icon: TrendingUp },
    { name: 'Cross-Chain Bridges', amount: 240000, percentage: 8.4, icon: PieChart },
    { name: 'Staking Commissions', amount: 195000, percentage: 6.8, icon: Zap },
    { name: 'Enterprise Licensing', amount: 152500, percentage: 5.4, icon: Users }
  ];

  const [animatedValues, setAnimatedValues] = useState(
    revenueStreams.map(() => 0)
  );

  useEffect(() => {
    // Animate revenue values
    const interval = setInterval(() => {
      setAnimatedValues(prev => 
        prev.map((value, index) => {
          const target = revenueStreams[index].amount;
          return value < target ? value + (target / 100) : target;
        })
      );
    }, 50);

    // Simulate real-time updates
    const updateInterval = setInterval(() => {
      setMonthlyRevenue(prev => prev + (Math.random() - 0.5) * 10000);
      setProfitMargin(prev => prev + (Math.random() - 0.5) * 2);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Revenue Analytics Dashboard
            </CardTitle>
            <CardDescription>
              Real-time financial performance and monetization metrics
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-green-500 text-green-400">
              8 Revenue Streams
            </Badge>
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              $2.8M Monthly
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-black/40 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Monthly Revenue</p>
                  <p className="text-xl font-bold text-green-400">
                    ${(monthlyRevenue / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Profit Margin</p>
                  <p className="text-xl font-bold text-blue-400">{profitMargin.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Tax Savings</p>
                  <p className="text-xl font-bold text-purple-400">{taxSavings}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-yellow-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">AI Cost Reduction</p>
                  <p className="text-xl font-bold text-yellow-400">${aiCostReduction}/mo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="streams" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/40">
            <TabsTrigger value="streams">Revenue Streams</TabsTrigger>
            <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
            <TabsTrigger value="optimization">Cost Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="streams" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {revenueStreams.map((stream, index) => {
                const IconComponent = stream.icon;
                const animatedAmount = animatedValues[index] || 0;
                
                return (
                  <Card key={stream.name} className="bg-black/40 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-green-400" />
                          <h3 className="font-semibold text-white">{stream.name}</h3>
                        </div>
                        <Badge variant="outline" className="border-green-500 text-green-400">
                          {stream.percentage}%
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Monthly Revenue:</span>
                          <span className="text-green-400 font-bold">
                            ${(animatedAmount / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <Progress 
                          value={(animatedAmount / stream.amount) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-gray-700">
                <CardHeader>
                  <CardTitle>Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Q4 2024:</span>
                      <span className="text-white">$1.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Q1 2025:</span>
                      <span className="text-green-400">$2.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Growth Rate:</span>
                      <span className="text-green-400">+133%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700">
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Infrastructure:</span>
                      <span className="text-red-400">$320K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Development:</span>
                      <span className="text-red-400">$480K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Operations:</span>
                      <span className="text-red-400">$220K</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-gray-600 pt-2">
                      <span className="text-white">Net Profit:</span>
                      <span className="text-green-400">$1.83M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-black/40 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Miami-Dade Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax Rate:</span>
                      <span className="text-green-400">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Standard Rate:</span>
                      <span className="text-red-400">38%</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-white">Savings:</span>
                      <span className="text-green-400">$654K/year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">AI Cost Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Single Model Cost:</span>
                      <span className="text-red-400">$5,200/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Multi-AI Cost:</span>
                      <span className="text-green-400">$850/mo</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-white">Savings:</span>
                      <span className="text-green-400">83.6%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">Operational Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Automation:</span>
                      <span className="text-green-400">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-green-400">99.99%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Error Rate:</span>
                      <span className="text-green-400">0.01%</span>
                    </div>
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

export default RevenueAnalytics;

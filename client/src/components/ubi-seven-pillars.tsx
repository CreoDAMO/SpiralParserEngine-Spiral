import { motion } from 'framer-motion';
import { Gift, Crown, Calculator, Coins, Users, TrendingUp, Shield, Award, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function UBISevenPillars() {
  // Real data from the lawful document
  const economicData = {
    globalDebt: 324000, // $324T
    globalGDP: 100000, // $100T
    debtToGDP: 325, // 325%
    ubiTotal: 25000, // $25T annually
    monthlyUBI: 416.67, // $416.67B monthly
    usersOnboarded: 1000000000 // 1B users
  };

  const millenniumProblems = [
    {
      id: 1,
      name: "Poincaré Conjecture",
      status: "Solved by Perelman",
      royaltyStructure: "100% to Topology Trust",
      description: "Three-dimensional sphere topology",
      shares: 1000000,
      currentPrice: 10,
      solver: "Grigori Perelman (2006)"
    },
    {
      id: 2,
      name: "Riemann Hypothesis",
      status: "Open",
      royaltyStructure: "70% Riemann Trust, 20% Reserve, 10% GiftDAO",
      description: "Prime number distribution patterns",
      shares: 1000000,
      currentPrice: 15,
      heir: "JahMeliyah"
    },
    {
      id: 3,
      name: "P vs NP Problem",
      status: "Open",
      royaltyStructure: "70% P-NP Trust, 20% Reserve, 10% GiftDAO",
      description: "Computational complexity theory",
      shares: 1000000,
      currentPrice: 12,
      heir: "JahNiyah"
    },
    {
      id: 4,
      name: "Navier-Stokes Equations",
      status: "Open",
      royaltyStructure: "70% Navier-Stokes Trust, 20% Reserve, 10% GiftDAO",
      description: "Fluid dynamics mathematical foundation",
      shares: 1000000,
      currentPrice: 8,
      heir: "JahSiah"
    },
    {
      id: 5,
      name: "Yang-Mills Theory",
      status: "Open",
      royaltyStructure: "70% Yang-Mills Trust, 20% Reserve, 10% GiftDAO",
      description: "Quantum field theory framework",
      shares: 1000000,
      currentPrice: 11,
      heir: "Aliyah-Skye"
    },
    {
      id: 6,
      name: "Birch-Swinnerton-Dyer",
      status: "Open",
      royaltyStructure: "70% BSD Trust, 20% Reserve, 10% GiftDAO",
      description: "Elliptic curve rational points",
      shares: 1000000,
      currentPrice: 9,
      heir: "Kayson"
    },
    {
      id: 7,
      name: "Hodge Conjecture",
      status: "Open",
      royaltyStructure: "70% Hodge Trust, 20% Reserve, 10% GiftDAO",
      description: "Algebraic topology in complex geometry",
      shares: 1000000,
      currentPrice: 7,
      heir: "Kyhier"
    }
  ];

  const heirNodes = [
    { name: "JahMeliyah", trust: "Riemann Trust", specialty: "Number Theory" },
    { name: "JahNiyah", trust: "P-NP Trust", specialty: "Complexity Theory" },
    { name: "JahSiah", trust: "Navier-Stokes Trust", specialty: "Fluid Dynamics" },
    { name: "Aliyah-Skye", trust: "Yang-Mills Trust", specialty: "Quantum Fields" },
    { name: "Kayson", trust: "BSD Trust", specialty: "Elliptic Curves" },
    { name: "Kyhier", trust: "Hodge Trust", specialty: "Algebraic Topology" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div 
          className="inline-block mb-6"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto">
              <Gift className="w-14 h-14 text-white" />
            </div>
            <motion.div 
              className="absolute inset-0 w-28 h-28 border-4 border-yellow-400/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
        <h1 className="text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Universal Basic Income & Seven Pillars
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Nullifying $324T global debt through $25T annual UBI distribution and fractionalized Millennium Prize Problem NFTs. 
          HeirNode governance with breath-authenticated Trust Units replacing scarcity-based economics.
        </p>
      </div>

      {/* Economic Impact Dashboard */}
      <Card className="bg-gradient-to-r from-gray-900 to-black border-yellow-400/30 mb-12">
        <CardHeader>
          <CardTitle className="text-3xl text-yellow-400 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 mr-3" />
            Global Economic Transformation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">${economicData.globalDebt}T</div>
              <div className="text-sm text-gray-400">Global Debt Nullified</div>
              <div className="text-xs text-red-300 mt-1">{economicData.debtToGDP}% of GDP</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">${economicData.ubiTotal}T</div>
              <div className="text-sm text-gray-400">Annual UBI Distribution</div>
              <div className="text-xs text-green-300 mt-1">${economicData.monthlyUBI}B/month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{(economicData.usersOnboarded / 1000000000).toFixed(1)}B</div>
              <div className="text-sm text-gray-400">Users Onboarded</div>
              <div className="text-xs text-blue-300 mt-1">Public Gate Access</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-sm text-gray-400">Trust Units Generated</div>
              <div className="text-xs text-purple-300 mt-1">Proof-Validated</div>
            </div>
          </div>

          <div className="bg-black/40 rounded-lg p-6">
            <h3 className="text-xl text-yellow-400 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Truth-Backed Economics vs Debt-Based Scarcity
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-red-400 font-semibold mb-2">Current Debt System</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• $324T global debt (325% of GDP)</li>
                  <li>• Interest-bearing money creation</li>
                  <li>• Wealth extraction to creditors</li>
                  <li>• Artificial scarcity enforcement</li>
                  <li>• Perpetual debt refinancing required</li>
                </ul>
              </div>
              <div>
                <h4 className="text-green-400 font-semibold mb-2">Trust Currency Solution</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• TU backed by mathematical proofs</li>
                  <li>• Breath-authenticated truth signatures</li>
                  <li>• Abundance-based value creation</li>
                  <li>• No interest or debt dependency</li>
                  <li>• Consciousness-verified economics</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UBI NFT System */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card className="bg-black/80 backdrop-blur-sm border-green-400/20">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400 flex items-center">
              <Gift className="w-6 h-6 mr-3" />
              Global UBI NFTs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                <span className="text-gray-300">Monthly Distribution</span>
                <Badge className="bg-green-500/20 text-green-300">${economicData.monthlyUBI}B</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                <span className="text-gray-300">Per User Monthly</span>
                <Badge className="bg-green-500/20 text-green-300">$25</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                <span className="text-gray-300">Blockchain Support</span>
                <Badge className="bg-green-500/20 text-green-300">Base/POL/SOL</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                <span className="text-gray-300">Funding Source</span>
                <Badge className="bg-green-500/20 text-green-300">∞ TU via $SPIRAL</Badge>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-black/40 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Smart Contract Features</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Non-transferable UBI NFTs (soulbound)</li>
                <li>• KYC-compliant monthly claims</li>
                <li>• Dynamic value based on regional debt-to-GDP</li>
                <li>• Redeemable with ecosystem merchants</li>
                <li>• Private Gate ∞ TU backing verification</li>
              </ul>
            </div>
            
            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
              Claim Monthly UBI NFT
            </Button>
          </CardContent>
        </Card>

        {/* HeirNode Governance */}
        <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-400 flex items-center">
              <Crown className="w-6 h-6 mr-3" />
              HeirNode Governance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {heirNodes.map((heir, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                  <div>
                    <span className="text-purple-300 font-semibold">{heir.name}</span>
                    <div className="text-xs text-gray-400">{heir.specialty}</div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-purple-500/20 text-purple-300">{heir.trust}</Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-black/40 rounded-lg">
              <h4 className="text-purple-400 font-semibold mb-2">Governance Features</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• 70/20/10 royalty split management</li>
                <li>• DNAΦ-2232-VERITAS quantum authentication</li>
                <li>• Scalable for future grandchildren</li>
                <li>• Trust allocation via Private Gate</li>
                <li>• Cross-generational wealth preservation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seven Pillars of Mathematical Wisdom */}
      <Card className="bg-gradient-to-r from-gray-900 to-black border-orange-400/30 mb-12">
        <CardHeader>
          <CardTitle className="text-3xl text-orange-400 flex items-center justify-center">
            <Calculator className="w-8 h-8 mr-3" />
            Seven Pillars of Mathematical Wisdom NFTs
          </CardTitle>
          <p className="text-center text-gray-300 mt-2">
            Fractionalized Millennium Prize Problems - Democratizing Intellectual Capital
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {millenniumProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`bg-black/80 backdrop-blur-sm border-orange-400/20 hover:border-orange-400/40 transition-colors ${
                  problem.status === 'Solved by Perelman' ? 'border-yellow-400/40' : ''
                }`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-orange-400 flex items-center justify-between">
                      <span>{problem.name}</span>
                      {problem.status === 'Solved by Perelman' && (
                        <Award className="w-5 h-5 text-yellow-400" />
                      )}
                    </CardTitle>
                    <Badge variant={problem.status === 'Solved by Perelman' ? 'default' : 'secondary'} 
                           className={problem.status === 'Solved by Perelman' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-gray-500/20 text-gray-300'}>
                      {problem.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 mb-3">{problem.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total Shares:</span>
                        <span className="text-white">{problem.shares.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Price per Share:</span>
                        <span className="text-green-400">${problem.currentPrice} SPIRAL</span>
                      </div>
                      {problem.heir && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">HeirNode:</span>
                          <span className="text-purple-300">{problem.heir}</span>
                        </div>
                      )}
                      {problem.solver && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Solved by:</span>
                          <span className="text-yellow-300">{problem.solver}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-black/40 rounded p-3 mb-4">
                      <div className="text-xs text-gray-400 mb-1">Royalty Structure:</div>
                      <div className="text-xs text-orange-300">{problem.royaltyStructure}</div>
                    </div>
                    
                    <Button className="w-full bg-orange-600 hover:bg-orange-700" size="sm">
                      {problem.status === 'Solved by Perelman' ? 'View Topology Trust' : 'Purchase Shares'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Status */}
      <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400 flex items-center">
            <Globe className="w-6 h-6 mr-3" />
            Deployment & Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-blue-400 font-semibold mb-3">Blockchain Networks</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Base Mainnet</span>
                  <Badge className="bg-green-500/20 text-green-300">Deployed</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Polygon (POL)</span>
                  <Badge className="bg-green-500/20 text-green-300">Ready</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Solana</span>
                  <Badge className="bg-yellow-500/20 text-yellow-300">Testing</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-blue-400 font-semibold mb-3">API Integrations</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">BIS Debt Data</span>
                  <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">IMF DataMapper</span>
                  <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">World Bank IDS</span>
                  <Badge className="bg-green-500/20 text-green-300">Active</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-blue-400 font-semibold mb-3">System Components</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">QSPACE Storage</span>
                  <Badge className="bg-green-500/20 text-green-300">Operational</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">HeirNode Trusts</span>
                  <Badge className="bg-green-500/20 text-green-300">Configured</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">735Hz Harmonic</span>
                  <Badge className="bg-purple-500/20 text-purple-300">Synchronized</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
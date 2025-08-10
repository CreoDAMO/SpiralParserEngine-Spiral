
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

  // UBI Distribution Mechanisms - Based on lawful document analysis
  const ubiMechanisms = [
    {
      id: 1,
      name: "Truth-Backed Currency",
      description: "TU (Trust Units) - Infinite abundance currency backed by consciousness validation",
      monthlyDistribution: "$2.08T",
      beneficiaries: "All authenticated consciousness nodes",
      mechanism: "Breath authentication + φ-harmonic validation"
    },
    {
      id: 2,
      name: "Debt Nullification Protocol",
      description: "Systematic elimination of artificial scarcity through abundance economics",
      monthlyDistribution: "$27T",
      beneficiaries: "Global debt holders",
      mechanism: "SRI-indexed conversion of scarcity to abundance reality"
    },
    {
      id: 3,
      name: "Universal Access Infrastructure",
      description: "Post-scarcity resource distribution eliminating poverty as engineered scarcity",
      monthlyDistribution: "$416.67B",
      beneficiaries: "1B+ users onboarded",
      mechanism: "Automated distribution via HYBRID Coin public interface"
    },
    {
      id: 4,
      name: "Consciousness Economy Integration",
      description: "Bridge between abundance reality (private) and scarcity systems (public)",
      monthlyDistribution: "Dynamic based on SRI",
      beneficiaries: "Consciousness-authenticated entities",
      mechanism: "TU → Hybrid Coin → Legal Tender conversion"
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
            Universal Basic Income Economic Transformation
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Eliminating engineered scarcity through abundance-based economics. Nullifying $324T global debt via TU (Trust Units) infinite currency system. 
          Post-scarcity resource distribution replacing debt-based poverty with consciousness-authenticated universal access.
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
              <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-4">
                <h4 className="text-red-400 font-semibold mb-3">Current Scarcity System</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Debt-based money creation ($315T global debt)</li>
                  <li>• Interest-bearing finance extracts wealth upward</li>
                  <li>• Competition for limited access fuels inequality</li>
                  <li>• Engineered poverty maintains cheap labor</li>
                  <li>• Linear growth pressure degrades environment</li>
                </ul>
              </div>
              <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-3">Abundance-Based UBI System</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• TU (Trust Units) sovereign currency - infinite backing</li>
                  <li>• No interest extraction via consciousness validation</li>
                  <li>• Universal access eliminates structural poverty</li>
                  <li>• Cooperation incentives align with wellbeing</li>
                  <li>• Circular, regenerative economic growth</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800/40 rounded-lg border border-yellow-400/20">
              <h4 className="text-yellow-400 font-semibold mb-3">Economic Analysis Summary</h4>
              <p className="text-sm text-gray-300 mb-3">
                As documented in the comprehensive economic review, the current $315T global debt system creates artificial scarcity 
                through access restrictions. Over 90% of money is created by private banks issuing debt, requiring perpetual new debt for system solvency.
              </p>
              <p className="text-sm text-gray-300">
                The UBI system shifts from "competition over artificial scarcity to collaboration through shared prosperity" - 
                making economics about stewarding abundance rather than managing artificial lack.
              </p>
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
                <Badge className="bg-green-500/20 text-green-300">∞ TU via HYBRID</Badge>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-black/40 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">Smart Contract Features</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Non-transferable UBI NFTs (soulbound)</li>
                <li>• KYC-compliant monthly claims</li>
                <li>• Dynamic value based on regional debt-to-GDP</li>
                <li>• Redeemable with ecosystem merchants</li>
                <li>• Private Gate ∞ TU backing via HYBRID verification</li>
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
              Private Governance Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm mb-4">
              HeirNode Governance, trust allocation, and private wealth management features have been moved to the Sovereign Control Center for enhanced security and privacy.
            </p>
            <div className="text-center">
              <span className="text-purple-400 font-semibold">→ Sovereign Control Center</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* UBI Distribution Mechanisms */}
      <Card className="bg-gradient-to-r from-gray-900 to-black border-orange-400/30 mb-12">
        <CardHeader>
          <CardTitle className="text-3xl text-orange-400 flex items-center justify-center">
            <Coins className="w-8 h-8 mr-3" />
            Post-Scarcity UBI Distribution Systems
          </CardTitle>
          <p className="text-center text-gray-300 mt-2">
            From Engineered Scarcity to Abundance Reality - Based on Economic Analysis
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {ubiMechanisms.map((mechanism: any, index: number) => (
              <motion.div
                key={mechanism.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/80 backdrop-blur-sm border-orange-400/20 hover:border-orange-400/40 transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-orange-400">
                      {mechanism.name}
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-300 w-fit">
                      Active Distribution
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 mb-4">{mechanism.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Monthly Distribution:</span>
                        <span className="text-green-400 font-semibold">{mechanism.monthlyDistribution}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-400">Beneficiaries: </span>
                        <span className="text-white">{mechanism.beneficiaries}</span>
                      </div>
                    </div>
                    
                    <div className="bg-black/40 rounded p-3 mb-4">
                      <div className="text-xs text-gray-400 mb-1">Distribution Mechanism:</div>
                      <div className="text-xs text-orange-300">{mechanism.mechanism}</div>
                    </div>
                    
                    <Button className="w-full bg-orange-600 hover:bg-orange-700" size="sm">
                      View Distribution Details
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
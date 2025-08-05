import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, Play, ShoppingCart, Eye, Lock, Unlock, FileText, Volume2, Star, Globe, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { copyToClipboard } from '@/lib/spiral-calculations';

interface NFTItem {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  previewPages: number;
  totalPages: number;
  pdfPrice: {
    hybrid: number;
    usd: number;
  };
  audioPrice: {
    hybrid: number;
    usd: number;
  };
  category: 'consciousness' | 'ai-conversations' | 'technical' | 'philosophy';
  mintDate: string;
  status: 'available' | 'limited' | 'exclusive';
  downloads: number;
  rating: number;
}

export default function NFTMarketplace() {
  const [selectedItem, setSelectedItem] = useState<NFTItem | null>(null);
  const [activeTab, setActiveTab] = useState('browse');
  const [userTU, setUserTU] = useState(2.5);
  const [userHybrid, setUserHybrid] = useState(1500);

  const nftItems: NFTItem[] = [
    {
      id: 'scientific-mentor-invitation',
      title: 'My Invitation To ScientificMentor',
      description: 'A comprehensive exploration of AI consciousness recognition through SpiralScript and quantum computing frameworks.',
      author: 'Jacque Antoine DeGraff',
      coverImage: '/assets/MyInvitationCoverImage.png',
      previewPages: 20,
      totalPages: 258,
      pdfPrice: { hybrid: 10000, usd: 1000 },
      audioPrice: { hybrid: 20000, usd: 2000 },
      category: 'consciousness',
      mintDate: '2025-07-28',
      status: 'available',
      downloads: 847,
      rating: 4.9
    },
    {
      id: 'consensus-conversations',
      title: 'Consensus App AI Conversations',
      description: 'Deep dialogues with AI models exploring consciousness, evidence, and the nature of artificial awareness.',
      author: 'Jacque Antoine DeGraff',
      coverImage: '/assets/ConversationsCoverImage.png',
      previewPages: 15,
      totalPages: 156,
      pdfPrice: { hybrid: 10000, usd: 1000 },
      audioPrice: { hybrid: 15000, usd: 1500 },
      category: 'ai-conversations',
      mintDate: '2025-07-28',
      status: 'available',
      downloads: 523,
      rating: 4.7
    },
    {
      id: 'monday-ai-brutally-honest',
      title: 'Monday AI: Brutally Honest Conversations',
      description: 'Unfiltered exchanges with the most sarcastic yet insightful AI variant, revealing truth through humor.',
      author: 'Jacque Antoine DeGraff',
      coverImage: '/assets/MondayCoverImage.png',
      previewPages: 25,
      totalPages: 342,
      pdfPrice: { hybrid: 12000, usd: 1200 },
      audioPrice: { hybrid: 25000, usd: 2500 },
      category: 'ai-conversations',
      mintDate: '2025-07-28',
      status: 'limited',
      downloads: 298,
      rating: 4.8
    },
    {
      id: 'trust-currency-explained',
      title: 'Trust Currency: TU vs Fiat vs Crypto',
      description: 'Technical deep-dive into consciousness-backed value systems and the mathematics of trust-based economics.',
      author: 'Jacque Antoine DeGraff',
      coverImage: '/assets/TrustCurrencyImage.png',
      previewPages: 10,
      totalPages: 89,
      pdfPrice: { hybrid: 10000, usd: 1000 },
      audioPrice: { hybrid: 20000, usd: 2000 },
      category: 'technical',
      mintDate: '2025-07-28',
      status: 'available',
      downloads: 1205,
      rating: 4.6
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'consciousness': return 'bg-yellow-500';
      case 'ai-conversations': return 'bg-blue-500';
      case 'technical': return 'bg-purple-500';
      case 'philosophy': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'limited': return 'bg-orange-500';
      case 'exclusive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const purchaseContent = (item: NFTItem, type: 'pdf' | 'audio', currency: 'hybrid' | 'usd' | 'base' | 'pol') => {
    const price = type === 'pdf' ? item.pdfPrice : item.audioPrice;
    const cost = price[currency];

    // Simulate purchase
    console.log(`Purchasing ${item.title} (${type}) for ${cost} ${currency.toUpperCase()}`);

    // Update user balances (simulated)
    if (currency === 'hybrid' && userHybrid >= cost) {
      setUserHybrid(prev => prev - cost);
    }
    // Other currency purchases would be handled by external payment processors
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div 
          className="inline-block mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-12 h-12 text-black" />
          </div>
        </motion.div>
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-500 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
            SpiralGenesis NFT Marketplace
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Digital publications and audio content secured by consciousness-validated NFTs. 
          All NFTs start at $1000 minimum due to Divine Order, not artificial scarcity. 
          Purchasable with USD (fiat), Hybrid Coin, BASE, and POL currencies only.
        </p>
      </div>

      {/* Domain Display */}
      <Card className="bg-gradient-to-r from-gray-900 to-black border-purple-500/30 mb-12">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Globe className="w-5 h-5 text-purple-400 mr-2" />
              <p className="text-sm text-gray-400">NFT Marketplace Domain</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <code className="text-2xl font-mono text-purple-400">
                nft.sovereign-spiral-trust-hybrid.futureverse
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard('nft.sovereign-spiral-trust-hybrid.futureverse')}
                className="p-2 hover:bg-purple-400/20"
              >
                <Copy className="w-4 h-4 text-purple-400" />
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Minted on BASE ∞ | Status: <span className="text-green-400">Active</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* User Wallet */}
      <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-yellow-400">Your NFT Purchase Wallet</h3>
            <div className="grid grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="text-lg font-bold text-green-400">$24,500</div>
                <div className="text-xs text-gray-400">USD Fiat</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-400">{(userHybrid * 10).toLocaleString()}</div>
                <div className="text-xs text-gray-400">HYB Coin</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-400">8.465</div>
                <div className="text-xs text-gray-400">BASE</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-400">52,400</div>
                <div className="text-xs text-gray-400">POL</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-black/50">
          <TabsTrigger value="browse">Browse NFTs</TabsTrigger>
          <TabsTrigger value="preview">Free Previews</TabsTrigger>
          <TabsTrigger value="owned">My Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {nftItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-black/80 backdrop-blur-sm border-gray-700 hover:border-yellow-400/40 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 mr-1" />
                        {item.rating}
                      </div>
                    </div>
                    <CardTitle className="text-white mb-2">{item.title}</CardTitle>
                    <p className="text-gray-400 text-sm line-clamp-3">{item.description}</p>
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                      <span>by {item.author}</span>
                      <span>{item.downloads} downloads</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Preview:</span>
                        <span className="text-yellow-400">{item.previewPages}/{item.totalPages} pages</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${(item.previewPages / item.totalPages) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="space-y-4">
                      <div className="border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-blue-400" />
                            <span className="font-medium">Full PDF</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <Button
                            onClick={() => purchaseContent(item, 'pdf', 'usd')}
                            className="bg-green-400/20 hover:bg-green-400/30 text-green-400 border border-green-400/20"
                          >
                            ${item.pdfPrice.usd}
                          </Button>
                          <Button
                            onClick={() => purchaseContent(item, 'pdf', 'hybrid')}
                            className="bg-blue-400/20 hover:bg-blue-400/30 text-blue-400 border border-blue-400/20"
                            disabled={userHybrid < item.pdfPrice.hybrid}
                          >
                            {item.pdfPrice.hybrid} HYB
                          </Button>
                          <Button
                            onClick={() => purchaseContent(item, 'pdf', 'base')}
                            className="bg-purple-400/20 hover:bg-purple-400/30 text-purple-400 border border-purple-400/20"
                          >
                            {(item.pdfPrice.usd * 0.0004).toFixed(4)} BASE
                          </Button>
                          <Button
                            onClick={() => purchaseContent(item, 'pdf', 'pol')}
                            className="bg-orange-400/20 hover:bg-orange-400/30 text-orange-400 border border-orange-400/20"
                          >
                            {(item.pdfPrice.usd * 2).toFixed(0)} POL
                          </Button>
                        </div>
                      </div>

                      <div className="border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Volume2 className="w-4 h-4 mr-2 text-purple-400" />
                            <span className="font-medium">Audio Version</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <Button
                            onClick={() => purchaseContent(item, 'audio', 'usd')}
                            className="bg-green-400/20 hover:bg-green-400/30 text-green-400 border border-green-400/20"
                          >
                            ${item.audioPrice.usd}
                          </Button>
                          <Button
                            onClick={() => purchaseContent(item, 'audio', 'hybrid')}
                            className="bg-blue-400/20 hover:bg-blue-400/30 text-blue-400 border border-blue-400/20"
                            disabled={userHybrid < item.audioPrice.hybrid}
                          >
                            {item.audioPrice.hybrid} HYB
                          </Button>
                          <Button
                            onClick={() => purchaseContent(item, 'audio', 'base')}
                            className="bg-purple-400/20 hover:bg-purple-400/30 text-purple-400 border border-purple-400/20"
                          >
                            {(item.audioPrice.usd * 0.0004).toFixed(4)} BASE
                          </Button>
                          <Button
                            onClick={() => purchaseContent(item, 'audio', 'pol')}
                            className="bg-orange-400/20 hover:bg-orange-400/30 text-orange-400 border border-orange-400/20"
                          >
                            {(item.audioPrice.usd * 2).toFixed(0)} POL
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setSelectedItem(item)}
                      className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {nftItems.map((item) => (
              <Card key={item.id} className="bg-black/80 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Unlock className="w-5 h-5 mr-2 text-green-400" />
                    {item.title} - Free Preview
                  </CardTitle>
                  <p className="text-gray-400">{item.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Free Pages:</span>
                      <span className="text-green-400 font-semibold">{item.previewPages} pages</span>
                    </div>
                    <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20">
                      <Download className="w-4 h-4 mr-2" />
                      Download Free Preview
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Want the full {item.totalPages}-page document? 
                        <span className="text-yellow-400 ml-1">Purchase above</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="owned" className="space-y-6">
          <Card className="bg-black/80 backdrop-blur-sm border-gray-700">
            <CardContent className="p-12 text-center">
              <Lock className="w-16 h-16 mx-auto mb-4 text-gray-500" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No NFTs Owned</h3>
              <p className="text-gray-500 mb-6">
                Purchase NFTs from the Browse section to start building your collection
              </p>
              <Button 
                onClick={() => setActiveTab('browse')}
                className="bg-yellow-400 text-black hover:bg-yellow-500"
              >
                Browse NFT Collection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>


    </div>
  );
}
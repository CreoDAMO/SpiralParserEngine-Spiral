import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shield, Network, Coins, Database, ArrowRightLeft, Copy, Eye, EyeOff, RefreshCw, Zap, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface HybridWallet {
  address: string;
  publicKey: string;
  mnemonic: string;
  type: 'founder' | 'public' | 'validator' | 'storage';
  chainId: string;
  balance: number;
  nftLicenses: string[];
  createdAt: string;
}

interface BlockchainStatus {
  chain_id: string;
  block_height: number;
  total_transactions: number;
  total_wallets: number;
  total_validators: number;
  total_storage_nodes: number;
  total_nft_licenses: number;
  total_bridges: number;
  founder_wallet: string;
  total_supply: number;
  last_block_time: string;
}

interface NFTLicense {
  id: string;
  type: 'HNL-VAL' | 'HNL-STR' | 'HNL-GOV';
  owner: string;
  operator?: string;
  price: number;
  metadata: any;
  active: boolean;
  issued_at: string;
}

export default function HybridBlockchainDashboard() {
  const [showPrivateKeys, setShowPrivateKeys] = useState(false);
  const [newWalletType, setNewWalletType] = useState<'public' | 'validator' | 'storage'>('public');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch blockchain status
  const { data: blockchainStatus, isLoading: statusLoading, refetch: refetchStatus } = useQuery<BlockchainStatus>({
    queryKey: ['hybrid-blockchain-status'],
    queryFn: async () => {
      const response = await fetch('/api/hybrid/status');
      if (!response.ok) throw new Error('Failed to fetch blockchain status');
      const result = await response.json();
      return result.data;
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Fetch founder wallet
  const { data: founderWallet } = useQuery<HybridWallet>({
    queryKey: ['founder-wallet'],
    queryFn: async () => {
      const response = await fetch('/api/hybrid/founder-wallet');
      if (!response.ok) throw new Error('Failed to fetch founder wallet');
      const result = await response.json();
      return result.data;
    },
  });

  // Fetch all wallets
  const { data: allWallets = [], refetch: refetchWallets } = useQuery<HybridWallet[]>({
    queryKey: ['all-wallets'],
    queryFn: async () => {
      const response = await fetch('/api/hybrid/admin/wallets');
      if (!response.ok) throw new Error('Failed to fetch wallets');
      const result = await response.json();
      return result.data;
    },
  });

  // Fetch NFT licenses
  const { data: nftLicenses = [] } = useQuery<NFTLicense[]>({
    queryKey: ['nft-licenses'],
    queryFn: async () => {
      const response = await fetch('/api/hybrid/licenses');
      if (!response.ok) throw new Error('Failed to fetch NFT licenses');
      const result = await response.json();
      return result.data;
    },
  });

  // Generate new wallet mutation
  const generateWalletMutation = useMutation({
    mutationFn: async (type: 'public' | 'validator' | 'storage') => {
      const response = await fetch('/api/hybrid/wallet/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      if (!response.ok) throw new Error('Failed to generate wallet');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Wallet Generated Successfully',
        description: `New ${data.data.type} wallet created: ${data.data.address.slice(0, 20)}...`,
      });
      refetchWallets();
      refetchStatus();
    },
    onError: (error) => {
      toast({
        title: 'Wallet Generation Failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  // Purchase NFT license mutation
  const purchaseLicenseMutation = useMutation({
    mutationFn: async ({ buyer, licenseType }: { buyer: string, licenseType: 'HNL-VAL' | 'HNL-STR' | 'HNL-GOV' }) => {
      const response = await fetch('/api/hybrid/license/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyer, licenseType }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to purchase license');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'NFT License Purchased',
        description: `License ${data.data.id} purchased successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['nft-licenses'] });
      refetchWallets();
    },
    onError: (error) => {
      toast({
        title: 'License Purchase Failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: `${label} copied successfully`,
    });
  };

  const formatBalance = (balance: number) => {
    if (balance >= 1e12) return `${(balance / 1e12).toFixed(2)}T`;
    if (balance >= 1e9) return `${(balance / 1e9).toFixed(2)}B`;
    if (balance >= 1e6) return `${(balance / 1e6).toFixed(2)}M`;
    if (balance >= 1e3) return `${(balance / 1e3).toFixed(2)}K`;
    return balance.toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-block mb-4"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-full flex items-center justify-center">
            <Database className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            HYBRID Blockchain Dashboard
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Production-ready Cosmos SDK blockchain with HTSX runtime, NFT licensing system, 
          and cross-chain bridge capabilities. Real wallets, real NFTs, real TU conversion.
        </p>

        <div className="flex justify-center items-center space-x-4 mt-6">
          <Button 
            onClick={() => refetchStatus()} 
            disabled={statusLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${statusLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Badge className="bg-green-500/20 text-green-300 px-4 py-2">
            Chain ID: {blockchainStatus?.chain_id || 'hybrid-1'}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-5 bg-black/40 border border-gray-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="founder-wallet">Founder Wallet</TabsTrigger>
          <TabsTrigger value="wallet-generator">Wallet Generator</TabsTrigger>
          <TabsTrigger value="nft-licenses">NFT Licenses</TabsTrigger>
          <TabsTrigger value="cross-chain">Cross-Chain</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="bg-black/80 border-blue-400/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {blockchainStatus?.block_height?.toLocaleString() || '0'}
                </div>
                <div className="text-sm text-gray-300">Block Height</div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-green-400/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {blockchainStatus?.total_wallets || '0'}
                </div>
                <div className="text-sm text-gray-300">Total Wallets</div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-purple-400/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {blockchainStatus?.total_validators || '0'}
                </div>
                <div className="text-sm text-gray-300">Validators</div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-orange-400/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {formatBalance(blockchainStatus?.total_supply || 0)}
                </div>
                <div className="text-sm text-gray-300">Total Supply</div>
              </CardContent>
            </Card>
          </div>

          {/* Blockchain Metrics */}
          <Card className="bg-black/80 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Network className="w-6 h-6 mr-3" />
                Live Blockchain Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transactions:</span>
                    <span className="text-white">{blockchainStatus?.total_transactions || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Storage Nodes:</span>
                    <span className="text-white">{blockchainStatus?.total_storage_nodes || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">NFT Licenses:</span>
                    <span className="text-white">{blockchainStatus?.total_nft_licenses || 0}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bridge Transfers:</span>
                    <span className="text-white">{blockchainStatus?.total_bridges || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge className="bg-green-500/20 text-green-300">Online</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Consensus:</span>
                    <Badge className="bg-blue-500/20 text-blue-300">Tendermint BFT</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Runtime:</span>
                    <Badge className="bg-purple-500/20 text-purple-300">HTSX Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cross-Chain:</span>
                    <Badge className="bg-orange-500/20 text-orange-300">IBC Enabled</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">NFT System:</span>
                    <Badge className="bg-pink-500/20 text-pink-300">License-Based</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Founder Wallet Tab */}
        <TabsContent value="founder-wallet" className="space-y-6">
          {founderWallet && (
            <Card className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Shield className="w-6 h-6 mr-3" />
                  HYBRID Founder Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-400">Address</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="bg-black/40 px-3 py-2 rounded text-sm font-mono text-green-400 flex-1">
                          {founderWallet.address}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(founderWallet.address, 'Founder address')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400">Balance</Label>
                      <div className="text-2xl font-bold text-green-400 mt-1">
                        {formatBalance(founderWallet.balance)} HYBRID
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400">Type</Label>
                      <Badge className="bg-purple-500/20 text-purple-300 mt-1">
                        {founderWallet.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-400">Public Key</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="bg-black/40 px-3 py-2 rounded text-sm font-mono text-blue-400 flex-1 truncate">
                          {founderWallet.publicKey}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(founderWallet.publicKey, 'Public key')}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400">NFT Licenses</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {founderWallet.nftLicenses.map((license, index) => (
                          <Badge key={index} className="bg-yellow-500/20 text-yellow-300">
                            {license}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400">Created</Label>
                      <div className="text-sm text-gray-300 mt-1">
                        {new Date(founderWallet.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Wallet Generator Tab */}
        <TabsContent value="wallet-generator" className="space-y-6">
          <Card className="bg-black/80 border-green-400/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Wallet className="w-6 h-6 mr-3" />
                Generate New HYBRID Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div>
                  <Label>Wallet Type</Label>
                  <Select value={newWalletType} onValueChange={(value: any) => setNewWalletType(value)}>
                    <SelectTrigger className="bg-black/40 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public Wallet</SelectItem>
                      <SelectItem value="validator">Validator Wallet (1000 HYBRID)</SelectItem>
                      <SelectItem value="storage">Storage Wallet (1000 HYBRID)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => generateWalletMutation.mutate(newWalletType)}
                  disabled={generateWalletMutation.isPending}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {generateWalletMutation.isPending ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4 mr-2" />
                  )}
                  Generate {newWalletType} Wallet
                </Button>
              </div>

              {/* Generated Wallets List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Generated Wallets</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPrivateKeys(!showPrivateKeys)}
                  >
                    {showPrivateKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {allWallets.map((wallet, index) => (
                    <Card key={index} className="bg-black/60 border-gray-600/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <Badge className={`${
                            wallet.type === 'founder' ? 'bg-purple-500/20 text-purple-300' :
                            wallet.type === 'validator' ? 'bg-blue-500/20 text-blue-300' :
                            wallet.type === 'storage' ? 'bg-orange-500/20 text-orange-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {wallet.type}
                          </Badge>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-400">
                              {formatBalance(wallet.balance)} HYBRID
                            </div>
                            <div className="text-xs text-gray-400">
                              {wallet.nftLicenses.length} licenses
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <code className="bg-black/40 px-2 py-1 rounded text-xs font-mono text-green-400 flex-1 truncate">
                              {wallet.address}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(wallet.address, 'Address')}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          {showPrivateKeys && (
                            <div className="flex items-center space-x-2">
                              <code className="bg-red-900/40 px-2 py-1 rounded text-xs font-mono text-red-400 flex-1 truncate">
                                {wallet.mnemonic.split(' ').slice(0, 6).join(' ')}...
                              </code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(wallet.mnemonic, 'Mnemonic')}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NFT Licenses Tab */}
        <TabsContent value="nft-licenses" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-black/80 border-blue-400/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">1,000</div>
                <div className="text-sm text-gray-300 mb-3">HNL-VAL Price</div>
                <Button
                  onClick={() => {
                    const validatorWallet = allWallets.find(w => w.type === 'validator' || w.type === 'founder');
                    if (validatorWallet) {
                      purchaseLicenseMutation.mutate({ buyer: validatorWallet.address, licenseType: 'HNL-VAL' });
                    }
                  }}
                  disabled={purchaseLicenseMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Purchase Validator License
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-orange-400/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-2">250</div>
                <div className="text-sm text-gray-300 mb-3">HNL-STR Price</div>
                <Button
                  onClick={() => {
                    const storageWallet = allWallets.find(w => w.type === 'storage' || w.type === 'founder');
                    if (storageWallet) {
                      purchaseLicenseMutation.mutate({ buyer: storageWallet.address, licenseType: 'HNL-STR' });
                    }
                  }}
                  disabled={purchaseLicenseMutation.isPending}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Purchase Storage License
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-purple-400/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">5,000</div>
                <div className="text-sm text-gray-300 mb-3">HNL-GOV Price</div>
                <Button
                  onClick={() => {
                    const govWallet = allWallets.find(w => w.type === 'founder');
                    if (govWallet) {
                      purchaseLicenseMutation.mutate({ buyer: govWallet.address, licenseType: 'HNL-GOV' });
                    }
                  }}
                  disabled={purchaseLicenseMutation.isPending}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Purchase Governance License
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/80 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                Active NFT Licenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {nftLicenses.map((license) => (
                  <Card key={license.id} className="bg-black/60 border-gray-600/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={`${
                              license.type === 'HNL-VAL' ? 'bg-blue-500/20 text-blue-300' :
                              license.type === 'HNL-STR' ? 'bg-orange-500/20 text-orange-300' :
                              'bg-purple-500/20 text-purple-300'
                            }`}>
                              {license.type}
                            </Badge>
                            <Badge className={license.active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                              {license.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400">
                            ID: {license.id}
                          </div>
                          <div className="text-sm text-gray-400">
                            Owner: {license.owner.slice(0, 20)}...
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-400">
                            {formatBalance(license.price)} HYBRID
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(license.issued_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cross-Chain Tab */}
        <TabsContent value="cross-chain" className="space-y-6">
          <Card className="bg-black/80 border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <ArrowRightLeft className="w-6 h-6 mr-3" />
                Cross-Chain Bridge Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-blue-900/40 border-blue-400/30">
                  <CardContent className="p-4 text-center">
                    <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="font-semibold text-blue-400">BASE</div>
                    <div className="text-sm text-gray-400">IBC Connected</div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-900/40 border-purple-400/30">
                  <CardContent className="p-4 text-center">
                    <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="font-semibold text-purple-400">POLYGON</div>
                    <div className="text-sm text-gray-400">Bridge Active</div>
                  </CardContent>
                </Card>

                <Card className="bg-green-900/40 border-green-400/30">
                  <CardContent className="p-4 text-center">
                    <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="font-semibold text-green-400">SOLANA</div>
                    <div className="text-sm text-gray-400">Wormhole Bridge</div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-900/40 border-orange-400/30">
                  <CardContent className="p-4 text-center">
                    <Globe className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <div className="font-semibold text-orange-400">HYBRID</div>
                    <div className="text-sm text-gray-400">Native Chain</div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-400/20 rounded-lg">
                <div className="text-yellow-400 font-semibold mb-2">🚀 Production Ready Features</div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Real wallet generation with Ed25519 cryptography</li>
                  <li>• Functional NFT licensing system for node operation</li>
                  <li>• Cross-chain bridge infrastructure for TU conversion</li>
                  <li>• Cosmos SDK foundation with Tendermint consensus</li>
                  <li>• HTSX runtime integration for consciousness authentication</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
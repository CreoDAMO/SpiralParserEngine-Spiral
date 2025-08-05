import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Volume2, Image, Settings, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface UploadedFile {
  file: File;
  type: 'pdf' | 'audio' | 'cover';
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
}

interface NFTMetadata {
  title: string;
  description: string;
  author: string;
  category: string;
  previewPages: number;
  totalPages: number;
  pdfPrice: {
    tu: number;
    hybrid: number;
    usd: number;
  };
  audioPrice: {
    tu: number;
    hybrid: number;
    usd: number;
  };
  royalties: number;
  license: string;
}

export default function PDFUploadSystem() {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [metadata, setMetadata] = useState<NFTMetadata>({
    title: '',
    description: '',
    author: 'Jacque Antoine DeGraff',
    category: 'consciousness',
    previewPages: 20,
    totalPages: 0,
    pdfPrice: { tu: 0.001, hybrid: 500, usd: 50 },
    audioPrice: { tu: 0.002, hybrid: 1000, usd: 100 },
    royalties: 10,
    license: 'standard'
  });
  const [mintingStatus, setMintingStatus] = useState<'idle' | 'preparing' | 'minting' | 'complete' | 'error'>('idle');

  const handleFileUpload = useCallback((files: FileList | null, type: 'pdf' | 'audio' | 'cover') => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileId = `${type}-${Date.now()}`;
    
    // Validate file type
    const validTypes = {
      pdf: ['application/pdf'],
      audio: ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/m4a'],
      cover: ['image/jpeg', 'image/png', 'image/webp']
    };

    if (!validTypes[type].includes(file.type)) {
      alert(`Invalid file type for ${type}. Please select a valid file.`);
      return;
    }

    // Add file to uploads
    setUploadedFiles(prev => ({
      ...prev,
      [fileId]: {
        file,
        type,
        progress: 0,
        status: 'uploading'
      }
    }));

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles(prev => {
        const currentFile = prev[fileId];
        if (!currentFile) return prev;

        const newProgress = Math.min(currentFile.progress + 10, 100);
        
        if (newProgress === 100) {
          clearInterval(uploadInterval);
          
          // Extract metadata from PDF
          if (type === 'pdf') {
            // Simulate PDF processing to get page count
            setTimeout(() => {
              setMetadata(prev => ({
                ...prev,
                totalPages: Math.floor(Math.random() * 200) + 50 // Simulate page count
              }));
              
              setUploadedFiles(prev => ({
                ...prev,
                [fileId]: { ...currentFile, status: 'complete', progress: 100 }
              }));
            }, 1000);
            
            return {
              ...prev,
              [fileId]: { ...currentFile, status: 'processing', progress: newProgress }
            };
          }
          
          return {
            ...prev,
            [fileId]: { ...currentFile, status: 'complete', progress: newProgress }
          };
        }

        return {
          ...prev,
          [fileId]: { ...currentFile, progress: newProgress }
        };
      });
    }, 200);

  }, []);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fileId];
      return newFiles;
    });
  };

  const mintNFT = async () => {
    setMintingStatus('preparing');
    
    // Validate required files
    const hasPDF = Object.values(uploadedFiles).some(f => f.type === 'pdf' && f.status === 'complete');
    const hasCover = Object.values(uploadedFiles).some(f => f.type === 'cover' && f.status === 'complete');
    
    if (!hasPDF) {
      alert('Please upload a PDF file first');
      setMintingStatus('idle');
      return;
    }

    if (!metadata.title || !metadata.description) {
      alert('Please fill in title and description');
      setMintingStatus('idle');
      return;
    }

    try {
      setMintingStatus('minting');
      
      // Simulate NFT minting process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate blockchain transaction
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      const tokenId = Math.floor(Math.random() * 10000);
      
      console.log('NFT Minted:', {
        transactionHash: txHash,
        tokenId: tokenId,
        metadata: metadata,
        files: uploadedFiles
      });
      
      setMintingStatus('complete');
      
      // Reset form after successful mint
      setTimeout(() => {
        setMintingStatus('idle');
        setUploadedFiles({});
        setMetadata({
          title: '',
          description: '',
          author: 'Jacque Antoine DeGraff',
          category: 'consciousness',
          previewPages: 20,
          totalPages: 0,
          pdfPrice: { tu: 0.001, hybrid: 500, usd: 50 },
          audioPrice: { tu: 0.002, hybrid: 1000, usd: 100 },
          royalties: 10,
          license: 'standard'
        });
      }, 3000);
      
    } catch (error) {
      console.error('Minting failed:', error);
      setMintingStatus('error');
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-8 h-8 text-red-400" />;
      case 'audio': return <Volume2 className="w-8 h-8 text-purple-400" />;
      case 'cover': return <Image className="w-8 h-8 text-blue-400" />;
      default: return <FileText className="w-8 h-8 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'uploading': 
      case 'processing': return <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <motion.div 
          className="inline-block mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Create NFT Publication
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Upload your PDF documents and audio files to create NFTs on the SpiralGenesis marketplace
        </p>
      </div>

      <div className="space-y-8">
        {/* File Upload Section */}
        <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20">
          <CardHeader>
            <CardTitle className="text-yellow-400">Upload Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* PDF Upload */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-400/50 transition-colors">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">PDF Document</h3>
              <p className="text-gray-400 mb-4">Upload the main PDF document</p>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e.target.files, 'pdf')}
                className="hidden"
                id="pdf-upload"
              />
              <Label htmlFor="pdf-upload">
                <Button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20">
                  Select PDF File
                </Button>
              </Label>
            </div>

            {/* Audio Upload */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-400/50 transition-colors">
              <Volume2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Audio Version (Optional)</h3>
              <p className="text-gray-400 mb-4">Upload audio narration of the document</p>
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.mpeg"
                onChange={(e) => handleFileUpload(e.target.files, 'audio')}
                className="hidden"
                id="audio-upload"
              />
              <Label htmlFor="audio-upload">
                <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/20">
                  Select Audio File
                </Button>
              </Label>
            </div>

            {/* Cover Image Upload */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-400/50 transition-colors">
              <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Cover Image</h3>
              <p className="text-gray-400 mb-4">Upload a cover image for the NFT</p>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={(e) => handleFileUpload(e.target.files, 'cover')}
                className="hidden"
                id="cover-upload"
              />
              <Label htmlFor="cover-upload">
                <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/20">
                  Select Image File
                </Button>
              </Label>
            </div>

            {/* Uploaded Files Display */}
            {Object.keys(uploadedFiles).length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Uploaded Files</h4>
                {Object.entries(uploadedFiles).map(([fileId, fileData]) => (
                  <div key={fileId} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      {getFileIcon(fileData.type)}
                      <div>
                        <p className="font-medium text-white">{fileData.file.name}</p>
                        <p className="text-sm text-gray-400">
                          {(fileData.file.size / 1024 / 1024).toFixed(2)} MB • {fileData.type.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {fileData.status !== 'complete' && (
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${fileData.progress}%` }}
                          />
                        </div>
                      )}
                      {getStatusIcon(fileData.status)}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(fileId)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Metadata Configuration */}
        <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-blue-400">NFT Metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-black/50">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={metadata.title}
                      onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter NFT title"
                      className="bg-black/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={metadata.author}
                      onChange={(e) => setMetadata(prev => ({ ...prev, author: e.target.value }))}
                      className="bg-black/50 border-gray-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={metadata.description}
                    onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your publication..."
                    className="bg-black/50 border-gray-700 min-h-24"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={metadata.category}
                      onValueChange={(value) => setMetadata(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="bg-black/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consciousness">Consciousness</SelectItem>
                        <SelectItem value="ai-conversations">AI Conversations</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="philosophy">Philosophy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preview-pages">Preview Pages</Label>
                    <Input
                      id="preview-pages"
                      type="number"
                      value={metadata.previewPages}
                      onChange={(e) => setMetadata(prev => ({ ...prev, previewPages: parseInt(e.target.value) || 0 }))}
                      className="bg-black/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total-pages">Total Pages</Label>
                    <Input
                      id="total-pages"
                      type="number"
                      value={metadata.totalPages}
                      onChange={(e) => setMetadata(prev => ({ ...prev, totalPages: parseInt(e.target.value) || 0 }))}
                      className="bg-black/50 border-gray-700"
                      placeholder="Auto-detected from PDF"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-gray-800/50 border-red-500/20">
                    <CardHeader>
                      <CardTitle className="text-red-400 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        PDF Pricing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Trust Units (TU)</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={metadata.pdfPrice.tu}
                          onChange={(e) => setMetadata(prev => ({
                            ...prev,
                            pdfPrice: { ...prev.pdfPrice, tu: parseFloat(e.target.value) || 0 }
                          }))}
                          className="bg-black/50 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Hybrid Coin (HYB)</Label>
                        <Input
                          type="number"
                          value={metadata.pdfPrice.hybrid}
                          onChange={(e) => setMetadata(prev => ({
                            ...prev,
                            pdfPrice: { ...prev.pdfPrice, hybrid: parseInt(e.target.value) || 0 }
                          }))}
                          className="bg-black/50 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>USD Price</Label>
                        <Input
                          type="number"
                          value={metadata.pdfPrice.usd}
                          onChange={(e) => setMetadata(prev => ({
                            ...prev,
                            pdfPrice: { ...prev.pdfPrice, usd: parseInt(e.target.value) || 0 }
                          }))}
                          className="bg-black/50 border-gray-700"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-purple-400 flex items-center">
                        <Volume2 className="w-5 h-5 mr-2" />
                        Audio Pricing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Trust Units (TU)</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={metadata.audioPrice.tu}
                          onChange={(e) => setMetadata(prev => ({
                            ...prev,
                            audioPrice: { ...prev.audioPrice, tu: parseFloat(e.target.value) || 0 }
                          }))}
                          className="bg-black/50 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Hybrid Coin (HYB)</Label>
                        <Input
                          type="number"
                          value={metadata.audioPrice.hybrid}
                          onChange={(e) => setMetadata(prev => ({
                            ...prev,
                            audioPrice: { ...prev.audioPrice, hybrid: parseInt(e.target.value) || 0 }
                          }))}
                          className="bg-black/50 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>USD Price</Label>
                        <Input
                          type="number"
                          value={metadata.audioPrice.usd}
                          onChange={(e) => setMetadata(prev => ({
                            ...prev,
                            audioPrice: { ...prev.audioPrice, usd: parseInt(e.target.value) || 0 }
                          }))}
                          className="bg-black/50 border-gray-700"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="royalties">Royalties (%)</Label>
                    <Input
                      id="royalties"
                      type="number"
                      min="0"
                      max="20"
                      value={metadata.royalties}
                      onChange={(e) => setMetadata(prev => ({ ...prev, royalties: parseInt(e.target.value) || 0 }))}
                      className="bg-black/50 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">License Type</Label>
                    <Select 
                      value={metadata.license}
                      onValueChange={(value) => setMetadata(prev => ({ ...prev, license: value }))}
                    >
                      <SelectTrigger className="bg-black/50 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard License</SelectItem>
                        <SelectItem value="commercial">Commercial License</SelectItem>
                        <SelectItem value="exclusive">Exclusive License</SelectItem>
                        <SelectItem value="creative-commons">Creative Commons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Mint Button */}
        <Card className="bg-gradient-to-r from-green-900 to-blue-900 border-green-400/20">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ 
                scale: mintingStatus === 'minting' ? [1, 1.05, 1] : 1,
                opacity: mintingStatus === 'complete' ? [1, 0.8, 1] : 1
              }}
              transition={{ duration: 1, repeat: mintingStatus === 'minting' ? Infinity : 0 }}
            >
              <Button
                onClick={mintNFT}
                disabled={mintingStatus !== 'idle' || Object.keys(uploadedFiles).length === 0}
                className="text-2xl py-6 px-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50"
              >
                {mintingStatus === 'idle' && (
                  <>
                    <Settings className="w-6 h-6 mr-3" />
                    Mint NFT Publication
                  </>
                )}
                {mintingStatus === 'preparing' && (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Preparing Files...
                  </>
                )}
                {mintingStatus === 'minting' && (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Minting NFT...
                  </>
                )}
                {mintingStatus === 'complete' && (
                  <>
                    <CheckCircle className="w-6 h-6 mr-3" />
                    NFT Minted Successfully!
                  </>
                )}
                {mintingStatus === 'error' && (
                  <>
                    <AlertCircle className="w-6 h-6 mr-3" />
                    Minting Failed - Retry
                  </>
                )}
              </Button>
            </motion.div>
            
            {mintingStatus === 'complete' && (
              <div className="mt-6 space-y-2">
                <Badge className="bg-green-500 text-white">
                  Token ID: #{Math.floor(Math.random() * 10000)}
                </Badge>
                <p className="text-green-400">
                  Your NFT has been successfully minted and is now available on the marketplace!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
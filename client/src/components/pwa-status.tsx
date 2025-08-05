
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Smartphone, Download, Wifi, WifiOff, Bell, Sync } from 'lucide-react';

export const PWAStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle');

  useEffect(() => {
    // Check if app is installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    // This would trigger the install prompt
    setIsInstallable(false);
    setIsInstalled(true);
  };

  const enableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  const triggerSync = () => {
    setSyncStatus('syncing');
    // Simulate background sync
    setTimeout(() => {
      setSyncStatus('completed');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-900/20 to-green-900/20 border-blue-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              Progressive Web App Status
            </CardTitle>
            <CardDescription>
              Mobile-ready with offline support and native app features
            </CardDescription>
          </div>
          <Smartphone className="w-8 h-8 text-blue-400" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-400" />
            )}
            <div>
              <p className="font-semibold text-white">
                {isOnline ? 'Online' : 'Offline'}
              </p>
              <p className="text-sm text-gray-400">
                {isOnline ? 'Real-time sync active' : 'Offline mode enabled'}
              </p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={isOnline ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}
          >
            {isOnline ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>

        {/* Installation Status */}
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-blue-400" />
            <div>
              <p className="font-semibold text-white">App Installation</p>
              <p className="text-sm text-gray-400">
                {isInstalled ? 'Installed as native app' : 'Available for installation'}
              </p>
            </div>
          </div>
          {isInstallable && !isInstalled && (
            <Button onClick={handleInstallApp} size="sm" className="bg-blue-600 hover:bg-blue-700">
              Install App
            </Button>
          )}
          {isInstalled && (
            <Badge variant="outline" className="border-green-500 text-green-400">
              Installed
            </Badge>
          )}
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-purple-400" />
            <div>
              <p className="font-semibold text-white">Push Notifications</p>
              <p className="text-sm text-gray-400">
                {notificationsEnabled ? 'Enabled for system alerts' : 'Enable for real-time updates'}
              </p>
            </div>
          </div>
          {!notificationsEnabled && (
            <Button onClick={enableNotifications} size="sm" className="bg-purple-600 hover:bg-purple-700">
              Enable
            </Button>
          )}
          {notificationsEnabled && (
            <Badge variant="outline" className="border-green-500 text-green-400">
              Enabled
            </Badge>
          )}
        </div>

        {/* Background Sync */}
        <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <Sync className={`w-5 h-5 text-cyan-400 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <div>
              <p className="font-semibold text-white">Background Sync</p>
              <p className="text-sm text-gray-400">
                {syncStatus === 'idle' && 'Ready to sync when offline'}
                {syncStatus === 'syncing' && 'Syncing data...'}
                {syncStatus === 'completed' && 'Sync completed successfully'}
              </p>
            </div>
          </div>
          <Button 
            onClick={triggerSync} 
            size="sm" 
            disabled={syncStatus === 'syncing'}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
          </Button>
        </div>

        {/* PWA Features */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-black/40 border-gray-700">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-400 mb-2">Offline Support</h4>
              <p className="text-sm text-gray-400">Continue development without internet</p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-gray-700">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-400 mb-2">Touch Optimized</h4>
              <p className="text-sm text-gray-400">Responsive design for mobile devices</p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-gray-700">
            <CardContent className="p-4">
              <h4 className="font-semibold text-purple-400 mb-2">App-like Feel</h4>
              <p className="text-sm text-gray-400">Full-screen mode with OS integration</p>
            </CardContent>
          </Card>
          
          <Card className="bg-black/40 border-gray-700">
            <CardContent className="p-4">
              <h4 className="font-semibold text-yellow-400 mb-2">Fast Loading</h4>
              <p className="text-sm text-gray-400">Service worker caching for speed</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default PWAStatus;

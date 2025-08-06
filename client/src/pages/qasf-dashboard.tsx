import React from 'react';
import { SevenPillarsDashboard } from '@/components/seven-pillars-dashboard';

export function QASFDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto py-8">
        <SevenPillarsDashboard />
      </div>
    </div>
  );
}
'use client';

import { LogLevel, StatsigProvider } from '@statsig/react-bindings';

import React from 'react';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { getDemoUser } from '@/utils/demoStatsig';

export default function MyStatsig({ children }: { children: React.ReactNode }) {
  const user = React.useMemo(() => getDemoUser(), []);
  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
      user={user}
      options={{
        logLevel: LogLevel.Debug,
        plugins: [new StatsigAutoCapturePlugin()],
        environment: {
          tier:
            process.env.NODE_ENV === 'development'
              ? 'development'
              : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
                ? 'staging'
                : 'production',
        },
      }}
    >
      {children}
    </StatsigProvider>
  );
}

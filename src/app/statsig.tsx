'use client';

import {
  LogLevel,
  StatsigProvider,
  StatsigUser,
  useClientBootstrapInit,
} from '@statsig/react-bindings';

import React from 'react';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';

export default function Statsig({
  children,
  bootstrapValues,
}: {
  children: React.ReactNode;
  bootstrapValues: { data: string; user: StatsigUser };
}) {
  const client = useClientBootstrapInit(
    process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!,
    bootstrapValues.user,
    bootstrapValues.data,
    {
      logLevel: LogLevel.Debug,
      plugins: [new StatsigAutoCapturePlugin()],
    },
  );
  return <StatsigProvider client={client}>{children}</StatsigProvider>;
}

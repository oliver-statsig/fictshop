import Statsig, { StatsigUser } from 'statsig-node';
import { cookies, headers } from 'next/headers';

import { after } from 'next/server';

const isStatsigReady = Statsig.initialize(process.env.STATSIG_SERVER_KEY!, {
  environment: {
    tier:
      process.env.NODE_ENV === 'development'
        ? 'development'
        : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
          ? 'staging'
          : 'production',
  },
});

export async function generateBootstrapValues(): Promise<{
  data: string;
  user: StatsigUser;
}> {
  await isStatsigReady;

  const cookieStore = await cookies();
  const headersList = await headers();
  const userId = cookieStore.get('user_id')?.value;
  if (!userId) {
    throw new Error('User ID not found');
  }

  const user: StatsigUser = {
    userID: userId,
    ip: headersList.get('x-forwarded-for') || undefined,
    userAgent: headersList.get('user-agent') || undefined,
  };

  const values = Statsig.getClientInitializeResponse(
    user,
    process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!,
    {
      hash: 'djb2', //🔥 'djb2' is required. By default this would be 'sha256'.
    },
  );

  after(async () => {
    Statsig.flush();
  });

  return {
    data: JSON.stringify(values),
    user,
  };
}

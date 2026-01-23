import type { StatsigUser } from '@statsig/client-core';

const COUNTRIES = ['US', 'CA', 'MX', 'IN'];
const STORAGE_PREFIX = 'fictshop_demo';

const OS_LABELS: Array<{ match: RegExp; label: string }> = [
  { match: /iphone|ipad|ipod/i, label: 'iOS' },
  { match: /android/i, label: 'Android' },
  { match: /mac/i, label: 'iOS' },
  { match: /win/i, label: 'Android' },
  { match: /linux/i, label: 'Android' },
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getStoredValue(key: string, compute: () => string): string {
  if (typeof window === 'undefined') {
    return compute();
  }
  const storageKey = `${STORAGE_PREFIX}_${key}`;
  const stored = window.localStorage.getItem(storageKey);
  if (stored) {
    return stored;
  }
  const value = compute();
  window.localStorage.setItem(storageKey, value);
  return value;
}

export function getDemoCountry(): string {
  return getStoredValue('country', () => {
    if (typeof window === 'undefined') {
      return COUNTRIES[0];
    }
    const seed = [
      window.navigator?.language ?? '',
      window.navigator?.userAgent ?? '',
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? '',
    ].join('|');
    const index = hashString(seed) % COUNTRIES.length;
    return COUNTRIES[index];
  });
}

export function getDemoOS(): string {
  if (typeof window === 'undefined') {
    return 'Android';
  }
  const ua = window.navigator?.userAgent ?? '';
  const match = OS_LABELS.find((entry) => entry.match.test(ua));
  return match?.label ?? 'Android';
}

export function getDemoUser(): StatsigUser {
  const userID = getStoredValue('user_id', () => {
    if (typeof window === 'undefined') {
      return `demo-${Math.random().toString(36).slice(2, 10)}`;
    }
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return `demo-${Math.random().toString(36).slice(2, 10)}`;
  });

  return {
    userID,
    country: getDemoCountry(),
    locale: typeof window !== 'undefined' ? window.navigator?.language : 'en-US',
    custom: {
      os: getDemoOS(),
    },
  };
}

export function formatPriceValue(value: number): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  return value.toFixed(1);
}

export function buildBaseEventMetadata(extra: Record<string, unknown> = {}) {
  return {
    country: getDemoCountry(),
    os: getDemoOS(),
    ...extra,
  };
}

export function buildProductEventMetadata(
  productName: string,
  price: number,
  extra: Record<string, unknown> = {},
) {
  return buildBaseEventMetadata({
    product: productName,
    value: formatPriceValue(price),
    ...extra,
  });
}

export function logStatsigLine(
  client: { logEvent?: (name: string, value?: string, metadata?: Record<string, unknown>) => void } | null,
  message: string,
  details: {
    status?: string;
    obj?: Record<string, unknown>;
    request?: Record<string, unknown>;
  } = {},
) {
  if (!client?.logEvent) return;
  client.logEvent('statsig::log_line', message, {
    msg: message,
    status: details.status ?? 'info',
    obj: details.obj ? JSON.stringify(details.obj) : undefined,
    request: details.request ? JSON.stringify(details.request) : undefined,
  });
}

export function getShapeClasses(shape: string | null | undefined): string {
  switch (shape) {
    case 'circle':
      return 'rounded-full';
    case 'square':
      return 'rounded-none';
    case 'rounded_square':
    default:
      return 'rounded-2xl';
  }
}

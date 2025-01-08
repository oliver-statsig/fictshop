'use client';

import { useDynamicConfig } from '@statsig/react-bindings';

export default function WelcomeMessage() {
  const greetingConfig = useDynamicConfig('seasonal_greeting');
  return greetingConfig.get('welcome_message', 'Welcome to FictShop!');
}

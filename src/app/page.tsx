'use client';

import { products } from '@/data/products';
import { buildBaseEventMetadata, getShapeClasses } from '@/utils/demoStatsig';
import {
  useDynamicConfig,
  useExperiment,
  useGateValue,
  useStatsigClient,
} from '@statsig/react-bindings';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const oracleResponses = [
  'A sandwich that knows your search history.',
  'Soup so spicy it negotiates its own return policy.',
  'The unending breadstick that pays rent in laughter.',
  'A quantum taco that is both crunchy and soft until observed.',
  'Salad with a legally distinct sprinkle of chaos crystals.',
];

export default function Home() {
  // Using the Time Machine as our featured product
  const featuredProduct = products[1];
  const greetingConfig = useDynamicConfig('seasonal_greeting');
  const bannerExperiment = useExperiment('homepage_banner_test');
  const visualEditorExperiment = useExperiment('visual_editor_homepage');
  const tierExperiment = useExperiment('tiered_pricing_strategy_v0');
  const signupExperiment = useExperiment('new_user_signup_flow');
  const promptExperiment = useExperiment('ai_prompt_experimentation');
  const testLayerExperiment = useExperiment('test_layer');
  const chatbotExperiment = useExperiment('chatbot_llm_v0');
  const logoShapeExperiment = useExperiment('product_logo_icon_shapes');
  const staleGate = useGateValue('stale_gate_example');
  const { client } = useStatsigClient();

  const [oracleInput, setOracleInput] = useState('');
  const [oracleOutput, setOracleOutput] = useState('');
  const [tokenCount, setTokenCount] = useState<number | null>(null);

  useEffect(() => {
    client.logEvent('landing_page_view', '', buildBaseEventMetadata());
  }, [client]);

  const bannerLabel = bannerExperiment.get('groups', 'Buy Again');
  const visualGroup = visualEditorExperiment.groupName ?? 'Control';
  const testLayerValue = testLayerExperiment.get('test', 'abc');
  const tiers = Number(tierExperiment.get('tiers', 1));
  const signupFlow = signupExperiment.get('singup_flow_version', 'version_0');
  const prompt = promptExperiment.get(
    'prompt',
    'Hello! What would you like to eat today?',
  );
  const model = chatbotExperiment.get('model', '3.5');
  const shapeClass = getShapeClasses(
    logoShapeExperiment.get('shape', 'rounded_square'),
  );

  const heroClass =
    visualGroup === 'Test'
      ? 'bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50'
      : 'bg-gradient-to-r from-blue-50 to-indigo-50';

  const tierCards = useMemo(() => {
    const total = Number.isFinite(tiers) ? Math.min(Math.max(tiers, 1), 3) : 1;
    const names = ['Single Tier', 'Two Tier', 'Three Tier'];
    const perks = [
      ['Standard portal access', 'One complimentary paradox'],
      ['Two portals', 'Priority glitches', 'Complimentary fog machine'],
      ['Three portals', 'VIP time loops', 'Emergency confetti cannon'],
    ];
    return Array.from({ length: total }, (_, index) => ({
      title: names[index],
      perks: perks[index],
    }));
  }, [tiers]);

  const handleSummonOracle = () => {
    const query = oracleInput.trim() || 'surprise me';
    const response =
      oracleResponses[Math.floor(Math.random() * oracleResponses.length)];
    const tokens = Math.max(1, Math.ceil((prompt.length + query.length) / 4));
    setOracleOutput(response);
    setTokenCount(tokens);
    client.logEvent('llm_tokens_used', String(tokens), buildBaseEventMetadata());
  };

  return (
    <>
      <div className="bg-black text-white text-sm py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span className="font-semibold tracking-wide uppercase">
            {bannerLabel}
          </span>
          <span className="text-white/70">
            Visual editor group: {visualGroup}
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className={`${heroClass} w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] py-10`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 ${shapeClass} bg-gradient-to-br from-indigo-500 to-pink-500 shadow-lg`}
                />
                <span className="text-xs uppercase tracking-[0.4em] text-gray-500">
                  Test Layer: {testLayerValue}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                {greetingConfig.get('welcome_message', 'Welcome to FictShop!')}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Where the impossible is just temporarily out of stock. We sell
                products that shouldn&apos;t exist, but somehow do (in our
                imagination). Our legal team advises us to mention that time
                paradoxes are not covered under warranty.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-gray-600">
                  🚨 Zero warranties, unlimited confusion
                </span>
                <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-gray-600">
                  👀 Your cart is haunted
                </span>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <div className="relative aspect-square mb-4">
                  <Image
                    src={featuredProduct.imageUrl}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                  {featuredProduct.salePrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                      SALE!
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {featuredProduct.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {featuredProduct.description}
                </p>
                <Link
                  href={`/products/${featuredProduct.id}`}
                  className="block bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Time Travel Now!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Oracle + Signup */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-2">AI Snack Oracle</h3>
            <p className="text-gray-600 mb-4">{prompt}</p>
            <input
              value={oracleInput}
              onChange={(event) => setOracleInput(event.target.value)}
              placeholder="Tell the oracle your craving"
              className="w-full border rounded-lg px-4 py-2 mb-3"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleSummonOracle}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Summon Answer
              </button>
              <span className="text-xs text-gray-500">
                Model {model} • Tokens {tokenCount ?? '—'}
              </span>
            </div>
            {oracleOutput && (
              <p className="mt-4 text-gray-800 font-semibold">{oracleOutput}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold mb-2">Join the Chaos Club</h3>
            {signupFlow === 'version_1' ? (
              <div className="space-y-3">
                <p className="text-gray-600">
                  Version 1 signup requires an oath and your favorite timeline.
                </p>
                <input
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Full name or alias"
                />
                <input
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Preferred timeline (YYYY or approximate)"
                />
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  Swear Fealty to the Cart
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600">
                  Version 0 signup: the low-stakes gateway to nonsense.
                </p>
                <input
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Email address"
                />
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  Notify Me of Shenanigans
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tiered Pricing */}
      <div className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-6">Tiered Pricing Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tierCards.map((tier) => (
              <div
                key={tier.title}
                className="bg-white rounded-2xl shadow-md p-6 border"
              >
                <h4 className="text-xl font-semibold mb-3">{tier.title}</h4>
                <ul className="space-y-2 text-gray-600">
                  {tier.perks.map((perk) => (
                    <li key={perk}>• {perk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {staleGate && (
        <div className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-2">
                Museum of Stale Gates
              </h3>
              <p className="text-gray-700">
                Congratulations, you found the exhibit of features that were
                meant to launch in 2022. Please admire the dust and the
                optimism. Do not feed the backlog.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* View All Products Link */}
      <div className="text-center mt-4 mb-10">
        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-indigo-50 text-indigo-600 py-4 px-8 rounded-lg text-xl font-semibold hover:bg-indigo-100 transition-colors group"
        >
          View All Products
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}

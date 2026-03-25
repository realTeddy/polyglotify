import type { APIRoute } from 'astro';
import { streamText, convertToModelMessages } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createMistral } from '@ai-sdk/mistral';
import { createGroq } from '@ai-sdk/groq';
import { createXai } from '@ai-sdk/xai';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createCohere } from '@ai-sdk/cohere';
import { createFireworks } from '@ai-sdk/fireworks';
import { createTogetherAI } from '@ai-sdk/togetherai';
import { createPerplexity } from '@ai-sdk/perplexity';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import type { AiProvider } from '@/lib/ai';

export const prerender = false;

const VALID_PROVIDERS: AiProvider[] = [
  'openai', 'anthropic', 'google', 'mistral', 'groq', 'xai',
  'deepseek', 'cohere', 'fireworks', 'togetherai', 'perplexity', 'openrouter',
];

function createProviderModel(provider: AiProvider, apiKey: string, modelId: string) {
  switch (provider) {
    case 'openai':
      return createOpenAI({ apiKey })(modelId);
    case 'anthropic':
      return createAnthropic({ apiKey })(modelId);
    case 'google':
      return createGoogleGenerativeAI({ apiKey })(modelId);
    case 'mistral':
      return createMistral({ apiKey })(modelId);
    case 'groq':
      return createGroq({ apiKey })(modelId);
    case 'xai':
      return createXai({ apiKey })(modelId);
    case 'deepseek':
      return createDeepSeek({ apiKey })(modelId);
    case 'cohere':
      return createCohere({ apiKey })(modelId);
    case 'fireworks':
      return createFireworks({ apiKey })(modelId);
    case 'togetherai':
      return createTogetherAI({ apiKey })(modelId);
    case 'perplexity':
      return createPerplexity({ apiKey })(modelId);
    case 'openrouter':
      return createOpenRouter({ apiKey })(modelId);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export const POST: APIRoute = async ({ request }) => {
  const { messages, systemPrompt, provider, apiKey, model } = await request.json();

  if (!provider || !apiKey || !model) {
    return new Response(JSON.stringify({ error: 'Missing provider, apiKey, or model' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!VALID_PROVIDERS.includes(provider)) {
    return new Response(JSON.stringify({ error: 'Invalid provider' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const modelMessages = await convertToModelMessages(messages);
    const result = streamText({
      model: createProviderModel(provider, apiKey, model),
      system: systemPrompt,
      messages: modelMessages,
      maxTokens: 1024,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error('Chat API error:', err);
    const isAuthError = err instanceof Error && (
      err.message.includes('401') || err.message.includes('403') || err.message.includes('Invalid API')
    );
    return new Response(
      JSON.stringify({ error: isAuthError ? 'Invalid API key or unauthorized' : 'Failed to generate response' }),
      { status: isAuthError ? 401 : 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

import { SYSTEM_PROMPT } from '@/constants/prompt';
import { type SimpleChatMessage, type MinimalChatCompletionResponse } from '@/types/openai';

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL;

export const createChatCompletion = async (
  messages: SimpleChatMessage[],
  locale: string = 'en'
) => {
  if (!WORKER_URL) {
    throw new Error('Worker URL is not configured');
  }

  const systemMessage = `${SYSTEM_PROMPT}\nPlease respond in ${locale === 'ko' ? 'Korean' : locale === 'ja' ? 'Japanese' : 'English'}.`;

  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-0125',
        messages: [{ role: 'system', content: systemMessage }, ...messages],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Worker response error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API 호출 실패 (${response.status}): ${errorText || response.statusText}`);
    }

    const data: MinimalChatCompletionResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Chat completion error:', error);
    throw error;
  }
};

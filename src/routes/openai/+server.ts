import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const client = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export const GET = async () => {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: 'Write a one-sentence bedtime story about a unicorn.'
        }
      ]
    });
    return json(response);
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    return json({ error: 'Failed to fetch OpenAI response' }, { status: 500 });
  }
};

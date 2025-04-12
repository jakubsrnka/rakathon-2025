import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import flyerResponseSchema from '$lib/api/flyer-response-schema.json';

const client = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export const GET = async ({ url }) => {
  const prompt = url.searchParams.get('prompt') || '';
  const lang = url.searchParams.get('lang') || 'English';
  try {
    const response = await client.responses.create({
      model: 'gpt-4o-2024-08-06',
      input: `
I want you to act as a flyer designer. I will provide you with the details of the flyer, and you will create a flyer for me.
The flyer is supposed to act as a tool to inform patients about specifics of their treatment. Patients are usually not very well informed about their treatment and the flyer should help them understand the treatment better.
The flyer should be informative, easy to read, include data about medication and be easily understandable.
It should be in the language of the patient, so please use simple words and short sentences.${lang ? ` Please write in ${lang}.` : ''}

If you are asked to create a flyer about a specific medication, please include the medication in the heading of the flyer.

After you generate the content of the flyer, provide a set of tags for this flyer. The tags should be relevant to the content of the flyer and should help in categorizing the flyer for future reference.
If the flyer is about a specific medication, please include the name of the medication in the tags. All tags should be in lowercase.
If you are asked to write the flyer in a specific language, please include the language in the tags as ISO 639-1 code (e.g. 'en' for English, 'de' for German, etc.).

The flyer should be based on the following information:
${prompt}`,
      text: {
        format: {
          type: 'json_schema',
          name: 'flyer',
          schema: flyerResponseSchema
        }
      }
    });
    const { output_text } = response;
    return json(JSON.parse(output_text));
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    return json({ error: 'Failed to fetch OpenAI response' }, { status: 500 });
  }
};

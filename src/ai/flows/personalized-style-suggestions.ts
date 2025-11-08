'use server';

/**
 * @fileOverview A personalized style suggestion AI agent.
 *
 * - getPersonalizedStyleSuggestions - A function that provides personalized style suggestions.
 * - PersonalizedStyleSuggestionsInput - The input type for the getPersonalizedStyleSuggestions function.
 * - PersonalizedStyleSuggestionsOutput - The return type for the getPersonalizedStyleSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedStyleSuggestionsInputSchema = z.object({
  quizAnswers: z
    .string()
    .describe('Answers from the interactive style quiz.'),
  photoDataUri: z
    .string()
    .describe(
      'A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the typo here
    ),
  bodyTypeDescription: z
    .string()
    .describe('Description of the user\'s body type.'),
});
export type PersonalizedStyleSuggestionsInput = z.infer<
  typeof PersonalizedStyleSuggestionsInputSchema
>;

const PersonalizedStyleSuggestionsOutputSchema = z.object({
  styleSuggestions: z
    .string()
    .describe('Personalized clothing style suggestions.'),
});
export type PersonalizedStyleSuggestionsOutput = z.infer<
  typeof PersonalizedStyleSuggestionsOutputSchema
>;

export async function getPersonalizedStyleSuggestions(
  input: PersonalizedStyleSuggestionsInput
): Promise<PersonalizedStyleSuggestionsOutput> {
  return personalizedStyleSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedStyleSuggestionsPrompt',
  input: {schema: PersonalizedStyleSuggestionsInputSchema},
  output: {schema: PersonalizedStyleSuggestionsOutputSchema},
  prompt: `You are a personal stylist for Vastra, a sustainable clothing brand.  Based on the user's quiz answers, photo, and body type description, provide personalized clothing style suggestions from Vastra's sustainable collections.

Quiz Answers: {{{quizAnswers}}}
Photo: {{media url=photoDataUri}}
Body Type Description: {{{bodyTypeDescription}}}

Consider Vastra's brand ethos of sustainable and ethical fashion. Suggest specific items or combinations of items that would be flattering and align with the user's preferences and body type. Give a summary of your suggested styles.`, // Added brand ethos context
});

const personalizedStyleSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedStyleSuggestionsFlow',
    inputSchema: PersonalizedStyleSuggestionsInputSchema,
    outputSchema: PersonalizedStyleSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

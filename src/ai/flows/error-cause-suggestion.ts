'use server';

/**
 * @fileOverview Suggests possible causes and solutions for a given vehicle error code.
 *
 * - suggestErrorCauses - A function that suggests possible causes and solutions for a given vehicle error code.
 * - SuggestErrorCausesInput - The input type for the suggestErrorCauses function.
 * - SuggestErrorCausesOutput - The return type for the suggestErrorCauses function.
 */

import {ai} from '../../ai/genkit';
import {z} from 'genkit';

const SuggestErrorCausesInputSchema = z.object({
  errorCode: z.string().describe('The vehicle error code to analyze.'),
});
export type SuggestErrorCausesInput = z.infer<typeof SuggestErrorCausesInputSchema>;

const SuggestErrorCausesOutputSchema = z.object({
  possibleCauses: z.array(z.string()).describe('Possible causes for the error code.'),
  suggestedSolutions: z.array(z.string()).describe('Suggested solutions for the error code.'),
});
export type SuggestErrorCausesOutput = z.infer<typeof SuggestErrorCausesOutputSchema>;

export async function suggestErrorCauses(input: SuggestErrorCausesInput): Promise<SuggestErrorCausesOutput> {
  return suggestErrorCausesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestErrorCausesPrompt',
  input: {schema: SuggestErrorCausesInputSchema},
  output: {schema: SuggestErrorCausesOutputSchema},
  prompt: `You are an experienced mechanic. Given the following error code, provide possible causes and suggested solutions.

Error Code: {{{errorCode}}}

Respond with possible causes and suggested solutions. Format the response as a JSON object with "possibleCauses" and "suggestedSolutions" arrays. Each entry should be a string.
`,
});

const suggestErrorCausesFlow = ai.defineFlow(
  {
    name: 'suggestErrorCausesFlow',
    inputSchema: SuggestErrorCausesInputSchema,
    outputSchema: SuggestErrorCausesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

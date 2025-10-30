'use server';

/**
 * @fileOverview Estimates the difficulty of a DIY repair based on error code and solution.
 *
 * - assessDiyDifficulty - A function to assess the difficulty of a DIY repair.
 * - AssessDiyDifficultyInput - The input type for the assessDiyDifficulty function.
 * - AssessDiyDifficultyOutput - The return type for the assessDiyDifficulty function.
 */

import {ai} from '../../ai/genkit';
import {z} from 'genkit';

const AssessDiyDifficultyInputSchema = z.object({
  errorCode: z
    .string()
    .describe('The vehicle error code to assess difficulty for.'),
  solutionSteps: z
    .string()
    .describe('The proposed solution steps for the error code.'),
});
export type AssessDiyDifficultyInput = z.infer<typeof AssessDiyDifficultyInputSchema>;

const AssessDiyDifficultyOutputSchema = z.object({
  difficultyLevel: z
    .string()
    .describe(
      'The estimated difficulty level of the repair (e.g., Easy, Medium, Hard).'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the difficulty level assessment, considering the complexity of the solution steps.'
    ),
});
export type AssessDiyDifficultyOutput = z.infer<typeof AssessDiyDifficultyOutputSchema>;

export async function assessDiyDifficulty(
  input: AssessDiyDifficultyInput
): Promise<AssessDiyDifficultyOutput> {
  return assessDiyDifficultyFlow(input);
}

const assessDiyDifficultyPrompt = ai.definePrompt({
  name: 'assessDiyDifficultyPrompt',
  input: {schema: AssessDiyDifficultyInputSchema},
  output: {schema: AssessDiyDifficultyOutputSchema},
  prompt: `You are an expert automotive technician. Assess the difficulty level (Easy, Medium, Hard) for a user to perform a DIY repair based on the provided error code and solution steps. Provide a brief explanation for your assessment.

Error Code: {{{errorCode}}}
Solution Steps: {{{solutionSteps}}}

Difficulty Level: 
Reasoning: `,
});

const assessDiyDifficultyFlow = ai.defineFlow(
  {
    name: 'assessDiyDifficultyFlow',
    inputSchema: AssessDiyDifficultyInputSchema,
    outputSchema: AssessDiyDifficultyOutputSchema,
  },
  async input => {
    const {output} = await assessDiyDifficultyPrompt(input);
    return output!;
  }
);

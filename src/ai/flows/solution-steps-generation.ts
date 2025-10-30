'use server';

/**
 * @fileOverview A Genkit flow for generating step-by-step repair instructions tailored to a specific vehicle error code.
 *
 * - generateSolutionSteps - A function that generates solution steps for a given error code.
 * - SolutionStepsInput - The input type for the generateSolutionSteps function.
 * - SolutionStepsOutput - The return type for the generateSolutionSteps function.
 */

import {ai} from '../../ai/genkit';
import {z} from 'genkit';

const SolutionStepsInputSchema = z.object({
  errorCode: z
    .string()
    .describe('The vehicle error code to generate solution steps for.'),
  vehicleMake: z.string().optional().describe('The make of the vehicle.'),
  vehicleModel: z.string().optional().describe('The model of the vehicle.'),
  vehicleYear: z.string().optional().describe('The year of the vehicle.'),
});
export type SolutionStepsInput = z.infer<typeof SolutionStepsInputSchema>;

const SolutionStepsOutputSchema = z.object({
  steps: z
    .array(z.string())
    .describe('An array of step-by-step instructions to repair the vehicle.'),
});
export type SolutionStepsOutput = z.infer<typeof SolutionStepsOutputSchema>;

export async function generateSolutionSteps(
  input: SolutionStepsInput
): Promise<SolutionStepsOutput> {
  return generateSolutionStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solutionStepsPrompt',
  input: {schema: SolutionStepsInputSchema},
  output: {schema: SolutionStepsOutputSchema},
  prompt: `You are an expert automotive technician. Generate step-by-step repair instructions for the following error code:

Error Code: {{{errorCode}}}

Vehicle Make: {{{vehicleMake}}}
Vehicle Model: {{{vehicleModel}}}
Vehicle Year: {{{vehicleYear}}}

Instructions:
`, 
});

const generateSolutionStepsFlow = ai.defineFlow(
  {
    name: 'generateSolutionStepsFlow',
    inputSchema: SolutionStepsInputSchema,
    outputSchema: SolutionStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

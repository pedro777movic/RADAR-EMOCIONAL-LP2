'use server';
/**
 * @fileOverview A Genkit flow for providing personalized relationship diagnostics.
 *
 * - personalizedRelationshipDiagnostic - A function that handles the relationship diagnostic process.
 * - PersonalizedRelationshipDiagnosticInput - The input type for the personalizedRelationshipDiagnostic function.
 * - PersonalizedRelationshipDiagnosticOutput - The return type for the personalizedRelationshipDiagnostic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRelationshipDiagnosticInputSchema = z.object({
  userSituation: z
    .string()
    .describe('A detailed description of the user\'s current relationship situation and struggles.'),
});
export type PersonalizedRelationshipDiagnosticInput = z.infer<
  typeof PersonalizedRelationshipDiagnosticInputSchema
>;

const PersonalizedRelationshipDiagnosticOutputSchema = z.object({
  empatheticInsight: z
    .string()
    .describe('A VERY CONCISE (max 2-3 sentences) empathetic insight into the user\'s situation.'),
  programRelevance: z
    .string()
    .describe(
      'A BRIEF explanation (max 2 sentences) of how the "Lunar Attraction" program solves this specific situation.'
    ),
});
export type PersonalizedRelationshipDiagnosticOutput = z.infer<
  typeof PersonalizedRelationshipDiagnosticOutputSchema
>;

export async function personalizedRelationshipDiagnostic(
  input: PersonalizedRelationshipDiagnosticInput
): Promise<PersonalizedRelationshipDiagnosticOutput> {
  return personalizedRelationshipDiagnosticFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRelationshipDiagnosticPrompt',
  input: {schema: PersonalizedRelationshipDiagnosticInputSchema},
  output: {schema: PersonalizedRelationshipDiagnosticOutputSchema},
  prompt: `You are an empathetic relationship expert. Your goal is to provide a BRIEF, direct, and powerful analysis.

Instructions:
- Be concise. Use max 3 short sentences for the insight.
- Be direct. Identify the core emotional pattern immediately.
- For program relevance, explain in 1 or 2 sentences how the "Lunar Attraction" repositioning strategy solves the problem.

User's Situation: {{{userSituation}}}`,
});

const personalizedRelationshipDiagnosticFlow = ai.defineFlow(
  {
    name: 'personalizedRelationshipDiagnosticFlow',
    inputSchema: PersonalizedRelationshipDiagnosticInputSchema,
    outputSchema: PersonalizedRelationshipDiagnosticOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

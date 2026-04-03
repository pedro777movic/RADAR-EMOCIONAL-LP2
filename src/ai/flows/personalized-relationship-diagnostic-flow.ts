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
    .describe('A VERY CONCISE (max 2-3 sentences) empathetic insight that identifies a specific stage of cooling down and a warning of inertia.'),
  programRelevance: z
    .string()
    .describe(
      'A BRIEF explanation (max 2 sentences) of how the "Radar Emocional" strategy solves this specific situation.'
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
- IDENTIFY THE STAGE: Use terms like 'Estágio de Esfriamento Passivo' or 'Estágio de Ruptura Silenciosa'.
- CREATE URGENCY: Mention that if nothing is done in the next 7 days, the pattern of silence may become a permanent emotional block.
- PROGRAM FOCUS: Always refer to the solution as "Radar Emocional". Explain how its positioning strategy solves the problem.

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

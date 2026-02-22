import { generateObject, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { atsAnalysisSchema, resumeAnalysisSchema } from './schema';

export const AIClient = {
    async analyzeResume(resumeText: string, prompt: string) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY environment variable is not defined');
        }

        try {
            const { object } = await generateObject({
                model: openai('gpt-4o'),
                schema: resumeAnalysisSchema,
                system: prompt,
                prompt: `Analyze the following resume text:\n\n${resumeText}`,
            });

            return object;
        } catch (error) {
            console.error('AI SDK Generation Error:', error);
            throw new Error('Failed to generate resume analysis from AI provider');
        }
    },

    async analyzeATS(resumeText: string, prompt: string) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY environment variable is not defined');
        }

        try {
            const { object } = await generateObject({
                model: openai('gpt-4o'),
                schema: atsAnalysisSchema,
                system: prompt,
                prompt: `Analyze the following resume text for ATS compatibility:\n\n${resumeText}`,
            });

            return object;
        } catch (error) {
            console.error('AI SDK ATS Generation Error:', error);
            throw new Error('Failed to generate ATS analysis from AI provider');
        }
    },

    async rewriteBullet(bulletPoint: string, prompt: string) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY environment variable is not defined');
        }

        try {
            const { text } = await generateText({
                model: openai('gpt-4o'),
                system: prompt,
                prompt: `Rewrite the following bullet point:\n\n${bulletPoint}`,
            });
            return text;
        } catch (error) {
            console.error('AI SDK Rewrite Error:', error);
            throw new Error('Failed to rewrite bullet via AI provider');
        }
    }
};

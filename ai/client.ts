import { generateObject, generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { atsAnalysisSchema, resumeAnalysisSchema, jobMatchSchema, comparisonAnalysisSchema } from './schema';

export const AIClient = {
    async analyzeComparison(resumeA: string, resumeB: string, prompt: string) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY environment variable is not defined');
        }

        try {
            const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
            const { object } = await generateObject({
                model: google('gemini-1.5-pro-latest'),
                schema: comparisonAnalysisSchema,
                system: prompt,
                prompt: `Compare these two resumes:\n\n### RESUME A:\n${resumeA}\n\n### RESUME B:\n${resumeB}`,
            });

            return object;
        } catch (error) {
            console.error('AI SDK Comparison Error:', error);
            throw new Error('Failed to generate resume comparison from AI provider');
        }
    },
    async analyzeResume(resumeText: string, prompt: string) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY environment variable is not defined');
        }

        try {
            const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
            const { object } = await generateObject({
                model: google('gemini-1.5-pro-latest'),
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
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY environment variable is not defined');
        }

        try {
            const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
            const { object } = await generateObject({
                model: google('gemini-1.5-pro-latest'),
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

    async analyzeJobMatch(resumeText: string, jobDescription: string, prompt: string) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY environment variable is not defined');
        }

        try {
            const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
            const { object } = await generateObject({
                model: google('gemini-1.5-pro-latest'),
                schema: jobMatchSchema,
                system: prompt,
                prompt: `Compare this Resume to this Job Description.\n\n### RESUME:\n${resumeText}\n\n### JOB DESCRIPTION:\n${jobDescription}`,
            });

            return object;
        } catch (error) {
            console.error('AI SDK Job Match Error:', error);
            throw new Error('Failed to generate job match analysis from AI provider');
        }
    },

    async rewriteBullet(bulletPoint: string, prompt: string) {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY environment variable is not defined');
        }

        try {
            const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
            const { text } = await generateText({
                model: google('gemini-1.5-pro-latest'),
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

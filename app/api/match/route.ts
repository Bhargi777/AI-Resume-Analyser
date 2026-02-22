import { NextRequest, NextResponse } from 'next/server';
import { AIClient } from '@/ai/client';
import { PROMPTS } from '@/ai/prompts';
import { z } from 'zod';

export const runtime = 'edge';
export const maxDuration = 45;

const jobMatchRequestSchema = z.object({
    resumeText: z.string().min(10, 'Resume text is too short'),
    jobDescription: z.string().min(10, 'Job description is too short'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = jobMatchRequestSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: result.error.format() },
                { status: 400 }
            );
        }

        const { resumeText, jobDescription } = result.data;

        if (!process.env.GEMINI_API_KEY) {
            console.error('Missing GEMINI_API_KEY environment variable');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const matchAnalysis = await AIClient.analyzeJobMatch(
            resumeText,
            jobDescription,
            PROMPTS.JOB_MATCH
        );

        return NextResponse.json(matchAnalysis, { status: 200 });
    } catch (error) {
        console.error('Job Match API Error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze job match. Please try again later.' },
            { status: 500 }
        );
    }
}

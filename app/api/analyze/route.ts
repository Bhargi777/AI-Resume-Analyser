import { NextRequest, NextResponse } from 'next/server';
import { AIClient } from '@/ai/client';
import { PROMPTS } from '@/ai/prompts';
import { z } from 'zod';

export const runtime = 'edge';
export const maxDuration = 45;

const analyzeRequestSchema = z.object({
    text: z.string().min(10, 'Resume text is too short to analyze.'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = analyzeRequestSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: result.error.format() },
                { status: 400 }
            );
        }

        const { text } = result.data;

        if (!process.env.GEMINI_API_KEY) {
            console.error('Missing GEMINI_API_KEY environment variable');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const analysis = await AIClient.analyzeResume(text, PROMPTS.RESUME_ANALYSIS);

        return NextResponse.json(analysis, { status: 200 });
    } catch (error) {
        console.error('Analyze API Error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze resume text. Please try again later.' },
            { status: 500 }
        );
    }
}

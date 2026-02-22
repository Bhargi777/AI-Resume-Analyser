import { NextRequest, NextResponse } from 'next/server';
import { AIClient } from '@/ai/client';
import { PROMPTS } from '@/ai/prompts';
import { z } from 'zod';

export const runtime = 'edge';
export const maxDuration = 45;

const compareRequestSchema = z.object({
    resumeA: z.string().min(10, 'Resume A text is too short'),
    resumeB: z.string().min(10, 'Resume B text is too short'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = compareRequestSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: result.error.format() },
                { status: 400 }
            );
        }

        const { resumeA, resumeB } = result.data;

        if (!process.env.GEMINI_API_KEY) {
            console.error('Missing GEMINI_API_KEY environment variable');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const comparison = await AIClient.analyzeComparison(
            resumeA,
            resumeB,
            PROMPTS.RESUME_COMPARE
        );

        return NextResponse.json(comparison, { status: 200 });
    } catch (error) {
        console.error('Compare API Error:', error);
        return NextResponse.json(
            { error: 'Failed to compare resumes. Please try again later.' },
            { status: 500 }
        );
    }
}

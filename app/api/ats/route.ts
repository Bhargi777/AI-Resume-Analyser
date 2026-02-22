import { NextRequest, NextResponse } from 'next/server';
import { AIClient } from '@/ai/client';
import { PROMPTS } from '@/ai/prompts';
import { z } from 'zod';

export const runtime = 'edge';
export const maxDuration = 45;

const atsRequestSchema = z.object({
    text: z.string().min(10, 'Resume text is too short to analyze.'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = atsRequestSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: result.error.errors },
                { status: 400 }
            );
        }

        const { text } = result.data;

        if (!process.env.OPENAI_API_KEY) {
            console.error('Missing OPENAI_API_KEY environment variable');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const atsAnalysis = await AIClient.analyzeATS(text, PROMPTS.ATS_ANALYSIS);

        return NextResponse.json(atsAnalysis, { status: 200 });
    } catch (error) {
        console.error('ATS API Error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze resume for ATS. Please try again later.' },
            { status: 500 }
        );
    }
}

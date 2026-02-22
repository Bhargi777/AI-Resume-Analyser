import { NextRequest, NextResponse } from 'next/server';
import { AIClient } from '@/ai/client';
import { PROMPTS } from '@/ai/prompts';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { text } = body;

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Missing or invalid resume text in request body' },
                { status: 400 }
            );
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'Server configuration error: Missing AI API key' },
                { status: 500 }
            );
        }

        const analysis = await AIClient.analyzeResume(text, PROMPTS.RESUME_ANALYSIS);

        return NextResponse.json(analysis, { status: 200 });
    } catch (error) {
        console.error('Analyze API Error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze resume text.' },
            { status: 500 }
        );
    }
}

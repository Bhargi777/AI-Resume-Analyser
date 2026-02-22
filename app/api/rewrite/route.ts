import { NextRequest, NextResponse } from 'next/server';
import { AIClient } from '@/ai/client';
import { PROMPTS } from '@/ai/prompts';
import { z } from 'zod';

export const runtime = 'edge';
export const maxDuration = 45;

const rewriteRequestSchema = z.object({
    bullet: z.string().min(5, 'Bullet point is too short to rewrite.'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const result = rewriteRequestSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: result.error.errors },
                { status: 400 }
            );
        }

        const { bullet } = result.data;

        if (!process.env.OPENAI_API_KEY) {
            console.error('Missing OPENAI_API_KEY environment variable');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const rewrittenBullet = await AIClient.rewriteBullet(
            bullet,
            PROMPTS.BULLET_REWRITE
        );

        return NextResponse.json({ text: rewrittenBullet }, { status: 200 });
    } catch (error) {
        console.error('Rewrite API Error:', error);
        return NextResponse.json(
            { error: 'Failed to rewrite bullet via AI. Please try again later.' },
            { status: 500 }
        );
    }
}

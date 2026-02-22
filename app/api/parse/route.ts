import { NextRequest, NextResponse } from 'next/server';
import { parsePdfToText } from '@/lib/pdf-parser';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { error: 'Invalid file type. Only PDF is supported.' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const text = await parsePdfToText(buffer);

        return NextResponse.json(
            { text, message: 'PDF parsed successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Parse API error:', error);
        return NextResponse.json(
            { error: 'Failed to parse resume.' },
            { status: 500 }
        );
    }
}

'use client';

import { useState } from 'react';
import { ResumeUploader } from '@/components/resume-uploader';
import { Container } from '@/components/ui/container';
import { Dashboard } from '@/components/dashboard';
import { ResumeAnalysis } from '@/ai/schema';
import { Loader2 } from 'lucide-react';

export default function AnalyzerPage() {
    const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUploadSuccess = async (file: File) => {
        setIsAnalyzing(true);
        setError(null);
        setAnalysis(null);

        try {
            // 1. Parse PDF
            const formData = new FormData();
            formData.append('file', file);

            const parseRes = await fetch('/api/parse', {
                method: 'POST',
                body: formData,
            });

            if (!parseRes.ok) {
                throw new Error('Failed to parse resume');
            }

            const { text } = await parseRes.json();

            // 2. Analyze
            const analyzeRes = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });

            if (!analyzeRes.ok) {
                throw new Error('Failed to analyze resume');
            }

            const data = await analyzeRes.json();
            setAnalysis(data);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-12 md:py-24">
                <Container className="max-w-5xl space-y-8">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
                        <p className="text-muted-foreground">
                            Upload your resume for instant ATS feedback, score, and actionable improvements.
                        </p>
                    </div>

                    {!analysis && !isAnalyzing && (
                        <div className="max-w-xl mx-auto">
                            <ResumeUploader onUploadSuccess={handleUploadSuccess} />
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="flex flex-col items-center justify-center py-24 space-y-4">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="text-lg font-medium animate-pulse">Analyzing your resume...</p>
                            <p className="text-sm text-muted-foreground">This usually takes 10-15 seconds.</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-center max-w-xl mx-auto">
                            <p className="font-medium">Error analyzing resume</p>
                            <p className="text-sm mt-1">{error}</p>
                            <button
                                onClick={() => setError(null)}
                                className="mt-4 text-sm underline hover:no-underline"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {analysis && !isAnalyzing && (
                        <Dashboard analysis={analysis} />
                    )}

                </Container>
            </main>
        </div>
    );
}

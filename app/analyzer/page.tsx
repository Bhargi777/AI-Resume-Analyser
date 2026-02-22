'use client';

import { useState } from 'react';
import { ResumeUploader } from '@/components/resume-uploader';
import { Container } from '@/components/ui/container';
import { Dashboard } from '@/components/dashboard';
import { ATSInsights } from '@/components/ats-insights';
import { JobMatch } from '@/components/job-match';
import { ResumeAnalysis, ATSAnalysis } from '@/ai/schema';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AnalyzerPage() {
    const [resumeText, setResumeText] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
    const [atsAnalysis, setAtsAnalysis] = useState<ATSAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<'content' | 'ats' | 'jobMatch'>('content');

    const handleUploadSuccess = async (file: File) => {
        setIsAnalyzing(true);
        setError(null);
        setAnalysis(null);
        setAtsAnalysis(null);
        setResumeText(null);
        setActiveTab('content');

        try {
            // 1. Parse PDF
            const formData = new FormData();
            formData.append('file', file);

            const parseRes = await fetch('/api/parse', {
                method: 'POST',
                body: formData,
            });

            if (!parseRes.ok) throw new Error('Failed to parse resume');
            const { text } = await parseRes.json();
            setResumeText(text);

            // 2. Analyze Content & ATS concurrently
            const [analyzeRes, atsRes] = await Promise.all([
                fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text }),
                }),
                fetch('/api/ats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text }),
                })
            ]);

            if (!analyzeRes.ok || !atsRes.ok) {
                throw new Error('Failed to analyze resume data');
            }

            const [analyzeData, atsData] = await Promise.all([
                analyzeRes.json(),
                atsRes.json()
            ]);

            setAnalysis(analyzeData);
            setAtsAnalysis(atsData);
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

                    {analysis && atsAnalysis && resumeText && !isAnalyzing && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-center space-x-2 bg-muted p-1 rounded-lg w-max mx-auto shadow-sm">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn("px-8 py-2 h-auto text-sm font-medium transition-all rounded-md",
                                        activeTab === 'content' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                    )}
                                    onClick={() => setActiveTab('content')}
                                >
                                    Content Analysis
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn("px-8 py-2 h-auto text-sm font-medium transition-all rounded-md",
                                        activeTab === 'ats' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                    )}
                                    onClick={() => setActiveTab('ats')}
                                >
                                    ATS Insights
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn("px-8 py-2 h-auto text-sm font-medium transition-all rounded-md",
                                        activeTab === 'jobMatch' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                                    )}
                                    onClick={() => setActiveTab('jobMatch')}
                                >
                                    Job Match
                                </Button>
                            </div>

                            {activeTab === 'content' && <Dashboard analysis={analysis} />}
                            {activeTab === 'ats' && <ATSInsights analysis={atsAnalysis} />}
                            {activeTab === 'jobMatch' && <JobMatch resumeText={resumeText} />}
                        </div>
                    )}

                </Container>
            </main>
        </div>
    );
}

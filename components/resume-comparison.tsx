'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ComparisonAnalysis } from '@/ai/schema';
import { Loader2, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ResumeUploader } from '@/components/resume-uploader';

interface ResumeComparisonProps {
    initialResumeText: string;
}

export function ResumeComparison({ initialResumeText }: ResumeComparisonProps) {
    const [resumeBText, setResumeBText] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<ComparisonAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUploadB = async (file: File) => {
        setIsParsing(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/parse', { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Failed to parse Resume B');
            const { text } = await res.json();
            setResumeBText(text);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsParsing(false);
        }
    };

    const handleCompare = async () => {
        if (!resumeBText) return;
        setIsAnalyzing(true);
        setError(null);
        try {
            const res = await fetch('/api/compare', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeA: initialResumeText, resumeB: resumeBText }),
            });
            if (!res.ok) throw new Error('Failed to compare resumes');
            const data = await res.json();
            setAnalysis(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!analysis && (
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="text-sm">Current Resume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-primary">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-sm font-medium">Original Uploaded</span>
                            </div>
                        </CardContent>
                    </Card>

                    {resumeBText ? (
                        <Card className="border-green-500/20 bg-green-500/5">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-sm">Resume B</CardTitle>
                                <Button variant="ghost" size="sm" onClick={() => setResumeBText(null)} className="h-8 text-xs">Change</Button>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span className="text-sm font-medium">Ready to Compare</span>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="border-dashed">
                            <CardHeader>
                                <CardTitle className="text-sm">Upload Second Version</CardTitle>
                                <CardDescription>To compare against your current resume</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isParsing ? (
                                    <div className="flex items-center justify-center py-4">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                    </div>
                                ) : (
                                    <ResumeUploader onUploadSuccess={handleUploadB} />
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {!analysis && resumeBText && (
                <div className="flex justify-center">
                    <Button onClick={handleCompare} disabled={isAnalyzing} size="lg" className="px-12">
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Comparing...
                            </>
                        ) : (
                            'Run Comparison'
                        )}
                    </Button>
                </div>
            )}

            {analysis && (
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="p-4 text-center">
                                <CardTitle className="text-xs text-muted-foreground uppercase">Resume A Score</CardTitle>
                                <div className="text-3xl font-bold">{analysis.resumeAScore}</div>
                            </CardHeader>
                        </Card>
                        <div className="flex items-center justify-center">
                            <div className={`flex items-center gap-1 font-bold ${analysis.scoreDelta >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                                {analysis.scoreDelta >= 0 ? '+' : ''}{analysis.scoreDelta}
                            </div>
                        </div>
                        <Card>
                            <CardHeader className="p-4 text-center">
                                <CardTitle className="text-xs text-muted-foreground uppercase">Resume B Score</CardTitle>
                                <div className="text-3xl font-bold">{analysis.resumeBScore}</div>
                            </CardHeader>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Decision: Which is better?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm leading-relaxed">{analysis.recommendation}</p>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Key Differences</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {analysis.keyDifferences.map((diff, i) => (
                                        <li key={i} className="text-sm flex gap-2">
                                            <span className="text-primary">•</span>
                                            {diff}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="border-primary/20">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Resume A Unique Strengths</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-1">
                                        {analysis.strengthsOfA.map((s, i) => (
                                            <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="border-green-500/20">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Resume B Unique Strengths</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-1">
                                        {analysis.strengthsOfB.map((s, i) => (
                                            <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Button variant="outline" onClick={() => { setAnalysis(null); setResumeBText(null); }}>
                        Start New Comparison
                    </Button>
                </div>
            )}

            {error && <p className="text-sm text-destructive text-center">{error}</p>}
        </div>
    );
}

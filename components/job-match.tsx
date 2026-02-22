'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobMatchAnalysis } from '@/ai/schema';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface JobMatchProps {
    resumeText: string;
}

export function JobMatch({ resumeText }: JobMatchProps) {
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState<JobMatchAnalysis | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleMatch = async () => {
        if (!jobDescription.trim()) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            const res = await fetch('/api/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeText, jobDescription }),
            });

            if (!res.ok) {
                throw new Error('Failed to analyze job match');
            }

            const data = await res.json();
            setAnalysis(data);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {!analysis && (
                <Card>
                    <CardHeader>
                        <CardTitle>Job Description Matching</CardTitle>
                        <CardDescription>
                            Paste a job description below to see how well your resume matches and find missing keywords.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <textarea
                            className="w-full min-h-[200px] p-4 rounded-md border bg-background text-sm"
                            placeholder="Paste job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            disabled={isAnalyzing}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button onClick={handleMatch} disabled={isAnalyzing || !jobDescription.trim()}>
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing Match...
                                </>
                            ) : (
                                'Compare Resume'
                            )}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {analysis && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-card border rounded-xl p-6 shadow-sm">
                        <div>
                            <h2 className="text-2xl font-bold">Match Score</h2>
                            <p className="text-muted-foreground text-sm">Based on required skills and keywords</p>
                        </div>
                        <div className="text-5xl font-extrabold text-primary">
                            {analysis.matchScore}%
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Matching Skills</CardTitle>
                                <CardDescription>Skills found in both resume and JD</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.matchingSkills.map((skill, idx) => (
                                        <Badge key={idx} variant="default" className="px-3 py-1 bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {analysis.matchingSkills.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No matching skills found.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Missing Skills / Keywords</CardTitle>
                                <CardDescription>Add these to improve your match rate</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {[...analysis.missingSkills, ...analysis.keywordGaps].map((skill, idx) => (
                                        <Badge key={idx} variant="outline" className="px-3 py-1 bg-destructive/10 text-destructive border-transparent">
                                            {skill}
                                        </Badge>
                                    ))}
                                    {(analysis.missingSkills.length === 0 && analysis.keywordGaps.length === 0) && (
                                        <p className="text-sm text-muted-foreground">You hit all the keywords!</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tailoring Suggestions</CardTitle>
                            <CardDescription>How to customize your resume for this role</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                {analysis.tailoringSuggestions.map((suggestion, idx) => (
                                    <li key={idx}>{suggestion}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Button variant="outline" onClick={() => setAnalysis(null)}>
                        Analyze Another Job
                    </Button>

                </div>
            )}

        </div>
    );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import { ResumeAnalysis } from '@/ai/schema';
import { Loader2 } from 'lucide-react';

const ScoreChart = dynamic(() => import('@/components/score-chart').then(mod => mod.ScoreChart), {
    loading: () => <div className="h-[300px] w-full flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>,
    ssr: false
});

interface DashboardProps {
    analysis: ResumeAnalysis;
}

export function Dashboard({ analysis }: DashboardProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="col-span-1 lg:col-span-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{analysis.score}</div>
                        <p className="text-xs text-muted-foreground mt-1">out of 100</p>
                    </CardContent>
                </Card>

                <Card className="col-span-1 lg:col-span-3">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Recruiter First Impression</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{analysis.recruiterSummary}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Score Breakdown</CardTitle>
                        <CardDescription>Visual analysis of your resume dimensions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScoreChart scores={analysis.scores} />
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Strengths</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                {analysis.strengths.map((str, idx) => (
                                    <li key={idx} className="text-primary">{str}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Critical Weaknesses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-destructive">
                                {analysis.weaknesses.map((weakness, idx) => (
                                    <li key={idx}>{weakness}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>High-Impact Improvements</CardTitle>
                    <CardDescription>Actionable steps to increase your score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {analysis.improvements.map((improvement, index) => (
                        <div key={index} className="grid md:grid-cols-2 gap-4 pb-4 border-b last:border-0 last:pb-0">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge variant={improvement.impact === 'High' ? 'default' : 'secondary'}>
                                        {improvement.impact} Impact
                                    </Badge>
                                    <span className="text-sm font-medium">Original</span>
                                </div>
                                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                                    {improvement.original}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-medium">Suggestion</span>
                                <p className="text-sm bg-primary/10 text-primary-foreground/90 p-3 rounded-md border border-primary/20">
                                    {improvement.suggestion}
                                </p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ATSAnalysis } from '@/ai/schema';
import { Badge } from '@/components/ui/badge';

interface ATSInsightsProps {
    analysis: ATSAnalysis;
}

export function ATSInsights({ analysis }: ATSInsightsProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="col-span-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">ATS Parseability</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{analysis.score}</div>
                        <p className="text-xs text-muted-foreground mt-1">out of 100</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Keyword Density</CardTitle>
                        <CardDescription>Top detected skills and terms</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {analysis.keywordDensity.map((kw, idx) => (
                                <Badge key={idx} variant="secondary" className="px-3 py-1">
                                    {kw.keyword} <span className="ml-2 text-muted-foreground text-xs">x{kw.count}</span>
                                </Badge>
                            ))}
                            {analysis.keywordDensity.length === 0 && (
                                <p className="text-sm text-muted-foreground">No significant keywords detected</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Parsing Issues</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {analysis.parsingIssues.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-2 text-sm text-destructive">
                                    {analysis.parsingIssues.map((issue, idx) => (
                                        <li key={idx}>{issue}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">No parsing issues detected! Good job.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Formatting Risks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {analysis.formattingRisks.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-2 text-sm text-destructive">
                                    {analysis.formattingRisks.map((risk, idx) => (
                                        <li key={idx}>{risk}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">No formatting risks found.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>How to fix ATS issues</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        {analysis.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-primary">{rec}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

        </div>
    );
}

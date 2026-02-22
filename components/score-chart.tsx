'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';

interface ScoreChartProps {
    scores: {
        contentQuality: number;
        formatting: number;
        atsCompatibility: number;
        impactMetrics: number;
        skillsRelevance: number;
    };
}

export function ScoreChart({ scores }: ScoreChartProps) {
    const data = [
        { subject: 'Content', A: scores.contentQuality, fullMark: 100 },
        { subject: 'Format', A: scores.formatting, fullMark: 100 },
        { subject: 'ATS Match', A: scores.atsCompatibility, fullMark: 100 },
        { subject: 'Impact', A: scores.impactMetrics, fullMark: 100 },
        { subject: 'Skills', A: scores.skillsRelevance, fullMark: 100 },
    ];

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="hsl(var(--muted-foreground) / 0.2)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <Radar
                        name="Score"
                        dataKey="A"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

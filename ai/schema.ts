import { z } from 'zod';

export const resumeAnalysisSchema = z.object({
    score: z.number().min(0).max(100).describe('Overall resume score out of 100'),
    scores: z.object({
        contentQuality: z.number().min(0).max(100).describe('Score for impactful achievements and bullet points'),
        formatting: z.number().min(0).max(100).describe('Score for readability and structure'),
        atsCompatibility: z.number().min(0).max(100).describe('Score for standard headers, keywords and parsing'),
        impactMetrics: z.number().min(0).max(100).describe('Score for quantified results used'),
        skillsRelevance: z.number().min(0).max(100).describe('Score for hard/soft skills inclusion'),
    }),
    strengths: z.array(z.string()).describe('List of 3-5 strongest points in the resume'),
    weaknesses: z.array(z.string()).describe('List of 2-4 critical weaknesses in the resume'),
    missingSections: z.array(z.string()).describe('E.g. "Education", "Skills", "Summary" (if missing)'),
    improvements: z.array(
        z.object({
            original: z.string().describe('The original text or concept to improve'),
            suggestion: z.string().describe('The specific advice or rewritten text'),
            impact: z.enum(['High', 'Medium', 'Low']).describe('Expected impact of the improvement'),
        })
    ).describe('High-impact improvements to be made'),
    recruiterSummary: z.string().describe('A 2-3 sentence summary of how a recruiter would view this candidate'),
});

export type ResumeAnalysis = z.infer<typeof resumeAnalysisSchema>;

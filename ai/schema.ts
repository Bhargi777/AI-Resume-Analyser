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

export const atsAnalysisSchema = z.object({
    score: z.number().min(0).max(100).describe('Overall ATS parseability score'),
    parsingIssues: z.array(z.string()).describe('Lists of items that an ATS might fail to parse (e.g. multi-column layouts, graphics)'),
    formattingRisks: z.array(z.string()).describe('Risks associated with fonts, margins, or file types'),
    keywordDensity: z.array(
        z.object({
            keyword: z.string(),
            count: z.number(),
        })
    ).describe('Important keywords found in the resume and their frequency'),
    recommendations: z.array(z.string()).describe('Actionable steps to fix ATS issues'),
});

export type ATSAnalysis = z.infer<typeof atsAnalysisSchema>;

export const jobMatchSchema = z.object({
    matchScore: z.number().min(0).max(100).describe('Overall percentage match with the job description'),
    matchingSkills: z.array(z.string()).describe('Skills found in both resume and JD'),
    missingSkills: z.array(z.string()).describe('Skills in JD missing from the resume'),
    keywordGaps: z.array(z.string()).describe('Specific phrases/buzzwords in JD not found in resume'),
    tailoringSuggestions: z.array(z.string()).describe('Actionable suggestions to tailor the resume to this JD'),
});

export type JobMatchAnalysis = z.infer<typeof jobMatchSchema>;

export const comparisonAnalysisSchema = z.object({
    resumeAScore: z.number().min(0).max(100),
    resumeBScore: z.number().min(0).max(100),
    scoreDelta: z.number(),
    keyDifferences: z.array(z.string()).describe('Major differences between the two resumes'),
    strengthsOfA: z.array(z.string()).describe('Unique strengths of Resume A'),
    strengthsOfB: z.array(z.string()).describe('Unique strengths of Resume B'),
    recommendation: z.string().describe('Which resume is better for general applications and why'),
});

export type ComparisonAnalysis = z.infer<typeof comparisonAnalysisSchema>;

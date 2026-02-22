import { ResumeUploader } from '@/components/resume-uploader';
import { Container } from '@/components/ui/container';

export default function AnalyzerPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-12 md:py-24">
                <Container className="max-w-3xl">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Resume Analyzer</h1>
                            <p className="text-muted-foreground mt-2">
                                Upload your resume to get instant ATS feedback, score, and actionable improvements.
                            </p>
                        </div>
                        <ResumeUploader />
                    </div>
                </Container>
            </main>
        </div>
    );
}

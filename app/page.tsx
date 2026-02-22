import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MotionDiv, MotionH1, MotionP, fadeIn } from '@/components/ui/motion';
import { ArrowRight, FileText, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar placeholder */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border/40">
        <Link className="flex items-center justify-center" href="/">
          <FileText className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-xl tracking-tight">AI Resume Analyzer</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#how-it-works">
            How it Works
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <Container className="px-4 md:px-6">
            <MotionDiv
              {...fadeIn}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <MotionH1
                  className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-3xl mx-auto"
                >
                  Supercharge Your Resume with <span className="text-primary">AI</span>
                </MotionH1>
                <MotionP
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                  {...fadeIn}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Analyze your resume, score ATS compatibility, find skill gaps for specific jobs, and let AI rewrite your bullets for maximum impact.
                </MotionP>
              </div>
              <MotionDiv
                {...fadeIn}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-x-4"
              >
                <Link href="/analyzer">
                  <Button size="lg" className="h-12 px-8">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg" className="h-12 px-8">
                    Learn More
                  </Button>
                </Link>
              </MotionDiv>
            </MotionDiv>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary flex items-center justify-center">
          <Container className="px-4 md:px-6 text-center">
            <div className="mx-auto max-w-2xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to land your dream job?
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who have successfully optimized their resumes to easily bypass ATS.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Link href="/analyzer">
                  <Button size="lg" className="h-12 px-8">
                    Upload Resume <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40 content-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

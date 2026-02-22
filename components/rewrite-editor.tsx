'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight, Copy, CheckCircle } from 'lucide-react';

export function RewriteEditor() {
    const [originalBullet, setOriginalBullet] = useState('');
    const [rewrittenBullet, setRewrittenBullet] = useState<string | null>(null);
    const [isRewriting, setIsRewriting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleRewrite = async () => {
        if (!originalBullet.trim()) return;

        setIsRewriting(true);
        setError(null);
        setRewrittenBullet(null);
        setCopied(false);

        try {
            const res = await fetch('/api/rewrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bullet: originalBullet }),
            });

            if (!res.ok) {
                throw new Error('Failed to rewrite bullet');
            }

            const data = await res.json();
            setRewrittenBullet(data.text);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsRewriting(false);
        }
    };

    const handleCopy = () => {
        if (rewrittenBullet) {
            navigator.clipboard.writeText(rewrittenBullet);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
                <CardHeader>
                    <CardTitle>AI Bullet Rewriter</CardTitle>
                    <CardDescription>
                        Paste a weak resume bullet point and let our AI optimize it using the STAR method for maximum impact.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Original Bullet</label>
                            <textarea
                                className="w-full min-h-[120px] p-3 rounded-md border bg-background text-sm resize-none focus:ring-2 focus:ring-primary focus:outline-none"
                                placeholder="e.g. Led a team of developers to build a new app."
                                value={originalBullet}
                                onChange={(e) => setOriginalBullet(e.target.value)}
                                disabled={isRewriting}
                            />
                        </div>

                        <div className="hidden md:flex justify-center">
                            <Button size="icon" variant="ghost" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary pointer-events-none">
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-primary">AI Optimized Bullet</label>
                            <div className="w-full min-h-[120px] p-3 rounded-md border bg-primary/5 border-primary/20 text-sm relative">
                                {isRewriting ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/60">
                                        <Loader2 className="h-6 w-6 animate-spin mb-2" />
                                        <span className="text-xs">Optimizing...</span>
                                    </div>
                                ) : rewrittenBullet ? (
                                    <>
                                        <p className="text-foreground pr-8">{rewrittenBullet}</p>
                                        <button
                                            onClick={handleCopy}
                                            className="absolute top-2 right-2 p-2 rounded-md hover:bg-primary/20 text-primary transition-colors"
                                            title="Copy to clipboard"
                                        >
                                            {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </button>
                                    </>
                                ) : (
                                    <p className="text-muted-foreground italic text-center mt-10">Result will appear here</p>
                                )}
                            </div>
                        </div>

                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <div className="flex justify-center pt-4 border-t">
                        <Button onClick={handleRewrite} disabled={isRewriting || !originalBullet.trim()} className="w-full md:w-auto px-12">
                            {isRewriting ? 'Rewriting...' : 'Rewrite Bullet'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

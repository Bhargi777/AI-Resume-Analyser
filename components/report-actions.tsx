'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, Check } from 'lucide-react';
import LZString from 'lz-string';

interface ReportActionsProps {
    data: any;
}

export function ReportActions({ data }: ReportActionsProps) {
    const [copied, setCopied] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        // Compress data to fit in URL
        const payload = LZString.compressToEncodedURIComponent(JSON.stringify(data));
        const url = `${window.location.origin}/share?data=${payload}`;

        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2 print:hidden">
            <Button variant="outline" size="sm" onClick={handlePrint}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
                {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Share2 className="h-4 w-4 mr-2" />}
                {copied ? 'Link Copied!' : 'Share Report'}
            </Button>
        </div>
    );
}

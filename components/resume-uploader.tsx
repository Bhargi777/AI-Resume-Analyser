'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function ResumeUploader() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log('Files dropped:', acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                'border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-colors',
                isDragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25 hover:bg-muted/50 hover:border-muted-foreground/50'
            )}
        >
            <input {...getInputProps()} />
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload your resume</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
                Drag and drop your PDF resume here, or click to browse files
            </p>
            <Button variant="outline" type="button" className="pointer-events-none">
                Select File
            </Button>
        </div>
    );
}

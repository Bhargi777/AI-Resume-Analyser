'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { UploadCloud, File as FileIcon, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function ResumeUploader({ onUploadSuccess }: { onUploadSuccess?: (file: File) => void }) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        setError(null);

        if (fileRejections.length > 0) {
            const rejection = fileRejections[0];
            if (rejection.errors[0]?.code === 'file-too-large') {
                setError('File is too large. Max size is 5MB.');
            } else if (rejection.errors[0]?.code === 'file-invalid-type') {
                setError('Invalid file type. Only PDF is supported.');
            } else {
                setError(rejection.errors[0]?.message || 'File rejected');
            }
            return;
        }

        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024, // 5MB
    });

    const handleUpload = async () => {
        if (!file) return;
        setIsUploading(true);
        setError(null);

        // Mock upload delay
        setTimeout(() => {
            setIsUploading(false);
            if (onUploadSuccess) onUploadSuccess(file);
        }, 2000);
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        setError(null);
    };

    if (file) {
        return (
            <div className="border rounded-xl p-8 flex flex-col items-center justify-center bg-card shadow-sm">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FileIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-1 truncate max-w-full px-4">{file.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <div className="flex gap-4 w-full">
                    <Button variant="outline" className="flex-1" onClick={handleRemove} disabled={isUploading}>
                        Remove
                    </Button>
                    <Button className="flex-1" onClick={handleUpload} disabled={isUploading}>
                        {isUploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Analyze Resume'
                        )}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={cn(
                    'border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-colors',
                    isDragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-muted-foreground/25 hover:bg-muted/50 hover:border-muted-foreground/50',
                    error && 'border-destructive bg-destructive/5'
                )}
            >
                <input {...getInputProps()} />
                <UploadCloud className={cn("h-10 w-10 mb-4", error ? "text-destructive" : "text-muted-foreground")} />
                <h3 className="text-xl font-semibold mb-2">Upload your resume</h3>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                    Drag and drop your PDF resume here, or click to browse files
                </p>
                <p className="text-xs text-muted-foreground mb-4 text-center">
                    Maximum file size: 5MB
                </p>
                <Button variant="outline" type="button" className="pointer-events-none">
                    Select File
                </Button>
            </div>

            {error && (
                <div className="flex items-center text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                </div>
            )}
        </div>
    );
}

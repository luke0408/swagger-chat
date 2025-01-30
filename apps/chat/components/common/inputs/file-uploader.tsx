'use client';

import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/index';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useSwaggerStore } from '@/store/useSwaggerStore';
import { validateSwaggerDocument, parseFileContent } from '@/lib/utils/validation';

const ACCEPT = '.json,.yaml,.yml';

interface FileUploaderProps {
  className?: string;
  onSuccess?: () => void;
}

interface DragEventHandlers {
  onDragEnter: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function FileUploader({ className, onSuccess }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFile, setType, error } = useSwaggerStore();

  const handleFileSuccess = useCallback(
    (file: File) => {
      setFile(file);
      setType('file');
      onSuccess?.();
    },
    [setFile, setType, onSuccess]
  );

  const processFile = useCallback(
    async (file: File) => {
      const content = await file.text();
      const parsedContent = parseFileContent(content, file.name);

      if (!validateSwaggerDocument(parsedContent)) {
        setFile(null);
        console.error('Invalid document format');
        return;
      }

      handleFileSuccess(file);
    },
    [handleFileSuccess, setFile]
  );

  const handleDragEvents = useCallback(
    (): DragEventHandlers => ({
      onDragEnter: (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      },
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      },
      onDragLeave: (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      },
      onDrop: async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) await processFile(file);
      },
    }),
    [processFile]
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) await processFile(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [processFile]
  );

  const dragHandlers = handleDragEvents();

  return (
    <div className="w-full">
      <div
        className={cn(
          'relative flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors',
          isDragging ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400',
          error && 'border-red-500',
          className
        )}
        {...dragHandlers}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={ACCEPT}
          onChange={handleFileChange}
        />

        <ArrowUpTrayIcon className={cn('mb-2 h-6 w-6 text-gray-400')} aria-hidden="true" />

        <p className={cn('mb-1 text-sm text-gray-500')}>Drag and drop your OpenAPI file here</p>

        <p className={cn('text-xs text-gray-400')}>or browse to upload</p>

        {error && (
          <p className={cn('absolute bottom-2 left-2 text-sm text-red-500')}>
            Invalid document format
          </p>
        )}
      </div>
    </div>
  );
}

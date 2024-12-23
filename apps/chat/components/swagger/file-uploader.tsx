import React, { useState, useRef } from 'react';
import { cn } from '@/lib/index';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { validateSwaggerFile } from '@/lib/utils/validation';

interface FileUploaderProps {
  accept?: string;
  maxSize?: number;
  onFileSelect?: (file: File) => void;
  className?: string;
  label?: string;
}

export function FileUploader({
  accept = '.json,.yaml,.yml',
  maxSize = 5 * 1024 * 1024,
  onFileSelect,
  className,
  label = 'Drag and drop or click to upload a file',
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File): Promise<string> => {
    console.log('Uploading file:', file.name, file.type);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/swagger-upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload error:', errorText);
        throw new Error(errorText || 'Upload failed');
      }

      const result = await response.json();
      console.log('Upload result:', result);

      return result.url;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setErrorMessage('');

    const file = e.dataTransfer.files[0];
    if (file) {
      console.log('Dropped file:', file.name, file.type);

      try {
        if (!validateSwaggerFile(file)) {
          throw new Error('Invalid Swagger file');
        }

        const uploadedUrl = await handleFileUpload(file);
        setUploadedFileUrl(uploadedUrl);
        onFileSelect?.(file);
      } catch (error) {
        console.error('Drop upload error:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name, file.type);

      try {
        if (!validateSwaggerFile(file)) {
          throw new Error('Invalid Swagger file');
        }

        const uploadedUrl = await handleFileUpload(file);
        setUploadedFileUrl(uploadedUrl);
        onFileSelect?.(file);
      } catch (error) {
        console.error('File change upload error:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Upload failed');
      }
    }

    // 같은 파일 재선택을 위한 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          'p-4 relative flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg transition-colors cursor-pointer',
          isDragging ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400',
          errorMessage && 'border-red-500',
          className
        )}
        onDragEnter={(e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragOver={(e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e: React.DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />

        <ArrowUpTrayIcon className="w-6 h-6 mb-4 text-gray-400" aria-hidden="true" />

        <p className="mb-2 text-sm text-gray-500">
          {label}
        </p>

        {accept !== '*/*' && (
          <p className="text-xs text-gray-400">
            Supported formats: {accept}
          </p>
        )}

        {maxSize && (
          <p className="text-xs text-gray-400">
            Max size: {maxSize / 1024 / 1024}MB
          </p>
        )}

        {uploadedFileUrl && (
          <div className="absolute bottom-2 right-2 text-sm text-green-500">
            File uploaded: {uploadedFileUrl}
          </div>
        )}

        {errorMessage && (
          <p className="absolute bottom-2 left-2 text-sm text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

FileUploader.displayName = 'FileUploader';
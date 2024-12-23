'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/index';

export interface DraggableWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
  title?: string;
}

export function DraggableWindow({
  children,
  className,
  initialWidth = 400,
  initialHeight = 300,
  minWidth = 200,
  minHeight = 150,
  title = 'Window',
  ...props
}: DraggableWindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    width: typeof props.style?.width === 'number'
      ? props.style.width
      : parseInt(props.style?.width?.toString() || `${initialWidth}`, 10),
    height: typeof props.style?.height === 'number'
      ? props.style.height
      : parseInt(props.style?.height?.toString() || `${initialHeight}`, 10)
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);

  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const originalPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const originalSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (props.style?.position === 'static') return;

      if (isDragging) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;

        setPosition({
          x: originalPos.current.x + deltaX,
          y: originalPos.current.y + deltaY,
        });
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStartPos.current.x;
        const deltaY = e.clientY - resizeStartPos.current.y;

        let newWidth = originalSize.current.width;
        let newHeight = originalSize.current.height;

        if (resizeDirection?.includes('e')) {
          newWidth += deltaX;
        }
        if (resizeDirection?.includes('s')) {
          newHeight += deltaY;
        }
        if (resizeDirection?.includes('w')) {
          newWidth -= deltaX;
          setPosition(prev => ({
            ...prev,
            x: prev.x + deltaX
          }));
        }
        if (resizeDirection?.includes('n')) {
          newHeight -= deltaY;
          setPosition(prev => ({
            ...prev,
            y: prev.y + deltaY
          }));
        }

        setSize({
          width: Math.max(minWidth, newWidth),
          height: Math.max(minHeight, newHeight)
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, resizeDirection, minWidth, minHeight]);

  const startDragging = (e: React.MouseEvent) => {
    const headerElement = (e.target as HTMLElement).closest('.draggable-header');
    if (headerElement) {
      setIsDragging(true);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      originalPos.current = position;
    }
  };

  const startResizing = (direction: string) => (e: React.MouseEvent) => {
    if (props.style?.position === 'static') return;

    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    originalSize.current = size;
    originalPos.current = position;
  };

  return (
    <div
      ref={windowRef}
      className={cn(
        'fixed bg-white shadow-lg rounded-lg overflow-hidden',
        'border border-gray-200',
        isDragging && 'cursor-grabbing',
        className,
        props.style?.position === 'static' && 'static'
      )}
      style={{
        ...(props.style?.position !== 'static' ? {
          transform: `translate(${position.x}px, ${position.y}px)`,
        } : {}),
        width: size.width,
        height: size.height,
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
      {...props}
    >
      <div
        className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 cursor-grab"
        onMouseDown={startDragging}
      >
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      </div>

      <div className="p-4 h-[calc(100%-2.5rem)] overflow-auto">
        {children}
      </div>

      {props.style?.position !== 'static' && (
        <>
          <div
            className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
            onMouseDown={startResizing('nw')}
          />
          <div
            className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
            onMouseDown={startResizing('ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
            onMouseDown={startResizing('sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
            onMouseDown={startResizing('se')}
          />
          <div
            className="absolute top-0 left-1/2 w-8 h-2 -translate-x-1/2 cursor-n-resize"
            onMouseDown={startResizing('n')}
          />
          <div
            className="absolute bottom-0 left-1/2 w-8 h-2 -translate-x-1/2 cursor-s-resize"
            onMouseDown={startResizing('s')}
          />
          <div
            className="absolute left-0 top-1/2 w-2 h-8 -translate-y-1/2 cursor-w-resize"
            onMouseDown={startResizing('w')}
          />
          <div
            className="absolute right-0 top-1/2 w-2 h-8 -translate-y-1/2 cursor-e-resize"
            onMouseDown={startResizing('e')}
          />
        </>
      )}
    </div>
  );
}
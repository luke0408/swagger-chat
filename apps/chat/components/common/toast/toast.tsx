'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: {
      background: 'bg-green-500/20 backdrop-blur-md border border-green-500/30',
      icon: '🚀',
      textColor: 'text-green-800',
    },
    info: {
      background: 'bg-blue-500/20 backdrop-blur-md border border-blue-500/30',
      icon: '💡',
      textColor: 'text-blue-800',
    },
    warning: {
      background: 'bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30',
      icon: '⚠️',
      textColor: 'text-yellow-800',
    },
    error: {
      background: 'bg-red-500/20 backdrop-blur-md border border-red-500/30',
      icon: '🚨',
      textColor: 'text-red-800',
    },
  };

  const currentStyle = typeStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed bottom-4 right-4 z-50 m-4 rounded-xl px-4 py-3 shadow-lg',
            'flex items-center space-x-2',
            'transition-all duration-300 ease-in-out',
            currentStyle.background,
            currentStyle.textColor
          )}
        >
          <span className="text-lg">{currentStyle.icon}</span>
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (props: ToastProps) => {
    setToast(props);
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
};

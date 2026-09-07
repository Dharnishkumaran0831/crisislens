import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastVariant = 'success' | 'error' | 'info';

interface ToastNotificationProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  onClose: (id: string) => void;
}

const variantStyles = {
  success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  error: 'bg-red-500/10 border-red-500/30 text-red-400',
  info: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
};

const variantIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

/**
 * Toast Notification banner component for feedback alerts.
 */
export const ToastNotification: React.FC<ToastNotificationProps> = ({
  id,
  message,
  variant = 'info',
  onClose,
}) => {
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-card transition-all animate-fadeIn',
        variantStyles[variant]
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={() => onClose(id)}
        className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

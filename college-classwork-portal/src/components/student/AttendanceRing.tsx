import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface AttendanceRingProps {
  present: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

export const AttendanceRing: React.FC<AttendanceRingProps> = ({
  present,
  total,
  size = 120,
  strokeWidth = 10
}) => {
  const percentage = total > 0 ? Math.round((present / total) * 100) : 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isSafe = percentage >= 75;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
      {/* SVG Ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-slate-100 dark:stroke-slate-800"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isSafe ? '#2563eb' : '#e11d48'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {percentage}%
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Attendance
          </span>
        </div>
      </div>

      {/* Details breakdown */}
      <div className="flex-1 space-y-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Academic Status:
          </span>
          {isSafe ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" /> Exam Eligible
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" /> Shortage Warning
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Minimum 75% required by college university regulations.
        </p>

        <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>Present: <strong>{present}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Absent: <strong>{total - present}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Total: <strong>{total}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

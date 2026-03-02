
import React from 'react';

export const Crosshair = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <div className="absolute w-full h-[1px] bg-current opacity-20"></div>
    <div className="absolute h-full w-[1px] bg-current opacity-20"></div>
    <div className="w-1 h-1 bg-current rounded-full"></div>
  </div>
);

export const EditorialMark = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`flex items-center gap-2 text-[10px] tracking-widest uppercase font-medium opacity-60 ${className}`}>
    <span className="w-8 h-[1px] bg-current"></span>
    {text}
  </div>
);

export const DecorativeCircle = ({ className = "" }: { className?: string }) => (
  <div className={`border border-current rounded-full opacity-10 ${className}`}></div>
);

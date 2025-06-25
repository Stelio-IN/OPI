// src/components/SamPayIcon.jsx
import React from 'react';

const SamPayIcon = ({ size = 32, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
    <defs>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1e40af" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="30" height="30" rx="6" fill="url(#iconGradient)" />
    <g transform="translate(6, 6)">
      <circle cx="3" cy="13" r="3" fill="white" opacity="0.9" />
      <circle cx="3" cy="13" r="2" fill="#1e40af" />
      <circle cx="13" cy="13" r="3" fill="white" opacity="0.9" />
      <circle cx="13" cy="13" r="2" fill="#1e40af" />
      <path d="M 1 10 L 15 10 L 17 6 L 17 3 L 12 3 L 11 4 L 3 4 L 1 10 Z" fill="white" opacity="0.9" />
      <rect x="4" y="6" width="2.5" height="2" fill="#1e40af" opacity="0.7" />
      <rect x="7.5" y="6" width="2.5" height="2" fill="#1e40af" opacity="0.7" />
      <path d="M 18 8 L 20 8 M 18 10 L 20 10" stroke="white" strokeWidth="1" opacity="0.8" />
    </g>
  </svg>
);

export default SamPayIcon;

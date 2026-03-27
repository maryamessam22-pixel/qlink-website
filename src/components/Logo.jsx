import React from 'react';

const Logo = () => (
  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="35" y="28" fill="white" fontSize="24" fontWeight="bold" fontFamily="Roboto, sans-serif">link</text>
    {/* Emulated Q with link */}
    <circle cx="18" cy="18" r="12" stroke="white" strokeWidth="3" fill="none" />
    <path d="M 24 24 L 32 32" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M 28 20 C 30 18 34 18 36 20 C 38 22 38 26 36 28 L 32 32" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
  
);

export default Logo;

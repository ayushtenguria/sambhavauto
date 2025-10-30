
import React from 'react';

export function TopBar() {
  return (
    <div className="sticky top-0 z-50 flex flex-col sm:flex-row w-full text-white">
      <div className="w-full sm:w-1/2 bg-[#003087] flex items-center justify-center p-3 text-center flex-1">
        <span className="font-semibold text-sm tracking-wide [text-shadow:0_0_8px_rgba(255,255,255,0.8)]">Maruti Suzuki Arena</span>
      </div>
      <div className="w-full sm:w-1/2 bg-[#222222] flex items-center justify-center p-3 text-center flex-1">
        <span className="font-nexa font-bold text-base tracking-widest [text-shadow:0_0_8px_rgba(255,255,255,0.8)]">NEXA</span>
      </div>
    </div>
  );
}

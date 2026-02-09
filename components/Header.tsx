import React from 'react';
import { ChevronLeft } from './Icons';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showBack, onBack, rightAction }) => {
  return (
    <div className="bg-[#13775f] text-white px-4 pt-12 pb-4 sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBack && (
            <button onClick={onBack} className="mr-2 -ml-2 p-2 hover:bg-white/10 rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-lg font-semibold tracking-wide">{title}</h1>
        </div>
        <div>
            {rightAction}
        </div>
      </div>
    </div>
  );
};

export default Header;

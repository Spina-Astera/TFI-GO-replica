import React from 'react';
import { Tab } from '../types';
import { EuroIcon, TicketIcon, UserIcon } from './Icons';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const getTabClass = (tab: Tab) => {
    const isActive = currentTab === tab;
    return `flex flex-col items-center justify-center w-full py-2 ${
      isActive ? 'text-[#13775f]' : 'text-gray-400'
    }`;
  };

  return (
    <div className="bg-white border-t border-gray-200 fixed bottom-0 w-full max-w-md pb-safe">
      <div className="flex justify-around items-center h-16">
        <button onClick={() => onTabChange('buy')} className={getTabClass('buy')}>
          <div className={`p-1 rounded-full ${currentTab === 'buy' ? 'bg-[#e0f2ef]' : ''}`}>
             <EuroIcon className="w-6 h-6" />
          </div>
          <span className="text-xs mt-1 font-medium">Buy</span>
        </button>
        <button onClick={() => onTabChange('tickets')} className={getTabClass('tickets')}>
           <div className={`p-1 rounded-full ${currentTab === 'tickets' ? 'bg-[#e0f2ef]' : ''}`}>
             <TicketIcon className="w-6 h-6" />
           </div>
          <span className="text-xs mt-1 font-medium">Tickets</span>
        </button>
        <button onClick={() => onTabChange('profile')} className={getTabClass('profile')}>
           <div className={`p-1 rounded-full ${currentTab === 'profile' ? 'bg-[#e0f2ef]' : ''}`}>
             <UserIcon className="w-6 h-6" />
           </div>
          <span className="text-xs mt-1 font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;

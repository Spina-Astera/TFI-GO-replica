import React, { useState, useEffect } from 'react';
import { TicketConfig } from '../types';
import { TicketIcon, ChevronRight } from '../components/Icons';

interface ActivationScreenProps {
  ticket: TicketConfig;
  onActivate: () => void;
}

// Reusable Ticket Card Component
const TicketCard = ({ ticket }: { ticket: TicketConfig }) => (
  <div className="relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 w-full">
    {/* Top Section */}
    <div className="p-5 relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-[#13775f] p-2 rounded text-white">
            <TicketIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800">{ticket.type}</h3>
            <p className="text-gray-600 font-medium">{ticket.origin} - {ticket.destination}</p>
          </div>
        </div>
      </div>

      {/* Operator Strip */}
      <div className="bg-[#eaf4f2] -mx-5 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#ce0e2d]">Bus Éireann</span>
          <span className="bg-[#ce0e2d] text-white text-xs px-1.5 py-0.5 rounded font-bold">{ticket.route}</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-300"></div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-end">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">Route 115</p>
          <p className="text-xs text-gray-500 mt-1">From {ticket.origin}</p>
          <p className="text-xs text-gray-500">To {ticket.destination}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Single</p>
          <p className="text-xl font-bold text-gray-800">€{ticket.price.toFixed(2)}</p>
        </div>
      </div>
    </div>

    {/* Dashed Separator Visual */}
    <div className="absolute top-[60%] left-0 w-full h-0 border-t-2 border-dashed border-gray-300 -mt-1 z-0"></div>
    {/* Cutouts */}
    <div className="absolute top-[60%] -left-3 w-6 h-6 bg-[#f3f4f6] rounded-full -mt-3 z-20"></div>
    <div className="absolute top-[60%] -right-3 w-6 h-6 bg-[#f3f4f6] rounded-full -mt-3 z-20"></div>

    {/* Bottom Section (Conditions) */}
    <div className="bg-white p-3 border-t border-dashed border-gray-200 text-center">
      <button className="text-[10px] text-gray-500 underline font-semibold">Conditions of Carriage</button>
      <p className="text-[10px] text-gray-400 mt-1">The ticket is only valid after activation.</p>
    </div>
  </div>
);

const ActivationScreen: React.FC<ActivationScreenProps> = ({ ticket, onActivate }) => {
  const [viewState, setViewState] = useState<'overview' | 'confirm'>('overview');
  const [isPressed, setIsPressed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInitialActivate = () => {
    setViewState('confirm');
  };

  const handlePress = () => {
    if (isPressed) return; // Prevent double clicks during timeout
    setIsPressed(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsPressed(false);
    }, 3000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IE', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  if (viewState === 'confirm') {
    return (
      <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-100">
        {/* Top Half - Static Ticket Preview */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-6 border-b border-gray-200 relative z-10 shadow-sm">
          <div className="w-full max-w-xs transform scale-95 origin-center">
             <TicketCard ticket={ticket} />
          </div>
        </div>

        {/* Bottom Half - Interaction Area */}
        <div className={`flex-1 relative flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ease-in-out ${isPressed ? 'bg-purple-100' : 'bg-white'}`}>
           
           {/* Live Time Display */}
           <div className="absolute top-6 font-mono text-gray-400 text-sm tracking-widest z-20">
              {formatTime(currentTime)}
           </div>

           {/* Main Interactive Container */}
           <div className="relative w-64 h-64 flex items-center justify-center">
              
              {/* Outer Ring of 8 Mini Arrows */}
              <div className={`absolute inset-0 transition-all duration-300 ${isPressed ? 'opacity-50' : 'animate-[spin_8s_linear_infinite]'}`}>
                  {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center"
                        style={{ 
                            transform: `rotate(${i * 45}deg) translateX(90px)` 
                        }}
                      >
                         {/* Mini Arrow Icon - rotated to point outwards/orbitally */}
                         <ChevronRight className={`w-5 h-5 text-purple-400 ${isPressed ? '' : 'animate-[spin_2s_linear_infinite]'}`} />
                      </div>
                  ))}
              </div>

              {/* Central Button */}
              <button 
                onClick={handlePress}
                className={`relative z-30 w-28 h-28 bg-[#8b5cf6] rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 ease-out border-4 border-white ring-4 ring-purple-100 ${isPressed ? 'scale-95 bg-purple-700 ring-purple-300' : 'hover:scale-105'}`}
              >
                {/* Center Spinning Arrow */}
                <ChevronRight className={`w-12 h-12 stroke-[3] transition-all ${isPressed ? '' : 'animate-[spin_3s_linear_infinite]'}`} />
              </button>

              {/* Ripple Background (Optional visual flair for pressed state) */}
              <div className={`absolute inset-0 rounded-full bg-purple-500 opacity-0 transition-all duration-500 ${isPressed ? 'scale-150 opacity-10' : 'scale-50'}`} />
           </div>

           <p className={`mt-8 text-gray-400 font-medium text-sm tracking-wide uppercase transition-opacity duration-300 ${isPressed ? 'opacity-0' : 'opacity-100'}`}>
             Tap to Validate
           </p>
        </div>
      </div>
    );
  }

  // Initial Overview State
  return (
    <div className="p-4 pb-24">
      <div className="bg-[#eaf4f2] rounded-lg p-4 mb-6 text-sm text-[#13775f]">
        <p>Expires 28 days after purchase. Valid for 1 journey between origin and destination for one adult. Valid for 90 minutes after activation.</p>
      </div>

      <TicketCard ticket={ticket} />

      <button 
        onClick={handleInitialActivate}
        className="w-full mt-6 bg-[#13775f] text-white font-bold text-lg py-4 rounded-full shadow-lg hover:bg-[#0e5c4a] active:scale-[0.98] transition-all"
      >
        Activate Now
      </button>

      <div className="mt-8 text-center">
        <h4 className="text-[#13775f] font-bold text-sm uppercase tracking-wide">Activated Tickets</h4>
        <p className="text-gray-400 text-xs mt-2 italic">No other active tickets</p>
      </div>
    </div>
  );
};

export default ActivationScreen;

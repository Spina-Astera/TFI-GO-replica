import React from 'react';

interface TicketSelectionProps {
  onSelect: (ticket: any) => void;
}

const TicketSelection: React.FC<TicketSelectionProps> = ({ onSelect }) => {
  const handleSelect = () => {
    onSelect({
      id: Math.random().toString(36).substr(2, 9),
      operator: 'Bus Éireann',
      route: '115',
      origin: 'Liffey Valley SC',
      destination: 'Maynooth',
      price: 1.20,
      type: 'Single',
      purchasedAt: new Date().toISOString()
    });
  };

  return (
    <div className="p-4 pb-24">
      <h2 className="text-[#13775f] font-bold text-xl mb-4">Select Ticket</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Popular Routes</h3>
        
        <button 
          onClick={handleSelect}
          className="w-full text-left bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors flex justify-between items-center group"
        >
          <div>
            <div className="flex items-center space-x-2 mb-1">
               <span className="bg-[#ce0e2d] text-white text-xs font-bold px-2 py-0.5 rounded">115</span>
               <span className="font-bold text-gray-900">Single Adult</span>
            </div>
            <p className="text-sm text-gray-600">Liffey Valley SC ↔ Maynooth</p>
            <p className="text-xs text-gray-500 mt-1">Valid for 1 journey</p>
          </div>
          <div className="text-right">
             <span className="block font-bold text-lg text-[#13775f]">€3.60</span>
             <span className="text-xs text-[#13775f] font-medium group-hover:underline">Select</span>
          </div>
        </button>

         <button 
          className="w-full text-left border border-gray-200 rounded-lg p-4 mt-3 opacity-60 flex justify-between items-center"
          disabled
        >
          <div>
            <div className="flex items-center space-x-2 mb-1">
               <span className="bg-gray-400 text-white text-xs font-bold px-2 py-0.5 rounded">115</span>
               <span className="font-bold text-gray-900">Student / YAC</span>
            </div>
            <p className="text-sm text-gray-600">Liffey Valley SC ↔ Maynooth</p>
          </div>
          <div className="text-right">
             <span className="block font-bold text-lg text-gray-500">€1.80</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TicketSelection;

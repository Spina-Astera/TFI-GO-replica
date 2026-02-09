import React from 'react';
import { ChevronRight } from '../components/Icons';

interface OperatorSelectionProps {
  onSelect: (operator: string) => void;
}

const operators = [
  { name: 'Ashbourne Connect', color: 'text-blue-600', logoText: 'AC' },
  { name: 'BAILIEBORO CALL A CAB LTD', color: 'text-black', logoText: 'B' },
  { name: 'Express 191', color: 'text-green-700', logoText: 'EXP' },
  { name: 'Barretts of Mayo', color: 'text-blue-800', logoText: 'BM' },
  { name: 'Bus Éireann', color: 'text-[#ce0e2d]', logoText: 'BÉ', special: true }, // Highlighted for the demo
  { name: "Carroll's", color: 'text-gray-600', logoText: 'C' },
  { name: 'City Direct', color: 'text-red-600', logoText: 'CD' },
];

const OperatorSelection: React.FC<OperatorSelectionProps> = ({ onSelect }) => {
  return (
    <div className="p-4 space-y-3 pb-24">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {operators.map((op, idx) => (
          <button
            key={op.name}
            onClick={() => onSelect(op.name)}
            className={`w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 ${op.special ? 'ring-2 ring-[#13775f] bg-green-50' : ''}`}
          >
            <div className="flex items-center space-x-4">
              {/* Mock Logo Area */}
              <div className={`w-12 h-8 border border-gray-200 rounded flex items-center justify-center font-bold text-sm ${op.color} bg-white shadow-sm`}>
                 {op.name === 'Bus Éireann' ? (
                     <div className="flex items-center justify-center text-center leading-none text-[10px]">
                         Bus<br/>Éireann
                     </div>
                 ) : op.logoText}
              </div>
              <span className={`font-medium text-left ${op.special ? 'text-[#13775f] font-bold' : 'text-gray-700'}`}>
                {op.name}
              </span>
            </div>
            {op.special && <span className="text-xs text-[#13775f] font-semibold mr-2">Route 115</span>}
          </button>
        ))}
      </div>
      
      <p className="text-center text-gray-400 text-xs mt-6">
        Scroll down for more operators
      </p>
    </div>
  );
};

export default OperatorSelection;

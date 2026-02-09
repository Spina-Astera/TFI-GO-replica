import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import OperatorSelection from './views/OperatorSelection';
import TicketSelection from './views/TicketSelection';
import ActivationScreen from './views/ActivationScreen';
import ActiveTicketScreen from './views/ActiveTicketScreen';
import { Tab, FlowStep, TicketConfig, ActiveTicketState } from './types';
import { ChevronRight } from './components/Icons';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('buy');
  const [flowStep, setFlowStep] = useState<FlowStep>('operators');
  const [selectedTicket, setSelectedTicket] = useState<TicketConfig | null>(null);
  const [activeTicket, setActiveTicket] = useState<ActiveTicketState | null>(null);

  // --- Handlers ---
  
  const handleOperatorSelect = (operator: string) => {
    // We only care about Bus Éireann for the specific route 115 demo
    if (operator === 'Bus Éireann') {
        setFlowStep('ticket_selection');
    } else {
        alert('Demo limited to Bus Éireann (Route 115)');
    }
  };

  const handleTicketSelect = (ticket: TicketConfig) => {
      setSelectedTicket(ticket);
      setFlowStep('activation');
      // Switch tab to 'tickets' to mimic app flow where purchasing might redirect you
      // But based on PDF, we stay in flow or go to tickets. Let's stay in 'buy' flow until activation?
      // Actually, standard pattern is: Select -> Buy -> "Ready to Activate" is usually in "Tickets" tab.
      // Let's force switch to Tickets tab for the activation screen.
      setCurrentTab('tickets');
  };

  const handleActivate = () => {
      if (!selectedTicket) return;
      
      const now = new Date();
      const expires = new Date(now.getTime() + 90 * 60000); // 90 mins later

      const active: ActiveTicketState = {
          ...selectedTicket,
          activatedAt: now.toISOString(),
          expiresAt: expires.toISOString()
      };
      
      setActiveTicket(active);
      setFlowStep('active_ticket');
  };

  const handleBack = () => {
      if (flowStep === 'ticket_selection') setFlowStep('operators');
      if (flowStep === 'activation') {
          setFlowStep('operators'); // Or back to ticket selection
          setCurrentTab('buy');
      }
      if (flowStep === 'active_ticket') {
          // You generally can't go back from an active ticket to un-activate it
          // But we can go back to the list
          setActiveTicket(null);
          setFlowStep('activation'); 
      }
  };

  // --- Render Logic ---

  const renderContent = () => {
    // Profile Tab
    if (currentTab === 'profile') {
        return (
            <div className="bg-[#f3f4f6] min-h-screen">
                <Header title="Profile" rightAction={<button className="text-white text-sm font-bold">Log Out</button>} />
                <div className="bg-[#bce0da] p-4 text-[#13775f] font-medium text-sm flex items-center">
                    <div className="bg-gray-200 rounded-full p-1 mr-2"><svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg></div>
                    johnsmith@email.com
                </div>
                <div className="mt-2 bg-white">
                    {['Account Details', 'Purchase History'].map((item) => (
                        <div key={item} className="p-4 border-b border-gray-100 flex justify-between items-center text-gray-700 hover:bg-gray-50">
                            <span>{item}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    ))}
                    <div className="h-24 bg-gray-200 relative overflow-hidden group">
                         <img src="https://picsum.photos/800/200" alt="Ad" className="w-full h-full object-cover opacity-80" />
                         <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-shadow">Travel Safe</div>
                    </div>
                     {['Help and Contact', 'Transportforireland.ie'].map((item) => (
                        <div key={item} className="p-4 border-b border-gray-100 flex justify-between items-center text-gray-700 hover:bg-gray-50">
                            <span>{item}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    ))}
                     <div className="p-2 bg-[#bce0da] text-xs font-bold text-[#13775f] uppercase px-4 py-3">Legal</div>
                     {['About', 'Terms and Conditions', 'Privacy'].map((item) => (
                        <div key={item} className="p-4 border-b border-gray-100 flex justify-between items-center text-gray-700 hover:bg-gray-50">
                            <span>{item}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    ))}
                </div>
                <div className="h-24"></div>
            </div>
        );
    }

    // Buy Tab
    if (currentTab === 'buy') {
        if (flowStep === 'operators') {
            return (
                <div className="bg-[#f3f4f6] min-h-screen">
                    <Header title="Buy Ticket" />
                    <OperatorSelection onSelect={handleOperatorSelect} />
                </div>
            );
        }
        if (flowStep === 'ticket_selection') {
            return (
                <div className="bg-[#f3f4f6] min-h-screen">
                    <Header title="Buy Ticket" showBack onBack={handleBack} />
                    <TicketSelection onSelect={handleTicketSelect} />
                </div>
            );
        }
    }

    // Tickets Tab
    if (currentTab === 'tickets') {
        if (flowStep === 'active_ticket' && activeTicket) {
             // Active ticket takes over full screen mostly
             return <ActiveTicketScreen ticket={activeTicket} onBack={handleBack} />;
        }
        
        // List of tickets (Pending Activation)
        return (
            <div className="bg-[#f3f4f6] min-h-screen">
                <Header title="Ticket Activation" showBack={flowStep === 'activation'} onBack={handleBack} />
                
                {selectedTicket && !activeTicket ? (
                     <ActivationScreen ticket={selectedTicket} onActivate={handleActivate} />
                ) : (
                    <div className="p-8 text-center text-gray-500 mt-10">
                        <p>No tickets ready for activation.</p>
                        <button onClick={() => setCurrentTab('buy')} className="text-[#13775f] font-bold mt-4 underline">Buy a ticket</button>
                    </div>
                )}
            </div>
        );
    }

    return <div>Select a tab</div>;
  };

  return (
    <div className="font-sans antialiased text-gray-900 max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
        {renderContent()}
        {/* Hide bottom nav if we are looking at a live ticket for immersion, or keep it if desired. 
            Real app usually keeps it unless in full screen mode. Keeping it for now. */}
        {flowStep !== 'active_ticket' && (
            <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
        )}
    </div>
  );
}

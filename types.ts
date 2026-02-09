export type Tab = 'buy' | 'tickets' | 'profile';
export type FlowStep = 'operators' | 'ticket_selection' | 'activation' | 'active_ticket';

export interface TicketConfig {
  id: string;
  operator: string;
  route: string;
  origin: string;
  destination: string;
  price: number;
  type: 'Single' | 'Return';
  purchasedAt: string; // ISO String
}

export interface ActiveTicketState extends TicketConfig {
  activatedAt: string; // ISO String
  expiresAt: string; // ISO String
}

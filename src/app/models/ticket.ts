export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: 'bug' | 'changement' | 'ajout';
  priority: 'faible' | 'moyenne' | 'élevée';
  status: 'nouveau' | 'en cours' | 'terminé';
  assignee: string; // ID du développeur assigné
  createdDate: Date;
  updatedDate: Date;
  
}

export interface Developer {
  id: string;
  fullName: string;
}
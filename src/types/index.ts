export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface Link {
  label: string;
  url: string;
}

export interface ElectionStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  links: Link[];
}

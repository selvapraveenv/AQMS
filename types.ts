
export enum Channel {
  EMAIL = 'Email',
  INSTAGRAM = 'Instagram',
  CHAT = 'Chat',
  FACEBOOK = 'Facebook',
  FORUM = 'Community Forum',
}

export enum Category {
  QUESTION = 'Question',
  COMPLAINT = 'Complaint',
  REQUEST = 'Request',
  FEEDBACK = 'Feedback',
  BUG_REPORT = 'Bug Report',
  SPAM = 'Spam',
}

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum Status {
  NEW = 'New',
  ASSIGNED = 'Assigned',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
}

export enum Team {
  CRISIS = 'Crisis Team',
  SUPPORT = 'Support Team',
  GENERAL = 'General Team',
}

export interface Query {
  id: string;
  sender: string;
  senderAvatar: string;
  msg: string;
  channel: Channel;
  category: Category;
  priority: Priority;
  team: Team;
  status: Status;
  timestamp: string;
  history: HistoryEntry[];
}

export interface HistoryEntry {
  timestamp: string;
  action: string;
  // FIX: Added optional 'agent' property to match usage in mock data and context.
  agent?: string;
}

export interface Brand {
  name: string;
  channels: Channel[];
  logo: string;
}

export interface TeamMember {
  name: string;
  team: Team;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
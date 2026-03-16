export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string for preview
  isThinking?: boolean;
}

export interface FavoriteSession {
  id: string;
  title: string;
  summary: string;
  savedAt: string;
  messages: Message[];
  language: Language;
  complexity: Complexity;
}

export interface AnalyticsSnapshot {
  totalUserMessages: number;
  totalSessions: number;
  activeDates: string[];
  sessionDates: string[];
}

export interface StudyPlanState {
  id: string;
  completedTaskIds: string[];
  startedAt: string;
}

export interface ReviewProgressState {
  favoriteId: string;
  reviewsCompleted: number;
  lastReviewedAt: string;
}

export interface AdaptiveTask {
  id: string;
  text: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export type Complexity = 'Beginner' | 'Intermediate' | 'Advanced';

export type ThinkingStyle = 'Bounce' | 'Pulse' | 'Orbit' | 'Minimal' | 'Hidden';

export type Language = 'en' | 'pt' | 'es' | 'fr';

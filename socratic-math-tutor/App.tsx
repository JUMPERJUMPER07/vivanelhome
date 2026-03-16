import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Message, Complexity, ThinkingStyle, Language, FavoriteSession, AnalyticsSnapshot, StudyPlanState, ReviewProgressState, AdaptiveTask } from './types';
import { initializeChat, sendMessageToGemini, resetChat, translateText } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import ProgressBar from './components/ProgressBar';
import LandingPage from './components/LandingPage';
import { BackgroundLayer } from './components/BackgroundElements';
import { translations, complexityLabels, promptSuggestions } from './utils/translations';
import { TrendingUp } from 'lucide-react';

const CameraCapture = lazy(() => import('./components/CameraCapture'));
const ExamplesModal = lazy(() => import('./components/ExamplesModal'));
const SettingsModal = lazy(() => import('./components/SettingsModal'));
const GraphingPanel = lazy(() => import('./components/GraphingPanel'));

// --- Type definitions for Speech Recognition ---
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    deferredPrompt?: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

// --- Icons ---
const AttachmentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
  </svg>
);

const MicrophoneIcon = ({ isListening }: { isListening: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={isListening ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
  </svg>
);

const GlobeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const LightBulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-1.946c0-.836.29-1.638.83-2.25C13.866 12.655 14.866 11.232 14.866 9.5c0-2.485-1.99-4.5-4.5-4.5s-4.5 2.015-4.5 4.5c0 1.766 1 3.169 2.536 4.304.54.612.83 1.414.83 2.25V18m2.498-6.533a3.376 3.376 0 0 1-1.248-.372 3.377 3.377 0 0 1-1.25.372m0 0c.34.058.68.114 1.022.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75v13.5L12 17.25 6.75 20.25V6.75A2.25 2.25 0 0 1 9 4.5h6a2.25 2.25 0 0 1 2.25 2.25Z" />
  </svg>
);

const FlameIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c.621 2.244-.638 3.92-1.876 5.28-1.24 1.36-2.452 2.45-2.452 4.47a4.328 4.328 0 0 0 8.656 0c0-1.635-.82-2.809-1.775-4.02-.793-1.008-1.676-2.129-1.553-3.73Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 14.25c0 1.243 1.007 2.25 2.25 2.25s2.25-1.007 2.25-2.25c0-.75-.347-1.32-.81-1.927-.51-.67-1.09-1.43-1.053-2.573-.51 1.17-2.637 2.082-2.637 4.5Z" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v18h16.5M7.5 16.5v-6m4.5 6v-10.5m4.5 10.5V12" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

// --- Notification Toast ---
const NotificationToast = ({ message, type, onClose }: { message: string, type: 'error' | 'info', onClose: () => void }) => (
  <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl backdrop-blur-xl border animate-fade-in z-[100] flex items-center gap-3 cursor-pointer transition-all hover:scale-105 ${
    type === 'error' ? 'bg-red-500/80 border-red-400 text-white shadow-red-900/20' : 'bg-indigo-600/80 border-indigo-400 text-white shadow-indigo-900/20'
  }`} onClick={onClose}>
    {type === 'error' && (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
      </svg>
    )}
    <span className="text-sm font-medium tracking-wide">{message}</span>
    <button className="opacity-60 hover:opacity-100">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  </div>
);

const ModalFallback = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 backdrop-blur-sm">
    <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 shadow-2xl">
      Loading
    </div>
  </div>
);

const onboardingSteps = (t: Record<string, string>) => [
  t.onboardingStepOne,
  t.onboardingStepTwo,
  t.onboardingStepThree
];

const getDateKey = (date = new Date()) => date.toISOString().slice(0, 10);

const getWeekStartKey = (date = new Date()) => {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  return getDateKey(copy);
};

const APP_STORAGE_KEYS = [
  'socratic_chat_history',
  'socratic_thinking_style',
  'socratic_complexity',
  'socratic_language',
  'socratic_input_draft',
  'socratic_has_started',
  'socratic_onboarding_done',
  'socratic_favorites',
  'socratic_streak_count',
  'socratic_analytics',
  'socratic_weekly_goal',
  'socratic_study_plan',
  'socratic_review_progress',
  'socratic_last_active_date'
] as const;

const hashPin = async (pin: string): Promise<string> => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pin));
  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');
};


const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslatingInput, setIsTranslatingInput] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isGraphingOpen, setIsGraphingOpen] = useState(false);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [complexity, setComplexity] = useState<Complexity>('Intermediate');
  const [thinkingStyle, setThinkingStyle] = useState<ThinkingStyle>('Bounce');
  const [language, setLanguage] = useState<Language>('en');
  const [isListening, setIsListening] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'error' | 'info'} | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [favorites, setFavorites] = useState<FavoriteSession[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot>({
    totalUserMessages: 0,
    totalSessions: 0,
    activeDates: [],
    sessionDates: []
  });
  const [weeklyGoal, setWeeklyGoal] = useState(5);
  const [studyPlan, setStudyPlan] = useState<StudyPlanState | null>(null);
  const [reviewProgress, setReviewProgress] = useState<ReviewProgressState[]>([]);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [pinHash, setPinHash] = useState<string | null>(null);
  const [autoLockMinutes, setAutoLockMinutes] = useState(10);
  const [isLocked, setIsLocked] = useState(false);
  const [unlockPin, setUnlockPin] = useState('');
  const [lastInteractionAt, setLastInteractionAt] = useState(Date.now());
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Get current translation text
  const t = translations[language];
  const quickPrompts = promptSuggestions[language];
  const steps = onboardingSteps(t as Record<string, string>);
  const studyPlanTemplates = useMemo(
    () => [
      {
        id: 'algebra',
        title: t.planAlgebraTitle,
        description: t.planAlgebraDesc,
        tasks: [
          { id: 'algebra-1', text: t.planAlgebraTaskOne },
          { id: 'algebra-2', text: t.planAlgebraTaskTwo },
          { id: 'algebra-3', text: t.planAlgebraTaskThree }
        ]
      },
      {
        id: 'graph',
        title: t.planGraphTitle,
        description: t.planGraphDesc,
        tasks: [
          { id: 'graph-1', text: t.planGraphTaskOne },
          { id: 'graph-2', text: t.planGraphTaskTwo },
          { id: 'graph-3', text: t.planGraphTaskThree }
        ]
      },
      {
        id: 'exam',
        title: t.planExamTitle,
        description: t.planExamDesc,
        tasks: [
          { id: 'exam-1', text: t.planExamTaskOne },
          { id: 'exam-2', text: t.planExamTaskTwo },
          { id: 'exam-3', text: t.planExamTaskThree }
        ]
      }
    ],
    [t]
  );
  const activeStudyPlan = useMemo(
    () => studyPlanTemplates.find((plan) => plan.id === studyPlan?.id) || null,
    [studyPlanTemplates, studyPlan]
  );
  const currentWeekSessions = useMemo(() => {
    const weekStart = getWeekStartKey();
    return analytics.sessionDates.filter((date) => date >= weekStart).length;
  }, [analytics.sessionDates]);
  const weaknessProfile = useMemo(() => {
    const combinedText = messages
      .filter((message) => message.role === 'user')
      .map((message) => message.text.toLowerCase())
      .join(' ');

    const topicScores = [
      { key: 'algebra', label: t.topicAlgebra, score: (combinedText.match(/equa|factor|solve|x\^|simplif|linear|quadratic/g) || []).length },
      { key: 'graphs', label: t.topicGraphs, score: (combinedText.match(/graph|slope|intercept|curve|function|parabola/g) || []).length },
      { key: 'calculus', label: t.topicCalculus, score: (combinedText.match(/integral|derivative|limit|dx|differentiat/g) || []).length },
      { key: 'geometry', label: t.topicGeometry, score: (combinedText.match(/triangle|angle|circle|area|geometry|perimeter/g) || []).length },
      { key: 'word', label: t.topicWordProblems, score: (combinedText.match(/word problem|story|translate|ratio|distance|mixture/g) || []).length }
    ];

    const top = [...topicScores].sort((a, b) => b.score - a.score)[0];
    return top && top.score > 0 ? top.label : t.topicGeneral;
  }, [messages, t]);
  const recommendations = useMemo(() => {
    const items = [t.recommendationWeakness];
    if (currentWeekSessions < weeklyGoal) items.push(t.recommendationConsistency);
    if (favorites.length === 0) items.push(t.recommendationFavorites);
    if (studyPlan) items.push(t.recommendationPlan);
    if (favorites.length > 0) items.push(t.recommendationReview);
    return items.slice(0, 4);
  }, [currentWeekSessions, weeklyGoal, favorites.length, studyPlan, t]);
  const adaptivePath = useMemo(() => {
    const createTasks = (planId: string, label: string, tasks: string[], prompt: string) => ({
      planId,
      label,
      tasks: tasks.map((text, index) => ({ id: `${planId}-${index + 1}`, text })),
      prompt
    });

    if (weaknessProfile === t.topicAlgebra) {
      return createTasks(
        'algebra',
        t.topicAlgebra,
        [
          'Warm up with one linear equation and explain the inverse operation at each step.',
          'Simplify one expression and say which terms can combine.',
          'Check your final result by substituting it back into the equation.'
        ],
        'Guide me through one algebra equation step by step. Ask me what inverse operation I should use first, and do not reveal the final answer.'
      );
    }

    if (weaknessProfile === t.topicGraphs) {
      return createTasks(
        'graph',
        t.topicGraphs,
        [
          'Predict the shape of a function before plotting it.',
          'Find one intercept and explain what it means on the graph.',
          'Change one coefficient and compare how the curve moves.'
        ],
        'Give me one graphing exercise about slope or intercepts. Ask me to predict the graph before showing the conclusion.'
      );
    }

    if (weaknessProfile === t.topicCalculus) {
      return createTasks(
        'exam',
        t.topicCalculus,
        [
          'Identify whether the problem needs a derivative, limit, or integral.',
          'Name the rule or definition before computing anything.',
          'Explain what the result means in plain language.'
        ],
        'Give me a beginner-friendly calculus setup exercise. Ask me which rule applies before doing any computation.'
      );
    }

    if (weaknessProfile === t.topicGeometry) {
      return createTasks(
        'exam',
        t.topicGeometry,
        [
          'List the known measures and what the question asks.',
          'Choose the theorem or relationship that connects them.',
          'Solve and justify why that relationship fits the figure.'
        ],
        'Give me a geometry reasoning exercise and ask me which relationship or theorem I should use first.'
      );
    }

    if (weaknessProfile === t.topicWordProblems) {
      return createTasks(
        'exam',
        t.topicWordProblems,
        [
          'Translate the story into variables and quantities.',
          'Write the equation before solving it.',
          'Check whether the final value makes sense in context.'
        ],
        'Give me a word problem and coach me to translate it into an equation before solving.'
      );
    }

    return createTasks(
      'algebra',
      t.topicGeneral,
      [
        'Restate the problem in your own words.',
        'Choose the first useful representation: equation, graph, or diagram.',
        'Explain why the first step moves you closer to the goal.'
      ],
      'Give me a short math exercise and ask one guiding question at a time so I can choose the next step.'
    );
  }, [t, weaknessProfile]);
  const adaptiveCompletion = useMemo(() => {
    if (!studyPlan || studyPlan.id !== adaptivePath.planId) {
      return 0;
    }

    return adaptivePath.tasks.filter((task) => studyPlan.completedTaskIds.includes(task.id)).length;
  }, [adaptivePath, studyPlan]);
  const reviewQueue = useMemo(() => {
    const intervals = [1, 3, 7, 14];
    const now = new Date();

    return favorites
      .map((favorite) => {
        const progress = reviewProgress.find((item) => item.favoriteId === favorite.id);
        const reviewsCompleted = progress?.reviewsCompleted || 0;
        const lastReviewedAt = progress?.lastReviewedAt || favorite.savedAt;
        const nextInterval = intervals[Math.min(reviewsCompleted, intervals.length - 1)];
        const baseDate = new Date(lastReviewedAt);
        const dueDate = new Date(baseDate);
        dueDate.setDate(dueDate.getDate() + nextInterval);
        return {
          favorite,
          reviewsCompleted,
          dueDate,
          isDue: dueDate <= now
        };
      })
      .filter((item) => item.isDue)
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      .slice(0, 4);
  }, [favorites, reviewProgress]);

  useEffect(() => {
    // Load state from localStorage
    const savedSecurity = localStorage.getItem('socratic_security_settings');
    const savedMessages = localStorage.getItem('socratic_chat_history');
    const savedThinkingStyle = localStorage.getItem('socratic_thinking_style');
    const savedComplexity = localStorage.getItem('socratic_complexity') as Complexity | null;
    const savedLanguage = localStorage.getItem('socratic_language') as Language || 'en';
    const savedDraft = localStorage.getItem('socratic_input_draft');
    const savedHasStarted = localStorage.getItem('socratic_has_started');
    const savedOnboardingDone = localStorage.getItem('socratic_onboarding_done');
    const savedFavorites = localStorage.getItem('socratic_favorites');
    const savedStreak = localStorage.getItem('socratic_streak_count');
    const savedAnalytics = localStorage.getItem('socratic_analytics');
    const savedWeeklyGoal = localStorage.getItem('socratic_weekly_goal');
    const savedStudyPlan = localStorage.getItem('socratic_study_plan');
    const savedReviewProgress = localStorage.getItem('socratic_review_progress');

    let loadedPrivacyMode = false;
    if (savedSecurity) {
      try {
        const parsedSecurity = JSON.parse(savedSecurity) as { privacyMode?: boolean; pinHash?: string; autoLockMinutes?: number };
        loadedPrivacyMode = Boolean(parsedSecurity.privacyMode);
        setPrivacyMode(loadedPrivacyMode);
        setPinHash(parsedSecurity.pinHash || null);
        setAutoLockMinutes(parsedSecurity.autoLockMinutes || 10);
        if (parsedSecurity.pinHash) {
          setIsLocked(true);
        }
      } catch (error) {
        console.error('Failed to parse security settings', error);
      }
    }

    if (savedThinkingStyle) {
        setThinkingStyle(savedThinkingStyle as ThinkingStyle);
    }

    if (savedComplexity) {
      setComplexity(savedComplexity);
    }

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    if (!loadedPrivacyMode && savedDraft) {
      setInput(savedDraft);
    }

    if (!loadedPrivacyMode && savedHasStarted === 'true') {
      setHasStarted(true);
    }

    if (!loadedPrivacyMode && savedOnboardingDone !== 'true' && !savedMessages) {
      setShowOnboarding(true);
    }

    if (!loadedPrivacyMode && savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites', error);
      }
    }

    if (!loadedPrivacyMode && savedStreak) {
      setStreakCount(Number(savedStreak) || 0);
    }

    if (!loadedPrivacyMode && savedAnalytics) {
      try {
        setAnalytics(JSON.parse(savedAnalytics));
      } catch (error) {
        console.error('Failed to parse analytics', error);
      }
    }

    if (!loadedPrivacyMode && savedWeeklyGoal) {
      setWeeklyGoal(Number(savedWeeklyGoal) || 5);
    }

    if (!loadedPrivacyMode && savedStudyPlan) {
      try {
        setStudyPlan(JSON.parse(savedStudyPlan));
      } catch (error) {
        console.error('Failed to parse study plan', error);
      }
    }

    if (!loadedPrivacyMode && savedReviewProgress) {
      try {
        setReviewProgress(JSON.parse(savedReviewProgress));
      } catch (error) {
        console.error('Failed to parse review progress', error);
      }
    }

    if (!loadedPrivacyMode && savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        setHasStarted(true);
        setShowResumeBanner(true);
        initializeChat(parsedMessages, savedLanguage); 
      } catch (e) {
        console.error("Failed to parse history", e);
        try {
          initializeChat([], savedLanguage);
        } catch (error) {
          console.error('Failed to initialize chat', error);
        }
      }
    } else {
      try {
        initializeChat([], savedLanguage);
      } catch (error) {
        console.error('Failed to initialize chat', error);
      }
    }

    // Cleanup speech recognition on unmount
    return () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.abort();
            } catch (e) {
                // Ignore errors on unmount cleanup
            }
        }
    };
  }, []);

  useEffect(() => {
    persistValue('socratic_chat_history', JSON.stringify(messages));
    if (hasStarted) {
      scrollToBottom();
    }
  }, [messages, hasStarted, privacyMode]);

  useEffect(() => {
    persistValue('socratic_thinking_style', thinkingStyle);
  }, [thinkingStyle, privacyMode]);

  useEffect(() => {
    persistValue('socratic_complexity', complexity);
  }, [complexity, privacyMode]);

  useEffect(() => {
    const prevLang = localStorage.getItem('socratic_language');
    persistValue('socratic_language', language);
    
    // Only re-initialize if language actually changed after initial load
    if (prevLang && prevLang !== language) {
      try {
        initializeChat(messages, language);
      } catch (error) {
        console.error('Failed to re-initialize chat', error);
      }
    }
  }, [language, privacyMode]);
  
  useEffect(() => {
    if (hasStarted) {
      scrollToBottom();
    }
  }, [isLoading, hasStarted]);

  useEffect(() => {
    persistValue('socratic_input_draft', input);

    if (!textareaRef.current) return;

    textareaRef.current.style.height = '24px';
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
  }, [input, privacyMode]);

  useEffect(() => {
    persistValue('socratic_has_started', String(hasStarted));
  }, [hasStarted, privacyMode]);

  useEffect(() => {
    persistValue('socratic_favorites', JSON.stringify(favorites));
  }, [favorites, privacyMode]);

  useEffect(() => {
    persistValue('socratic_streak_count', String(streakCount));
  }, [streakCount, privacyMode]);

  useEffect(() => {
    persistValue('socratic_analytics', JSON.stringify(analytics));
  }, [analytics, privacyMode]);

  useEffect(() => {
    persistValue('socratic_weekly_goal', String(weeklyGoal));
  }, [weeklyGoal, privacyMode]);

  useEffect(() => {
    persistValue('socratic_study_plan', JSON.stringify(studyPlan));
  }, [studyPlan, privacyMode]);

  useEffect(() => {
    persistValue('socratic_review_progress', JSON.stringify(reviewProgress));
  }, [reviewProgress, privacyMode]);

  useEffect(() => {
    localStorage.setItem(
      'socratic_security_settings',
      JSON.stringify({ privacyMode, pinHash, autoLockMinutes })
    );

    if (privacyMode) {
      APP_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    }
  }, [privacyMode, pinHash, autoLockMinutes]);

  useEffect(() => {
    if (!pinHash || isLocked) return;

    const handleActivity = () => setLastInteractionAt(Date.now());
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setIsLocked(true);
      }
    };

    window.addEventListener('pointerdown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('pointerdown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [pinHash, isLocked]);

  useEffect(() => {
    if (!pinHash || isLocked) return;

    const interval = window.setInterval(() => {
      if (Date.now() - lastInteractionAt > autoLockMinutes * 60 * 1000) {
        setIsLocked(true);
      }
    }, 30000);

    return () => window.clearInterval(interval);
  }, [pinHash, isLocked, lastInteractionAt, autoLockMinutes]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setInstallPromptEvent(null);
      showNotification(t.installReady, 'info');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [t.installReady]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const persistValue = (key: string, value: string) => {
    if (privacyMode) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, value);
  };

  const showNotification = (message: string, type: 'error' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(prev => prev && prev.message === message ? null : prev);
    }, 4000);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
        showNotification(t.uploadSecurityError, 'error');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (imageData: string) => {
    setSelectedImage(imageData);
    setIsCameraOpen(false);
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleNewProblem = () => {
    if (window.confirm(t.newProblemConfirm)) {
        setMessages([]);
        setInput('');
        setSelectedImage(null);
        localStorage.removeItem('socratic_chat_history');
        localStorage.removeItem('socratic_input_draft');
        try {
          resetChat(language);
        } catch (error) {
          console.error('Failed to reset chat', error);
          showNotification(t.apiKeyMissing, 'error');
        }
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error("Error stopping recognition", e);
        }
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showNotification(t.voiceNotSupported, 'error');
      return;
    }

    // Abort previous instance if exists to be safe
    if (recognitionRef.current) {
        try {
            recognitionRef.current.abort();
        } catch(e) { /* ignore */ }
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    // Set recognition language matching app language
    const langMap: Record<Language, string> = {
      en: 'en-US',
      pt: 'pt-BR',
      es: 'es-ES',
      fr: 'fr-FR'
    };
    recognition.lang = langMap[language];

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      
      const errorMap: Record<string, string> = {
        'not-allowed': t.micBlocked,
        'permission-denied': t.micBlocked,
        'service-not-allowed': 'Speech service unavailable.',
        'audio-capture': 'No microphone found.',
        'network': 'Network connection required.',
        'aborted': 'Voice input stopped.'
      };

      const message = errorMap[event.error] || `${t.voiceError}: ${event.error}`;
      
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
         showNotification(message, 'error');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    
    try {
      recognition.start();
    } catch (e) {
      console.error("Failed to start recognition:", e);
      setIsListening(false);
      showNotification(t.voiceError, 'error');
    }
  };

  const handleTranslateInput = async () => {
    if (!input.trim() || isTranslatingInput) return;
    
    setIsTranslatingInput(true);
    try {
        const translated = await translateText(input, language);
        setInput(translated);
    } catch (e) {
        console.error("Translation failed", e);
        showNotification(t.translationError, 'error');
    } finally {
        setIsTranslatingInput(false);
    }
  };

  const applyQuickPrompt = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const applyAdaptivePrompt = () => {
    setInput(adaptivePath.prompt);
    if (!studyPlan || studyPlan.id !== adaptivePath.planId) {
      setStudyPlan({
        id: adaptivePath.planId,
        completedTaskIds: [],
        startedAt: new Date().toISOString()
      });
    }
    textareaRef.current?.focus();
  };

  const markInteraction = () => {
    setLastInteractionAt(Date.now());
  };

  const handleTogglePrivacyMode = () => {
    setPrivacyMode((prev) => {
      const next = !prev;
      showNotification(next ? t.privacyEnabled : t.privacyDisabled, 'info');
      return next;
    });
  };

  const handleSetPin = async () => {
    const firstPin = window.prompt(t.pinPromptSet)?.trim() || '';
    if (!/^\d{4,8}$/.test(firstPin)) {
      showNotification(t.pinInvalid, 'error');
      return;
    }

    const confirmPin = window.prompt(t.pinPromptConfirm)?.trim() || '';
    if (firstPin !== confirmPin) {
      showNotification(t.pinMismatch, 'error');
      return;
    }

    setPinHash(await hashPin(firstPin));
    setIsLocked(false);
    setUnlockPin('');
    showNotification(t.pinEnabled, 'info');
  };

  const handleRemovePin = async () => {
    if (!pinHash) return;

    const currentPin = window.prompt(t.pinPromptRemove)?.trim() || '';
    if ((await hashPin(currentPin)) !== pinHash) {
      showNotification(t.pinInvalid, 'error');
      return;
    }

    setPinHash(null);
    setIsLocked(false);
    setUnlockPin('');
    showNotification(t.pinRemoved, 'info');
  };

  const handleUnlock = async () => {
    if (!pinHash) {
      setIsLocked(false);
      return;
    }

    if ((await hashPin(unlockPin.trim())) === pinHash) {
      setIsLocked(false);
      setUnlockPin('');
      markInteraction();
      return;
    }

    showNotification(t.pinInvalid, 'error');
  };

  const updateLearningStreak = () => {
    if (privacyMode) return;

    const today = getDateKey();
    const lastActive = localStorage.getItem('socratic_last_active_date');

    if (lastActive === today) {
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = getDateKey(yesterday);

    const nextCount = lastActive === yesterdayKey ? streakCount + 1 : 1;
    setStreakCount(nextCount);
    localStorage.setItem('socratic_last_active_date', today);
  };

  const updateAnalytics = (isNewSession: boolean) => {
    const today = getDateKey();

    setAnalytics((prev) => ({
      totalUserMessages: prev.totalUserMessages + 1,
      totalSessions: prev.totalSessions + (isNewSession ? 1 : 0),
      activeDates: prev.activeDates.includes(today) ? prev.activeDates : [...prev.activeDates, today].slice(-60),
      sessionDates: isNewSession ? [...prev.sessionDates, today].slice(-120) : prev.sessionDates
    }));
  };

  const buildSessionFavorite = (): FavoriteSession | null => {
    const firstUserMessage = messages.find((message) => message.role === 'user');
    if (!firstUserMessage) return null;

    const summary = messages
      .filter((message) => message.role === 'model')
      .slice(-1)[0]
      ?.text.slice(0, 120) || firstUserMessage.text.slice(0, 120);

    return {
      id: `favorite-${Date.now()}`,
      title: firstUserMessage.text.slice(0, 42) || t.favoriteSession,
      summary,
      savedAt: new Date().toISOString(),
      messages,
      language,
      complexity
    };
  };

  const saveCurrentFavorite = () => {
    const favorite = buildSessionFavorite();
    if (!favorite) return;

    setFavorites((prev) => [favorite, ...prev.filter((item) => item.title !== favorite.title)].slice(0, 6));
    showNotification(t.saveFavoriteSuccess, 'info');
  };

  const openFavorite = (favorite: FavoriteSession) => {
    setMessages(favorite.messages);
    setLanguage(favorite.language);
    setComplexity(favorite.complexity);
    setHasStarted(true);
    setShowResumeBanner(false);
    try {
      initializeChat(favorite.messages, favorite.language);
    } catch (error) {
      console.error('Failed to load favorite session', error);
    }
  };

  const markFavoriteReviewed = (favoriteId: string) => {
    const now = new Date().toISOString();
    setReviewProgress((prev) => {
      const existing = prev.find((item) => item.favoriteId === favoriteId);
      if (!existing) {
        return [...prev, { favoriteId, reviewsCompleted: 1, lastReviewedAt: now }];
      }

      return prev.map((item) =>
        item.favoriteId === favoriteId
          ? { ...item, reviewsCompleted: item.reviewsCompleted + 1, lastReviewedAt: now }
          : item
      );
    });
    showNotification(t.reviewedNow, 'info');
  };

  const startStudyPlan = (planId: string) => {
    setStudyPlan({
      id: planId,
      completedTaskIds: [],
      startedAt: new Date().toISOString()
    });
  };

  const toggleStudyTask = (taskId: string) => {
    setStudyPlan((prev) => {
      if (!prev) return prev;

      const completedTaskIds = prev.completedTaskIds.includes(taskId)
        ? prev.completedTaskIds.filter((id) => id !== taskId)
        : [...prev.completedTaskIds, taskId];

      return { ...prev, completedTaskIds };
    });
  };

  const completeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('socratic_onboarding_done', 'true');
  };

  const handleInstallApp = async () => {
    if (!installPromptEvent) return;

    await installPromptEvent.prompt();
    const choice = await installPromptEvent.userChoice;

    if (choice.outcome === 'accepted') {
      showNotification(t.installReady, 'info');
    }

    setInstallPromptEvent(null);
  };

  const submitMessage = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;
    const isNewSession = messages.length === 0;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    if (showOnboarding) {
      completeOnboarding();
    }
    updateLearningStreak();
    updateAnalytics(isNewSession);
    setInput('');
    const currentImage = selectedImage;
    const currentComplexity = complexity;
    const currentLanguage = language;

    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(
        userMessage.text,
        currentImage || undefined,
        currentComplexity,
        currentLanguage,
        messages
      );
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const isMissingKey =
        error instanceof Error &&
        (error.name === 'MISSING_GEMINI_API_KEY' ||
          error.name === 'MISSING_OPENAI_API_KEY' ||
          error.message === 'MISSING_GEMINI_API_KEY' ||
          error.message === 'MISSING_OPENAI_API_KEY');
      const quotaError =
        error instanceof Error &&
        (error.name === 'insufficient_quota' || error.message.toLowerCase().includes('quota'));
      const fallbackMessage = quotaError ? error.message : t.genericAssistantError;
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: isMissingKey ? t.apiKeyMissing : fallbackMessage
      };
      setMessages(prev => [...prev, errorMessage]);
      showNotification(isMissingKey ? t.apiKeyMissing : fallbackMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage();
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.code === 'KeyC')) {
        e.preventDefault();
        setIsCameraOpen(true);
      }
      if (e.altKey && (e.code === 'KeyU')) {
        e.preventDefault();
        fileInputRef.current?.click();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        submitMessage();
      }
      if (e.key === 'Escape' && isCameraOpen) {
        setIsCameraOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, selectedImage, isLoading, isCameraOpen]);

  const stepCount = messages.filter(m => m.role === 'model').length;

  if (!hasStarted) {
    return (
      <LandingPage 
        onStart={() => setHasStarted(true)} 
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen font-sans relative overflow-hidden">
      
      {notification && (
        <NotificationToast 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      <BackgroundLayer />

      <Suspense fallback={<ModalFallback />}>
        {isCameraOpen && (
          <CameraCapture
            onCapture={handleCameraCapture}
            onClose={() => setIsCameraOpen(false)}
            t={t}
          />
        )}

        {isGraphingOpen && (
          <GraphingPanel
            onClose={() => setIsGraphingOpen(false)}
            language={language}
          />
        )}

        {isExamplesOpen && (
          <ExamplesModal onClose={() => setIsExamplesOpen(false)} t={t} />
        )}

        {isSettingsOpen && (
          <SettingsModal
            currentStyle={thinkingStyle}
            onStyleChange={(style) => setThinkingStyle(style)}
            language={language}
            setLanguage={setLanguage}
            privacyMode={privacyMode}
            onTogglePrivacyMode={handleTogglePrivacyMode}
            hasPinProtection={Boolean(pinHash)}
            onSetPin={handleSetPin}
            onRemovePin={handleRemovePin}
            autoLockMinutes={autoLockMinutes}
            onAutoLockChange={setAutoLockMinutes}
            onClose={() => setIsSettingsOpen(false)}
            t={t}
          />
        )}
      </Suspense>

      {isLocked && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-[1.8rem] border border-white/10 bg-slate-900/90 p-6 text-white shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold">S</div>
              <h2 className="mt-4 text-xl font-semibold">{t.securityLocked}</h2>
              <p className="mt-2 text-sm text-white/65">{t.pinPromptUnlock}</p>
            </div>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={unlockPin}
              onChange={(event) => setUnlockPin(event.target.value.replace(/\D/g, '').slice(0, 8))}
              className="mt-5 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-lg tracking-[0.4em] text-white outline-none"
            />
            <button
              type="button"
              onClick={handleUnlock}
              className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950"
            >
              {t.unlockSession}
            </button>
          </div>
        </div>
      )}

      <header className="flex-none px-3 py-3 md:px-6 md:py-5 sticky top-0 z-10">
        <div className="mx-auto flex max-w-5xl items-start justify-between gap-3 rounded-[1.8rem] border border-white/10 bg-transparent px-3 py-3 backdrop-blur-sm md:items-center md:px-4">
        <div className="flex min-w-0 items-center space-x-3">
          <div className="w-11 h-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-[0_10px_30px_rgba(15,23,42,0.15)]">
            S
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-white tracking-tight sm:text-xl">{t.appTitle}</h1>
            <p className="hidden text-[10px] text-indigo-200 font-medium tracking-[0.32em] uppercase sm:block">{t.appSubtitle}</p>
          </div>
        </div>
        
        <div className="flex shrink-0 items-center space-x-1 rounded-[1rem] border border-white/10 bg-white/5 px-1.5 py-1.5 backdrop-blur-xl sm:space-x-2 sm:rounded-full sm:px-2 sm:py-2">
           <div className="hidden lg:flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-50">
              <FlameIcon />
              <span>{streakCount} {t.streakDays}</span>
           </div>
           <button
             onClick={() => setIsGraphingOpen(true)}
             className="flex items-center space-x-2 px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-colors sm:px-3"
             title={t.grapher}
           >
              <TrendingUp className="w-5 h-5" />
              <span className="hidden sm:inline">{t.grapher}</span>
           </button>

           <button
             onClick={() => setIsExamplesOpen(true)}
             className="flex items-center space-x-2 px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-colors sm:px-3"
             title={t.examples}
           >
              <LightBulbIcon />
              <span className="hidden sm:inline">{t.examples}</span>
           </button>

           <button
             onClick={() => setIsSettingsOpen(true)}
             className="flex items-center space-x-2 px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-colors sm:px-3"
             title={t.settings}
           >
              <SettingsIcon />
           </button>

           {installPromptEvent && (
               <button
                   onClick={handleInstallApp}
                   className="hidden md:flex items-center space-x-2 px-3 py-2 bg-indigo-500/90 hover:bg-indigo-400 border border-indigo-300/40 rounded-xl text-white text-sm font-medium transition-colors"
                   title={t.installApp}
               >
                   <span className="text-xs font-bold uppercase tracking-[0.22em]">{t.installApp}</span>
               </button>
           )}

            {messages.length > 0 && (
                <button
                    onClick={saveCurrentFavorite}
                    className="hidden md:flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-colors"
                    title={t.favoriteSession}
                >
                    <BookmarkIcon />
                </button>
            )}

            {messages.length > 0 && (
                <button 
                    onClick={handleNewProblem}
                    className="flex items-center space-x-2 px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium transition-colors sm:px-3"
                    title={t.newProblem}
                >
                    <TrashIcon />
                </button>
            )}
        </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-3 pb-40 pt-3 md:px-6 md:pb-32 md:pt-4 scrollbar-hide relative z-0">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length > 0 && showResumeBanner && (
            <div className="animate-fade-in-up rounded-[1.8rem] border border-white/12 bg-white/10 p-4 text-white shadow-[0_20px_50px_rgba(8,15,32,0.16)] backdrop-blur-2xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100/70">{t.resumeTitle}</div>
                  <p className="mt-1 text-sm text-white/84">{t.resumeBody}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowResumeBanner(false)}
                  className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/82"
                >
                  {t.resumeAction}
                </button>
              </div>
            </div>
          )}
          
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-6 sm:mt-12 animate-fade-in">
              {showOnboarding && (
                <div className="mb-6 w-full max-w-3xl rounded-[2rem] border border-white/15 bg-slate-950/25 p-5 sm:p-6 shadow-[0_20px_60px_rgba(8,15,32,0.18)] backdrop-blur-2xl animate-fade-in-up">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-xl">
                      <div className="mb-3 inline-flex items-center rounded-full border border-cyan-200/15 bg-cyan-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-100/85">
                        {t.onboardingBadge}
                      </div>
                      <h2 className="text-2xl font-semibold text-white">{t.onboardingTitle}</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-200/82">{t.onboardingBody}</p>
                    </div>
                    <div className="shrink-0 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/65">
                      {onboardingStep + 1} / {steps.length}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {steps.map((step, index) => (
                      <button
                        key={step}
                        type="button"
                        onClick={() => setOnboardingStep(index)}
                        className={`rounded-[1.4rem] border px-4 py-4 text-left transition-all ${
                          onboardingStep === index
                            ? 'border-cyan-200/30 bg-cyan-300/12 text-white shadow-[0_14px_30px_rgba(8,15,32,0.14)]'
                            : 'border-white/10 bg-white/6 text-white/72 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100/65">Step {index + 1}</div>
                        <p className="mt-2 text-sm leading-7">{step}</p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setOnboardingStep((prev) => Math.max(prev - 1, 0))}
                        disabled={onboardingStep === 0}
                        className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 transition-colors disabled:opacity-35"
                      >
                        {t.onboardingBack}
                      </button>
                      <button
                        type="button"
                        onClick={completeOnboarding}
                        className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/62 transition-colors hover:text-white"
                      >
                        {t.onboardingSkip}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      {installPromptEvent && (
                        <button
                          type="button"
                          onClick={handleInstallApp}
                          className="rounded-full border border-cyan-200/20 bg-cyan-300/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-50 transition-colors hover:bg-cyan-300/20"
                        >
                          {t.installApp}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (onboardingStep === steps.length - 1) {
                            completeOnboarding();
                            return;
                          }
                          setOnboardingStep((prev) => Math.min(prev + 1, steps.length - 1));
                        }}
                        className="rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-950 transition-transform hover:-translate-y-0.5"
                      >
                        {onboardingStep === steps.length - 1 ? t.onboardingDone : t.onboardingNext}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-md border-2 border-white/40 rounded-full px-8 py-4 text-center max-w-md shadow-lg shadow-indigo-900/20">
                <div className="mx-auto mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  Socratic Flow
                </div>
                <p className="text-white font-medium text-lg">
                  {t.welcomeMessage}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-200/15 bg-amber-300/10 px-4 py-2 text-xs font-semibold text-amber-50">
                  <FlameIcon />
                  <span>{t.streakLabel}: {streakCount} {t.streakDays}</span>
                </div>
              </div>

              <div className="mt-8 w-full max-w-3xl">
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  {t.quickPromptsLabel}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => applyQuickPrompt(prompt)}
                      className="rounded-[1.6rem] border border-white/15 bg-white/10 px-4 py-4 text-left text-sm text-white/90 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/15 hover:shadow-[0_20px_40px_rgba(8,15,32,0.16)] active:scale-[0.99]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid w-full max-w-3xl gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[1.8rem] border border-white/15 bg-white/10 p-5 backdrop-blur-2xl shadow-[0_18px_50px_rgba(8,15,32,0.16)]">
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/72">
                    <ChartBarIcon />
                    {t.analyticsTitle}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/6 px-3 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">{t.analyticsMessages}</div>
                      <div className="mt-2 text-2xl font-semibold text-white">{analytics.totalUserMessages}</div>
                    </div>
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/6 px-3 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">{t.analyticsSessions}</div>
                      <div className="mt-2 text-2xl font-semibold text-white">{analytics.totalSessions}</div>
                    </div>
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/6 px-3 py-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">{t.analyticsActiveDays}</div>
                      <div className="mt-2 text-2xl font-semibold text-white">{analytics.activeDates.length}</div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1.4rem] border border-amber-200/15 bg-amber-300/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-amber-50/68">{t.weeklyGoalTitle}</div>
                        <div className="mt-1 text-sm text-white/84">
                          {currentWeekSessions} / {weeklyGoal} {t.analyticsSessions.toLowerCase()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {[3, 5, 7].map((goal) => (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => setWeeklyGoal(goal)}
                            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                              weeklyGoal === goal ? 'bg-white text-slate-950' : 'bg-white/10 text-white/76 hover:bg-white/16'
                            }`}
                          >
                            {goal}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/18">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-white transition-all duration-700"
                        style={{ width: `${Math.min((currentWeekSessions / weeklyGoal) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="mt-3 text-xs text-white/66">
                      {currentWeekSessions >= weeklyGoal ? t.weeklyGoalComplete : `${t.weeklyGoalTarget}: ${weeklyGoal}`}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/15 bg-white/10 p-5 backdrop-blur-2xl shadow-[0_18px_50px_rgba(8,15,32,0.16)]">
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/72">
                    <CheckCircleIcon />
                    {t.studyPlanTitle}
                  </div>

                  {activeStudyPlan ? (
                    <div>
                      <div className="rounded-[1.4rem] border border-cyan-200/18 bg-cyan-300/10 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-white">{activeStudyPlan.title}</div>
                            <p className="mt-1 text-sm leading-6 text-white/72">{activeStudyPlan.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStudyPlan(null)}
                            className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70"
                          >
                            {t.studyPlanReset}
                          </button>
                        </div>
                        <div className="mt-4 text-xs text-cyan-50/72">
                          {t.studyPlanProgress}: {studyPlan?.completedTaskIds.length || 0}/{activeStudyPlan.tasks.length}
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {activeStudyPlan.tasks.map((task) => {
                          const checked = studyPlan?.completedTaskIds.includes(task.id) || false;
                          return (
                            <button
                              key={task.id}
                              type="button"
                              onClick={() => toggleStudyTask(task.id)}
                              className={`flex w-full items-start gap-3 rounded-[1.3rem] border px-4 py-4 text-left transition-all ${
                                checked
                                  ? 'border-cyan-200/25 bg-cyan-300/10 text-white'
                                  : 'border-white/10 bg-white/6 text-white/78 hover:bg-white/10'
                              }`}
                            >
                              <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                checked ? 'border-cyan-200 bg-cyan-300/20 text-cyan-50' : 'border-white/18 text-transparent'
                              }`}>
                                <CheckCircleIcon />
                              </span>
                              <span className="text-sm leading-6">{task.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {studyPlanTemplates.map((plan) => (
                        <div key={plan.id} className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold text-white">{plan.title}</div>
                              <p className="mt-1 text-sm leading-6 text-white/70">{plan.description}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => startStudyPlan(plan.id)}
                              className="rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-950 transition-transform hover:-translate-y-0.5"
                            >
                              {t.studyPlanStart}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 grid w-full max-w-3xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[1.8rem] border border-white/15 bg-white/10 p-5 backdrop-blur-2xl shadow-[0_18px_50px_rgba(8,15,32,0.16)]">
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/72">
                    <FlameIcon />
                    {t.diagnosticsTitle}
                  </div>
                  <div className="rounded-[1.4rem] border border-cyan-200/15 bg-cyan-300/10 p-4">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/70">{t.weaknessDetected}</div>
                    <div className="mt-2 text-xl font-semibold text-white">{weaknessProfile}</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {recommendations.map((item) => (
                      <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/78">
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-[1.4rem] border border-amber-200/18 bg-amber-300/10 p-4">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-amber-50/72">{t.adaptiveTrackTitle}</div>
                    <div className="mt-2 text-sm font-semibold text-white">{adaptivePath.label}</div>
                    <p className="mt-2 text-sm leading-6 text-white/70">{t.adaptivePathBody}</p>
                    <div className="mt-4 space-y-2">
                      {adaptivePath.tasks.map((task: AdaptiveTask) => (
                        <div key={task.id} className="rounded-[1rem] border border-white/10 bg-black/10 px-3 py-2 text-sm text-white/78">
                          {task.text}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={applyAdaptivePrompt}
                      className="mt-4 rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-950"
                    >
                      {t.startAdaptiveTrack}
                    </button>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/15 bg-white/10 p-5 backdrop-blur-2xl shadow-[0_18px_50px_rgba(8,15,32,0.16)]">
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/72">
                    <BookmarkIcon />
                    {t.reviewQueueTitle}
                  </div>
                  {reviewQueue.length > 0 ? (
                    <div className="space-y-3">
                      {reviewQueue.map((item) => (
                        <div key={item.favorite.id} className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold text-white">{item.favorite.title}</div>
                              <p className="mt-1 text-sm leading-6 text-white/70">{item.favorite.summary}</p>
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                              #{item.reviewsCompleted + 1}
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => openFavorite(item.favorite)}
                              className="rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-950"
                            >
                              {t.reviewNow}
                            </button>
                            <button
                              type="button"
                              onClick={() => markFavoriteReviewed(item.favorite.id)}
                              className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80"
                            >
                              {t.reviewedNow}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/6 px-4 py-5 text-center text-sm text-white/62">
                      {t.noReviewItems}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 w-full max-w-3xl">
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                  {t.favoritesTitle}
                </p>
                {favorites.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {favorites.map((favorite) => (
                      <button
                        key={favorite.id}
                        type="button"
                        onClick={() => openFavorite(favorite)}
                        className="rounded-[1.6rem] border border-white/15 bg-white/10 px-4 py-4 text-left text-sm text-white/90 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-amber-200/25 hover:bg-white/15 hover:shadow-[0_20px_40px_rgba(8,15,32,0.16)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100/70">{t.savedBadge}</div>
                            <div className="mt-1 font-semibold text-white">{favorite.title}</div>
                          </div>
                          <BookmarkIcon />
                        </div>
                        <p className="mt-3 max-h-[4.5rem] overflow-hidden text-sm leading-6 text-white/72">{favorite.summary}</p>
                        <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">{t.openFavorite}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/6 px-4 py-5 text-center text-sm text-white/62">
                    {t.noFavorites}
                  </div>
                )}
              </div>
            </div>
          )}

          {messages.length > 0 && <ProgressBar stepCount={stepCount} label={t.sessionDepth} stepLabel={t.step} />}

          {messages.length > 0 && (
            <div className="rounded-[1.8rem] border border-white/12 bg-white/10 p-4 text-white shadow-[0_18px_50px_rgba(8,15,32,0.16)] backdrop-blur-2xl animate-fade-in-up">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100/72">{t.adaptiveCoachTitle}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{weaknessProfile}</div>
                  <p className="mt-2 text-sm leading-6 text-white/74">{t.adaptiveCoachBody}</p>
                </div>
                <div className="rounded-[1.3rem] border border-amber-200/18 bg-amber-300/10 px-4 py-3 text-sm text-white/84">
                  {t.studyPlanProgress}: {adaptiveCompletion}/{adaptivePath.tasks.length}
                </div>
              </div>
              <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/70">{t.nextExerciseTitle}</div>
                  <p className="mt-2 text-sm leading-6 text-white/80">{adaptivePath.prompt}</p>
                  <button
                    type="button"
                    onClick={applyAdaptivePrompt}
                    className="mt-4 rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-950"
                  >
                    {t.startAdaptiveTrack}
                  </button>
                </div>
                <div className="space-y-2">
                  {adaptivePath.tasks.map((task: AdaptiveTask) => (
                    <div key={task.id} className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/76">
                      {task.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} language={language} t={t} />
          ))}
          {isLoading && <TypingIndicator style={thinkingStyle} label={t.thinking} />}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-3 md:p-4 z-20">
        <div className="max-w-3xl mx-auto flex flex-col items-end space-y-2">
          <div className="w-full rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-3 text-white/82 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/68">{t.nextExerciseTitle}</div>
                <p className="mt-1 text-sm leading-6 text-white/74">
                  {messages.length > 0 ? adaptivePath.prompt : t.adaptiveEmptyHint}
                </p>
              </div>
              <button
                type="button"
                onClick={applyAdaptivePrompt}
                className="rounded-full border border-white/20 bg-indigo-500/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-indigo-400"
              >
                {t.startAdaptiveTrack}
              </button>
            </div>
          </div>
          
           <div className="flex flex-wrap justify-end gap-2 mr-2 mb-1">
             {(['Beginner', 'Intermediate', 'Advanced'] as Complexity[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setComplexity(level)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xl border transition-all duration-200
                    ${complexity === level 
                      ? 'bg-indigo-500 border-indigo-400 text-white shadow-md' 
                      : 'bg-black/20 border-white/10 text-white/60 hover:bg-black/30 hover:text-white'
                    }
                  `}
                >
                  {complexityLabels[language][level]}
                </button>
             ))}
           </div>
          
          <div className="bg-white rounded-full shadow-2xl shadow-black/20 p-2 pr-2 sm:pr-3 relative flex items-center gap-1.5 sm:gap-2 transition-all duration-300 w-full">
            {selectedImage && (
              <div className="absolute bottom-full left-4 mb-3 animate-fade-in">
                <div className="relative group">
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="h-20 w-auto rounded-xl border-2 border-white shadow-lg object-cover"
                  />
                  <button 
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full p-1.5 shadow-md hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-end flex-1 gap-1">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              
              <button 
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="p-2.5 sm:p-3 text-slate-400 hover:text-cyan-700 hover:bg-cyan-50 rounded-full transition-colors"
                title={t.cameraTooltip}
              >
                <CameraIcon />
              </button>
              
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 sm:p-3 text-slate-400 hover:text-cyan-700 hover:bg-cyan-50 rounded-full transition-colors -ml-1"
                title={t.uploadTooltip}
              >
                <AttachmentIcon />
              </button>

              <button 
                type="button"
                onClick={handleVoiceInput}
                className={`p-2.5 sm:p-3 rounded-full transition-colors -ml-1 ${
                  isListening 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                    : 'text-slate-400 hover:text-cyan-700 hover:bg-cyan-50'
                }`}
                title={t.micTooltip}
              >
                <MicrophoneIcon isListening={isListening} />
              </button>

              <div className="flex-1 bg-transparent px-1.5 sm:px-2 flex items-center gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      submitMessage();
                    }
                  }}
                  placeholder={isListening ? t.listening : t.inputPlaceholder}
                  className="w-full bg-transparent border-none focus:ring-0 resize-none h-[24px] max-h-32 py-0 text-[15px] text-slate-700 placeholder:text-slate-400 font-medium leading-6"
                  rows={1}
                />
                
                {input.trim() && (
                    <button
                        type="button"
                        onClick={handleTranslateInput}
                        disabled={isTranslatingInput}
                        className="p-1.5 text-slate-400 hover:text-cyan-700 hover:bg-cyan-50 rounded-full transition-colors"
                        title={t.translateInput}
                    >
                        <GlobeIcon className={`w-4 h-4 ${isTranslatingInput ? 'animate-spin' : ''}`} />
                    </button>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isLoading || (!input.trim() && !selectedImage)}
                title={t.sendTooltip}
                className={`
                  p-2.5 sm:p-3 rounded-full flex items-center justify-center transition-all duration-300
                  ${isLoading || (!input.trim() && !selectedImage)
                    ? 'bg-slate-100 text-slate-300' 
                    : 'bg-slate-950 text-white shadow-lg shadow-slate-400/20 hover:scale-105 active:scale-95'
                  }
                `}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <SendIcon />
                )}
              </button>
            </form>
          </div>
          <div className="w-full px-2 text-center text-[10px] font-medium tracking-[0.18em] uppercase text-white/45">
            {t.composerHint}
          </div>
          <div className="text-center mt-3 text-[10px] text-white/40 font-medium uppercase tracking-widest w-full">
            {t.poweredBy}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

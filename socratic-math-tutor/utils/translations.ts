import { Complexity, Language } from '../types';

type TranslationKey =
  | 'appTitle'
  | 'appSubtitle'
  | 'startLearning'
  | 'poweredBy'
  | 'welcomeMessage'
  | 'inputPlaceholder'
  | 'listening'
  | 'sendTooltip'
  | 'cameraTooltip'
  | 'uploadTooltip'
  | 'micTooltip'
  | 'sessionDepth'
  | 'step'
  | 'socraticTutor'
  | 'student'
  | 'socraticInsight'
  | 'whyQuestion'
  | 'whyTooltip'
  | 'readAloud'
  | 'stopReading'
  | 'equation'
  | 'thinking'
  | 'settings'
  | 'examples'
  | 'newProblem'
  | 'language'
  | 'selectStyle'
  | 'livePreview'
  | 'indicatorDisabled'
  | 'cameraError'
  | 'voiceError'
  | 'voiceNotSupported'
  | 'micBlocked'
  | 'complexityBeginner'
  | 'complexityIntermediate'
  | 'complexityAdvanced'
  | 'landingTitle'
  | 'landingSubtitle'
  | 'translate'
  | 'showOriginal'
  | 'translating'
  | 'translateInput'
  | 'translationError'
  | 'grapher'
  | 'translatedBadge'
  | 'newProblemConfirm'
  | 'quickPromptsLabel'
  | 'composerHint'
  | 'genericAssistantError'
  | 'apiKeyMissing'
  | 'onboardingBadge'
  | 'onboardingTitle'
  | 'onboardingBody'
  | 'onboardingStepOne'
  | 'onboardingStepTwo'
  | 'onboardingStepThree'
  | 'onboardingNext'
  | 'onboardingBack'
  | 'onboardingSkip'
  | 'onboardingDone'
  | 'installApp'
  | 'installReady'
  | 'graphPresetQuadratic'
  | 'graphPresetTrig'
  | 'graphPresetRational'
  | 'graphPresetLinear'
  | 'graphInsights'
  | 'graphWindow'
  | 'graphTips'
  | 'graphEmpty'
  | 'graphInvalid'
  | 'graphMax'
  | 'graphMin'
  | 'graphYIntercept'
  | 'graphXIntercepts'
  | 'streakLabel'
  | 'streakDays'
  | 'favoriteSession'
  | 'favoritesTitle'
  | 'resumeTitle'
  | 'resumeBody'
  | 'resumeAction'
  | 'savedBadge'
  | 'openFavorite'
  | 'saveFavoriteSuccess'
  | 'noFavorites'
  | 'analyticsTitle'
  | 'analyticsMessages'
  | 'analyticsSessions'
  | 'analyticsActiveDays'
  | 'weeklyGoalTitle'
  | 'weeklyGoalTarget'
  | 'weeklyGoalComplete'
  | 'studyPlanTitle'
  | 'studyPlanStart'
  | 'studyPlanSwitch'
  | 'studyPlanReset'
  | 'studyPlanProgress'
  | 'planAlgebraTitle'
  | 'planAlgebraDesc'
  | 'planAlgebraTaskOne'
  | 'planAlgebraTaskTwo'
  | 'planAlgebraTaskThree'
  | 'planGraphTitle'
  | 'planGraphDesc'
  | 'planGraphTaskOne'
  | 'planGraphTaskTwo'
  | 'planGraphTaskThree'
  | 'planExamTitle'
  | 'planExamDesc'
  | 'planExamTaskOne'
  | 'planExamTaskTwo'
  | 'planExamTaskThree'
  | 'diagnosticsTitle'
  | 'weaknessDetected'
  | 'recommendationsTitle'
  | 'reviewQueueTitle'
  | 'reviewNow'
  | 'reviewedNow'
  | 'noReviewItems'
  | 'topicAlgebra'
  | 'topicGraphs'
  | 'topicCalculus'
  | 'topicGeometry'
  | 'topicWordProblems'
  | 'topicGeneral'
  | 'recommendationConsistency'
  | 'recommendationFavorites'
  | 'recommendationWeakness'
  | 'recommendationPlan'
  | 'recommendationReview'
  | 'adaptivePathTitle'
  | 'adaptivePathBody'
  | 'adaptiveTrackTitle'
  | 'nextExerciseTitle'
  | 'startAdaptiveTrack'
  | 'adaptiveCoachTitle'
  | 'adaptiveCoachBody'
  | 'adaptiveEmptyHint'
  | 'securityTitle'
  | 'privacyMode'
  | 'privacyModeDesc'
  | 'pinProtection'
  | 'pinProtectionDesc'
  | 'setPin'
  | 'changePin'
  | 'removePin'
  | 'autoLock'
  | 'securityLocked'
  | 'unlockSession'
  | 'pinPromptSet'
  | 'pinPromptConfirm'
  | 'pinPromptUnlock'
  | 'pinPromptRemove'
  | 'pinMismatch'
  | 'pinInvalid'
  | 'pinEnabled'
  | 'pinRemoved'
  | 'privacyEnabled'
  | 'privacyDisabled'
  | 'uploadSecurityError';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    appTitle: 'Socratic Tutor',
    appSubtitle: 'AI Math Companion',
    startLearning: 'Start Learning',
    poweredBy: 'Powered by OpenAI GPT',
    welcomeMessage: "Take a picture of your problem, or let's solve it together step by step.",
    inputPlaceholder: 'Ask a math question...',
    listening: 'Listening...',
    sendTooltip: 'Send (Enter)',
    cameraTooltip: 'Open camera (Alt + C)',
    uploadTooltip: 'Upload image (Alt + U)',
    micTooltip: 'Voice input',
    sessionDepth: 'Session Depth',
    step: 'Step',
    socraticTutor: 'Socratic Tutor',
    student: 'Student',
    socraticInsight: 'Socratic Insight',
    whyQuestion: 'Why?',
    whyTooltip: 'Click to understand why this question matters',
    readAloud: 'Read',
    stopReading: 'Stop',
    equation: 'Equation',
    thinking: 'Thinking',
    settings: 'Settings',
    examples: 'Examples',
    newProblem: 'New Problem',
    language: 'Language',
    selectStyle: 'Thinking Style',
    livePreview: 'Live Preview',
    indicatorDisabled: 'Indicator Disabled',
    cameraError: 'Could not access camera. Please check permissions.',
    voiceError: 'Voice input error',
    voiceNotSupported: 'Voice input is not supported in this browser.',
    micBlocked: 'Microphone access is blocked. Please check browser permissions.',
    complexityBeginner: 'Beginner',
    complexityIntermediate: 'Intermediate',
    complexityAdvanced: 'Advanced',
    landingTitle: 'Socratic',
    landingSubtitle: "Your AI study partner for real mathematical understanding, not just quick answers.",
    translate: 'Translate',
    showOriginal: 'Show Original',
    translating: 'Translating...',
    translateInput: 'Translate Input',
    translationError: 'Translation failed.',
    grapher: 'Grapher',
    translatedBadge: 'Translated',
    newProblemConfirm: 'Start a new problem? This will clear the current conversation.',
    quickPromptsLabel: 'Try one of these prompts',
    composerHint: 'Enter to send, Shift + Enter for a new line.',
    genericAssistantError: "I'm sorry, I hit a problem while analyzing that. Could you try again?",
    apiKeyMissing: 'OpenAI API key not found. Add it to your environment before using the tutor.',
    onboardingBadge: 'First session guide',
    onboardingTitle: 'A quick tour before we start',
    onboardingBody: 'This tutor works best when we move one step at a time and use the tools only when they help.',
    onboardingStepOne: 'Type or paste a problem. You can also upload a photo if the exercise is on paper.',
    onboardingStepTwo: 'Pick a difficulty level to control how formal the explanations feel.',
    onboardingStepThree: 'Open the grapher when a function, curve, or intercept would be easier to understand visually.',
    onboardingNext: 'Next',
    onboardingBack: 'Back',
    onboardingSkip: 'Skip',
    onboardingDone: 'Start solving',
    installApp: 'Install app',
    installReady: 'Keep Socratic Tutor on your home screen for faster access.',
    graphPresetQuadratic: 'Quadratic',
    graphPresetTrig: 'Trigonometric',
    graphPresetRational: 'Rational',
    graphPresetLinear: 'Linear',
    graphInsights: 'Graph insights',
    graphWindow: 'Graph window',
    graphTips: 'Tips',
    graphEmpty: 'No graph data to display yet.',
    graphInvalid: 'Invalid equation',
    graphMax: 'Maximum',
    graphMin: 'Minimum',
    graphYIntercept: 'Y-Intercept',
    graphXIntercepts: 'X-Intercepts',
    streakLabel: 'Learning streak',
    streakDays: 'days',
    favoriteSession: 'Save favorite',
    favoritesTitle: 'Favorite sessions',
    resumeTitle: 'Last session recovered',
    resumeBody: 'Your previous thread is loaded and ready to continue.',
    resumeAction: 'Continue from here',
    savedBadge: 'Saved',
    openFavorite: 'Open favorite',
    saveFavoriteSuccess: 'Session saved to favorites.',
    noFavorites: 'Save a strong session and it will appear here.',
    analyticsTitle: 'Learning analytics',
    analyticsMessages: 'Messages sent',
    analyticsSessions: 'Sessions started',
    analyticsActiveDays: 'Active days',
    weeklyGoalTitle: 'Weekly goal',
    weeklyGoalTarget: 'Target',
    weeklyGoalComplete: 'Goal completed',
    studyPlanTitle: 'Study plan',
    studyPlanStart: 'Start plan',
    studyPlanSwitch: 'Switch plan',
    studyPlanReset: 'Reset plan',
    studyPlanProgress: 'Progress',
    planAlgebraTitle: 'Algebra foundation',
    planAlgebraDesc: 'Build confidence with core manipulation and equation flow.',
    planAlgebraTaskOne: 'Solve one linear equation without asking for the final answer.',
    planAlgebraTaskTwo: 'Practice factoring or simplifying one expression.',
    planAlgebraTaskThree: 'Ask why one algebra step is valid.',
    planGraphTitle: 'Graph intuition',
    planGraphDesc: 'Use visuals to understand shape, intercepts, and change.',
    planGraphTaskOne: 'Open the grapher with a quadratic or line.',
    planGraphTaskTwo: 'Identify at least one intercept from the graph.',
    planGraphTaskThree: 'Compare how changing one term moves the curve.',
    planExamTitle: 'Exam sprint',
    planExamDesc: 'Short, focused review blocks for speed and confidence.',
    planExamTaskOne: 'Do one timed problem in your current topic.',
    planExamTaskTwo: 'Review one mistake and explain the reason.',
    planExamTaskThree: 'Save the best session as a favorite for revision.',
    diagnosticsTitle: 'Adaptive insights',
    weaknessDetected: 'Current focus area',
    recommendationsTitle: 'Recommended next actions',
    reviewQueueTitle: 'Spaced review queue',
    reviewNow: 'Review now',
    reviewedNow: 'Marked reviewed',
    noReviewItems: 'No reviews are due yet. Save more favorites or come back tomorrow.',
    topicAlgebra: 'Algebra fluency',
    topicGraphs: 'Graph reading',
    topicCalculus: 'Calculus setup',
    topicGeometry: 'Geometry reasoning',
    topicWordProblems: 'Word problem translation',
    topicGeneral: 'General problem solving',
    recommendationConsistency: 'Keep your weekly rhythm going with one more short session.',
    recommendationFavorites: 'Save a strong conversation so it can enter spaced review.',
    recommendationWeakness: 'Spend one guided session reinforcing your current focus area.',
    recommendationPlan: 'Use the active study plan to turn momentum into a repeatable habit.',
    recommendationReview: 'Open one due review item and explain the idea in your own words.',
    adaptivePathTitle: 'Auto-built study path',
    adaptivePathBody: 'Your next sequence updates from the skills you ask about most often.',
    adaptiveTrackTitle: 'Recommended track',
    nextExerciseTitle: 'Next exercise',
    startAdaptiveTrack: 'Use this exercise',
    adaptiveCoachTitle: 'Adaptive coach',
    adaptiveCoachBody: 'The tutor is ready with the next best prompt for your current focus area.',
    adaptiveEmptyHint: 'Send one problem and the tutor will generate a personalized next exercise here.',
    securityTitle: 'Security',
    privacyMode: 'Privacy mode',
    privacyModeDesc: 'Do not keep chat history or study data on this device.',
    pinProtection: 'PIN protection',
    pinProtectionDesc: 'Lock the tutor with a PIN and require unlock after inactivity.',
    setPin: 'Set PIN',
    changePin: 'Change PIN',
    removePin: 'Remove PIN',
    autoLock: 'Auto-lock (minutes)',
    securityLocked: 'Session locked',
    unlockSession: 'Unlock',
    pinPromptSet: 'Create a 4 to 8 digit PIN.',
    pinPromptConfirm: 'Confirm your PIN.',
    pinPromptUnlock: 'Enter your PIN to unlock.',
    pinPromptRemove: 'Enter your current PIN to remove protection.',
    pinMismatch: 'PINs do not match.',
    pinInvalid: 'Use 4 to 8 digits.',
    pinEnabled: 'PIN protection enabled.',
    pinRemoved: 'PIN protection removed.',
    privacyEnabled: 'Privacy mode enabled.',
    privacyDisabled: 'Privacy mode disabled.',
    uploadSecurityError: 'Upload only JPG, PNG, or WEBP images up to 5 MB.'
  },
  pt: {
    appTitle: 'Tutor Socratico',
    appSubtitle: 'Companheiro de Matematica com IA',
    startLearning: 'Comecar a Aprender',
    poweredBy: 'Desenvolvido com OpenAI GPT',
    welcomeMessage: 'Tire uma foto do problema ou vamos resolve-lo juntos, passo a passo.',
    inputPlaceholder: 'Faca uma pergunta de matematica...',
    listening: 'Ouvindo...',
    sendTooltip: 'Enviar (Enter)',
    cameraTooltip: 'Abrir camera (Alt + C)',
    uploadTooltip: 'Enviar imagem (Alt + U)',
    micTooltip: 'Entrada por voz',
    sessionDepth: 'Profundidade da Sessao',
    step: 'Passo',
    socraticTutor: 'Tutor Socratico',
    student: 'Estudante',
    socraticInsight: 'Insight Socratico',
    whyQuestion: 'Por que?',
    whyTooltip: 'Clique para entender por que essa pergunta importa',
    readAloud: 'Ler',
    stopReading: 'Parar',
    equation: 'Equacao',
    thinking: 'Pensando',
    settings: 'Configuracoes',
    examples: 'Exemplos',
    newProblem: 'Novo Problema',
    language: 'Idioma',
    selectStyle: 'Estilo de Pensamento',
    livePreview: 'Pre-visualizacao',
    indicatorDisabled: 'Indicador Desativado',
    cameraError: 'Nao foi possivel acessar a camera. Verifique as permissoes.',
    voiceError: 'Erro na entrada de voz',
    voiceNotSupported: 'Entrada por voz nao suportada neste navegador.',
    micBlocked: 'Acesso ao microfone bloqueado. Verifique as permissoes do navegador.',
    complexityBeginner: 'Iniciante',
    complexityIntermediate: 'Intermediario',
    complexityAdvanced: 'Avancado',
    landingTitle: 'Socratico',
    landingSubtitle: 'Seu parceiro de estudos com IA para entender matematica de verdade, sem pular direto para a resposta.',
    translate: 'Traduzir',
    showOriginal: 'Mostrar original',
    translating: 'Traduzindo...',
    translateInput: 'Traduzir entrada',
    translationError: 'Falha na traducao.',
    grapher: 'Grafico',
    translatedBadge: 'Traduzido',
    newProblemConfirm: 'Comecar um novo problema? Isso vai limpar a conversa atual.',
    quickPromptsLabel: 'Sugestoes para comecar',
    composerHint: 'Enter envia, Shift + Enter cria uma nova linha.',
    genericAssistantError: 'Desculpe, encontrei um problema ao analisar isso. Pode tentar de novo?',
    apiKeyMissing: 'Chave da API OpenAI nao encontrada. Adicione a chave ao ambiente antes de usar o tutor.',
    onboardingBadge: 'Guia da primeira sessao',
    onboardingTitle: 'Um tour rapido antes de comecar',
    onboardingBody: 'Este tutor funciona melhor quando avancamos um passo por vez e usamos as ferramentas quando elas realmente ajudam.',
    onboardingStepOne: 'Digite ou cole um problema. Voce tambem pode enviar uma foto se o exercicio estiver no papel.',
    onboardingStepTwo: 'Escolha um nivel de dificuldade para ajustar o tom das explicacoes.',
    onboardingStepThree: 'Abra o grafico quando uma funcao, curva ou intercepto ficar melhor visualmente.',
    onboardingNext: 'Proximo',
    onboardingBack: 'Voltar',
    onboardingSkip: 'Pular',
    onboardingDone: 'Comecar',
    installApp: 'Instalar app',
    installReady: 'Mantenha o Socratic Tutor na tela inicial para acesso mais rapido.',
    graphPresetQuadratic: 'Quadratica',
    graphPresetTrig: 'Trigonometrica',
    graphPresetRational: 'Racional',
    graphPresetLinear: 'Linear',
    graphInsights: 'Insights do grafico',
    graphWindow: 'Janela do grafico',
    graphTips: 'Dicas',
    graphEmpty: 'Ainda nao ha dados para exibir no grafico.',
    graphInvalid: 'Equacao invalida',
    graphMax: 'Maximo',
    graphMin: 'Minimo',
    graphYIntercept: 'Intercepto em Y',
    graphXIntercepts: 'Interceptos em X',
    streakLabel: 'Sequencia de estudo',
    streakDays: 'dias',
    favoriteSession: 'Salvar favorito',
    favoritesTitle: 'Sessoes favoritas',
    resumeTitle: 'Ultima sessao recuperada',
    resumeBody: 'Sua conversa anterior foi carregada e ja pode continuar.',
    resumeAction: 'Continuar daqui',
    savedBadge: 'Salvo',
    openFavorite: 'Abrir favorito',
    saveFavoriteSuccess: 'Sessao salva nos favoritos.',
    noFavorites: 'Salve uma boa sessao e ela aparecera aqui.',
    analyticsTitle: 'Analytics de estudo',
    analyticsMessages: 'Mensagens enviadas',
    analyticsSessions: 'Sessoes iniciadas',
    analyticsActiveDays: 'Dias ativos',
    weeklyGoalTitle: 'Meta semanal',
    weeklyGoalTarget: 'Meta',
    weeklyGoalComplete: 'Meta concluida',
    studyPlanTitle: 'Plano de estudo',
    studyPlanStart: 'Iniciar plano',
    studyPlanSwitch: 'Trocar plano',
    studyPlanReset: 'Reiniciar plano',
    studyPlanProgress: 'Progresso',
    planAlgebraTitle: 'Base de algebra',
    planAlgebraDesc: 'Ganhe seguranca com manipulacao basica e fluxo de equacoes.',
    planAlgebraTaskOne: 'Resolva uma equacao linear sem pedir a resposta final.',
    planAlgebraTaskTwo: 'Pratique fatoracao ou simplificacao em uma expressao.',
    planAlgebraTaskThree: 'Pergunte por que um passo de algebra e valido.',
    planGraphTitle: 'Intuicao grafica',
    planGraphDesc: 'Use visualizacao para entender forma, interceptos e variacao.',
    planGraphTaskOne: 'Abra o grafico com uma quadratica ou reta.',
    planGraphTaskTwo: 'Identifique pelo menos um intercepto no grafico.',
    planGraphTaskThree: 'Compare como mudar um termo altera a curva.',
    planExamTitle: 'Sprint de prova',
    planExamDesc: 'Blocos curtos de revisao para velocidade e confianca.',
    planExamTaskOne: 'Faca um problema cronometrado no tema atual.',
    planExamTaskTwo: 'Revise um erro e explique o motivo.',
    planExamTaskThree: 'Salve a melhor sessao como favorito para revisar.',
    diagnosticsTitle: 'Insights adaptativos',
    weaknessDetected: 'Foco atual',
    recommendationsTitle: 'Proximas acoes recomendadas',
    reviewQueueTitle: 'Fila de revisao espaçada',
    reviewNow: 'Revisar agora',
    reviewedNow: 'Marcado como revisado',
    noReviewItems: 'Nenhuma revisao vence agora. Salve mais favoritos ou volte amanha.',
    topicAlgebra: 'Fluencia em algebra',
    topicGraphs: 'Leitura de graficos',
    topicCalculus: 'Montagem de calculo',
    topicGeometry: 'Raciocinio geometrico',
    topicWordProblems: 'Traducao de problemas',
    topicGeneral: 'Resolucao geral',
    recommendationConsistency: 'Mantenha o ritmo semanal com mais uma sessao curta.',
    recommendationFavorites: 'Salve uma boa conversa para ela entrar na revisao espaçada.',
    recommendationWeakness: 'Faça uma sessao guiada reforcando seu foco atual.',
    recommendationPlan: 'Use o plano ativo para transformar ritmo em habito.',
    recommendationReview: 'Abra um item vencido e explique a ideia com suas palavras.',
    adaptivePathTitle: 'Trilha montada automaticamente',
    adaptivePathBody: 'A proxima sequencia se ajusta aos temas que voce mais pergunta.',
    adaptiveTrackTitle: 'Trilha recomendada',
    nextExerciseTitle: 'Proximo exercicio',
    startAdaptiveTrack: 'Usar este exercicio',
    adaptiveCoachTitle: 'Coach adaptativo',
    adaptiveCoachBody: 'O tutor ja deixou pronta a melhor proxima pergunta para o seu foco atual.',
    adaptiveEmptyHint: 'Envie um problema e o tutor vai montar aqui o proximo exercicio personalizado.',
    securityTitle: 'Seguranca',
    privacyMode: 'Modo privado',
    privacyModeDesc: 'Nao manter historico nem dados de estudo neste dispositivo.',
    pinProtection: 'Protecao por PIN',
    pinProtectionDesc: 'Bloqueia o tutor com PIN e exige desbloqueio apos inatividade.',
    setPin: 'Definir PIN',
    changePin: 'Alterar PIN',
    removePin: 'Remover PIN',
    autoLock: 'Bloqueio automatico (minutos)',
    securityLocked: 'Sessao bloqueada',
    unlockSession: 'Desbloquear',
    pinPromptSet: 'Crie um PIN de 4 a 8 digitos.',
    pinPromptConfirm: 'Confirme o PIN.',
    pinPromptUnlock: 'Digite seu PIN para desbloquear.',
    pinPromptRemove: 'Digite o PIN atual para remover a protecao.',
    pinMismatch: 'Os PINs nao conferem.',
    pinInvalid: 'Use de 4 a 8 digitos.',
    pinEnabled: 'Protecao por PIN ativada.',
    pinRemoved: 'Protecao por PIN removida.',
    privacyEnabled: 'Modo privado ativado.',
    privacyDisabled: 'Modo privado desativado.',
    uploadSecurityError: 'Envie apenas imagens JPG, PNG ou WEBP de ate 5 MB.'
  },
  es: {
    appTitle: 'Tutor Socratico',
    appSubtitle: 'Companero de Matematicas con IA',
    startLearning: 'Empezar a Aprender',
    poweredBy: 'Impulsado por OpenAI GPT',
    welcomeMessage: 'Toma una foto de tu problema o resolvamoslo juntos, paso a paso.',
    inputPlaceholder: 'Haz una pregunta de matematicas...',
    listening: 'Escuchando...',
    sendTooltip: 'Enviar (Enter)',
    cameraTooltip: 'Abrir camara (Alt + C)',
    uploadTooltip: 'Subir imagen (Alt + U)',
    micTooltip: 'Entrada de voz',
    sessionDepth: 'Profundidad de la sesion',
    step: 'Paso',
    socraticTutor: 'Tutor Socratico',
    student: 'Estudiante',
    socraticInsight: 'Insight Socratico',
    whyQuestion: 'Por que?',
    whyTooltip: 'Haz clic para entender por que importa esta pregunta',
    readAloud: 'Leer',
    stopReading: 'Detener',
    equation: 'Ecuacion',
    thinking: 'Pensando',
    settings: 'Ajustes',
    examples: 'Ejemplos',
    newProblem: 'Nuevo Problema',
    language: 'Idioma',
    selectStyle: 'Estilo de Pensamiento',
    livePreview: 'Vista Previa',
    indicatorDisabled: 'Indicador Desactivado',
    cameraError: 'No se pudo acceder a la camara. Revisa los permisos.',
    voiceError: 'Error de entrada de voz',
    voiceNotSupported: 'La entrada de voz no esta soportada en este navegador.',
    micBlocked: 'Acceso al microfono bloqueado. Revisa los permisos del navegador.',
    complexityBeginner: 'Principiante',
    complexityIntermediate: 'Intermedio',
    complexityAdvanced: 'Avanzado',
    landingTitle: 'Socratico',
    landingSubtitle: 'Tu companero de estudio con IA para comprender matematicas de verdad, no solo llegar a la respuesta.',
    translate: 'Traducir',
    showOriginal: 'Mostrar original',
    translating: 'Traduciendo...',
    translateInput: 'Traducir entrada',
    translationError: 'La traduccion fallo.',
    grapher: 'Graficador',
    translatedBadge: 'Traducido',
    newProblemConfirm: 'Empezar un problema nuevo? Esto borrara la conversacion actual.',
    quickPromptsLabel: 'Prueba uno de estos inicios',
    composerHint: 'Enter envia, Shift + Enter agrega una nueva linea.',
    genericAssistantError: 'Lo siento, tuve un problema al analizar eso. Puedes intentarlo otra vez?',
    apiKeyMissing: 'No se encontro la clave de la API de OpenAI. Agregala al entorno antes de usar el tutor.',
    onboardingBadge: 'Guia de la primera sesion',
    onboardingTitle: 'Un recorrido rapido antes de empezar',
    onboardingBody: 'Este tutor funciona mejor cuando avanzamos paso a paso y usamos las herramientas solo cuando ayudan.',
    onboardingStepOne: 'Escribe o pega un problema. Tambien puedes subir una foto si el ejercicio esta en papel.',
    onboardingStepTwo: 'Elige un nivel de dificultad para ajustar el tono de las explicaciones.',
    onboardingStepThree: 'Abre el graficador cuando una funcion, curva o intercepto se entienda mejor visualmente.',
    onboardingNext: 'Siguiente',
    onboardingBack: 'Atras',
    onboardingSkip: 'Omitir',
    onboardingDone: 'Empezar',
    installApp: 'Instalar app',
    installReady: 'Mantén Socratic Tutor en tu pantalla principal para entrar mas rapido.',
    graphPresetQuadratic: 'Cuadratica',
    graphPresetTrig: 'Trigonometrica',
    graphPresetRational: 'Racional',
    graphPresetLinear: 'Lineal',
    graphInsights: 'Insights del grafico',
    graphWindow: 'Ventana del grafico',
    graphTips: 'Consejos',
    graphEmpty: 'Todavia no hay datos para mostrar en el grafico.',
    graphInvalid: 'Ecuacion invalida',
    graphMax: 'Maximo',
    graphMin: 'Minimo',
    graphYIntercept: 'Intercepto en Y',
    graphXIntercepts: 'Interceptos en X',
    streakLabel: 'Racha de estudio',
    streakDays: 'dias',
    favoriteSession: 'Guardar favorito',
    favoritesTitle: 'Sesiones favoritas',
    resumeTitle: 'Ultima sesion recuperada',
    resumeBody: 'Tu conversacion anterior ya esta cargada para seguir.',
    resumeAction: 'Continuar desde aqui',
    savedBadge: 'Guardado',
    openFavorite: 'Abrir favorito',
    saveFavoriteSuccess: 'Sesion guardada en favoritos.',
    noFavorites: 'Guarda una buena sesion y aparecera aqui.',
    analyticsTitle: 'Analitica de estudio',
    analyticsMessages: 'Mensajes enviados',
    analyticsSessions: 'Sesiones iniciadas',
    analyticsActiveDays: 'Dias activos',
    weeklyGoalTitle: 'Meta semanal',
    weeklyGoalTarget: 'Meta',
    weeklyGoalComplete: 'Meta completada',
    studyPlanTitle: 'Plan de estudio',
    studyPlanStart: 'Iniciar plan',
    studyPlanSwitch: 'Cambiar plan',
    studyPlanReset: 'Reiniciar plan',
    studyPlanProgress: 'Progreso',
    planAlgebraTitle: 'Base de algebra',
    planAlgebraDesc: 'Construye confianza con manipulacion basica y flujo de ecuaciones.',
    planAlgebraTaskOne: 'Resuelve una ecuacion lineal sin pedir la respuesta final.',
    planAlgebraTaskTwo: 'Practica factorizacion o simplificacion en una expresion.',
    planAlgebraTaskThree: 'Pregunta por que un paso de algebra es valido.',
    planGraphTitle: 'Intuicion grafica',
    planGraphDesc: 'Usa visuales para entender forma, interceptos y cambio.',
    planGraphTaskOne: 'Abre el graficador con una cuadratica o una recta.',
    planGraphTaskTwo: 'Identifica al menos un intercepto desde el grafico.',
    planGraphTaskThree: 'Compara como cambia la curva al modificar un termino.',
    planExamTitle: 'Sprint de examen',
    planExamDesc: 'Bloques cortos de repaso para velocidad y seguridad.',
    planExamTaskOne: 'Haz un problema cronometrado del tema actual.',
    planExamTaskTwo: 'Revisa un error y explica la razon.',
    planExamTaskThree: 'Guarda la mejor sesion como favorita para repasar.',
    diagnosticsTitle: 'Insights adaptativos',
    weaknessDetected: 'Area actual de enfoque',
    recommendationsTitle: 'Siguientes acciones recomendadas',
    reviewQueueTitle: 'Cola de repaso espaciado',
    reviewNow: 'Repasar ahora',
    reviewedNow: 'Marcado como repasado',
    noReviewItems: 'No hay repasos vencidos todavia. Guarda mas favoritos o vuelve manana.',
    topicAlgebra: 'Fluidez en algebra',
    topicGraphs: 'Lectura de graficos',
    topicCalculus: 'Planteamiento de calculo',
    topicGeometry: 'Razonamiento geometrico',
    topicWordProblems: 'Traduccion de problemas',
    topicGeneral: 'Resolucion general',
    recommendationConsistency: 'Mantén el ritmo semanal con una sesion corta mas.',
    recommendationFavorites: 'Guarda una buena conversacion para que entre al repaso espaciado.',
    recommendationWeakness: 'Haz una sesion guiada reforzando tu foco actual.',
    recommendationPlan: 'Usa el plan activo para convertir el ritmo en habito.',
    recommendationReview: 'Abre un repaso vencido y explica la idea con tus palabras.',
    adaptivePathTitle: 'Ruta creada automaticamente',
    adaptivePathBody: 'La siguiente secuencia se ajusta a los temas que mas practicas.',
    adaptiveTrackTitle: 'Ruta recomendada',
    nextExerciseTitle: 'Siguiente ejercicio',
    startAdaptiveTrack: 'Usar este ejercicio',
    adaptiveCoachTitle: 'Coach adaptativo',
    adaptiveCoachBody: 'El tutor ya preparo la mejor siguiente pregunta para tu foco actual.',
    adaptiveEmptyHint: 'Envia un problema y el tutor generara aqui tu siguiente ejercicio personalizado.',
    securityTitle: 'Seguridad',
    privacyMode: 'Modo privado',
    privacyModeDesc: 'No guardar historial ni datos de estudio en este dispositivo.',
    pinProtection: 'Proteccion con PIN',
    pinProtectionDesc: 'Bloquea el tutor con PIN y exige desbloqueo tras inactividad.',
    setPin: 'Crear PIN',
    changePin: 'Cambiar PIN',
    removePin: 'Quitar PIN',
    autoLock: 'Bloqueo automatico (minutos)',
    securityLocked: 'Sesion bloqueada',
    unlockSession: 'Desbloquear',
    pinPromptSet: 'Crea un PIN de 4 a 8 digitos.',
    pinPromptConfirm: 'Confirma tu PIN.',
    pinPromptUnlock: 'Ingresa tu PIN para desbloquear.',
    pinPromptRemove: 'Ingresa tu PIN actual para quitar la proteccion.',
    pinMismatch: 'Los PIN no coinciden.',
    pinInvalid: 'Usa de 4 a 8 digitos.',
    pinEnabled: 'Proteccion con PIN activada.',
    pinRemoved: 'Proteccion con PIN eliminada.',
    privacyEnabled: 'Modo privado activado.',
    privacyDisabled: 'Modo privado desactivado.',
    uploadSecurityError: 'Sube solo imagenes JPG, PNG o WEBP de hasta 5 MB.'
  },
  fr: {
    appTitle: 'Tuteur Socratique',
    appSubtitle: 'Compagnon Mathematique IA',
    startLearning: "Commencer l'apprentissage",
    poweredBy: 'Propulse par OpenAI GPT',
    welcomeMessage: 'Prenez une photo du probleme ou resolvons-le ensemble, etape par etape.',
    inputPlaceholder: 'Posez une question de mathematiques...',
    listening: 'Ecoute...',
    sendTooltip: 'Envoyer (Enter)',
    cameraTooltip: 'Ouvrir la camera (Alt + C)',
    uploadTooltip: 'Televerser une image (Alt + U)',
    micTooltip: 'Entree vocale',
    sessionDepth: 'Profondeur de la session',
    step: 'Etape',
    socraticTutor: 'Tuteur Socratique',
    student: 'Etudiant',
    socraticInsight: 'Insight Socratique',
    whyQuestion: 'Pourquoi ?',
    whyTooltip: 'Cliquez pour comprendre pourquoi cette question compte',
    readAloud: 'Lire',
    stopReading: 'Arreter',
    equation: 'Equation',
    thinking: 'Reflexion',
    settings: 'Parametres',
    examples: 'Exemples',
    newProblem: 'Nouveau Probleme',
    language: 'Langue',
    selectStyle: 'Style de Pensee',
    livePreview: 'Apercu en direct',
    indicatorDisabled: 'Indicateur desactive',
    cameraError: "Impossible d'acceder a la camera. Verifiez les permissions.",
    voiceError: "Erreur d'entree vocale",
    voiceNotSupported: "L'entree vocale n'est pas prise en charge par ce navigateur.",
    micBlocked: "L'acces au microphone est bloque. Verifiez les permissions du navigateur.",
    complexityBeginner: 'Debutant',
    complexityIntermediate: 'Intermediaire',
    complexityAdvanced: 'Avance',
    landingTitle: 'Socratique',
    landingSubtitle: 'Votre partenaire de travail avec IA pour vraiment comprendre les mathematiques.',
    translate: 'Traduire',
    showOriginal: "Voir l'original",
    translating: 'Traduction...',
    translateInput: "Traduire l'entree",
    translationError: 'La traduction a echoue.',
    grapher: 'Grapheur',
    translatedBadge: 'Traduit',
    newProblemConfirm: 'Commencer un nouveau probleme ? Cela effacera la conversation actuelle.',
    quickPromptsLabel: 'Essayez un de ces debuts',
    composerHint: 'Enter envoie, Shift + Enter ajoute une nouvelle ligne.',
    genericAssistantError: "Desole, j'ai rencontre un probleme en analysant cela. Pouvez-vous reessayer ?",
    apiKeyMissing: "Cle API OpenAI introuvable. Ajoutez-la a l'environnement avant d'utiliser le tuteur.",
    onboardingBadge: 'Guide de premiere session',
    onboardingTitle: 'Une visite rapide avant de commencer',
    onboardingBody: "Ce tuteur fonctionne mieux quand on avance etape par etape et qu'on utilise les outils au bon moment.",
    onboardingStepOne: "Ecrivez ou collez un probleme. Vous pouvez aussi envoyer une photo si l'exercice est sur papier.",
    onboardingStepTwo: "Choisissez un niveau pour ajuster le ton des explications.",
    onboardingStepThree: 'Ouvrez le grapheur quand une fonction, une courbe ou un intercept se comprend mieux visuellement.',
    onboardingNext: 'Suivant',
    onboardingBack: 'Retour',
    onboardingSkip: 'Passer',
    onboardingDone: 'Commencer',
    installApp: "Installer l'app",
    installReady: 'Gardez Socratic Tutor sur votre ecran pour un acces plus rapide.',
    graphPresetQuadratic: 'Quadratique',
    graphPresetTrig: 'Trigonometrie',
    graphPresetRational: 'Rationnelle',
    graphPresetLinear: 'Lineaire',
    graphInsights: 'Insights du graphe',
    graphWindow: 'Fenetre du graphe',
    graphTips: 'Conseils',
    graphEmpty: "Pas encore de donnees a afficher sur le graphe.",
    graphInvalid: 'Equation invalide',
    graphMax: 'Maximum',
    graphMin: 'Minimum',
    graphYIntercept: 'Intercept en Y',
    graphXIntercepts: 'Intercepts en X',
    streakLabel: "Serie d'etude",
    streakDays: 'jours',
    favoriteSession: 'Sauver favori',
    favoritesTitle: 'Sessions favorites',
    resumeTitle: 'Derniere session recuperee',
    resumeBody: 'Votre conversation precedente est deja chargee pour reprendre.',
    resumeAction: "Reprendre d'ici",
    savedBadge: 'Sauve',
    openFavorite: 'Ouvrir favori',
    saveFavoriteSuccess: 'Session enregistree dans les favoris.',
    noFavorites: 'Enregistrez une bonne session et elle apparaitra ici.',
    analyticsTitle: "Analytique d'etude",
    analyticsMessages: 'Messages envoyes',
    analyticsSessions: 'Sessions demarrees',
    analyticsActiveDays: 'Jours actifs',
    weeklyGoalTitle: 'Objectif hebdomadaire',
    weeklyGoalTarget: 'Objectif',
    weeklyGoalComplete: 'Objectif atteint',
    studyPlanTitle: "Plan d'etude",
    studyPlanStart: 'Demarrer le plan',
    studyPlanSwitch: 'Changer de plan',
    studyPlanReset: 'Reinitialiser le plan',
    studyPlanProgress: 'Progression',
    planAlgebraTitle: "Base d'algebre",
    planAlgebraDesc: 'Renforcez les bases de manipulation et le flux des equations.',
    planAlgebraTaskOne: 'Resolvez une equation lineaire sans demander la reponse finale.',
    planAlgebraTaskTwo: 'Travaillez une factorisation ou une simplification.',
    planAlgebraTaskThree: 'Demandez pourquoi une etape dalgebre est valide.',
    planGraphTitle: 'Intuition graphique',
    planGraphDesc: 'Utilisez les visuels pour comprendre forme, intercepts et variations.',
    planGraphTaskOne: 'Ouvrez le grapheur avec une droite ou une quadratique.',
    planGraphTaskTwo: 'Identifiez au moins un intercept sur le graphe.',
    planGraphTaskThree: 'Comparez leffet dun changement de terme sur la courbe.',
    planExamTitle: "Sprint d'examen",
    planExamDesc: 'Courtes revues ciblees pour la vitesse et la confiance.',
    planExamTaskOne: 'Faites un probleme chronometre dans le theme actuel.',
    planExamTaskTwo: 'Revoyez une erreur et expliquez la raison.',
    planExamTaskThree: 'Sauvegardez la meilleure session pour la revision.',
    diagnosticsTitle: 'Insights adaptatifs',
    weaknessDetected: 'Zone de travail actuelle',
    recommendationsTitle: 'Actions recommandees',
    reviewQueueTitle: 'File de revision espacee',
    reviewNow: 'Revoir maintenant',
    reviewedNow: 'Marque comme revise',
    noReviewItems: "Aucune revision n'est due pour le moment. Sauvegardez plus de favoris ou revenez demain.",
    topicAlgebra: "Aisance en algebre",
    topicGraphs: 'Lecture de graphes',
    topicCalculus: 'Mise en place du calcul',
    topicGeometry: 'Raisonnement geometrique',
    topicWordProblems: 'Traduction de problemes',
    topicGeneral: 'Resolution generale',
    recommendationConsistency: 'Gardez le rythme hebdomadaire avec une courte session supplementaire.',
    recommendationFavorites: 'Sauvegardez une bonne conversation pour la revision espacee.',
    recommendationWeakness: 'Faites une session guidee pour renforcer votre focus actuel.',
    recommendationPlan: 'Utilisez le plan actif pour transformer lelan en habitude.',
    recommendationReview: 'Ouvrez une revision due et expliquez lidee avec vos mots.',
    adaptivePathTitle: 'Parcours construit automatiquement',
    adaptivePathBody: 'La prochaine sequence sadapte aux notions que vous travaillez le plus.',
    adaptiveTrackTitle: 'Parcours recommande',
    nextExerciseTitle: 'Exercice suivant',
    startAdaptiveTrack: 'Utiliser cet exercice',
    adaptiveCoachTitle: 'Coach adaptatif',
    adaptiveCoachBody: 'Le tuteur a deja prepare la meilleure prochaine question pour votre focus actuel.',
    adaptiveEmptyHint: 'Envoyez un probleme et le tuteur generera ici votre prochain exercice personnalise.',
    securityTitle: 'Securite',
    privacyMode: 'Mode prive',
    privacyModeDesc: 'Ne pas conserver lhistorique ni les donnees detude sur cet appareil.',
    pinProtection: 'Protection par PIN',
    pinProtectionDesc: 'Verrouille le tuteur avec un PIN apres inactivite.',
    setPin: 'Definir PIN',
    changePin: 'Changer PIN',
    removePin: 'Retirer PIN',
    autoLock: 'Verrouillage auto (minutes)',
    securityLocked: 'Session verrouillee',
    unlockSession: 'Debloquer',
    pinPromptSet: 'Creez un PIN de 4 a 8 chiffres.',
    pinPromptConfirm: 'Confirmez votre PIN.',
    pinPromptUnlock: 'Entrez votre PIN pour deverrouiller.',
    pinPromptRemove: 'Entrez votre PIN actuel pour retirer la protection.',
    pinMismatch: 'Les PIN ne correspondent pas.',
    pinInvalid: 'Utilisez 4 a 8 chiffres.',
    pinEnabled: 'Protection par PIN activee.',
    pinRemoved: 'Protection par PIN retiree.',
    privacyEnabled: 'Mode prive active.',
    privacyDisabled: 'Mode prive desactive.',
    uploadSecurityError: 'Televersez seulement des images JPG, PNG ou WEBP de 5 Mo max.'
  }
};

export const complexityLabels: Record<Language, Record<Complexity, string>> = {
  en: { Beginner: 'Beginner', Intermediate: 'Intermediate', Advanced: 'Advanced' },
  pt: { Beginner: 'Iniciante', Intermediate: 'Intermediario', Advanced: 'Avancado' },
  es: { Beginner: 'Principiante', Intermediate: 'Intermedio', Advanced: 'Avanzado' },
  fr: { Beginner: 'Debutant', Intermediate: 'Intermediaire', Advanced: 'Avance' }
};

export const socraticInsightsTranslations: Record<Language, string[]> = {
  en: [
    'Encourages you to identify the next step yourself.',
    'Checks your understanding before moving forward.',
    'Breaks a hard problem into smaller parts.',
    'Connects the current move to the overall goal.',
    "Helps you test your intuition about the problem's structure.",
    'Focuses on reasoning, not memorizing steps.'
  ],
  pt: [
    'Incentiva voce a identificar o proximo passo sozinho.',
    'Confere sua compreensao antes de seguir.',
    'Quebra um problema dificil em partes menores.',
    'Liga a etapa atual ao objetivo geral.',
    'Ajuda a testar sua intuicao sobre a estrutura do problema.',
    'Foca em raciocinio, nao em decorar passos.'
  ],
  es: [
    'Te anima a identificar el siguiente paso por tu cuenta.',
    'Comprueba tu comprension antes de avanzar.',
    'Divide un problema dificil en partes mas pequenas.',
    'Conecta el paso actual con el objetivo general.',
    'Ayuda a probar tu intuicion sobre la estructura del problema.',
    'Se enfoca en razonar, no en memorizar pasos.'
  ],
  fr: [
    'Vous encourage a trouver vous-meme la prochaine etape.',
    'Verifie votre comprehension avant de continuer.',
    'Decoupe un probleme difficile en petites parties.',
    "Relie l'etape actuelle a l'objectif general.",
    "Aide a tester votre intuition sur la structure du probleme.",
    'Met en avant le raisonnement plutot que la memorisation.'
  ]
};

export const promptSuggestions: Record<Language, string[]> = {
  en: [
    'Help me solve 2x + 7 = 19 without giving the final answer.',
    'Explain why the slope of a line matters in simple terms.',
    'Look at this photo and tell me what the first step should be.',
    'Graph y = x^2 - 4 and ask me guiding questions about it.'
  ],
  pt: [
    'Me ajude a resolver 2x + 7 = 19 sem dar a resposta final.',
    'Explique por que a inclinacao de uma reta importa de forma simples.',
    'Olhe esta foto e diga qual deve ser o primeiro passo.',
    'Faça o grafico de y = x^2 - 4 e me guie com perguntas.'
  ],
  es: [
    'Ayudame a resolver 2x + 7 = 19 sin dar la respuesta final.',
    'Explica por que la pendiente de una recta importa de forma simple.',
    'Mira esta foto y dime cual debe ser el primer paso.',
    'Grafica y = x^2 - 4 y guiame con preguntas.'
  ],
  fr: [
    "Aide-moi a resoudre 2x + 7 = 19 sans donner la reponse finale.",
    "Explique simplement pourquoi la pente d'une droite est importante.",
    'Regarde cette photo et dis-moi quelle doit etre la premiere etape.',
    'Trace y = x^2 - 4 et guide-moi avec des questions.'
  ]
};

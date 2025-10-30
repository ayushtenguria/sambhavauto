export type DiagnosticInfo = {
  errorCode: string;
  causes: string[];
  solutions: string[];
  steps: string[];
  difficulty: {
    level: string;
    reasoning: string;
  };
  partsAndTools: string[];
  safetyWarnings: string[];
};

export type ActionState = {
  data?: DiagnosticInfo;
  error?: string;
  errorCode?: string;
};

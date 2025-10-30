'use server';

import { suggestErrorCauses } from '../ai/flows/error-cause-suggestion';
import { generateSolutionSteps } from '../ai/flows/solution-steps-generation';
import { assessDiyDifficulty } from '../ai/flows/diy-difficulty-assessment';
import type { ActionState, DiagnosticInfo } from '../types';

function extractPartsAndTools(steps: string[]): string[] {
  const keywords = [
    'wrench', 'socket', 'ratchet', 'screwdriver', 'pliers', 'jack', 'stands', 'multimeter',
    'scanner', 'torque wrench', 'funnel', 'gloves', 'goggles', 'filter', 'sensor', 'gasket',
    'seal', 'fluid', 'oil', 'coolant', 'spark plug', 'brake pad', 'rotor', 'battery'
  ];
  const partsAndTools = new Set<string>();
  const stepsText = steps.join(' ').toLowerCase();

  keywords.forEach(keyword => {
    if (new RegExp(`\\b${keyword}(s)?\\b`).test(stepsText)) {
      partsAndTools.add(keyword.replace(/\b\w/g, l => l.toUpperCase()));
    }
  });

  return Array.from(partsAndTools);
}

const staticSafetyWarnings = [
    "Always wear safety glasses and gloves when working on your vehicle.",
    "Ensure the vehicle is parked on a level surface with the parking brake engaged.",
    "Disconnect the battery before working on electrical components to prevent shocks.",
    "If you need to lift the vehicle, use jack stands for support. Never rely solely on a jack.",
    "Work in a well-ventilated area, especially when dealing with fluids or running the engine.",
    "Allow the engine to cool completely before working on engine or exhaust components.",
];

export async function getDiagnosticInfo(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const errorCode = formData.get('errorCode') as string;

  if (!errorCode || errorCode.trim().length < 3) {
    return { error: 'Please enter a valid error code.' };
  }

  try {
    const [causesResult, stepsResult] = await Promise.all([
      suggestErrorCauses({ errorCode }),
      generateSolutionSteps({ errorCode }),
    ]);

    if (!causesResult || !stepsResult) {
      return { error: 'Failed to retrieve initial diagnostic data.' };
    }
    
    const solutionStepsText = stepsResult.steps.join('\n');
    const difficultyResult = await assessDiyDifficulty({ errorCode, solutionSteps: solutionStepsText });

    if (!difficultyResult) {
        return { error: 'Failed to assess repair difficulty.' };
    }

    const partsAndTools = extractPartsAndTools(stepsResult.steps);

    const diagnosticData: DiagnosticInfo = {
      errorCode,
      causes: causesResult.possibleCauses,
      solutions: causesResult.suggestedSolutions,
      steps: stepsResult.steps,
      difficulty: {
        level: difficultyResult.difficultyLevel,
        reasoning: difficultyResult.reasoning,
      },
      partsAndTools: partsAndTools,
      safetyWarnings: staticSafetyWarnings,
    };

    return { data: diagnosticData, errorCode };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

// stores/explanationStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Explanation } from '@/types';

interface ExplanationState {
  explanations: Record<string, Explanation[] | null>; // key = topicTitle
  addExplanation: (topicTitle: string, explanation: Explanation) => void;
  addExplanations: (topicTitle: string, explanation: Explanation[]) => void;
  getExplanations: (topicTitle: string) => Explanation[] | null;
  likeExplanation: (topicTitle: string, id: number) => void;
}

export const useExplanationStore = create<ExplanationState>()(
  devtools(
    (set, get) => ({
      explanations: {},

      addExplanation: (topicTitle, explanation) => {
        const existing = get().explanations[topicTitle] || [];
        set((state) => ({
          explanations: {
            ...state.explanations,
            [topicTitle]: [...existing, explanation],
          },
        }), false, `addExplanation/${topicTitle}`);
      },
       addExplanations: (topicTitle, explanation) => {
        const existing = get().explanations[topicTitle] || [];
        set((state) => ({
          explanations: {
            ...state.explanations,
            [topicTitle]: [...existing, ...explanation],
          },
        }), false, `addExplanation/${topicTitle}`);
      },

      getExplanations: (topicTitle) => {
        return get().explanations[topicTitle] || null;
      },

      likeExplanation: (topicTitle, id) => {
        const existing = get().explanations[topicTitle];
        if (!existing) return;

        const updated = existing.map((exp) =>
          exp.id === id ? { ...exp, likes: exp.likes + 1 } : exp
        );
        set((state) => ({
          explanations: {
            ...state.explanations,
            [topicTitle]: updated,
          },
        }), false, `likeExplanation/${topicTitle}/${id}`);
      },
    }),
    {
      name: 'ExplanationStore', // Name shown in Redux DevTools
      enabled: true,
    }
  )
);

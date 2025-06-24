import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type LearnedTopic = {
  topic_id: number;
};

type LearnedTopicsState = {
  learnedTopics: LearnedTopic[];
  markAsLearned: (topicId: number) => void;
  unmarkAsLearned: (topicId: number) => void;
  isLearned: (topicId: number) => boolean;
  setLearnedTopics: (topics: LearnedTopic[]) => void;
};

export const useLearnedTopicsStore = create<LearnedTopicsState>()(
  devtools(
    persist(
      (set, get) => ({
        learnedTopics: [],

        markAsLearned: (topicId) => {
          const { learnedTopics } = get();
          if (!learnedTopics.some((t) => t.topic_id === topicId)) {
            set(
              { learnedTopics: [...learnedTopics, { topic_id: topicId }] },
              false,
              'markAsLearned'
            );
          }
        },

        unmarkAsLearned: (topicId) => {
          const { learnedTopics } = get();
          if (Array.isArray(learnedTopics) && learnedTopics.length > 0) {

            set(
              { learnedTopics: learnedTopics?.filter((t) => t.topic_id !== topicId) },
              false,
              'unmarkAsLearned'
            );
          }
        },

        isLearned: (topicId) => {
          const { learnedTopics } = get();
          return learnedTopics.some((t) => t.topic_id === topicId);
        },

        setLearnedTopics: (topics) => {
          set({ learnedTopics: topics }, false, 'setLearnedTopics');
        }
      }),
      {
        name: 'LearnedTopicsStore', // Key in localStorage
        partialize: (state) => ({ learnedTopics: state.learnedTopics }) // only persist learnedTopics
      }
    )
  )
);

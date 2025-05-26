import {create} from 'zustand';

type Explanation = {
  id: number;
  text: string;
  prompt: string;
  likes: number;
};

type Topic = {
  title: string;
  explanations: Explanation[];
};

type TopicStore = {
  expandedTopics: Record<string, boolean>;
  likedExplanations: Record<number, number>; // explanationId -> likes count
  learnedTopics: Record<string, boolean>;

  toggleTopicExpanded: (title: string) => void;
  likeExplanation: (id: number) => void;
  toggleLearned: (title: string) => void;

  // Optional: update explanations if you want to add new generated explanations globally
  // updateExplanations: (topicTitle: string, explanations: Explanation[]) => void;
};

export const useTopicStore = create<TopicStore>((set, get) => ({
  expandedTopics: {},
  likedExplanations: {},
  learnedTopics: {},

  toggleTopicExpanded: (title) => {
    set((state) => ({
      expandedTopics: {
        ...state.expandedTopics,
        [title]: !state.expandedTopics[title],
      },
    }));
  },

  likeExplanation: (id) => {
    set((state) => ({
      likedExplanations: {
        ...state.likedExplanations,
        [id]: (state.likedExplanations[id] ?? 0) + 1,
      },
    }));
  },

  toggleLearned: (title) => {
    set((state) => ({
      learnedTopics: {
        ...state.learnedTopics,
        [title]: !state.learnedTopics[title],
      },
    }));
  },

  // updateExplanations: (topicTitle, explanations) => {
  //   // implement if needed
  // },
}));

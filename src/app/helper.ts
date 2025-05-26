import { useExplanationStore } from "./stores/explanationStore";

export const createExplanationSelector = (topicTitle: string) =>
(s: ReturnType<typeof useExplanationStore.getState>) => s.explanations[topicTitle] || [];
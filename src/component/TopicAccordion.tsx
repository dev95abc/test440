
// components/TopicAccordion.tsx
import { useState } from 'react';
import ExplanationCarousel from './ExplanationCarousel';
import PromptInput from './PromptInput';
import MarkAsLearnedToggle from './MarkAsLearnedToggle';
import {TopicProps} from '@/types'
import { useTopicStore } from '@/app/stores/topicStore';
  
export default function TopicAccordion({ topic }: TopicProps) {
  const isOpen = useTopicStore(state => state.expandedTopics[topic.title] ?? false);
  const toggleTopicExpanded = useTopicStore(state => state.toggleTopicExpanded);

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <button
        className="w-full text-left font-medium text-blue-800 text-md"
        onClick={() => toggleTopicExpanded(topic.title)}
      >
        {isOpen ? '▼' : '▶'} {topic.title}
      </button>
      {isOpen && (
        <div className="mt-3 space-y-4">
          <ExplanationCarousel explanations={topic.explanations} />
          <PromptInput topicTitle={topic.title} />
          <MarkAsLearnedToggle topicTitle={topic.title} />
        </div>
      )}
    </div>
  );
}
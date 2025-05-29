// components/TopicAccordion.tsx
import { useState } from 'react';
import ExplanationCarousel from './ExplanationCarousel';
import PromptInput from './PromptInput';
import MarkAsLearnedToggle from './MarkAsLearnedToggle';
import { TopicProps } from '@/types';
import { useTopicStore } from '@/app/stores/topicStore';
import { useExplanationStore } from '@/app/stores/explanationStore';

export default function TopicAccordion({ topic }: TopicProps) {
  const isOpen = useTopicStore((state) => state.expandedTopics[topic.title] ?? false);
  const toggleTopicExpanded = useTopicStore((state) => state.toggleTopicExpanded);
  const addExplanation = useExplanationStore((state) => state.addExplanation);
  const explanations = useExplanationStore((state) => state.getExplanations(topic.title));

  const fetchExplanations = async () => {


    //call this api here
    addExplanation(topic.title, {
      id: Date.now(), // Better ID generation using timestamp
      text: 'this is a new explanation for ' + topic.title,
      prompt: 'test prompt',
      likes: 4
    });
  };

  const handleLoadMore = () => {
    if (!explanations || explanations.length === 0) {
      fetchExplanations();
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <button
        className="w-full text-left font-medium text-blue-800 text-md"
        onClick={() => toggleTopicExpanded(topic.title)}
      >
        {isOpen ? '▼' : '▶'} {topic.title}
      </button>

      {isOpen && (
        explanations && explanations.length > 0 ? (
          <div className="mt-3 space-y-4">
            <ExplanationCarousel explanations={explanations} />
            <PromptInput topicTitle={topic.title} />
            <MarkAsLearnedToggle topicTitle={topic.title} />
          </div>
        ) : (
          <button 
            className="mt-3 text-blue-600 underline" 
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )
      )}
    </div>
  );
}
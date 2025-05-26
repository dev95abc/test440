
// components/MarkAsLearnedToggle.tsx
import { useTopicStore } from '@/app/stores/topicStore'; 

type Props = {
  topicTitle: string;
}; //type aliases can only be used in typescript files

export default function MarkAsLearnedToggle({ topicTitle }: Props) {
  const learned = useTopicStore(state => state.learnedTopics[topicTitle] ?? false);
  const toggleLearned = useTopicStore(state => state.toggleLearned);

  return (
    <label className="inline-flex items-center gap-2">
      <input
        type="checkbox"
        checked={learned}
        onChange={() => toggleLearned(topicTitle)}
      />
      <span className="text-sm text-green-700">Mark as Learned</span>
    </label>
  );
}
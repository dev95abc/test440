
// components/ExplanationCard.tsx
import LikeButton from './LikeButton';

import {  CardProps} from '@/types';
  

export default function ExplanationCard({ explanation }: CardProps) {
  return (
    <div className="min-w-[300px] p-4 bg-gray-100 rounded-xl shadow">
      <p className="text-sm italic text-gray-500 mb-2">Prompt: "{explanation.prompt}"</p>
      <p className="text-md text-gray-800 mb-4 whitespace-pre-wrap">{explanation.text}</p>
      <LikeButton likes={explanation.likes} />
    </div>
  );
}

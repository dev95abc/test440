
// components/ExplanationCarousel.tsx
import ExplanationCard from './ExplanationCard';

import { CarouselProps} from '@/types';
 
export default function ExplanationCarousel({ explanations }: CarouselProps) {
  return (
    <div className="flex space-x-4 overflow-x-auto">
      {explanations.map((exp, idx) => (
        <ExplanationCard key={idx} explanation={exp} />
      ))}
    </div>
  );
}

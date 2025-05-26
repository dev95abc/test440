// components/SyllabusDisplay.tsx
import TopicAccordion from './TopicAccordion'; 
import {SyllabusProps} from '@/types' 
 

export default function SyllabusDisplay({ modules }: SyllabusProps) {
  return (
    <div className="space-y-6">
      {modules.map((mod, modIdx) => (
        <div key={modIdx}>
          <h2 className="text-2xl font-bold text-blue-700 mb-2">{mod.module}</h2>
          {mod.units.map((unit, unitIdx) => (
            <div key={unitIdx} className="pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{unit.unit}</h3>
              <div className="space-y-2">
                {unit.topics.map((topic, topicIdx) => (
                  <TopicAccordion key={topicIdx} topic={topic} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
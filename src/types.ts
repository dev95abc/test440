// types.ts
//ParsedSyllabus.tsx
export type Explanation = { 
  id: number;
  text: string;
  prompt: string;
  likes: number;
};

export type Topic = {
  title: string;
  explanations: Explanation[] | null;
};

export type TopicUnit = {
  unit: string;
  topics: Topic[] ;
};

export type Module = {
  module: string;
  units: TopicUnit[];
};

export type ParsedSyllabusProps = {
  data: {
    semester: string;
    courseCode: string;
    courseTitle: string;
    credits: number;
    modules: Module[];
  } | null;
};     

export type TopicExplanationProps = {
  topic: Topic;
};


export type CardProps = {
  explanation: Explanation;
};

export type CarouselProps = {
  explanations: Explanation[] | null;
};
export  type TopicProps = {
  topic: {
    title: string;
    explanations: Explanation[] | null;
  };
};
   
export type SyllabusProps = {
  modules: Module[];
};
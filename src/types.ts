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
  id: Number,
  chapter_id: Number,
  explanations: Explanation[] | null;
};

export type ChaptersUnit = {
  id: Number;
  course_id: Number,
  name: String,
  module_number: Number,
  unit_number: Number,
  topics: Topic[]
}

export type TopicUnit = {
  unit: string;
  chapters: ChaptersUnit[];
};

export type Module = {
  module_number: string;
  units: TopicUnit[];
};

export type ParsedSyllabusProps = {
  data: {

    id: Number;
    semester: string;
    course_code: string;
    course_title: string;
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
export type TopicProps = {
  topic: {
    id:Number;
    title: string;
    explanations: Explanation[] | null;
  };
  chpId: Number;
};

export type SyllabusProps = {
  modules: Module[];
};
import { AssessmentSection } from '../types/assessment';

export const FULLSTACK_SKILL_ASSESSMENT: AssessmentSection = {
  id: 'fullstack-assessment-v1',
  title: 'Full-Stack Developer Technical Readiness Evaluation',
  description: 'Evaluate your technical proficiency across modern React 19, TypeScript, Node.js, and database design.',
  timeLimitMinutes: 15,
  questions: [
    {
      id: 'q-1',
      question: 'Which Hook in React 19 is primarily used for handling async state transitions with optimism?',
      options: ['useOptimistic', 'useAsyncEffect', 'useTransitionState', 'useActionState'],
      correctAnswerIndex: 0,
      explanation: 'useOptimistic allows UI state to be updated optimistically while an underlying async action finishes.',
      category: 'Frontend',
    },
    {
      id: 'q-2',
      question: 'What is the primary benefit of using TypeScript strict null checks?',
      options: [
        'Improves bundle compression size',
        'Prevents unexpected runtime undefined or null property access errors',
        'Speeds up Vite build times',
        'Enables automatic SQL indexing',
      ],
      correctAnswerIndex: 1,
      explanation: 'Strict null checking forces explicit handling of null or undefined values before property dereferencing.',
      category: 'Frontend',
    },
    {
      id: 'q-3',
      question: 'In PostgreSQL, which index type is optimal for fast equality checks on UUID columns?',
      options: ['B-Tree', 'GiST', 'GIN', 'BRIN'],
      correctAnswerIndex: 0,
      explanation: 'B-Tree indexes are the default and most efficient for equality and range comparisons on UUID data.',
      category: 'Database',
    },
    {
      id: 'q-4',
      question: 'What mechanism in Node.js handles asynchronous non-blocking I/O operations?',
      options: ['Libuv Event Loop', 'V8 Garbage Collector', 'ThreadPool Sync', 'Child Process Worker'],
      correctAnswerIndex: 0,
      explanation: 'Libuv powers Node.js event loop for non-blocking asynchronous I/O execution.',
      category: 'Backend',
    },
  ],
};

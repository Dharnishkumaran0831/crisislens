import { InterviewQuestion } from '../types/interview';

export const INTERVIEW_QUESTIONS_DATA: InterviewQuestion[] = [
  {
    id: 'int-1',
    topic: 'React Server Components & SSR',
    question: 'How do React Server Components differ from traditional Client Components in terms of bundle size and execution?',
    sampleAnswer: 'React Server Components execute exclusively on the server at build or request time, shipping zero client-side JavaScript for server-only dependencies.',
    keyPointsToCover: [
      'Server-side data fetching without client API waterfalls',
      'Zero impact on client bundle JavaScript payload',
      'Interoperability using "use client" directives',
    ],
    difficulty: 'Senior',
    category: 'Frontend Architecture',
  },
  {
    id: 'int-2',
    topic: 'Database Indexing & Query Tuning',
    question: 'What is an N+1 query problem in relational ORMs and how do you resolve it?',
    sampleAnswer: 'An N+1 query occurs when code fetches 1 parent record and subsequently issues N separate queries for associated children. It is resolved using eager loading or JOIN fetches.',
    keyPointsToCover: [
      'Identification via query logs or APM tracing',
      'Eager loading using JOIN queries or IN clauses',
      'DataLoader batching in GraphQL resolvers',
    ],
    difficulty: 'Mid-Level',
    category: 'Backend & Databases',
  },
  {
    id: 'int-3',
    topic: 'System Design: Rate Limiting',
    question: 'Design a distributed rate limiter for a high-traffic REST API gateway.',
    sampleAnswer: 'Utilize a Token Bucket or Sliding Window Log algorithm backed by Redis in-memory storage with atomic Lua scripts.',
    keyPointsToCover: [
      'Sliding Window Counter vs Token Bucket comparison',
      'Redis atomic EVAL script execution',
      'HTTP 429 Too Many Requests response headers',
    ],
    difficulty: 'Senior',
    category: 'System Design',
  },
];

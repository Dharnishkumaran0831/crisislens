import { InterviewFeedback } from '../types/interview';

/**
 * Generates mock interview performance evaluation and key improvement recommendations.
 */
export function evaluateInterviewResponse(
  topic: string,
  userAnswer: string,
  keyPoints: string[]
): InterviewFeedback {
  let matchedPoints = 0;
  const lowerAnswer = userAnswer.toLowerCase();

  for (const point of keyPoints) {
    const keywords = point.toLowerCase().split(' ');
    const hasKeywordMatch = keywords.some((kw) => kw.length > 3 && lowerAnswer.includes(kw));
    if (hasKeywordMatch) {
      matchedPoints += 1;
    }
  }

  const scorePercentage = keyPoints.length > 0 ? Math.round((matchedPoints / keyPoints.length) * 100) : 50;

  const strengths: string[] = [];
  const areasForImprovement: string[] = [];

  if (scorePercentage >= 70) {
    strengths.push('Demonstrated strong conceptual clarity on architecture and trade-offs');
    strengths.push('Included relevant technical terminology and system metrics');
  } else {
    areasForImprovement.push('Elaborate further on edge cases and scalability constraints');
    areasForImprovement.push('Reference concrete production metrics and indexing strategies');
  }

  return {
    sessionDate: new Date().toISOString(),
    topic,
    overallScore: Math.min(Math.max(scorePercentage, 40), 98),
    strengths,
    areasForImprovement,
    recommendedTopics: ['Distributed Systems', 'PostgreSQL Query Optimization', 'React 19 Hooks'],
  };
}

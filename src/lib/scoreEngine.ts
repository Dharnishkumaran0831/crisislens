import { QuizQuestion, QuizResult } from '../types/assessment';

/**
 * Utility function to calculate skill assessment scores and category performance percentages.
 */
export function calculateQuizResult(
  questions: QuizQuestion[],
  userAnswers: Record<string, number>
): QuizResult {
  let correctCount = 0;
  const categoryTotals: Record<string, { correct: number; total: number }> = {};

  for (const q of questions) {
    if (!categoryTotals[q.category]) {
      categoryTotals[q.category] = { correct: 0, total: 0 };
    }

    categoryTotals[q.category].total += 1;

    const selectedIndex = userAnswers[q.id];
    if (selectedIndex === q.correctAnswerIndex) {
      correctCount += 1;
      categoryTotals[q.category].correct += 1;
    }
  }

  const totalQuestions = questions.length;
  const scorePercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const passed = scorePercentage >= 70;

  const categoryScores: Record<string, number> = {};
  for (const [cat, data] of Object.entries(categoryTotals)) {
    categoryScores[cat] = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
  }

  return {
    totalQuestions,
    correctAnswers: correctCount,
    scorePercentage: Math.round(scorePercentage),
    passed,
    categoryScores,
    completedAt: new Date().toISOString(),
  };
}

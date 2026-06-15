import type { BookRatingSummary } from "../../models/rating";

interface Props {
  summary: BookRatingSummary | null;
  loading?: boolean;
}

export default function BookRatingSummary({ summary, loading }: Props) {
  if (loading) {
    return <p className="muted-text">Зареждане на рейтинг...</p>;
  }

  if (!summary || summary.ratingsCount === 0) {
    return <p className="muted-text">Все още няма оценки.</p>;
  }

  return (
    <div className="rating-summary">
      <p>
        <strong>Оценка:</strong> {summary.averageRating.toFixed(2)} 
      </p>
      <p>
        <strong>Брой оценки:</strong> {summary.ratingsCount}
      </p>
    </div>
  );
}
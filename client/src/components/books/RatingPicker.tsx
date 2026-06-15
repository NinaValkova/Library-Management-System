import { useId, useState } from "react";

interface Props {
  rating: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function RatingPicker({
  rating,
  onChange,
  disabled = false,
}: Props) {
  const [hover, setHover] = useState(0);
  const baseId = useId();
  const stars = [1, 2, 3, 4, 5];
  const current = hover || rating;

  return (
    <div
      className={`rating-picker ${disabled ? "disabled" : ""}`}
      onMouseLeave={() => setHover(0)}
    >
      {stars.map((s) => (
        <span key={s} className="rating-star-wrapper">
          <input
            type="radio"
            id={`${baseId}-star-${s}`}
            name={`${baseId}-rating`}
            value={s}
            checked={rating === s}
            onChange={() => onChange(s)}
            disabled={disabled}
            className="rating-star-input"
          />

          <label
            htmlFor={`${baseId}-star-${s}`}
            title={`${s} Star${s > 1 ? "s" : ""}`}
            onMouseEnter={() => !disabled && setHover(s)}
            className="rating-star-label"
          >
            <i className={`bi ${current >= s ? "bi-star-fill" : "bi-star"}`}></i>
          </label>
        </span>
      ))}
    </div>
  );
}
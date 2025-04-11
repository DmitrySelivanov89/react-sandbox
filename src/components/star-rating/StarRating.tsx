import { useState } from "react";

export const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onClick={() => setRating(starValue)}
            style={{ cursor: 'pointer', color: starValue <= rating ? 'gold' : 'gray' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

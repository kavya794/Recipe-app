import React from 'react';

const StarRating = ({ recipeId, initialRating, onRatingUpdate, readOnly }) => {
  const [rating, setRating] = React.useState(initialRating);

  const handleClick = (newRating) => {
    setRating(newRating);
    onRatingUpdate(newRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readOnly && handleClick(star)} // Call handleClick only if not readOnly
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            color: star <= rating ? 'gold' : 'grey',
            fontSize: '24px',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

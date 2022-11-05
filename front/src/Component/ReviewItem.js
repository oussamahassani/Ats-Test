import React from "react";
import Rating from "@material-ui/lab/Rating";
import Paper from "@material-ui/core/Paper";

const ReviewItem = ({ reviews }) => {
  return (
    <div className="mt-2 mb-2">
      <Paper elevation={3} className="p-2">
        <h4>
          Rating:
          <Rating name="simple-controlled" value={reviews.value} />
        </h4>
        <p> content :{reviews.content}</p>
      </Paper>
    </div>
  );
};

export default ReviewItem;

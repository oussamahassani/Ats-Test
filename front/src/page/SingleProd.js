import React, { useEffect, Fragment } from "react";
import Spinner from "../Component/Spinner";

import { getProductbyID } from "../actions/ProductService";
import { connect } from "react-redux";
import ReviewItem from "../Component/ReviewItem";
const SingleProd = ({
  products: { product, loading },
  match,
  getProductbyID,
}) => {
  useEffect(() => {
    getProductbyID(match.params.id);
  }, [getProductbyID, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : product != null &&  (
        <div className="m-2 row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img src={product.imageUrl} alt={product.imageUrl} />
          </div>
          <div className="col-md-6">
            <h4>Details</h4>
            <h6 className="card-title">Product Name :{product.productName}</h6>
            <p className="mb-1">Category: {product.category}</p>
            <p className=" mb-1">Price: {product.price}</p>
            <p className=" mb-1">Average Score: {product.averageScore}</p>
            <p className=" mb-1">Description: {product.description}</p>
          </div>

          <div>
            {product &&
              product.reviews &&
              product.reviews.map((reviews) => (
                <ReviewItem key={reviews._id} reviews={reviews} />
              ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStatToProps = (state) => ({
  products: state.products,
});
export default connect(mapStatToProps, { getProductbyID })(SingleProd);

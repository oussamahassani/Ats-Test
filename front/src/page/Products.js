import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { getProducts, getAllCategory,getRechercheReview } from "../actions/ProductService";
import { connect } from "react-redux";
import Spinner from "../Component/Spinner";
import ProductItem from "../Component/ProductItem";
import Pagination from "@material-ui/lab/Pagination";
import Recherche from "../Component/Recherche";

import { makeStyles } from "@material-ui/core/styles";

const useStyles1 = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));
const Products = ({
  getAllCategory,
  getProducts,
  getRechercheReview,
  products: { products, loading, totalPage },
}) => {
  const classes1 = useStyles1();
  let [formdata, setFormData] = useState(1);
  let [formvValue, setformvValue] = useState(null);
  let [inputReview , setInputReviw] = useState(null);
  useEffect(() => {
    getProducts(0);
    getAllCategory();
  }, [getProducts, getAllCategory]);

  let { step } = formdata;
  const handleChange = (event, value) => {
    console.log(value);
    setFormData(value);
    step = (value - 1) * 20;
    console.log(step);
    formdata = step;
    if(inputReview){
      getRechercheReview(formdata,{...formvValue,rating: inputReview })

    } else {
    getProducts(formdata, formvValue);
    }
  };

  const handelRecherche = (event) => {
    event.preventDefault();
    let restartPager = 0;


      getProducts(restartPager, formvValue);
      setFormData(1);
  
 
  };
  const findByRating = (event) => {
  
    const value = event.target.value;
    if (value !== "") {
      setInputReviw(value)
      let ratingobject = {...formvValue,rating: value };
      getRechercheReview(0,ratingobject)
    } else {
      setInputReviw(null)
      setformvValue(null)
      getProducts(0);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-fluid">
          <div className="row">
          <label className="col-md-3">Rating Recherche</label>
          <input
             className="col-md-3"
            type="number"
            placeholder="rating recherche"
            min="0"
            max="5"
            onChange={findByRating}
          />
           </div>
          <Recherche
            handelRecherche={handelRecherche}
            setformvValue={setformvValue}
            formvValue={formvValue}
          />
          <div className="row">
            {products.length > 0 ? (
              products &&
              products.map((products) => (
                <ProductItem key={products._id} products={products} />
              ))
            ) : (
              <h4>No products Found</h4>
            )}
          </div>
          <div className={classes1.root}>
            <Pagination
              count={totalPage}
              name="step"
              page={formdata}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};
const mapStatToProps = (state) => ({
  products: state.products,
});
export default connect(mapStatToProps, { getProducts, getAllCategory,getRechercheReview })(
  Products
);

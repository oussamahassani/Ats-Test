import axios from "axios";
import {
  GET_PRODUCTS,
  PRODUCT_ERROR,
  GET_PRODUCT,
  CALCULATE_PAGER,
  GET_CATEGORY,
  LOADING_REQUEST,
} from "./types";
import queryString from "query-string";
import { baseUrl } from "./baseUrl";
export const getProducts =
  (formData, recherche = null) =>
  async (dispatch) => {
    console.log(formData, recherche, queryString.stringify(recherche));
    try {
      dispatch({
        type: LOADING_REQUEST,
      });
      const res = await axios.get(
        baseUrl + `/product/${formData}?${queryString.stringify(recherche)}`
      );

      dispatch({
        type: GET_PRODUCTS,
        payload: res.data.curentpage,
      });
      dispatch({
        type: CALCULATE_PAGER,
        payload: Math.ceil(res.data.totalData / 20),
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_ERROR,
      });
    }
  };
export const getProductbyID = (prodId) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_REQUEST,
    });
    console.log(prodId);
    const res = await axios.get(baseUrl + `/oneproduct/${prodId}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};
export const getAllCategory = () => async (dispatch) => {
  try {
    const res = await axios.get(baseUrl + `/productCat`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};
export const getRechercheReview =
  (step, rate = null) =>
  async (dispatch) => {
    try {
      const res = await axios.get(
        baseUrl + `/findbyReview/${step}?${queryString.stringify(rate)}`
      );
 if(res.data.resulta && res.data.resulta[0].curentPage.length> 0){
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data.resulta[0].curentPage,
      });
      dispatch({
        type: CALCULATE_PAGER,
        payload: Math.ceil(res.data.resulta[0].totalData[0].count / 20),
      });
    }
    else{
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
    } catch (error) {
      console.log(error)
      dispatch({
        type: PRODUCT_ERROR,
      });
    }
  };

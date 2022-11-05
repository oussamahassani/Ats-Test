import { GET_PRODUCTS, PRODUCT_ERROR, GET_PRODUCT,CALCULATE_PAGER,GET_CATEGORY,LOADING_REQUEST } from "../actions/types";

const initialState = {
    products: [],
    product: null,
    loading: true,
    totalPage : 1,
    category:[]

}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS:

            return {
                ...state,
                products: payload,
                loading: false
            }
            case GET_CATEGORY:{
                return{
                    ...state,
                    category:payload
                }
            }
            case CALCULATE_PAGER:
            return {
                ...state,
                totalPage:payload
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false
            }
        case PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                products:[],
                totalPage:1

            }
            case LOADING_REQUEST:
                return {
                    ...state,
                    loading: true
    
                }
        default:
            return state;
    }




}
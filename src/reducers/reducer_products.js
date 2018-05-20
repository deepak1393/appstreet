import { FETCH_PRODUCTS, FETCH_PRODUCT } from '../actions/index';

const INITIAL_STATE = { products: [], product: null };

export default function(state = INITIAL_STATE, action) {
  //console.log(action, state);
  
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload.data };
    case FETCH_PRODUCT:
      return { ...state, product: action.payload.data };
    default:
      return state;
  }
}

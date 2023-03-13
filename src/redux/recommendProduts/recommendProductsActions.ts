import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START'; // CALL API
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  'FETCH_RECOMMEND_PRODUCTS_SUCCESS'; // CALL API SUCCESS
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL'; // CALL API FAIL

interface FetchRecommendProductsStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductsSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
  payload: any;
}

interface FetchRecommendProductsFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
  payload: string;
}

export type RecommendProductsActionTypes =
  | FetchRecommendProductsStartAction
  | FetchRecommendProductsSuccessAction
  | FetchRecommendProductsFailAction;

export const fetchRecommendProductsStartActionCreator =
  (): FetchRecommendProductsStartAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_START,
    };
  };

export const fetchRecommendProductsSuccessActionCreator = (
  data: any
): FetchRecommendProductsSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const fetchRecommendProductsFailActionCreator = (
  error: string
): FetchRecommendProductsFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error,
  };
};

export const getRecommendRoductsListActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendProductsActionTypes> =>
  async (dispatch, getState) => {
    dispatch(fetchRecommendProductsStartActionCreator());
    try {
      // waiting GET request
      const { data } = await axios.get(
        'http://123.56.149.216:8089/api/productCollections'
      ); // return a promise
      dispatch(fetchRecommendProductsSuccessActionCreator(data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchRecommendProductsFailActionCreator(error.message));
      }
    }
  };

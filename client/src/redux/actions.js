import {
  GET_BOOKS,
  GET_DETAIL_BOOK,
  POST_CREATE_BOOK,
  ORDER_NAME,
  ORDER_PRICE,
  RESET_DETAIL,
  SEARCH_BOOK,
  GET_ALL_CATEGORIES,
  CATEGORY_BOOKS,
  RESET_SEARCH_BOOK,
  RESET_CATEGORY_BOOKS,
  FILTER_PRICE,
  LOGIN,
  REGISTER,
  SET_STATUS,
} from "./types.js";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API || 'http://localhost:3001';

export const getBooks = () => async (dispatch) => {
  let dataBooks = await axios(`${baseUrl}/shop/books`);

  return dispatch({
    type: GET_BOOKS,
    payload: dataBooks.data,
  });
};

export const getDetailBook = (id) => async (dispatch) => {
  let bookDetail = await axios(`${baseUrl}/shop//book/${id}`);

  return dispatch({
    type: GET_DETAIL_BOOK,
    payload: bookDetail.data,
  });
};

export const resetDetail = () => ({ type: RESET_DETAIL });

export function getAllCategories() {
  return async (dispatch) => {
    let res = await axios.get(`${baseUrl}/shop/categories`);
    return dispatch({
      type: GET_ALL_CATEGORIES,
      payload: res.data,
    });
  };
}

export function postCreateBook(input) {
  return async (dispatch) => {
    try {
      dispatch(setStatus("Guardando"));
      var res = await axios.post(
        `${baseUrl}/admin/create-book`,
        input
      );
      return dispatch({
        type: POST_CREATE_BOOK,
        payload: res.data,
      });
    } catch (e) {
      dispatch(setStatus("Datos no se guardaron correctamente"));
    }
  };
}

export function orderName(order) {
  return {
    type: ORDER_NAME,
    payload: order,
  };
}

export function orderPrice(order) {
  return {
    type: ORDER_PRICE,
    payload: order,
  };
}

export function filterPrice(price) {
  return {
    type: FILTER_PRICE,
    payload: price,
  };
}

export function categoryBooks(category) {
  return async (dispatch) => {
    let res = await axios.get(
      `${baseUrl}/shop/booksCategory?name=${category}`
    );
    return dispatch({
      type: CATEGORY_BOOKS,
      payload: res.data,
    });
  };
}

export const resetCategoryBooks = () => ({ type: RESET_CATEGORY_BOOKS });

export function searchBook(book) {
  return async (dispatch) => {
    try {
      dispatch(setStatus("Cargando"));
      var res = await axios.get(
        `${baseUrl}/shop/books/filter?value=${book}`
      );
      return dispatch({
        type: SEARCH_BOOK,
        payload: res.data,
      });
    } catch (e) {
      return console.log(res);
    }
  };
}

export function login(body) {
  return async (dispatch) => {
    let res = await axios.post(`${baseUrl}/users/login`, body);
    return dispatch({
      type: LOGIN,
      payload: res.data,
    });
  };
}

export function register(body) {
  console.log(body);
  return async (dispatch) => {
    try{
      dispatch(setStatus("Guardando"));
    let res = await axios.post(baseUrl+"/users/register", body);
    return dispatch({
      type: REGISTER,
      payload: res.data.status?"Usuario se guardo correctamente":res.data.messsage,
    });
    }catch (e) {
      dispatch(setStatus("Datos no se guardaron correctamente"));
    }    
  };
}

export function setStatus(mensaje) {
  return {
    type: SET_STATUS,
    payload: mensaje,
  };
}

export const resetSearchBook = () => ({ type: RESET_SEARCH_BOOK });

// export function orderName(value) {
//   return async (dispatch) => {
//     let res = await axios.get(
//       `http://localhost:3001/shop/books/order?type=${value}`
//     );
//     return dispatch({
//       type: ORDER_NAME,
//       payload: res.data,
//     });
//   };
// }

// export function orderPriece(value) {
//   return async (dispatch) => {
//     let res = await axios.get(
//       `http://localhost:3001/shop/books/orderprice?type=${value}`
//     );
//     return dispatch({
//       type: ORDER_PRIECE,
//       payload: res.data,
//     });
//   };
// }

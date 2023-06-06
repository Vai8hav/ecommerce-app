
//product reducer

export const productReducer = (state, { type, payload }) => {

  switch (type) {
    case "SET_CATEGORY":
      return { ...state, categories: [...payload] };

    case "SET_PRODUCT":
      return { ...state, products: payload };
      
    default:
      return { ...state };
  }
};



//auth reducer

export const userReducer = (state, { type, payload }) => {

  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: payload.foundUser,
        token: payload.encodedToken,
        orderHistory: [],
      };

    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isLoggedIn: false,
        orderHistory: [],
      };

    case "LOGOUT_SUCCESS":
      return { ...state, isLoggedIn: false, user: {}, token: "" };

    case "ADD_ADDRESS":
      return { ...state, address: [...state.address, payload] };

    case "SELECT_ADDRESS":
      return {
        ...state,
        address: state.address.map(addr =>
          addr.id === payload ? 
          { ...addr, active: true } : 
          { ...addr, active: false }
        ),
      };

    case "REMOVE_ADDRESS":
      return {
        ...state,
        address: state.address.filter(({ id }) => id !== payload),
      };

    case "ADD_ORDER":
      console.log(payload);
      return {
        ...state,
        orderHistory: [...state.orderHistory, payload],
      };

    default:
      return state;
  }
};



//cart, wishlist & filter reducer

export const cartReducer = (state, { type, payload }) => {

  switch (type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...payload] };

    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...payload] };

    case "RESET_CART_WISHLIST":
      return {
        ...state,
        cart: [],
        wishlist: [],
        filter: {
          category: [],
          userRating: null,
          sortby: null,
          searchQuery: "",
          price: 2000,
        },
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "INCREMENT_CART":
      return {
        ...state,
        cart: state.cart.map((product) =>
          product._id === payload._id
            ? { ...product, qty: product.qty + 1 }
            : product
        ),
      };

    case "DECREMENT_CART":
      return {
        ...state,
        cart: state.cart.map((product) =>
          product._id === payload._id
            ? { ...product, qty: product.qty - 1 }
            : product
        ),
      };

    case "FILTER_CATEGORY":
      return {
        ...state,
        filter: {
          ...state.filter,
          category: state.filter.category.find((name) => name === payload)
            ? state.filter.category.filter((name) => name !== payload)
            : [...state.filter.category, payload],
        },
      };

    case "FILTER_RATING":
      return {
        ...state,
        filter: { ...state.filter, userRating: payload },
      };

    case "FILTER_SORTBY":
      return { ...state, filter: { ...state.filter, sortby: payload } };

    case "FILTER_QUERY":
      return {
        ...state,
        filter: { ...state.filter, searchQuery: payload },
      };

    case "FILTER_PRICE":
      return { ...state, filter: { ...state.filter, price: payload } };

    case "CLEAR_CATEGORY":
      return { ...state, filter: { ...state.filter, category: [] } };

    case "CLEAR_FILTER":
      return {
        ...state,
        filter: {
          ...state.filter,
          category: [],
          userRating: null,
          sortby: null,
          price: 2000,
        },
      };

    default:
      return state;
  }
};
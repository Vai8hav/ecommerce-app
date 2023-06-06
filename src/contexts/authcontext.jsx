import { createContext, useContext, useReducer } from "react";
import { CartContext } from './cartcontext'
import { userReducer } from '../reducer'
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userData, dispatch] = useReducer(userReducer, {
    isLoggedIn: false,
    user: {},
    address: [
      {
        id: "1",
        active: false,
        name: "John Doe",
        mobile: "8567332292",
        pincode: "30-9321",
        user_address: "A7/12th Street, Roenshrine",
      },
    ],
    orderHistory: [],
    token: "",
  });

  const { resetCartContext } = useContext(CartContext);
  const setLoginSuccess = (data) => {
    console.log(data);
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  };

  const authenticateUser = async (event, email, password) => {
    event.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        resetCartContext();
        setLoginSuccess(responseData);
        localStorage.setItem("token", responseData.encodedToken);
        toast.success(
          `Welcome ${responseData.foundUser.firstName + " " + responseData.foundUser.lastName}`,
          {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }

      if (response.status === 404) {
        toast.error("Invalid email or password provided", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      if (response.status === 422) {
        toast.error(
          "A user already exists with the provided email address",
          {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    } 

    catch (err) {
      console.error(err);
    }
  };

  const signUpHandler = async (event, firstname, lastname, email, password) => {
    event.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
        firstName: firstname,
        lastName: lastname,
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        const responseData = await response.json();
        resetCartContext();
        localStorage.setItem("token", responseData.encodedToken);
        navigate("/login");

        toast.success("User created. Please login to continue", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } 

      else if (response.status === 422) {
        toast.error(
          "A user already exists with the provided email address",
          {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    } 
    
    catch (err) {
      console.error(err);
    }
  };

  const checkLogin = () => {
    return userData.isLoggedIn && localStorage.getItem("token") !== null;
  };
  
  const logoutHandler = () => {
    if (checkLogin()) {
      dispatch({ type: "LOGOUT_SUCCESS", payload: [] });
      localStorage.removeItem("token");
    }
  };

  const addAddressHandler = (e) => {
    e.preventDefault();
    const formInfo = e.target.elements;

    dispatch({
      type: "ADD_ADDRESS",
      payload: {
        id: Math.floor(Math.random() * 100),
        name: formInfo.addressname.value,
        mobile: formInfo.mobileno.value,
        pincode: formInfo.pincode.value,
        user_address: formInfo.address.value,
        user: userData.user,
        active: false,
      },
    });
  };

  const selectAddressHandler = (addId) => {
    dispatch({ type: "SELECT_ADDRESS", payload: addId });
  };

  const removeAddressHandler = (addId) => {
    dispatch({ type: "REMOVE_ADDRESS", payload: addId });
  };

  const orderHistoryHandler = (
    payment_id,
    amount,
    date,
    address,
    orderItems
  ) => {
    dispatch({
      type: "ADD_ORDER",
      payload: {
        orderId: Math.floor(Math.random() * 100),
        orderDate: date,
        cart: orderItems,
        deliveryAddress: address,
        paymentId: payment_id,
        totalAmount: amount,
      },
    });
  };


  return (
    <AuthContext.Provider
      value={{ logoutHandler, signUpHandler, addAddressHandler, selectAddressHandler,
        removeAddressHandler, setLoginSuccess, orderHistoryHandler, checkLogin, authenticateUser,
        user: userData.user, address: userData.address, orderHistory: userData.orderHistory}}>

      {children}
    </AuthContext.Provider>
  );
};
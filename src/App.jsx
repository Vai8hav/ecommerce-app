// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { ProductListing } from "./pages/productlisting";
import { Cart } from "./pages/cart";
import { Wishlist } from "./pages/wishlist";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Checkout } from "./pages/checkout";
import { Header } from "./components/header";
import { Product } from "./pages/product";
import { UserProfile } from "./pages/userprofile";
import { Authorization } from "./components/authorization";
import { ToastContainer } from "react-toastify";
import { MockAPI } from "./pages/mockman";
import { NotFound } from "./pages/notfound";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="App">
      <Header />

      <ToastContainer
        position="top"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"/>
        
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/cart"
          element={
            <Authorization>
              <Cart />
            </Authorization>
          }/>

        <Route path="/wishlist"
          element={
            <Authorization>
              <Wishlist />
            </Authorization>
          }/>

        <Route path="/checkout"
          element={
            <Authorization>
              <Checkout />
            </Authorization>
          }/>

        <Route path="/profile"
          element={
            <Authorization>
              <UserProfile />
            </Authorization>
          }/> 

        <Route path="/products/:productId" element={<Product />} />
        <Route path="/mockman" element={<MockAPI />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
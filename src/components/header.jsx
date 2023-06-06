import "./header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/cartcontext";
import { AuthContext } from "../contexts/authcontext";

export const Header = () => {
  const { checkLogin } = useContext(AuthContext);
  const { getCartCount, getWishlistCount, addFilterQuery, searchQuery } = useContext(CartContext);

  const navigate = useNavigate();

  const searchHandler = (e) => {
    navigate("/products");
    addFilterQuery(e);
  };

  return (
    <>
      <nav>
        <h1><Link className="brand" to="/">ShopVerse</Link></h1>

        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => searchHandler(e)}/>

        <div className="links">
          <NavLink to="/products">Explore</NavLink>

          <NavLink 
          to="/cart" className="link-cart">
            Cart
            <span style={{display: getCartCount() === 0 || !checkLogin() ? "none" : ""}}
              className="counter-notif"
              value={getCartCount()}>
            </span>
          </NavLink>

          <NavLink
            to="/wishlist"
            className="link-wishlist">
            Wishlist
            <span style={{display: getWishlistCount() === 0 || !checkLogin() ? "none" : ""}}
              className="counter-notif"
              value={getWishlistCount()}>
            </span>
          </NavLink>

          <Link to="/login">
            <button style={{display: checkLogin() ? "none" : ""}} className="btn-header-login">Login</button>
          </Link>

          <NavLink 
            to='/profile'>
            {/* onClick={() => navigate("/profile")} */}
            {checkLogin() ? 'Profile' : ''}
          </NavLink>

        </div>
      </nav>
    </>
  );
};
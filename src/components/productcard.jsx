import "./productcard.css";
import { useContext } from "react";
import { CartContext } from "../contexts/cartcontext";
import { AuthContext } from "../contexts/authcontext";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

export const ProductCard = ({ product }) => {

  const { addToCart, isProductInCart, isProductInWishlist, toggleWishlist } = useContext(CartContext);

  const { checkLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const success = (product, place, action = "Added") => {
    let word = "to";
    if (action === "Removed") {
      word = "from";
    }

    return toast.success(
      `${action} ${product.title} ${word} ${place}`,
      {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  const authCheckCart = (product, place) => {
    if (checkLogin()) {
      addToCart(product);

      if (isProductInWishlist(product._id)) {
        toggleWishlist(product);
      }
      success(product, place);

    } 
    else {
      navigate("/login", { state: location });
    }
  };


  const authCheckWishlist = (product, place) => {

    if (checkLogin()) {
      toggleWishlist(product);
      isProductInWishlist(product._id)
        ? success(product, place, "Removed")
        : success(product, place);
    } 
    else {
      navigate("/login", { state: location });
    }
  };

  const cardClassName = product.availability ? 'product-card' : 'product-card out-of-stock';

  return (
    <div className={cardClassName}>

      <div>
        <img
          className="product-image"
          src={product.image}
          onClick={() => navigate(`/products/${product._id}`)}          
          alt=""
          loading="lazy"/>
      </div>

      <div className='cardinfo'>
        <h3>{product.title}</h3>
        <p>By {product.brand}</p>

        <div className='rating-and-reviews'>
          <div className='rating'>{product.rating}</div>
          <p>and {product.reviews} reviews</p>
        </div>

        <div className='prices'>
          <p className='original-price'>${product.price}</p>
          <p className='disc-price'>${product.discounted_price}</p>
        </div>

        <p style={{color: product.availability ? "green" : "red", fontWeight: "600"}}>
          {product.availability ? "In Stock" : "Out of stock"}
        </p>

        <div className='buttons'>
          <button className='addtocart'
            onClick={() => authCheckCart(product, 'cart')}
            style={{display: isProductInCart(product._id) && checkLogin() ? "none" : ""}}
            disabled={!product.availability}>           
            Add to Cart
          </button>

          <button className='addtocart'
            onClick={() => navigate("/cart")}
            style={{display: isProductInCart(product._id) && checkLogin() ? "" : "none"}}>
            Go to Cart
          </button>

          <button className='addtowishlist'
            onClick={() => authCheckWishlist(product, 'wishlist')}>
              { isProductInWishlist(product._id) && checkLogin() ? 'Remove from Wishlist' : 'Wishlist' }
          </button>
        </div>
      </div>

    </div>
  );
};
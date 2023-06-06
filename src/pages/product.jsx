import "./product.css";
import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { ProductContext } from "../contexts/productcontext";
import { CartContext } from "../contexts/cartcontext";
import { AuthContext } from "../contexts/authcontext";
import { toast } from "react-toastify";

export const Product = () => {
  const { productId } = useParams();
  const { getProductDetail } = useContext(ProductContext);
  const { addToCart, toggleWishlist, isProductInCart, isProductInWishlist } = useContext(CartContext)

  const { checkLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const product = getProductDetail(productId);

  const {_id, image, title, description, price, discounted_price,
    rating, delivery_time, availability, reviews, brand} = product;

  const location = useLocation();

  const success = (product, place, action = "Added") => {
    let word = "to";
    if (action === "Removed") {
      word = "from";
    }

    return toast.success(
      `${action} 1 ${product.title} ${word} ${place}`,
      {
        position:"bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
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

  return (
    <>
      <div key={_id} className="alldetails">
        
        <img src={image} alt={description} />

        <div className="cardinfo">
          <h2>{title}</h2>
          <p>By {brand}</p>
          
          <div className='rating-and-reviews'>
            <div className='rating'>{rating}</div>
            <div>and {reviews} reviews</div>
        </div>

        <div className='prices'>
          <p className='original-price'>${price}</p>
          <p className='disc-price'>${discounted_price}</p>
        </div>

        <hr />

          <p className='description'>{description}</p>
          <p>Delivery time: {delivery_time} Days</p>

        <p style={{color: availability ? "green" : "red", fontWeight: "600" }}>
          {availability ? "In Stock" : "Out of stock"}
        </p>

        <div className='buttons'>
          <button className='addtocart'
            onClick={() => authCheckCart(product, "cart")}
            style={{display: isProductInCart(_id) && checkLogin() ? "none" : ""}}
            disabled={!availability}>           
            Add to Cart
          </button>

          <button className='addtocart'
            onClick={() => navigate("/cart")}
            style={{ display: checkLogin() && isProductInCart(_id) ? "" : "none"}}>
            Go to Cart
          </button>

          <button className='addtowishlist'
            onClick={() => authCheckWishlist(product, "wishlist")}>
            {checkLogin() && isProductInWishlist(_id) ? "Remove From Wishlist" : "Add to Wishlist"}
          </button>

          </div>
        </div>
      </div>
    </>
  );
};

import "./productcardcart.css";
import { useContext } from "react";
import { CartContext } from "../contexts/cartcontext";
import { toast } from "react-toastify";

export const ProductCardCart = ({ product }) => {
  const { title, image, discounted_price, price } = product;

  const {removeFromCart, toggleWishlist, updateQuantityCart, isProductInWishlist} = useContext(CartContext);

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
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  const authCheckCart = (product, place) => {
    removeFromCart(product);
    success(product, place, "Removed");
  };

  const authCheckWishlist = (product, place) => {
    toggleWishlist(product);
    removeFromCart(product);
    isProductInWishlist(product._id) ? success(product, place, "Removed") : success(product, place);
  };

  const calculateDiscountPercentage = (price, discountedPrice) => {
    return (((price - discountedPrice) / price) * 100).toFixed();
  };

  return (
    <>
    <div className = 'checkout-card'>
      <img
        src={image}
        alt="landscape"
        className="product-card-image"/>

      <section className="product-detail">
        <h3 className="product-detail-name">{title}</h3>
        
        <p className="product-detail-price">
          ${discounted_price}
          <span className='og-price'>${price}</span>

          <span className="product-detail-discount">
            {calculateDiscountPercentage(price, discounted_price)}% OFF
          </span>
        </p>

        <div className="product-detail-quantity">
          <label htmlFor="quantity">Quantity:</label>

          <span>
            <button
              onClick={() => updateQuantityCart(product, "decrement")}
              disabled={product.qty === 1}>
              -
            </button>

            <input
              type="text"
              name="quantity"
              disabled={true}
              value={product.qty}/>

            <button onClick={() => updateQuantityCart(product, "increment")}>
              +
            </button>

          </span>
        </div>

        <button
          onClick={() => authCheckCart(product, "cart")}
          className="product-detail-btn-remove">
          Remove From Cart
        </button>

        <button
          onClick={() => authCheckWishlist(product, "wishlist")}
          style={{backgroundColor: isProductInWishlist(product._id) ? "#faddff" : ""}}
          className="product-detail-btn-wishlist">

          {isProductInWishlist(product._id)
            ? "Remove from Wishlist"
            : "Move to Wishlist"}
        </button>

      </section>
    </div>
    </>
  );
};
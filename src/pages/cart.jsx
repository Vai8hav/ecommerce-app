
import "./cart.css";
import { ProductCardCart } from "../components/productcardcart";
import { PriceCard } from "../components/pricecard";
import { useContext } from "react";
import { CartContext } from "../contexts/cartcontext";

export const Cart = () => {
  const { cart } = useContext(CartContext);
  return (
    <>
      <h2 className="cart-heading">
        Your Cart has {cart.length === 0 ? "no" : `${cart.length}`} item(s)
      </h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-detail">
          <div className="product-card-cart-list">
            <ul>
              {cart.map((product) => (
                <li>
                  <ProductCardCart product={product} />
                </li>
              ))}
            </ul>
          </div>
          <div className="price-card">
            <PriceCard />
          </div>
        </div>
      )}
    </>
  );
};
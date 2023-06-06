
import "./wishlist.css";
import { useContext } from "react";
import { ProductCard } from "../components/productcard";
import { CartContext } from "../contexts/cartcontext";

export const Wishlist = () => {
  const { wishlist } = useContext(CartContext);
  return (
    <>
      <div className="wishlist-container">
        <h2 className="wishlist-head">Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="empty-wishlist">
            You don't have any product(s) inside your wishlist.
          </p>
        ) : (
          <ul className="wishlist-prod-list">
            {wishlist.map((product) => (
              <li>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
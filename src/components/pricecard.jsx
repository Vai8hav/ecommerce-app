import "./pricecard.css";
import { useContext } from "react";
import { CartContext } from "../contexts/cartcontext";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/authcontext";
import { toast } from "react-toastify";

export const PriceCard = () => {
  const {cart, clearCart, getTotalPrice, getTotalDiscount, removeMultipleFromCart} = useContext(CartContext);

  const { address } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  
  const orderHandler = (order) => {
    const date = new Date();
    const selectedAddress = address.find(({ active }) => active);
    
    orderHistoryHandler(
      order.razorpay_payment_id,
      getTotalPrice() + 99,
      date.toString(),
      selectedAddress,
      cart
    );

    success(`Payment Successfull!`);
    removeMultipleFromCart(cart);
    clearCart();
    navigate("/profile");
  };

  const error = (msg) => {
    return toast.error(msg, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };
  const success = (msg) => {
    return toast.success(msg, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      error("Failed to load payment gateway");
      return;
    }

    const options = {
      key: "rzp_test_rmkQPwJdLvGyDH",
      currency: "USD",
      amount: (amount + 99) * 100,
      name: "ShopVerse",
      description: "Thanks for purchasing",
      handler: function (response) {
        orderHandler(response);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const orderAuthHandler = (amount) => {
    if (address.length !== 0 && address.find(({ active }) => active)) {
      if (cart.length !== 0) {
        displayRazorpay(amount);
        return;
      } else {
        error("No items added");
      }
    } else {
      error("Please select an address to place order");
    }
  };

  return (
    <>
      <h2 className='order-details'>Order details</h2>
      <section>
        <ul className="price-detail-list">
          {cart.length === 0 ? (
            <p>No Product Added</p>
          ) : (
            <ul className="price-detail-list">
              {cart.map(({ title, price, qty }) => (
                <li>
                  <span>
                    📦 {title} x ({qty})
                  </span>
                  <span className="price">${price * qty}</span>
                </li>
              ))}
            </ul>
          )}
          <li>
            <span>💰 Discount</span>
            <span>
              -<span className="price">${getTotalDiscount()}</span>
            </span>
          </li>
          <li>
            <span>🚚 Delivery Charges</span>
            <span className="price">${getTotalPrice() === 0 ? "0" : "99"}</span>
          </li>
          <li className="total-price">
            <span>Total amount</span>
            <span className="price">
              ${getTotalPrice() === 0 ? "0" : getTotalPrice() + 99}
            </span>
          </li>
        </ul>
      </section>
      <hr />
      <p className="saving-info">
        You will save <span style={{color: 'rgb(1, 175, 1)', fontWeight: '600'}}>${getTotalDiscount()}</span> on this order.
      </p>
      <button
        style={{ display: location?.pathname === "/checkout" ? "" : "none" }}
        className="btn-place-order"
        onClick={() => orderAuthHandler(getTotalPrice())}
      >
        Place Order
      </button>
      <button
        style={{ display: location?.pathname === "/cart" ? "" : "none" }}
        className="btn-place-order"
        onClick={() => navigate("/checkout")}>
        Checkout
      </button>
    </>
  );
};

import "./checkout.css";
import { useContext, useState } from "react";
import { AddressCard } from "../components/addresscard";
import { PriceCard } from "../components/pricecard";
import { AuthContext } from "../contexts/authcontext";

export const Checkout = () => {
  const [hideAddress, sethideAddress] = useState(true);
  const { addAddressHandler } = useContext(AuthContext);
  
  return (
    <>
      <div
        style={{ display: hideAddress && "none" }}
        className="add-address-container">
        <form
          onSubmit={(e) => addAddressHandler(e)}
          className="add-address">

          <h3>Add new address</h3>
          <label for="addressname">Name</label>
          <input
            id="addressname"
            type="text"
            required={true}/>

          <label for="pincode">Pin Code</label>
          <input
            id="pincode"
            type="number"
            required={true}/>

          <label for="mobileno">Phone</label>
          <input
            id="mobileno"
            type="tel"
            required={true}/>

          <label for="address">Address</label>
          <textarea
            col={5}
            id="address"
            type="text"
            required={true}
            placeholder="Write complete address here">
          </textarea>

          <button type="submit" className="btn-add-address">
            Add Address
          </button>

          <button
            type="button"
            className="btn-cancel-address"
            onClick={() => sethideAddress(true)}>
            Cancel
          </button>
        </form>
      </div>

      <div className="checkout-container">
        <div className="address-card">
          <AddressCard hideAddressHandler={sethideAddress} />
        </div>

        <div className="price-card">
          <PriceCard />
        </div>
      </div>
    </>
  );
};
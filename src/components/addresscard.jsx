import "./addresscard.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";

export const AddressCard = ({ hideAddressHandler }) => {
  const { address, selectAddressHandler, removeAddressHandler } = useContext(AuthContext);
  
  return (
    <>
      <h2 className="checkout-address-header">Address Details</h2>
      <div>
        {address.length === 0 ? (
          <p className="empty-address">No Address Added</p>
        ) : (
          <ul className="checkout-address">
            {address.map(
              ({ id, active, name, user_address, pincode, mobile }) => (
                <li key={id}>

                <div>
                  <input
                    type="radio"
                    name="address"
                    id={id}
                    checked={active}
                    onChange={() => selectAddressHandler(id)}/>
                    
                  <label for={id}>
                    <h3>{name}</h3>
                    <p>{user_address}</p>
                    <span>Pincode: {pincode}</span>
                    <span>Mobile: {mobile}</span>
                  </label>
                </div>

                  <button
                    className="remove-address"
                    onClick={() => removeAddressHandler(id)}>
                    Remove
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>

      <button
        className="checkout-add-address"
        onClick={() => hideAddressHandler(false)}>
        + Add new Address
      </button>
    </>
  );
};
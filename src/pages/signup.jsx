
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/authcontext";

export const Signup = () => {

  const { signUpHandler, checkLogin } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const [message, setmessage] = useState("");
  const navigate = useNavigate();

  if (checkLogin()) {
    navigate("/");
  }

  const confirmPasswordChecker = (e) => {
    if (e.target.value !== "" && document.getElementById("password").value !== e.target.value) 
      setmessage("Password is not matching")    
    else {
        setmessage("");
      }
    };

    const disablehandler = (e) => {
      if (e.target.value === "") {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };

  return (
    <>
      <form onSubmit={(e) => signUpHandler(e, e.target.elements.firstname.value, 
        e.target.elements.lastname.value, e.target.elements.email.value, e.target.elements.password.value)}

        className="signup-container">

        <h2 className="signup-heading">Sign Up</h2>
        <label for="firstname" className="signup-label">
          First Name
        </label>

        <input
          id="firstname"
          className="signup-input"
          type="text"
          required={true}/>

        <label for="lastname" className="signup-label">
          Last Name
        </label>

        <input
          id="lastname"
          className="signup-input"
          type="text"
          required={true}/>

        <label for="email" className="signup-label">
          Email Address
        </label>

        <input
          id="email"
          className="signup-input"
          type="text"
          required={true}/>

        <label for="password" className="signup-label">
          Password
        </label>

        <input
          id="password"
          className="signup-input"
          type="password"
          required={true}
          onChange={(e) => disablehandler(e)}/>

        <p className="match-password">{message}</p>
        <label for="password" className="signup-label">
          Confirm Password
        </label>

        <input
          id="confirm-password"
          className="signup-input"
          type="password"
          onChange={(e) => confirmPasswordChecker(e)}
          required={true}
          disabled={disabled}/>

        <button type="submit" className="signup-button" disabled={message !== ""}>
          Create New Account
        </button>

        <Link className="signup-link" to="/login">
          Already have an account?
        </Link>

      </form>
    </>
  );
};
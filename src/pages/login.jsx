
import "./login.css";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authcontext";

export const Login = () => {

  const { checkLogin, user, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (checkLogin()) {
    if (location?.state?.pathname) {
      navigate(location?.state?.pathname);
    } 
    else {
      navigate("/");
    }
  }

  return (
    <>
      <form
        onSubmit={(event) =>
          authenticateUser(
            event,
            event.target.elements.userEmail.value,
            event.target.elements.userPassword.value
          )
        }
        className="login-container">

        <h2 className="login-heading">Login</h2>
        <label className="login-label" htmlFor="userEmail">Email Address</label>

        <input
          className="login-input"
          type="email"
          id="userEmail"
          value={user?.email}
          required={true}/>

        <label className="login-label" htmlFor="userPassword">Password</label>

        <input
          className="login-input"
          type="password"
          value={user?.password}
          id="userPassword"
          required={true}/>

        <button type="submit" className="login-button">Login</button>

        <button
          onClick={(e) => authenticateUser(e, "test@gmail.com", "test")}
          className="login-button test">
          Login with Test Credentials
        </button>

        <Link className="login-link" to="/signup">
          Create New Account
        </Link>
        
      </form>
    </>
  );
};




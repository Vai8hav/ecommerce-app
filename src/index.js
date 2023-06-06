import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";

import { ProductProvider } from "./contexts/productcontext";
import { AuthProvider } from "./contexts/authcontext";
import { makeServer } from "./server";
import { CartProvider } from "./contexts/cartcontext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  </React.StrictMode>
);
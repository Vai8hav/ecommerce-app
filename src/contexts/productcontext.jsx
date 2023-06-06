import { createContext, useEffect, useReducer, useState } from "react";
import { productReducer } from '../reducer';
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, dispatch] = useReducer(productReducer, {
    categories: [],
    products: [],
  });

  const [loading, setLoading] = useState(true);

  const getProductData = async () => {
    try {
      const categoryData = await (await 
        fetch("/api/categories")).json();

      const productData = await (await 
        fetch("/api/products")).json();

      dispatch({ type: "SET_CATEGORY", payload: categoryData.categories });
      dispatch({ type: "SET_PRODUCT", payload: productData.products });
      setLoading(false);
    } 
    catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);


  const getProductDetail = (productId) => {
    return productData.products.find(({ _id }) => _id === productId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ProductContext.Provider
      value={{
        categories: productData.categories,
        products: productData.products,
        getProductDetail,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
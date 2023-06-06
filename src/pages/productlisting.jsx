import "./productlisting.css";

import { useContext } from "react";
import { Filter } from "../components/filter";
import { ProductCard } from "../components/productcard";
import { ProductContext } from "../contexts/productcontext";
import { CartContext } from "../contexts/cartcontext";

export const ProductListing = () => {
  const { products } = useContext(ProductContext);
  const { filter } = useContext(CartContext);

  const sortOrder = (order) => {
    if (order === "LTH")
      return (a, b) => a.price - b.price;

    else return (a, b) => b.price - a.price;
  };

  const applyFilter = () => {
    const { category, userRating, sortby, searchQuery, price } = filter;

    let filteredCategory = products;
    if (category.length !== 0) {
      filteredCategory = products.filter(({ category_name }) =>
        category.includes(category_name)
      );
    }

    let filteredRating = filteredCategory;
    if (userRating) {
      filteredRating = filteredCategory.filter(({ rating }) => {
          return rating >= userRating
      });
    }

    let filteredPrice = filteredRating.filter(
      ({ discounted_price }) => discounted_price <= price
    );

    let filteredSorted = filteredPrice;
    if (sortby) {
      filteredSorted = filteredPrice.sort(sortOrder(sortby));
    }

    let filteredSearch = filteredSorted.filter(({ title }) =>
      title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredSearch;
  };

  const displayFilteredProducts = applyFilter();

  return (
      <div className='listingpage'>
        <div>
          <Filter />
          <div className='empty'></div>
        </div>    

        <section className="listing">
          <h3 className="listing-heading">
            Showing All products {" "}
            <span className="product-count">
              (Showing {displayFilteredProducts.length} products)
            </span>
          </h3>
          
          {displayFilteredProducts.length === 0 ? (
            <p className="empty-productlist">No products to display</p>
          ) : (
            <ul className="product-cards">
              {displayFilteredProducts.map((product) => (
                <li key={product._id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>          
  );
};




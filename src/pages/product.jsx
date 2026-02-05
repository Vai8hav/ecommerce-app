import "./product.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { ProductContext } from "../contexts/productcontext";
import { CartContext } from "../contexts/cartcontext";
import { AuthContext } from "../contexts/authcontext";
import { toast } from "react-toastify";

export const Product = () => {
  const { productId } = useParams();
  const { getProductDetail, products } = useContext(ProductContext);
  const { addToCart, toggleWishlist, isProductInCart, isProductInWishlist } = useContext(CartContext)

  const { checkLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const product = getProductDetail(productId);

  const {_id, image, title, description, price, discounted_price,
    rating, delivery_time, availability, reviews, brand} = product || {};

  const location = useLocation();
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [compareIds, setCompareIds] = useState([]);

  const success = (product, place, action = "Added") => {
    let word = "to";
    if (action === "Removed") {
      word = "from";
    }

    return toast.success(
      `${action} 1 ${product.title} ${word} ${place}`,
      {
        position:"bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  const authCheckCart = (product, place) => {
    if (checkLogin()) {
      addToCart(product);
      if (isProductInWishlist(product._id)) {
        toggleWishlist(product);
      }
      success(product, place);
    } 
    else {
      navigate("/login", { state: location });
    }
  };

  const authCheckWishlist = (product, place) => {
    if (checkLogin()) {
      toggleWishlist(product);
      isProductInWishlist(product._id)
        ? success(product, place, "Removed")
        : success(product, place);
    } 
    else {
      navigate("/login", { state: location });
    }
  };

  useEffect(() => {
    if (_id) {
      setCompareIds([_id]);
    }
  }, [_id]);

  const categoryProducts = useMemo(() => {
    if (!product) {
      return [];
    }
    return products.filter(({ category_name }) => category_name === product.category_name);
  }, [product, products]);

  const buildAiAnswer = (question, selectedProduct) => {
    const normalizedQuestion = question.trim().toLowerCase();
    if (!normalizedQuestion) {
      return "Ask me something about this product like durability, performance, or value for money.";
    }

    const priceDrop = selectedProduct.price - selectedProduct.discounted_price;
    const savingsPercent = Math.round((priceDrop / selectedProduct.price) * 100);
    const valueCallout = savingsPercent > 0
      ? `${savingsPercent}% off the list price, so it is a strong value option`
      : "priced close to the list price, so value depends on the premium features";
    const availabilityText = selectedProduct.availability ? "in stock" : "currently out of stock";
    const deliveryText = `ships in about ${selectedProduct.delivery_time} days`;
    const ratingText = `rated ${selectedProduct.rating} with ${selectedProduct.reviews} reviews`;

    const answerParts = [
      `Here is a quick take on the ${selectedProduct.title}: it is ${ratingText} and ${availabilityText}.`,
      `It ${deliveryText}, and is ${valueCallout}.`,
      `Key highlight: ${selectedProduct.description}`,
    ];

    if (normalizedQuestion.includes("battery") || normalizedQuestion.includes("performance")) {
      answerParts.push("Performance will feel premium for everyday use, and the rating suggests most buyers are satisfied.");
    }
    if (normalizedQuestion.includes("value") || normalizedQuestion.includes("worth")) {
      answerParts.push(`At $${selectedProduct.discounted_price}, it is best for shoppers prioritizing balance between price and quality.`);
    }
    if (normalizedQuestion.includes("compare")) {
      answerParts.push("Use the compare panel below to stack it against up to two other products in the same category.");
    }

    return answerParts.join(" ");
  };

  const handleAskAi = () => {
    setAiAnswer(buildAiAnswer(aiQuestion, product));
  };

  const toggleCompare = (id) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
      return;
    }

    if (compareIds.length >= 3) {
      toast.info("You can compare up to 3 products at a time.", {
        position:"bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setCompareIds([...compareIds, id]);
  };

  const selectedProducts = useMemo(() => {
    return categoryProducts.filter(({ _id: id }) => compareIds.includes(id));
  }, [categoryProducts, compareIds]);

  const compareInsights = useMemo(() => {
    if (selectedProducts.length === 0) {
      return null;
    }

    const prices = selectedProducts.map(({ discounted_price }) => discounted_price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const scored = selectedProducts.map((item) => {
      const priceScore = maxPrice === minPrice ? 1 : 1 - ((item.discounted_price - minPrice) / (maxPrice - minPrice));
      const ratingScore = item.rating / 5;
      const availabilityScore = item.availability ? 0.1 : 0;
      const overallScore = (ratingScore * 0.6) + (priceScore * 0.3) + availabilityScore;

      const pros = [];
      const cons = [];

      if (item.rating >= 4.5) pros.push("Top-rated by shoppers");
      if (item.reviews >= 120) pros.push("Strong review volume");
      if (item.discounted_price === minPrice) pros.push("Best price in the selection");
      if (item.delivery_time <= 2) pros.push("Fast delivery");
      if (item.availability) pros.push("Available now");

      if (!item.availability) cons.push("Currently out of stock");
      if (item.rating <= 3.5) cons.push("Lower customer rating");
      if (item.discounted_price === maxPrice) cons.push("Pricier than other options");
      if (item.delivery_time >= 4) cons.push("Slower delivery");

      return {
        ...item,
        overallScore,
        pros: pros.length ? pros : ["Balanced option with no major drawbacks"],
        cons: cons.length ? cons : ["No major trade-offs for most buyers"],
      };
    });

    const verdict = scored.reduce((best, current) =>
      current.overallScore > best.overallScore ? current : best
    );

    return { scored, verdict };
  }, [selectedProducts]);

  return (
    <>
    {product ? (
      <>
      <div key={_id} className="alldetails">
        
        <img src={image} alt={description} />

        <div className="cardinfo">
          <h2>{title}</h2>
          <p>By {brand}</p>
          
          <div className='rating-and-reviews'>
            <div className='rating'>{rating}</div>
            <div>and {reviews} reviews</div>
        </div>

        <div className='prices'>
          <p className='original-price'>${price}</p>
          <p className='disc-price'>${discounted_price}</p>
        </div>

        <hr />

          <p className='description'>{description}</p>
          <p>Delivery time: {delivery_time} Days</p>

        <p style={{color: availability ? "green" : "red", fontWeight: "600" }}>
          {availability ? "In Stock" : "Out of stock"}
        </p>

        <div className='buttons'>
          <button className='addtocart'
            onClick={() => authCheckCart(product, "cart")}
            style={{display: isProductInCart(_id) && checkLogin() ? "none" : ""}}
            disabled={!availability}>           
            Add to Cart
          </button>

          <button className='addtocart'
            onClick={() => navigate("/cart")}
            style={{ display: checkLogin() && isProductInCart(_id) ? "" : "none"}}>
            Go to Cart
          </button>

          <button className='addtowishlist'
            onClick={() => authCheckWishlist(product, "wishlist")}>
            {checkLogin() && isProductInWishlist(_id) ? "Remove From Wishlist" : "Add to Wishlist"}
          </button>

          </div>
        </div>
      </div>
      <section className="ai-assistant">
        <div className="ai-header">
          <div>
            <h3>Ask AI about this product</h3>
            <p>Get quick, tailored insights based on the product details.</p>
          </div>
          <div className="ai-tags">
            <button type="button" onClick={() => setAiQuestion("Is this a good value for the money?")}>
              Value check
            </button>
            <button type="button" onClick={() => setAiQuestion("What stands out about the performance?")}>
              Performance
            </button>
            <button type="button" onClick={() => setAiQuestion("Compare this with other options in the category.")}>
              Compare prompt
            </button>
          </div>
        </div>
        <div className="ai-body">
          <textarea
            rows="3"
            placeholder="Ask anything about this product..."
            value={aiQuestion}
            onChange={(event) => setAiQuestion(event.target.value)}
          />
          <button type="button" className="ai-submit" onClick={handleAskAi}>
            Ask AI
          </button>
        </div>
        {aiAnswer ? (
          <div className="ai-response">
            <h4>AI Response</h4>
            <p>{aiAnswer}</p>
          </div>
        ) : null}
      </section>
      <section className="compare-section">
        <div className="compare-header">
          <div>
            <h3>Compare up to 3 products</h3>
            <p>Only products from the same category can be compared.</p>
          </div>
          <span>{compareIds.length} of 3 selected</span>
        </div>
        <div className="compare-grid">
          {categoryProducts.map((item) => (
            <label key={item._id} className={`compare-item ${compareIds.includes(item._id) ? "active" : ""}`}>
              <input
                type="checkbox"
                checked={compareIds.includes(item._id)}
                onChange={() => toggleCompare(item._id)}
                disabled={!compareIds.includes(item._id) && compareIds.length >= 3}
              />
              <div>
                <h4>{item.title}</h4>
                <p>${item.discounted_price}</p>
                <p className="compare-meta">Rating {item.rating} · {item.delivery_time} days</p>
              </div>
            </label>
          ))}
        </div>
        {compareInsights ? (
          <div className="compare-results">
            <div className="compare-cards">
              {compareInsights.scored.map((item) => (
                <div key={item._id} className="compare-card">
                  <h4>{item.title}</h4>
                  <p className="compare-price">${item.discounted_price}</p>
                  <p>Rating: {item.rating} · Reviews: {item.reviews}</p>
                  <div>
                    <h5>Pros</h5>
                    <ul>
                      {item.pros.map((pro) => (
                        <li key={pro}>{pro}</li>
                      ))}
                    </ul>
                    <h5>Cons</h5>
                    <ul>
                      {item.cons.map((con) => (
                        <li key={con}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="compare-verdict">
              <h4>Final verdict</h4>
              <p>
                Choose <strong>{compareInsights.verdict.title}</strong> if you want the strongest
                overall mix of value, rating, and availability in this category.
              </p>
            </div>
          </div>
        ) : (
          <p className="compare-empty">Select products above to see the comparison.</p>
        )}
      </section>
      </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

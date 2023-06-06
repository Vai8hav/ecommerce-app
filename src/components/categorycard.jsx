
import { useContext } from "react";
import {categories} from '../backend/db/categories'
import { useNavigate } from "react-router";
import { CartContext } from "../contexts/cartcontext";

export function CategoryCard() {

  const { addFilterCategory, clearCategory } = useContext(CartContext);
  const navigate = useNavigate();

  const categoryHandler = (category) => {
    clearCategory();
    addFilterCategory(category);
    navigate("/products");
  };

  return(
    <div className='gallery'>
      {categories.map(({id, categoryImage, categoryName, description}) => (

        <div key={id} className='smooth-card' onClick={() => categoryHandler(categoryName)}>
          <img src={categoryImage} />
          <h3>{categoryName}</h3>
          <p>{description}</p>
        </div>

      ))}
    </div>
  )
}
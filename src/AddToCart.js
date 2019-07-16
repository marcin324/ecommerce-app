import React from "react";
import "./AddToCart.css";

const AddToCart = props => {
  return (
    <div className="product_cart_form">
      <form>
        <label>Quantity:</label>
        <input
          type="number"
          value={props.numberOfProducts === 0 ? "" : props.numberOfProducts}
          onChange={e => props.onGiveNumber(e)}
        />
      </form>
      <button onClick={props.handleAddProducts}>Add to cart</button>
    </div>
  );
};

export default AddToCart;

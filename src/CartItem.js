import React from "react";
import "./CartItem.css";

const CartItem = ({ cartItem, handleRemoveItemFromCart }) => {
  return (
    <div className="cart_item">
      <div className="cart_item_img">
        <img className="img" src={cartItem.image} alt={cartItem.productName} />
      </div>
      <div className="cart_item_product">
        <h4>{cartItem.brandName}</h4>
        <p>{cartItem.productName}</p>
      </div>
      <div>
        {cartItem.numberOfProducts === "1" ? (
          <p>{cartItem.numberOfProducts} pc.</p>
        ) : (
          <p>{cartItem.numberOfProducts} pcs.</p>
        )}
      </div>
      <span
        className="icon-cancel-circled-outline"
        onClick={() => handleRemoveItemFromCart(cartItem.id)}
      />
    </div>
  );
};

export default CartItem;

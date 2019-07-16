import React from "react";
import CartItem from "./CartItem";

import "./Cart.css";

const Cart = ({
  showCart,
  selectedProducts,
  numberOfSelectedProducts,
  handleShowCart,
  handleHideCart,
  handleRemoveItemFromCart,
  handleRemoveAllFromCart
}) => {
  const modal = showCart ? "show" : "";
  const overlay = showCart ? "show" : "";

  if (selectedProducts.length > 0) {
    const cartItems = selectedProducts.map(cartItem => (
      <CartItem
        key={cartItem.id}
        cartItem={cartItem}
        showCart={showCart}
        handleShowCart={handleShowCart}
        handleHideCart={handleHideCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
      />
    ));

    return (
      <div className="cart">
        <div onClick={handleShowCart} className="cart_icon">
          <div className="cart_number">{numberOfSelectedProducts}</div>
          <span className="icon-basket" />
        </div>

        <div className={`overlay ${overlay}`}>
          <div className={`modal ${modal}`}>
            <div className="modal_content">
              <span className="icon-cancel" onClick={handleHideCart} />
              {cartItems}
              <div className="cart_remove_all">
                <p>Remove all</p>
                <span
                  className="icon-trash-empty"
                  onClick={e => handleRemoveAllFromCart(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart">
        <div onClick={handleShowCart} className="cart_icon">
          <span className="icon-basket" />
        </div>

        <div className={`overlay ${overlay}`}>
          <div className={`modal ${modal}`}>
            <div className="modal_content modal_content_empty">
              <span className="icon-cancel" onClick={handleHideCart} />
              <span className="icon-basket_empty icon-basket" />
              <p>Your shopping cart is empty</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;

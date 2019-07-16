import React from "react";
import Product from "./Product";

const ProductList = props => {
  const products = props.products.map(product => (
    <Product
      key={product.id}
      product={product}
      products={props.products}
      handleShowModal={props.handleShowModal}
      handleHideModal={props.handleHideModal}
      handleAddToCart={props.handleAddToCart}
      activeModal={props.activeModal}
    />
  ));
  return <div className="products">{products}</div>;
};

export default ProductList;

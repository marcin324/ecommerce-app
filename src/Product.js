import React, { Component } from "react";
import AddToCart from "./AddToCart";
import "./Product.css";
// import "./App.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfProducts: 0,
      brandName: "",
      productName: "",
      id: null,
      image: ""
    };
  }

  json = this.props.product.general.description;
  description = this.json.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, "");

  onGiveNumber = e => {
    this.setState({
      numberOfProducts: e.target.value,
      brandName: this.props.product.brand.name,
      productName: this.props.product.general.name,
      id: this.props.product.id,
      image: this.props.product.images.primary.large
    });
  };

  handleAddProducts = () => {
    const { id, numberOfProducts, brandName, productName, image } = this.state;
    if (numberOfProducts < 1) return;
    else {
      this.props.handleAddToCart(
        id,
        numberOfProducts,
        brandName,
        productName,
        image
      );
      this.setState({
        numberOfProducts: "",
        brandName: "",
        productName: "",
        id: null,
        image: ""
      });
    }
  };

  render() {
    const {
      product,
      activeModal,
      handleAddToCart,
      handleShowModal,
      handleHideModal
    } = this.props;

    const { numberOfProducts } = this.state;

    const modal = product === activeModal ? "show" : "";
    const overlay = product === activeModal ? "show" : "";
    const img = product === activeModal ? "img" : "";

    return (
      <div className="product">
        <div className="product_container">
          <div className="product_container_image">
            <img
              onClick={() => handleShowModal(product)}
              src={product.images.primary.large}
              alt={product.general.name}
            />
          </div>
          <div className="product_container_content">
            <button
              className="btn_show_modal"
              onClick={() => handleShowModal(product)}
            >
              <p>{product.general.name}</p>
            </button>
            <p>ID: {product.general.presentable_id}</p>
            <AddToCart
              product={product}
              numberOfProducts={numberOfProducts}
              handleAddToCart={handleAddToCart}
              handleAddProducts={this.handleAddProducts}
              onGiveNumber={this.onGiveNumber}
            />
          </div>
        </div>

        <div className={`overlay ${overlay}`}>
          <div className={`modal ${modal}`}>
            <div className="modal_content">
              <span className="icon-cancel" onClick={handleHideModal} />
              <div className="image">
                <img
                  className={`${img}`}
                  src={product.images.primary.large}
                  alt={product.general.name}
                />
              </div>
              <p>{product.brand.name}</p>
              <p>{product.general.name}</p>
              <p>{this.description}</p>
              <p>ID: {product.general.presentable_id}</p>
              <AddToCart
                product={product}
                numberOfProducts={numberOfProducts}
                handleAddToCart={handleAddToCart}
                handleAddProducts={this.handleAddProducts}
                onGiveNumber={this.onGiveNumber}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;

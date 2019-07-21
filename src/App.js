import React, { Component } from "react";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import Form from "./Form";
import Cart from "./Cart";
// import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      numberOfPages: 0,
      searchText: "",
      activePage: 0,
      numberOfSelectedProducts: 0,
      numberOfAllProducts: 0,
      selectedProducts: "",
      activeModal: null,
      chevronLeft: "",
      chevronRight: "",
      itemsCountPerPage: 10,
      showCart: false
    };
  }

  componentDidMount() {
    this.setState({ searchText: "" });
    const { itemsCountPerPage } = this.state;
    fetch(`http://localhost:3005/products?_page=1&_limit=${itemsCountPerPage}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          numberOfPages: 140 / itemsCountPerPage,
          activePage: 1,
          products: data,
          chevronLeft: "invisible",
          chevronRight: ""
        });
      })
      .catch(error => console.log(error));
  }

  handleNextPage = () => {
    this.setState({ chevronLeft: "" });
    const {
      searchText,
      activePage,
      numberOfPages,
      itemsCountPerPage
    } = this.state;

    if (searchText.length < 3 && activePage < numberOfPages) {
      fetch(
        `http://localhost:3005/products?_page=${activePage +
          1}&_limit=${itemsCountPerPage}`
      )
        .then(response => response.json())
        .then(data => {
          if (activePage === numberOfPages - 1) {
            this.setState({
              chevronRight: "invisible",
              activePage: activePage + 1,
              products: data
            });
          } else {
            this.setState({
              activePage: activePage + 1,
              products: data,
              chevronRight: ""
            });
          }
        })
        .catch(error => console.log(error));
    } else if (searchText.length >= 3 && activePage < numberOfPages) {
      fetch(
        `http://localhost:3005/products?q=${searchText}&_page=${activePage +
          1}&_limit=${itemsCountPerPage}`
      )
        .then(response => response.json())
        .then(data => {
          if (activePage === numberOfPages - 1) {
            this.setState({
              chevronRight: "invisible",
              activePage: activePage + 1,
              products: data
            });
          } else {
            this.setState({
              activePage: activePage + 1,
              products: data,
              chevronRight: ""
            });
          }
        })
        .catch(error => console.log(error));
    } else return;
  };

  handlePrevPage = () => {
    this.setState({ chevronRight: "" });
    const { searchText, activePage, itemsCountPerPage } = this.state;

    if (searchText.length < 3 && activePage > 1) {
      fetch(
        `http://localhost:3005/products?_page=${activePage -
          1}&_limit=${itemsCountPerPage}`
      )
        .then(response => response.json())
        .then(data => {
          if (activePage === 2) {
            this.setState({
              activePage: activePage - 1,
              products: data,
              chevronLeft: "invisible"
            });
          } else {
            this.setState({
              activePage: activePage - 1,
              products: data,
              chevronLeft: ""
            });
          }
        })
        .catch(error => console.log(error));
    } else if (searchText.length >= 3 && activePage > 1) {
      fetch(
        `http://localhost:3005/products?q=${searchText}&_page=${activePage -
          1}&_limit=${itemsCountPerPage}`
      )
        .then(response => response.json())
        .then(data => {
          if (activePage === 2) {
            this.setState({
              activePage: activePage - 1,
              products: data,
              chevronLeft: "invisible"
            });
          } else {
            this.setState({
              activePage: activePage - 1,
              products: data,
              chevronLeft: ""
            });
          }
        })
        .catch(error => console.log(error));
    } else return;
  };

  onChangePage = e => {
    this.setState({
      activePage: parseInt(e.target.value)
    });
  };

  handleChangePage = e => {
    e.preventDefault();
    const {
      searchText,
      activePage,
      numberOfPages,
      itemsCountPerPage
    } = this.state;

    if (
      searchText.length < 3 &&
      (activePage <= numberOfPages && activePage > 0)
    ) {
      fetch(
        `http://localhost:3005/products?_page=${activePage}&_limit=${itemsCountPerPage}`
      )
        .then(response => response.json())
        .then(data => {
          if (activePage === 1) {
            this.setState({
              products: data,
              chevronLeft: "invisible",
              chevronRight: ""
            });
          } else if (activePage === numberOfPages) {
            this.setState({
              products: data,
              chevronLeft: "",
              chevronRight: "invisible"
            });
          } else {
            this.setState({
              products: data,
              chevronLeft: "",
              chevronRight: ""
            });
          }
        })
        .catch(error => console.log(error));
    } else if (
      searchText.length >= 3 &&
      (activePage <= numberOfPages && activePage > 0)
    ) {
      fetch(
        `http://localhost:3005/products?q=${searchText}&_page=${activePage}&_limit=${itemsCountPerPage}`
      )
        .then(response => response.json())
        .then(data => {
          if (activePage === 1 && activePage === numberOfPages) {
            this.setState({
              products: data,
              chevronLeft: "invisible",
              chevronRight: "invisible"
            });
          } else if (activePage === 1) {
            this.setState({
              products: data,
              chevronLeft: "invisible",
              chevronRight: ""
            });
          } else if (activePage === numberOfPages) {
            this.setState({
              products: data,
              chevronLeft: "",
              chevronRight: "invisible"
            });
          } else {
            this.setState({
              products: data,
              chevronLeft: "",
              chevronRight: ""
            });
          }
        })
        .catch(error => console.log(error));
    } else return;
  };

  onSearchText = e => {
    this.setState({ searchText: e.target.value });
  };

  handleSearchText = e => {
    e.preventDefault();
    this.setState({ chevronLeft: "invisible" });
    const { searchText, itemsCountPerPage } = this.state;
    if (searchText.length < 3) return;
    else {
      fetch(`http://localhost:3005/products?q=${searchText}&_limit=140`)
        .then(response => response.json())
        .then(data => {
          if (data.length <= itemsCountPerPage) {
            this.setState({
              activePage: 1,
              numberOfPages: Math.ceil(data.length / itemsCountPerPage),
              products: data.slice(0, itemsCountPerPage),
              chevronRight: "invisible"
            });
          } else {
            this.setState({
              activePage: 1,
              numberOfPages: Math.ceil(data.length / itemsCountPerPage),
              products: data.slice(0, itemsCountPerPage),
              chevronRight: ""
            });
          }
        });
    }
  };

  handleShowModal = activeModal => {
    this.setState({
      activeModal
    });
  };

  handleHideModal = () => {
    this.setState({
      activeModal: null
    });
  };

  handleAddToCart = (id, numberOfProducts, brandName, productName, image) => {
    const selectedProduct = {
      id: id,
      numberOfProducts: numberOfProducts,
      brandName: brandName,
      productName: productName,
      image: image
    };

    this.setState(prevState => ({
      numberOfSelectedProducts: prevState.numberOfSelectedProducts + 1,
      selectedProducts: [...prevState.selectedProducts, selectedProduct]
    }));
    const selectedProducts = [...this.state.selectedProducts];
    selectedProducts.forEach(product => {
      if (product.id === id) {
        product.numberOfProducts =
          parseInt(product.numberOfProducts) + parseInt(numberOfProducts);
        this.setState(prevState => ({
          numberOfSelectedProducts: prevState.numberOfSelectedProducts - 1,
          selectedProducts
        }));
      }
    });
  };

  handleShowCart = () => {
    this.setState({
      showCart: true
    });
  };

  handleHideCart = () => {
    this.setState({
      showCart: false
    });
  };

  handleRemoveItemFromCart = id => {
    let selectedProducts = [...this.state.selectedProducts];
    const index = selectedProducts.findIndex(
      selectedProduct => selectedProduct.id === id
    );
    selectedProducts.splice(index, 1);
    // selectedProducts = selectedProducts.filter(
    //   selectedProduct => selectedProduct.id !== id
    // );
    this.setState({
      numberOfSelectedProducts: this.state.numberOfSelectedProducts - 1,
      selectedProducts
    });
  };

  handleRemoveAllFromCart = e => {
    e.stopPropagation();
    this.setState({
      numberOfSelectedProducts: 0,
      selectedProducts: []
    });
  };

  render() {
    const {
      searchText,
      numberOfSelectedProducts,
      selectedProducts,
      activeModal,
      activePage,
      numberOfPages,
      products,
      chevronLeft,
      chevronRight,
      showCart
    } = this.state;
    return (
      <div className="app">
        <Form
          searchText={searchText}
          handleSearchText={this.handleSearchText}
          onSearchText={this.onSearchText}
          onClick={this.componentDidMount.bind(this)}
        />
        <Cart
          selectedProducts={selectedProducts}
          numberOfSelectedProducts={numberOfSelectedProducts}
          showCart={showCart}
          handleShowCart={this.handleShowCart}
          handleHideCart={this.handleHideCart}
          handleRemoveItemFromCart={this.handleRemoveItemFromCart}
          handleRemoveAllFromCart={this.handleRemoveAllFromCart}
        />

        <Pagination
          activePage={activePage}
          numberOfPages={numberOfPages}
          chevronLeft={chevronLeft}
          chevronRight={chevronRight}
          handlePrevPage={this.handlePrevPage}
          handleNextPage={this.handleNextPage}
          handleChangePage={this.handleChangePage}
          onChangePage={this.onChangePage}
        />

        <ProductList
          products={products}
          handleShowModal={this.handleShowModal}
          handleHideModal={this.handleHideModal}
          handleAddToCart={this.handleAddToCart}
          activeModal={activeModal}
        />

        <Pagination
          activePage={activePage}
          numberOfPages={numberOfPages}
          chevronLeft={chevronLeft}
          chevronRight={chevronRight}
          handlePrevPage={this.handlePrevPage}
          handleNextPage={this.handleNextPage}
          handleChangePage={this.handleChangePage}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default App;

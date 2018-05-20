import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchProducts } from '../../actions/index';
import Product from './Product/Product';
import './Products.css';

class Products extends Component {

  constructor(props) {
    super(props);
    this.getProducts = this.getProducts.bind(this);

    this.state = {
      products: [],
      currentPage: 1
    };

    this.getProducts();

    // this.props.fetchProducts(1);
    // this.setState({
    //   products: this.props.products
    // });
  }

  getProducts() {
    const ROOT_URL = 'https://assignment-appstreet.herokuapp.com/api/v1/products';
    const page = this.state.currentPage;
    axios.get(`${ROOT_URL}?page=${page}`).then(res => {
      if (this.state.products) {
        this.setState((prevState, props) => {
          return {
            products: [...prevState.products, ...res.data.products],
            currentPage: prevState.currentPage + 1
          }
        });
      } else {
        this.setState((prevState, props) => {
          return {
            products: res.data.products,
            currentPage: prevState.currentPage + 1
          }
        });
      }

    });
  }

  render() {

    if (!this.props.products) {
      return <div>Loading...</div>;
    }

    const products = this.state.products.map((product, index) => {
      return (
        <Product
          key={product._id}
          product={product} />
      )
    });

    return (
      <div>
        <div className='row'>
          {products}
        </div>
        <div className='load-more'>
          <button className='btn' onClick={this.getProducts}>Load More</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { products: state.products.products };
}

export default connect(mapStateToProps, { fetchProducts })(Products);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Product.css';

class Product extends Component {
  render() {
    const to = `product/${this.props.product._id}`;

    return (
      <div className="col-md-4 col-12 col-sm-2 col-lg-3">
        <Link to={to}>
          <div className='product-card'>
            <img className="product-image" src={this.props.product.images && this.props.product.images[0]} alt={this.props.product.name} />
            <span className='product-name product-info'>{this.props.product.name}</span>
            <p className='product-price product-info'>&#x20B9; {Math.floor(this.props.product.sale_price)}</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default Product;
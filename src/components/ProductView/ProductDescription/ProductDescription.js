import React, { Component } from 'react';

import './ProductDescription.css';

class ProductDescription extends Component {

  constructor(props) {
    super(props);
    this.getShortDesc = this.getShortDesc.bind(this);
    this.toggleProductDescLength = this.toggleProductDescLength.bind(this);
    this.state = {
      shortProductDesc: true
    }
  }

  getShortDesc() {
    return this.props.product.desc && this.props.product.desc.slice(0, 150) + "...";
  }

  toggleProductDescLength() {
    this.setState(prevState => {
      return {
        shortProductDesc: !prevState.shortProductDesc
      };
    });
  }

  getLocalePrice(price) {
    return price && price.toLocaleString('en-IN', { currency: 'INR', style: 'currency' });
  }

  render() {
    return (
      <div>
        <div className="product-basic-info">
          <h3 className="product-name">
            {this.props.product.name}
          </h3>

          <p className="product-desc">
            {this.state.shortProductDesc ? this.getShortDesc() : this.props.product.desc}
          </p>
          <p onClick={this.toggleProductDescLength} className="show-more-desc">
            {this.state.shortProductDesc ? '+MORE' : '-LESS'}
          </p>
        </div>

        <div className="product-pricing-info">
          <p className="product-price-info">
            <span className="sale-price">
              {this.getLocalePrice(this.props.product.sale_price)}
            </span>
            <span className="mark-price">
              {this.getLocalePrice(this.props.product.mark_price)}
            </span>
          </p>
          <p className="sale-msg">
            {this.props.product.sale_msg}
          </p>
          <p className="tax-info">
            Local taxes included (where applicable)
          </p>
        </div>
      </div>
    );
  }
}

export default ProductDescription;
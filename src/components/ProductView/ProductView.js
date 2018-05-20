import React, { Component } from 'react';
import axios from 'axios';

import Carousel from './Carousel/Carousel';
import ProductDescription from './ProductDescription/ProductDescription';

import './ProductView.css';

class ProductView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product_id: props.match.params.id,
      product: null,
      primary_product: null,
      desc: null,
      attributes: null,
      options: null,
      product_variations: null,
      selected_option_ids: null,
      colorVariations: null,
      selectedColorVariation: null,
      storageVariations: null,
      selectedStorageVariation: null,
      qty: 1
    };

    const product_id = this.props.match.params.id;
    const ROOT_URL = 'https://assignment-appstreet.herokuapp.com/api/v1/products';
    axios.get(`${ROOT_URL}/${product_id}`).then(res => {

      const colorVariations = [];
      const storageVariations = [];

      for (let x in res.data.attributes) {

        if (res.data.attributes[x].name === 'Colour') {
          const colorId = res.data.attributes[x]._id;
          for (let y in res.data.options) {
            if (colorId === res.data.options[y].attrib_id) {
              colorVariations.push(
                [{
                  color: res.data.options[y].name,
                  _id: res.data.options[y]._id
                }]
              );
            }
          }
        } else if (res.data.attributes[x].name === 'Storage') {
          const storageId = res.data.attributes[x]._id;
          for (let z in res.data.options) {
            if (storageId === res.data.options[z].attrib_id) {
              storageVariations.push(
                [{
                  storage: res.data.options[z].name,
                  _id: res.data.options[z]._id
                }]
              );
            }
          }
        }
      }

      this.setState({
        images: res.data.primary_product.images,
        desc: res.data.primary_product.desc,
        product: res.data,
        primary_product: res.data.primary_product,
        attributes: res.data.attributes,
        options: res.data.options,
        product_variations: res.data.product_variations,
        selected_option_ids: res.data.selected_option_ids,
        colorVariations: colorVariations,
        storageVariations: storageVariations
      });

      for (let w in res.data.product_variations) {
        if (props.match.params.id === res.data.product_variations[w]._id) {
          this.updateStateForProductVariant(res.data.product_variations[w]);
        }
      }

    });

  }

  updateStateForProductVariant(productData) {
    this.setState({
      name: productData.name,
      images: productData.images,
      sale_price: productData.sale_price,
      mark_price: productData.mark_price,
      sale_msg: productData.sale_msg,
      selectedColorVariation: this.getGenericId(productData.sign, 'Colour'),
      selectedStorageVariation: this.getGenericId(productData.sign, 'Storage')
    });
  }

  getGenericId(signs, attribute) {
    if (attribute === 'Colour') {
      for (let i in signs) {
        for (let j in this.state.colorVariations) {
          if (signs[i] === this.state.colorVariations[j][0]._id) {
            return signs[i];
          }
        }
      }
    } else if (attribute === 'Storage') {
      for (let i in signs) {
        for (let j in this.state.storageVariations) {
          if (signs[i] === this.state.storageVariations[j][0]._id) {
            return signs[i];
          }
        }
      }
    }
  }

  changeColor(colorId) {
    const currentStorageId = this.state.selectedStorageVariation;
    const productData = this.fetchProductVariationOnColorStorage(colorId, currentStorageId);
    this.updateStateForProductVariant(productData);
  }

  changeStorage(storageId) {
    const currentColorId = this.state.selectedColorVariation;
    const productData = this.fetchProductVariationOnColorStorage(currentColorId, storageId);
    this.updateStateForProductVariant(productData);
  }

  fetchProductVariationOnColorStorage(colorId, storageId) {
    for (let i in this.state.product_variations) {
      if (
        this.state.product_variations[i].sign.indexOf(colorId) !== -1 &&
        this.state.product_variations[i].sign.indexOf(storageId) !== -1
      ) {
        return this.state.product_variations[i];
      }
    }
  }

  updateQty(val) {
    this.setState(prevState => {
      return {
        qty: prevState.qty > 1 || val > 0 ? prevState.qty + val : 1
      };
    });
  }

  render() {
    if (!this.state.name) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className='row product-view'>
        <div className="col-sm-5 col-12 carousel-container">
          <Carousel images={this.state.images} />
        </div>
        <div className="col-sm-7 col-12">
          <div className="product-description-container">
            <ProductDescription product={this.state} />
          </div>

          <div className="product-options-container">

            <div className='storage'>

              <p className="option-type">
                {this.state.storageVariations.length} Storage options available
              </p>

              {this.state.storageVariations.map((storage, index) => {
                const selectedStorage = (storage[0]._id === this.state.selectedStorageVariation) ? '#e1e1e1' : '';
                return (
                  <div
                    key={index}
                    className='choice'
                    style={{ background: selectedStorage }}
                    onClick={() => this.changeStorage(storage[0]._id)}>
                    <span key={index} className="">{storage[0].storage}</span>
                  </div>
                )
              })}
            </div>

            <div className='color'>
              <p className="option-type">
                {this.state.colorVariations.length} Colour options available
              </p>
              {this.state.colorVariations.map((color, index) => {
                const selectedColor = (color[0]._id === this.state.selectedColorVariation) ? '#e1e1e1' : '';
                return (
                  <div
                    key={color[0]._id}
                    className='choice'
                    style={{ background: selectedColor }}
                    onClick={() => this.changeColor(color[0]._id)}>
                    <span className="dot" style={{ backgroundColor: color[0].color }}></span>
                    <span className='color-name' style={{ 'padding': '0 2px 0' }}>{color[0].color}</span>
                  </div>
                )
              })}
            </div>

            <div className='add-to-cart'>
              <p className="qty-title">
                Quantity
              </p>
              <div className="qty-container">
                <span onClick={() => this.updateQty(-1)} className="decrement-qty">-</span>
                <span className="qty">{this.state.qty}</span>
                <span onClick={() => this.updateQty(+1)} className="increment-qty">+</span>
              </div>
              <button className="btn btn-light add-to-cart-btn">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductView;
import React, { Component } from 'react';

import './Carousel.css';

class Carousel extends Component {

  render() {

    const carouselImages = this.props.images.map((image, index) => {
      return (
        <div className={index === 0 ? 'item active' : 'item'} key={index}>
          <img src={image} alt="" style={{ height: '350px', width: '350px' }} />
        </div>
      );
    });

    const carouselImagesLi = this.props.images.map((image, index) => {
      return (
        <li key={index} data-target="#myCarousel" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
      );
    });

    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          {carouselImagesLi}
        </ol>

        <div className="carousel-inner">
          {carouselImages}
        </div>

        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left"></span>
          <span className="sr-only">Previous</span>
        </a>

        <a className="right carousel-control" href="#myCarousel" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

export default Carousel;
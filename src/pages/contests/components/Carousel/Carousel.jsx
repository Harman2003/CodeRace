import React from 'react'
import Slider from 'react-slick'
import Event from './components/Event';
const Carousel = () => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    speed:1500
  };
  return (
    <div className='w-full overflow-y-hidden'>
      <Slider {...settings} className='w-full'>
          <Event/>       
          <Event/>             
          <Event/>             
      </Slider>
    </div>
  )
}

export default Carousel

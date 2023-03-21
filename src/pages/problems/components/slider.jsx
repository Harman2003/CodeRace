import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Slide = () => {
    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        arrows: false
    }
    return (
      <div >
        <Slider {...settings}>
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </Slider>
      </div>
    );
}

const Box = () => {
    return (
        <div className='mx-2 h-28 rounded-md border-2 border-zinc-100 p-2'>
            <div className='text-lg'>Weekly Contest</div>
            <div className='text-sm'>Sunday, Feb 12</div>
            <div className='my-2 p-1 rounded-md text-sm bg-white max-w-fit'>Register</div>
        </div>
    )
}

export default Slide

import React from "react";
import NosMarques from "./NosMarques";

const Carousel = () => {
  return (
    <section className='sectionCarouselMarques'>
        <div className='carouselMarquesContainer'>
            <div className='headerCarouselMarques'>
        <div className='rondRose'></div>
            <div className='titreCarousel'>
                <h2 className='h2CarouselMarques'>
                    Plus de 30 marques de lunettes
                </h2>
            </div>
            <div className='rondRose2'></div>
            </div>
            <div className='carouselMarquesInterieur'>
                <NosMarques />
            </div>
        </div>
    </section>
)
}

export default Carousel;
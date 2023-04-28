import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Gallery = () => {
  const [showFullscreenButton, setShowFullscreenButton] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const images = [
    {
      original: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t1.6435-9/157506564_2877465015868713_5816195149347210709_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=17o2DGgVMSAAX8yK22G&_nc_ht=scontent-cdg4-2.xx&oh=00_AfAa5CXm1xaqGvEoUzRiLsZgip3iedxRBZN_-DgP9fgLOw&oe=6473341F',
      thumbnail: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t1.6435-9/157506564_2877465015868713_5816195149347210709_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=17o2DGgVMSAAX8yK22G&_nc_ht=scontent-cdg4-2.xx&oh=00_AfAa5CXm1xaqGvEoUzRiLsZgip3iedxRBZN_-DgP9fgLOw&oe=6473341F',
      description: 'Image 1',
    },
    {
      original: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t1.6435-9/131066858_2805271619754720_132158207908085650_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=ssgsDKKMCbMAX_mo-7b&_nc_ht=scontent-cdg4-1.xx&oh=00_AfAyDyFQ2QzG6ulT4Bawm13pGgq8tzRArl0FJ_wsFqQfVw&oe=64734872',
      thumbnail: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t1.6435-9/131066858_2805271619754720_132158207908085650_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=ssgsDKKMCbMAX_mo-7b&_nc_ht=scontent-cdg4-1.xx&oh=00_AfAyDyFQ2QzG6ulT4Bawm13pGgq8tzRArl0FJ_wsFqQfVw&oe=64734872',
      description: 'Image 2',
    },
    {
      original: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t1.6435-9/131208814_2805271576421391_2574831142676618596_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=EsSn9Q_-_NIAX_Xo-8S&_nc_ht=scontent-cdg4-2.xx&oh=00_AfDF0EVEW3VHw1SIXNqHd-np24EXhfUL8OGFcwvARwyysQ&oe=647359F9',
      thumbnail: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t1.6435-9/131208814_2805271576421391_2574831142676618596_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=EsSn9Q_-_NIAX_Xo-8S&_nc_ht=scontent-cdg4-2.xx&oh=00_AfDF0EVEW3VHw1SIXNqHd-np24EXhfUL8OGFcwvARwyysQ&oe=647359F9',
      description: 'Image 3',
    },
  ];

  const toggleFullscreenButton = () => {
    setShowFullscreenButton(!showFullscreenButton);
  };

  const togglePlayButton = () => {
    setShowPlayButton(!showPlayButton);
  };

  return (
    <section className='gallerieImageSection'>
      <div className='gallerieImageContainer'>
    <ImageGallery
      items={images}
      showFullscreenButton={showFullscreenButton}
      showPlayButton={showPlayButton}
      onScreenChange={toggleFullscreenButton}
      onPlay={togglePlayButton}
      onPause={togglePlayButton}
    />
    </div>
    </section>
  );
};

export default Gallery;
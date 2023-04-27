import React, { useState }from 'react'
import ReactImageGallery from 'react-image-gallery'
import image1 from "../img/1977_photo5A9FB77F-OPTIQUE-CHATENAY.JPG"
import image2 from "../img/2021-10-15.jpg"

function Gallery() {
    const [galleryOpen, setGalleryOpen] = useState(false);

    const images = [
        {
          original: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/311658630_807237867316007_8849648156703119563_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=19026a&_nc_ohc=HZ6YadD51lMAX9JBBEU&_nc_ht=scontent-cdg4-2.xx&oh=00_AfDSLZNJBWnuKFEJqPDOQUnRM0rPadpIe4_eRjWU8BYuNQ&oe=64500FB4',
          thumbnail: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/311658630_807237867316007_8849648156703119563_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=19026a&_nc_ohc=HZ6YadD51lMAX9JBBEU&_nc_ht=scontent-cdg4-2.xx&oh=00_AfDSLZNJBWnuKFEJqPDOQUnRM0rPadpIe4_eRjWU8BYuNQ&oe=64500FB4',
        },
        {
          original: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t1.6435-9/131066858_2805271619754720_132158207908085650_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=diQ-_HQ4eNAAX_skimQ&_nc_ht=scontent-cdg4-1.xx&oh=00_AfAsw9f4J_Qu6lBWBgXxp9bIpFx-O_G4uQA2xu2VPn6BJA&oe=6471F6F2',
          thumbnail: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t1.6435-9/131066858_2805271619754720_132158207908085650_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=diQ-_HQ4eNAAX_skimQ&_nc_ht=scontent-cdg4-1.xx&oh=00_AfAsw9f4J_Qu6lBWBgXxp9bIpFx-O_G4uQA2xu2VPn6BJA&oe=6471F6F2',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
      ];
      const handleImageClick = () => {
        setGalleryOpen(true);
      };
    
      const handleGalleryClose = () => {
        setGalleryOpen(false);
      };
  return (
    <>
    {galleryOpen && (
      <ReactImageGallery items={images} onClose={handleGalleryClose} />
    )}
    <div>
      <img src={image1} onClick={handleImageClick} />
      <img src={image2} onClick={handleImageClick} />
      <img src="image3-thumbnail.jpg" onClick={handleImageClick} />
    </div>
  </>
);
};

export default Gallery
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ArrowUpward } from '@mui/icons-material';

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const currentPosition = window.pageYOffset;

    if (currentPosition > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '80' }}>
      {isVisible && (
        <IconButton onClick={scrollToTop} size="large">
          <ArrowUpward />
        </IconButton>
      )}
    </div>
  );
};

export default ScrollTopButton;
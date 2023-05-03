import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export const CarouselMarquesItem = ({ children, width }) => {
  return (
    <div className="carouselMarques-item" style={{ width: width }}>
      {children}
    </div>
  );
};

const CarouselMarques = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div
      {...handlers}
      className="carouselMarques"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="innerMarques"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { display:"flex", });
        })}
      </div>
      <div className="indicators">
        <button
        aria-label="Précédent"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <ArrowBackIcon />
        </button>
        <button className="indicators"
        aria-label="Suivant"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
         <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
};

export default React.memo(CarouselMarques);
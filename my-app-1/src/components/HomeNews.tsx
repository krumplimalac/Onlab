import { useEffect, useRef, useState } from "react";

export default function HomeNews(){
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];
  const delay = 2500;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(0);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

    return(
        <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {colors.map((backgroundColor, index) => (
            <div
              className="slide"
              key={index}
              style={{ backgroundColor }}
            ></div>
          ))}
        </div>
  
        <div className="slideshowDots">
          {colors.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
    )
}
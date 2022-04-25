import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./ScrollToTop.scss";

const ScrollToTop = () => {
  // Add state to component
  const [display, setDisplay] = useState(false);

  // Handle button display
  const handleDisplay = () => {
    // If vertical scroll position is greater than 600px
    if (window.scrollY > 600) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  // Handle scroll to top
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Invoke function when event occurs
    window.addEventListener("scroll", handleDisplay);

    // Cleanup function to avoid memory leak
    return () => {
      window.removeEventListener("scroll", handleDisplay);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {display && <FaArrowUp onClick={handleScroll} />}
    </div>
  );
};

export default ScrollToTop;

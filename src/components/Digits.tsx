import React, { useState, useEffect } from "react";

type DigitProp = {
  digit: string;
};

const Digits = ({ digit }: DigitProp) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setHovered(true);

    const timer = setTimeout(() => {
      setHovered(false);
    }, 1000); // Duration of your animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      className={`digit ${hovered ? "hovered" : ""}`}
      onMouseOver={() => setHovered(true)}
      onAnimationEnd={() => setHovered(false)}
    >
      {digit}
    </span>
  );
};

export default Digits;

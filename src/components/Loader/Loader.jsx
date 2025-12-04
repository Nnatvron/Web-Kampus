import React, { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ fadeOutProp = false, duration = 7000, text = "UBSI ONE+", logo = "/picture/bsi.png.png", onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (fadeOutProp) {
      setFadeOut(true);
      if (onFinish) setTimeout(onFinish, 500); // callback setelah fade out
      return;
    }

    const timer = setTimeout(() => {
      setFadeOut(true);
      if (onFinish) setTimeout(onFinish, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeOutProp, duration, onFinish]);

  return (
    <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
      <img src={logo} alt="UBSI Logo" className="loader-logo" />
      <div className="loader-text">{text}</div>
    </div>
  );
}

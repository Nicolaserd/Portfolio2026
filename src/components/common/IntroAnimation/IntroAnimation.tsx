import React, { useState, useEffect } from 'react';
import './IntroAnimation.css';

interface IntroAnimationProps {
  onComplete: () => void;
}

// Define frames and their durations in milliseconds (1.5x slower)
const framesData = [
  { src: '/samurai/corte/corte_1.png', duration: 750 }, 
  { src: '/samurai/corte/corte_2.png', duration: 300 }, 
  { src: '/samurai/corte/corte_3.png', duration: 150 }, 
  { src: '/samurai/corte/corte_4.png', duration: 150 }, 
  { src: '/samurai/corte/corte_5.png', duration: 450 }, 
  { src: '/samurai/corte/corte_6.png', duration: 225 }, 
  { src: '/samurai/corte/corte_7.png', duration: 150 }, 
  { src: '/samurai/corte/corte_8.png', duration: 900 }, 
];

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images to avoid flickering
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = framesData.length;

    framesData.forEach((frame) => {
      const img = new Image();
      img.src = frame.src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      // Error handling just in case, we still want to proceed
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Animation logic
  useEffect(() => {
    if (!imagesLoaded) return;

    if (currentFrameIndex < framesData.length) {
      const timer = setTimeout(() => {
        setCurrentFrameIndex((prevIndex) => prevIndex + 1);
      }, framesData[currentFrameIndex].duration);
      return () => clearTimeout(timer);
    } else if (currentFrameIndex === framesData.length) {
      // Sequence finished, start fade out
      setIsFadingOut(true);
      const fadeOutTimer = setTimeout(() => {
        onComplete();
      }, 1500); // 1500ms matches CSS animation duration
      return () => clearTimeout(fadeOutTimer);
    }
  }, [currentFrameIndex, imagesLoaded, onComplete]);

  return (
    <div className={`intro-container ${isFadingOut ? 'fade-out' : ''}`}>
      {currentFrameIndex < framesData.length && (
        <img
          src={framesData[currentFrameIndex].src}
          alt={`Samurai frame ${currentFrameIndex + 1}`}
          className="samurai-frame"
          style={{ visibility: imagesLoaded ? 'visible' : 'hidden' }} 
        />
      )}
    </div>
  );
};

export default IntroAnimation;

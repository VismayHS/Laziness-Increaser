import { motion } from "motion/react";
import "./OrbitImages.css";

export default function OrbitImages({
  images = [],
  altPrefix = "Orbiting image",
  duration = 24,
  itemSize = 42,
  width = 220,
  height = 220,
  centerContent = null,
  className = ""
}) {
  const radius = Math.min(width, height) * 0.34;

  return (
    <div className={`orbit-container ${className}`} style={{ width, height }} aria-hidden="true">
      <motion.div
        className="orbit-rotation-wrapper"
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {images.map((src, index) => {
          const angle = (360 / images.length) * index;
          return (
            <div
              key={`${src}-${index}`}
              className="orbit-item"
              style={{
                width: itemSize,
                height: itemSize,
                "--orbit-item-size": `${itemSize}px`,
                transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`
              }}
            >
              <img src={src} alt={`${altPrefix} ${index + 1}`} draggable={false} className="orbit-image" />
            </div>
          );
        })}
      </motion.div>

      {centerContent && <div className="orbit-center-content">{centerContent}</div>}
    </div>
  );
}
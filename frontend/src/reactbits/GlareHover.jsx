import "./GlareHover.css";

const GlareHover = ({
  width = "500px",
  height = "500px",
  background = "#000",
  borderRadius = "10px",
  borderColor = "#333",
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.5,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style = {}
}) => {
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;

  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const mergedStyle = {
    "--gh-width": width,
    "--gh-height": height,
    "--gh-bg": background,
    "--gh-br": borderRadius,
    "--gh-border": borderColor,
    "--gh-rgba": rgba,
    "--gh-angle": `${glareAngle}deg`,
    "--gh-size": `${glareSize}%`,
    "--gh-duration": `${transitionDuration}ms`,
    ...style
  };

  const classes = `glare-hover ${playOnce ? "glare-hover--play-once" : ""} ${className}`;

  return (
    <div className={classes} style={mergedStyle}>
      {children}
    </div>
  );
};

export default GlareHover;
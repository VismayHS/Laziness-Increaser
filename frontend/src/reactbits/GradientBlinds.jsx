import "./GradientBlinds.css";

const GradientBlinds = ({
  className = "",
  gradientColors = ["#5B35FF", "#19C7B5", "#FE8D39"],
  angle = 18,
  blindCount = 14,
  blindMinWidth = 60
}) => {
  const [c1, c2, c3] = gradientColors;

  return (
    <div
      className={`gradient-blinds-container ${className}`}
      style={{
        "--gb-c1": c1,
        "--gb-c2": c2,
        "--gb-c3": c3,
        "--gb-angle": `${angle}deg`,
        "--gb-count": blindCount,
        "--gb-min": `${blindMinWidth}px`
      }}
    >
      <div className="gradient-blinds-layer" />
      <div className="gradient-blinds-stripes" />
    </div>
  );
};

export default GradientBlinds;
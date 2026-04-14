import StarBorder from "@/reactbits/StarBorder";

export function AnimatedButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
  className = ""
}) {
  if (variant === "secondary") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`rb-btn-base rb-btn-outline ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <StarBorder
      as="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
      color="#60a5fa"
      speed="7s"
      thickness={1}
      className={`rb-btn-gradient w-full ${className}`}
    >
      <span className="rb-btn-gradient-label">{children}</span>
    </StarBorder>
  );
}

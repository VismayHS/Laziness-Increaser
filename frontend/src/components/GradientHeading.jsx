import GradientText from "@/reactbits/GradientText";

export function GradientHeading() {
  return (
    <div className="rb-heading">
      <GradientText
        colors={["#f8fafc", "#93c5fd", "#cbd5e1"]}
        animationSpeed={16}
        direction="horizontal"
        className="text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        PPT to PDF Converter and Merger
      </GradientText>
    </div>
  );
}

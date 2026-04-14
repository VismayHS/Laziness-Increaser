import GradientBlinds from "@/reactbits/GradientBlinds";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <GradientBlinds
        className="h-full w-full opacity-[0.14]"
        angle={12}
        blindCount={10}
        blindMinWidth={120}
        gradientColors={["#1e293b", "#0f172a", "#172554"]}
      />
      <div className="absolute inset-0 bg-slate-950/78" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.08),transparent_48%)]" />
    </div>
  );
}

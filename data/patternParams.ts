type PatternParams = {
  linearX: Required<Pick<Params, "speed" | "amp" | "phaseGap">>;
  waveY: Required<Pick<Params, "freq" | "amp" | "phaseGap">>;
  circle: Required<Pick<Params, "radius" | "speed" | "phaseGap">>;
  spiral: Required<Pick<Params, "radius" | "growth" | "speed" | "phaseGap">>;
  pendulum: Required<Pick<Params, "angle" | "freq" | "speed">>;
  breath: Required<Pick<Params, "amp" | "freq" | "speed" | "phaseGap">>;
};

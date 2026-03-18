"use client";

import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export function FireworksOverlay() {
  return (
    <Fireworks
      autorun={{ speed: 3, duration: 3000 }}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    />
  );
}

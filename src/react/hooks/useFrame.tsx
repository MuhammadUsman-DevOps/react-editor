import React from "react";
import { Context } from "../context";

export function useFrame() {
  const { frame } = React.useContext(Context);
  return frame;
}

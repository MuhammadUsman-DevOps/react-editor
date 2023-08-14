import React from "react";
import { Context } from "../context";

export function useZoomRatio<T>() {
  const { zoomRatio } = React.useContext(Context);

  return zoomRatio as unknown as T;
}

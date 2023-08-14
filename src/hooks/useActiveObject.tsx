import React from "react";
import { Context } from "../context";

export function useActiveObject<T>() {
  const { activeObject } = React.useContext(Context);

  return activeObject as unknown as T;
}

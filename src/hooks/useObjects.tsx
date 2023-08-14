import React from "react";
import { Context } from "../context";

export function useObjects<T>() {
  const { objects } = React.useContext(Context);

  return objects as unknown as T;
}

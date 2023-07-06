import React from "react";
import { Context } from "../context";

export function useEditor() {
  const { editor } = React.useContext(Context);
  return editor;
}

import React from "react";
import { Context } from "../context";

export function useContextMenuRequest() {
  const { contextMenuRequest } = React.useContext(Context);
  return contextMenuRequest;
}

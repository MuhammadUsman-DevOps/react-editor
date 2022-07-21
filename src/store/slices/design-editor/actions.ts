import { Page } from "~/interfaces/common";
import { createAction } from "@reduxjs/toolkit";

export const addPage = createAction<Page>("designEditor/addPage");
export const removePage = createAction<Partial<Page>>(
  "designEditor/removePage"
);

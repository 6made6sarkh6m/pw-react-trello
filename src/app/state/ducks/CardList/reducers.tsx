import { createSlice } from "@reduxjs/toolkit";

import { defaultLists } from "app/views/utils/mock";

export interface ListDataProps {
  id: string;
  listTitle: string;
}

export type CardListData = Record<string, ListDataProps>;

export const initialDeskState: CardListData = defaultLists;

export const CardListSlice = createSlice({
  name: "cardlist",
  initialState: initialDeskState,
  reducers: {},
});

export default CardListSlice.reducer;

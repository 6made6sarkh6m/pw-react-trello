import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultLists } from "utils/mock";
import { StorageProperties } from "enum/enum";
import { StorageService } from "helpers/storageService";

export interface ListDataProps {
  id: string;
  listTitle: string;
};
export interface onUpdateCardList {
  id: string;
  title: string;
}
export type CardListData = Record<string, ListDataProps>;

export const initialDeskState: CardListData = StorageService.getData(defaultLists, StorageProperties.lists);

export const CardListSlice = createSlice({
  name: "cardlist",
  initialState: initialDeskState,
  reducers: {
    updateCardList(state, action: PayloadAction<ListDataProps>) {
      const {
        payload: {id, listTitle}
      } = action;
      state[id] = {id,listTitle};
      StorageService.setData(state, StorageProperties.lists);
      return state;
    },
  },
});

export const {updateCardList} = CardListSlice.actions;

export default CardListSlice.reducer;

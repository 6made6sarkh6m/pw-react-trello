import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultLists } from "app/views/utils/mock";
import { StorageProperties } from "app/views/enum/enum";
import { StorageService } from "app/views/helpers/storageService";

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
      const cloneState = { ...state };
      cloneState[action.payload.id] = {id,listTitle};
      StorageService.setData(cloneState, StorageProperties.lists);
      return cloneState;
    },
  },
});

export const {updateCardList} = CardListSlice.actions;

export default CardListSlice.reducer;

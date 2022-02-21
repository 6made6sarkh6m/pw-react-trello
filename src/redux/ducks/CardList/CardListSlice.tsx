import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultLists } from "utils/mock";
import {
  AddCardListPayload,
  DeleteCardListPayload,
  ListDataProps,
} from "./types";
import { v4 as uuid } from "uuid";
export type CardListData = Record<string, ListDataProps>;

export const initialDeskState: CardListData = defaultLists;

export const CardListSlice = createSlice({
  name: "cardlists",
  initialState: initialDeskState,
  reducers: {
    updateCardList(state, action: PayloadAction<ListDataProps>) {
      const {
        payload: { id, listTitle },
      } = action;
      state[id] = { id, listTitle };
    },

    addCardList(state, action: PayloadAction<AddCardListPayload>) {
      const {
        payload: { listTitle },
      } = action;
      const newId = uuid();
      state[newId] = {
        id: newId,
        listTitle: listTitle,
      };
    },

    deleteCardList(state, action: PayloadAction<DeleteCardListPayload>) {
      const {
        payload: { id },
      } = action;

      delete state[id];
    },
  },
});

export const { updateCardList, addCardList, deleteCardList } =
  CardListSlice.actions;

export default CardListSlice.reducer;

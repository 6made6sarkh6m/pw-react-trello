import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultCards } from "app/views/utils/mock";
import { v4 as uuid } from "uuid";

export type CardsData = Record<string, CardDataProps>;

export const initialCardState: CardsData = defaultCards;

export const CardSlice = createSlice({
  name: "cards",
  initialState: initialCardState,
  reducers: {
    addCard(state, action: PayloadAction<CardDataProps>) {
      const newCardId = uuid();
      const cloneState = { ...state };
      cloneState[newCardId] = {
        id: newCardId,
        cardTitle: action.payload.cardTitle,
        listId: action.payload.listId,
        cardDescription: action.payload.cardDescription,
      };
    },
    deleteCard(state, action: PayloadAction<CardDataProps>) {
      const cloneState = { ...state };
      delete cloneState[action.payload.id];
    },
    updateCard(state, action: PayloadAction<CardDataProps>) {
      const cloneState = { ...state };
    },
  },
});
export interface CardDataProps {
  id: string;
  listId: string;
  cardTitle: string;
  cardDescription: string;
}
export default CardSlice.reducer;

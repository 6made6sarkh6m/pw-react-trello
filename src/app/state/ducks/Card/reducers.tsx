import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultCards } from "app/views/utils/mock";
import { v4 as uuid } from "uuid";
import { StorageProperties } from "app/views/enum/enum";
import { StorageService } from "app/views/helpers/storageService";

export interface CardDataProps {
  id: string;
  listId: string;
  cardTitle: string;
  cardDescription: string;
}

export interface AddCardPayload {
  cardTitle: string;
  listId: string;
}

export interface DeleteCardPayload {
  id: string;
}

export interface UpdateCardPayload {
  cardId: string;
  CardProperties: keyof CardDataProps;
  value: string;
}

export type CardsData = Record<string, CardDataProps>;

export const initialCardState: CardsData = StorageService.getData(
  defaultCards,
  StorageProperties.cards
);

export const CardSlice = createSlice({
  name: "cards",
  initialState: initialCardState,
  reducers: {
    addCard(state, action: PayloadAction<AddCardPayload>) {
      const {
        payload: { cardTitle, listId },
      } = action;
      const newCardId = uuid();
      const cloneState = { ...state };
      cloneState[newCardId] = {
        id: newCardId,
        cardTitle: cardTitle,
        listId: listId,
        cardDescription: "",
      };
      StorageService.setData(cloneState, StorageProperties.cards);
      return cloneState;
    },

    deleteCard(state, action: PayloadAction<DeleteCardPayload>) {
      const {
        payload: { id },
      } = action;
      const cloneState = { ...state };
      delete cloneState[id];
      StorageService.setData(cloneState, StorageProperties.cards);
      return cloneState;
    },

    updateCard(state, action: PayloadAction<UpdateCardPayload>) {
      const {
        payload: {cardId, CardProperties, value}
      } = action;
      const cloneState = { ...state };
      cloneState[cardId][CardProperties] = value;
      StorageService.setData(cloneState, StorageProperties.cards);
      return cloneState; 
    },
  },
});
export const { addCard, updateCard, deleteCard } = CardSlice.actions;
export default CardSlice.reducer;

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
};

export type CardsData = Record<string, CardDataProps>;

export const initialCardState: CardsData = StorageService.getData(defaultCards, StorageProperties.cards);

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
      StorageService.setData(cloneState, StorageProperties.cards);

    },

    deleteCard(state, action: PayloadAction<CardDataProps>) {
      const cloneState = { ...state };
      delete cloneState[action.payload.id];
      StorageService.setData(cloneState, StorageProperties.cards);
    },

    updateCard(state, action: PayloadAction<CardDataProps>) {
      const cloneState = { ...state };
    },
  },
});

export default CardSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultCards } from "utils/mock";
import { v4 as uuid } from "uuid";
import { StorageProperties } from "enum/enum";
import { StorageService } from "helpers/storageService";
import { AddCardPayload, CardDataProps, DeleteCardPayload, updateCardDescriptionPayload, UpdateCardPayload } from "./types";



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
      state[newCardId] = {
        id: newCardId,
        cardTitle: cardTitle,
        listId: listId,
        cardDescription: "",
      };
      StorageService.setData(state, StorageProperties.cards);
      return state;
    },

    deleteCard(state, action: PayloadAction<DeleteCardPayload>) {
      const {
        payload: { id },
      } = action;
      delete state[id];
      StorageService.setData(state, StorageProperties.cards);
      return state;
    },

    updateCard(state, action: PayloadAction<UpdateCardPayload>) {
      const {
        payload: {id, title}
      } = action;
      state[id].cardTitle = title;
      StorageService.setData(state, StorageProperties.cards);
      return state; 
    },

    updateCardDescription(state, action:PayloadAction<updateCardDescriptionPayload>){
      const {
        payload: {id, descriptionCard}
      } = action;
      state[id].cardDescription = descriptionCard;
      StorageService.setData(state, StorageProperties.cards);
      return state;
    }
  },
});
export const { addCard, updateCard, deleteCard, updateCardDescription } = CardSlice.actions;
export default CardSlice.reducer;

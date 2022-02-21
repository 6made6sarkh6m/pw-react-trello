import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultCards } from "utils/mock";
import { v4 as uuid } from "uuid";
import {
  AddCardPayload,
  CardDataProps,
  DeleteCardPayload,
  updateCardDescriptionPayload,
  UpdateCardPayload,
} from "./types";

export type CardsData = Record<string, CardDataProps>;

export const initialCardState: CardsData = defaultCards;

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
    },

    deleteCard(state, action: PayloadAction<DeleteCardPayload>) {
      const {
        payload: { id },
      } = action;
      delete state[id];
    },

    updateCard(state, action: PayloadAction<UpdateCardPayload>) {
      const {
        payload: { cardId, title },
      } = action;
      state[cardId].cardTitle = title;
    },

    updateCardDescription(
      state,
      action: PayloadAction<updateCardDescriptionPayload>
    ) {
      const {
        payload: { id, descriptionCard },
      } = action;
      state[id].cardDescription = descriptionCard;
    },
  },
});
export const { addCard, updateCard, deleteCard, updateCardDescription } =
  CardSlice.actions;
export default CardSlice.reducer;

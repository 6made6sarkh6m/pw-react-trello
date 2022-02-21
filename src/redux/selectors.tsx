import { RootState } from "./store";
export const selectCardLists = (state: RootState) => state.cardLists;
export const selectCards = (state: RootState) => state.cards;
export const selectComments = (state: RootState) => state.comments;
export const selectUser = (state: RootState) => state.user;

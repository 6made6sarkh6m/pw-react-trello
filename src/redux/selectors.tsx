import { RootState } from "./store";
export const selectCardLists = (state: RootState) => state.cardList;
export const selectCards = (state: RootState) => state.card;
export const selectComments = (state: RootState) => state.comments;
export const selectUser = (state: RootState) => state.user;

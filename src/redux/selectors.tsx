import { RootState } from "./store";
export const selectCardList = (state: RootState) => state.cardList;
export const selectCard = (state: RootState) => state.card;
export const selectComment = (state: RootState) => state.comments;
export const selectUser = (state: RootState) => state.user;

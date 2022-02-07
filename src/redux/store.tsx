import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { CardListReducer } from "./ducks/CardList";
import { CardReducer } from "./ducks/Card";
import { CommentReducer } from "./ducks/Comments";
import { UserReducer } from "./ducks/User";
const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: {
    cardList: CardListReducer,
    card: CardReducer,
    comments: CommentReducer,
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectCardList = (state: RootState) => state.cardList;
export const selectCard = (state: RootState) => state.card;
export const selectComment = (state: RootState) => state.comments;
export const selectUser = (state: RootState) => state.user;
export type AppDispatch = typeof store.dispatch;

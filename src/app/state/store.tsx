import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { CardListReducer } from "./ducks/CardList";
import { CardReducer } from "./ducks/Card";
const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: {
    cardList: CardListReducer,
    card: CardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectCardList = (state: RootState) => state.cardList;
export const selectCard = (state: RootState) => state.card;
export type AppDispatch = typeof store.dispatch;

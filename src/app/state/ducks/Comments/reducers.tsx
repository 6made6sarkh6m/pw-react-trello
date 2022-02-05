import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultComments } from "app/views/utils/mock";
import { v4 as uuid } from "uuid";
import { StorageProperties } from "app/views/enum/enum";
import { StorageService } from "app/views/helpers/storageService";
import { CardListReducer } from "../CardList";

export interface CommentDataProps {
  id: string;
  cardId: string;
  author: string;
  comment: string;
}

export type CommentsData = Record<string, CommentDataProps>;

export const initialCommentState = StorageService.getData(
  defaultComments,
  StorageProperties.comments
);

export const CommentSlice = createSlice({
  name: "comments",
  initialState: initialCommentState,
  reducers: {
    addComment(state, action: PayloadAction<CommentDataProps>) {
      const newCommentId = uuid();
      const cloneState = { ...state };
      cloneState[newCommentId] = {
        id: newCommentId,
        cardId: action.payload.cardId,
        comment: action.payload.comment,
        author: action.payload.author,
      };
      StorageService.setData(cloneState, StorageProperties.comments);
    },
    deleteComment(state, action: PayloadAction<CommentDataProps>) {
      const cloneState = { ...state };
      delete cloneState[action.payload.id];
      StorageService.setData(cloneState, StorageProperties.comments);
    },
    updateComment(state, action: PayloadAction<CommentDataProps>) {},
  },
});

export default CommentSlice.reducer;
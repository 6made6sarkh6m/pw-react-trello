import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultComments } from "utils/mock";
import { v4 as uuid } from "uuid";
import { StorageProperties } from "enum/enum";
import { StorageService } from "helpers/storageService";

export interface CommentDataProps {
  id: string;
  cardId: string;
  author: string;
  comment: string;
}
export interface AddCommentPayload {
  cardId: string;
  comment: string;
  author: string;
}

export interface DeleteCommentPayload {
  id: string;
}

export type CommentsData = Record<string, CommentDataProps>;

export const initialCommentState: CommentsData = StorageService.getData(
  defaultComments,
  StorageProperties.comments
);

export const CommentSlice = createSlice({
  name: "comments",
  initialState: initialCommentState,
  reducers: {
    addComment(state, action: PayloadAction<AddCommentPayload>) {
      const {
        payload: {cardId, comment, author}
      } = action;
      const newCommentId = uuid();
      const cloneState = { ...state };
      cloneState[newCommentId] = {
        id: newCommentId,
        cardId: cardId,
        comment: comment,
        author: author,
      };
      StorageService.setData(cloneState, StorageProperties.comments);
      return cloneState;
    },
    deleteComment(state, action: PayloadAction<DeleteCommentPayload>) {
      const {
        payload: {id}
      } = action;
      const cloneState = { ...state };
      delete cloneState[id];
      StorageService.setData(cloneState, StorageProperties.comments);
      return cloneState;
    },
    updateComment(state, action: PayloadAction<CommentDataProps>) {},
  },
});
export const {addComment, deleteComment, updateComment} = CommentSlice.actions;

export default CommentSlice.reducer;
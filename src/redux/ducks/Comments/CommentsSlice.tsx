import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultComments } from "utils/mock";
import { v4 as uuid } from "uuid";
import {
  CommentDataProps,
  AddCommentPayload,
  DeleteCommentPayload,
  UpdateCommentPayload,
} from "./types";

export type CommentsData = Record<string, CommentDataProps>;

export const initialCommentState: CommentsData = defaultComments;

export const CommentSlice = createSlice({
  name: "comments",
  initialState: initialCommentState,
  reducers: {
    addComment(state, action: PayloadAction<AddCommentPayload>) {
      const {
        payload: { cardId, comment, author },
      } = action;
      const newCommentId = uuid();
      state[newCommentId] = {
        id: newCommentId,
        cardId: cardId,
        comment: comment,
        author: author,
      };
    },

    deleteComment(state, action: PayloadAction<DeleteCommentPayload>) {
      const {
        payload: { id },
      } = action;
      delete state[id];
    },

    updateComment(state, action: PayloadAction<UpdateCommentPayload>) {
      const {
        payload: { id, comment },
      } = action;
      state[id].comment = comment;
    },
  },
});
export const { addComment, deleteComment, updateComment } =
  CommentSlice.actions;

export default CommentSlice.reducer;

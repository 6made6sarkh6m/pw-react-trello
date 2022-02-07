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
  
  export interface UpdateCommentPayload {
    id: string;
    comment: string;
  }
  
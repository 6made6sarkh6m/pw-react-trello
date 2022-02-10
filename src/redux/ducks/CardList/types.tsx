export interface ListDataProps {
  id: string;
  listTitle: string;
}

export interface AddCardListPayload {
  listTitle: string;
}

export interface DeleteCardListPayload {
  id: string;
}

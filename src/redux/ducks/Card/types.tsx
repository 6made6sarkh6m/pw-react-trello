export interface CardDataProps {
    id: string;
    listId: string;
    cardTitle: string;
    cardDescription: string;
  }
  
  export interface AddCardPayload {
    cardTitle: string;
    listId: string;
  }
  
  export interface DeleteCardPayload {
    id: string;
  }
  
  export interface UpdateCardPayload {
    id: string;
    title: string;
  }
  
  export interface updateCardDescriptionPayload {
    id: string;
    descriptionCard: string;
  }
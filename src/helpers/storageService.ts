import { lists, cards, comments } from "../utils/mock";
export class StorageService {
  static hasToDolists() {
    return !!localStorage.getItem("lists");
  }
  static hasCards() {
    return !!localStorage.getItem("cards");
  }
  static hasComments() {
    return !!localStorage.getItem("comments");
  }
  static getToDoLists() {
    if (!this.hasToDolists()) {
      localStorage.setItem("lists", JSON.stringify(lists));
    }
    return JSON.parse(localStorage.getItem("lists") || "");
  }

  static getCards() {
    if(!this.hasCards()) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
    return JSON.parse(localStorage.getItem("cards") || "");
  }
  static getComments() {
    if(!this.hasComments()) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
    return JSON.parse(localStorage.getItem("comments") || "");
  }

  static setList(data: any) {
    localStorage.setItem("lists", JSON.stringify(data));
  }

  static setCards(data: any) {
    localStorage.setItem("cards", JSON.stringify(data));
  }
}

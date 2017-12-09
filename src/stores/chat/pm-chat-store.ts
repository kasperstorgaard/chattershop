import {observable} from "mobx";

export class PmChatStore {
  @observable messages: string[] = [];
}
import {observable, action, autorun} from "mobx";
import {PmChatStore} from "./chat/pm-chat-store";

interface IPmAppState {
  userId: string;
  messages: IMessage[];
}

interface IMessage {
  userId: string;
  text: string;
}

export class PmAppStore implements IPmAppState {
  //todo: generate from api, should not be able to be tampered with.
  userId: string = Math.random().toString().replace("0.", "I");
  @observable messages: IMessage[] = [];

  @action sendMessage = (payload: string): void => {
    this.messages.push({
      userId: this.userId,
      text: payload
    });
  }

  connect(cb: (state: IPmAppState) => void) {
    autorun(() => cb({
      messages: this.messages.slice(),
      userId: this.userId
    }));
  }
}
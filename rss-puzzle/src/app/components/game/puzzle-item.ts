import CreateElement from '../create-element';
import type Game from './game';

export default class GameItem extends CreateElement {
  private elem: Game;

  private message: string;

  constructor(elem: Game, message: string) {
    super({
      tag: 'div',
      className: 'game__item',
      textContent: message,
      onclick: () => {
        this.onClickItem();
      },
    });
    this.elem = elem;
    this.message = message;
  }

  private onClickItem(): void {
    this.removeNode();
    this.elem.changeToMainField(this.message);
  }
}

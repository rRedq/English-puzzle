import CreateElement from '../create-element';
import type ActiveGame from './active-game';

export default class PuzzleItem extends CreateElement {
  private static nodes: PuzzleItem[] = [];

  private elem: ActiveGame;

  private message: string;

  constructor(elem: ActiveGame, message: string) {
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
    PuzzleItem.nodes.push(this);
  }

  private onClickItem(): void {
    this.removeNode();
    this.elem.changeToMainField(this.message);
  }

  public static removeAllItems() {
    PuzzleItem.nodes.length = 0;
  }
}

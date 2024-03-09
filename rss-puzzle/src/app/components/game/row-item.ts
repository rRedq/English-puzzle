import CreateElement from '../create-element';
import type ActiveGame from './active-game';

export default class RowItem extends CreateElement {
  private static nodes: RowItem[] = [];

  private static index = 0;

  private id: number;

  private message: string;

  constructor(elem: ActiveGame, message: string) {
    super({
      tag: 'div',
      className: 'game__item-row',
      textContent: message,
      onclick: () => {
        elem.changeToPuzzleField(message);
        this.removeItem();
      },
    });
    this.message = message;
    this.id = RowItem.index;
    RowItem.index += 1;
    RowItem.nodes.push(this);
  }

  private removeItem() {
    const index = RowItem.nodes.findIndex((instance) => instance.id === this.id);
    RowItem.nodes.splice(index, 1);
    this.removeNode();
  }

  public static removeAllItems() {
    RowItem.nodes.length = 0;
    RowItem.index = 0;
  }

  public static returnWord(): string {
    const result: string[] = [];
    RowItem.nodes.forEach((item) => {
      result.push(item.message);
    });
    return result.join(' ');
  }
}

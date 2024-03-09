import CreateElement from '../create-element';
import type ActiveGame from './active-game';

export default class RowItem extends CreateElement {
  private static nodes: RowItem[] = [];

  private static index = 0;

  private static isCheck = false;

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

  private static returnNormalBorder() {
    RowItem.nodes.forEach((node) => {
      node.removeClass('wrong').removeClass('success');
    });
  }

  public static checkMessage(message: string) {
    const messageArray = message.split(' ');
    RowItem.isCheck = true;
    for (let i = 0; i < RowItem.nodes.length; i += 1) {
      if (RowItem.nodes[i].message !== messageArray[i]) RowItem.nodes[i].addClass('wrong');
      else RowItem.nodes[i].addClass('success');
    }
  }

  public static returnWord(): string {
    const result: string[] = [];
    RowItem.nodes.forEach((item) => {
      result.push(item.message);
    });
    return result.join(' ');
  }

  private removeItem() {
    const index = RowItem.nodes.findIndex((instance) => instance.id === this.id);
    RowItem.nodes.splice(index, 1);
    if (RowItem.isCheck) {
      RowItem.isCheck = true;
      RowItem.returnNormalBorder();
    }
    this.removeNode();
  }

  public static removeAllItems() {
    RowItem.nodes.length = 0;
    RowItem.index = 0;
  }
}

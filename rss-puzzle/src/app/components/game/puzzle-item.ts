import CreateElement from '../create-element';
import type ActiveGame from './active-game';

export default class PuzzleItem extends CreateElement {
  private static nodes: PuzzleItem[] = [];

  constructor(elem: ActiveGame, message: string) {
    super({
      tag: 'div',
      className: 'game__item',
      textContent: message,
    });
    PuzzleItem.nodes.push(this);
    this.setDragable();
    this.addEventListener('dragstart', () => {
      this.addClass('dragging');
    });
    this.addEventListener('dragend', () => {
      this.removeClass('dragging');
      elem.rowItemLengthCheck();
      PuzzleItem.clearClasses();
    });
  }

  private static clearClasses(): void {
    for (let i = 0; i < PuzzleItem.nodes.length; i += 1) {
      PuzzleItem.nodes[i].removeClass('success').removeClass('wrong');
    }
  }

  public static removeAllItems() {
    PuzzleItem.nodes.length = 0;
  }
}

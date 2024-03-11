import CreateElement from '../create-element';
import type ActiveGame from './active-game';

export default class PuzzleItem extends CreateElement {
  private static nodes: PuzzleItem[] = [];

  private childRoot: ActiveGame;

  private parentRoot: CreateElement;

  private currentPlace: CreateElement | ActiveGame;

  private static dragging: PuzzleItem | undefined;

  constructor(elem: ActiveGame, parent: CreateElement, message: string) {
    super({
      tag: 'div',
      className: 'game__item',
      textContent: message,
    });
    this.childRoot = elem;
    this.parentRoot = parent;
    this.currentPlace = parent;
    PuzzleItem.nodes.push(this);
    this.setDragable();
    this.addEventListener('dragstart', () => {
      PuzzleItem.dragging = this;
      this.addClass('dragging');
    });
    this.addEventListener('dragend', () => {
      PuzzleItem.dragging = undefined;
      this.removeClass('dragging');
      elem.rowItemLengthCheck();
      PuzzleItem.clearClasses();
    });
    this.addEventListener('click', this.clickItem);
  }

  public static returnDragging() {
    return PuzzleItem.dragging;
  }

  public switchRootForDragging() {
    this.currentPlace = this.childRoot;
  }

  private clickItem = () => {
    console.log(this.currentPlace === this.parentRoot);
    if (this.currentPlace === this.parentRoot) {
      this.currentPlace = this.childRoot;
      this.currentPlace.elementAppend(this);
    } else {
      this.currentPlace = this.parentRoot;
      const covers = this.currentPlace.getChildren();
      for (let i = 0; i < covers.length; i += 1) {
        if (!covers[i].hasChildNodes()) {
          covers[i].append(this.getNode());
          break;
        }
      }
    }
    this.childRoot.rowItemLengthCheck();
  };

  private static clearClasses(): void {
    for (let i = 0; i < PuzzleItem.nodes.length; i += 1) {
      PuzzleItem.nodes[i].removeClass('success').removeClass('wrong');
    }
  }

  public static removeAllItems() {
    PuzzleItem.nodes.length = 0;
  }
}

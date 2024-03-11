import CreateElement from '../create-element';
import type ActiveGame from './active-game';

export default class PuzzleItem extends CreateElement {
  private static nodes: PuzzleItem[] = [];

  private childRoot: ActiveGame;

  private parentRoot: CreateElement;

  private currentPlace: CreateElement | ActiveGame;

  private static dragable: PuzzleItem | undefined;

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
      PuzzleItem.dragable = this;
      this.addClass('dragging');
    });
    this.addEventListener('dragend', () => {
      PuzzleItem.dragable = undefined;
      this.removeClass('dragging');
      elem.rowItemLengthCheck();
      PuzzleItem.clearClasses();
    });
    // elem.addEventListener('drop', (event) => {
    //   event.preventDefault();
    //   // console.log(event.target);
    //   // console.log(this.getNode());
    //   if (event.currentTarget === elem.getNode()) {
    //     // this.currentPlace = this.childRoot;
    //     console.log(this.getNode());
    //     console.log('Элемент был успешно перетащен в дочерний блок');
    //   } else {
    //     console.log('Элемент был брошен по дороге');
    //   }
    // });
    this.addEventListener('click', this.clickElem);
  }

  public static returnDragging() {
    return PuzzleItem.dragable;
  }

  public switchRootForDragging() {
    this.currentPlace = this.childRoot;
  }

  private clickElem = () => {
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
      // this.currentPlace.elementAppend(this);
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

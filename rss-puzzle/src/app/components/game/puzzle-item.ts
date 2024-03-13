import CreateElement from '../create-element';
import type ActiveGame from './active-game';

export default class PuzzleItem extends CreateElement {
  private static nodes: PuzzleItem[] = [];

  private childRoot: ActiveGame;

  private parentRoot: CreateElement;

  private currentPlace: CreateElement | ActiveGame;

  private static dragging: PuzzleItem | undefined;

  private svg: SVGSVGElement;

  constructor(elem: ActiveGame, parent: CreateElement, svg: SVGSVGElement, width: number) {
    super({
      tag: 'div',
      className: 'game__item',
    });
    this.svg = svg;
    this.childRoot = elem;
    this.parentRoot = parent;
    this.currentPlace = parent;
    this.setProperty('width', `${width}px`);
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
    this.setSvg();
  }

  private setSvg(): void {
    this.svg.style.position = 'relative';
    this.svg.style.zIndex = `${50 - PuzzleItem.nodes.length}`;
    this.getNode().append(this.svg);
  }

  public static returnDragging(): PuzzleItem | undefined {
    return PuzzleItem.dragging;
  }

  public switchRootForDragging(): void {
    this.currentPlace = this.childRoot;
  }

  private clickItem = (): void => {
    PuzzleItem.clearClasses();
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
      PuzzleItem.nodes[i].svg.style.fill = 'black';
    }
  }

  public static removeAllItems(): void {
    PuzzleItem.nodes.length = 0;
  }
}

import CreateElement from '../create-element';
import PuzzleItem from '../puzzle-item/puzzle-item';
import type Game from './game';
import { getNewPosition, isNull } from '../../utils/functions';
import { div } from '../../utils/tag-functions';
import { CanvasCover } from '../../types/types';

export default class ActiveGame extends CreateElement {
  private currentString: string;

  private puzzle: CreateElement;

  private root: Game;

  private canvases: CanvasCover[];

  constructor(main: CreateElement, str: string, puzzleField: CreateElement, root: Game, canvases: CanvasCover[]) {
    super({ tag: 'div', className: 'game__puzzle-field' });
    main.elementAppend(this);
    this.root = root;
    this.currentString = str;
    this.puzzle = puzzleField;
    this.canvases = canvases;
    this.createFields();
  }

  private createFields(): void {
    this.puzzle.getNode().replaceChildren();
    const canvases = [...this.canvases];
    const sortedArray = canvases.sort(() => Math.random() - 0.5);

    sortedArray.forEach((item: CanvasCover) => {
      this.puzzle.elementAppend(new PuzzleItem(this, this.puzzle, item.canvas, item.width, item.position, item.word));
    });

    this.addEventListener('dragover', (e: Event) => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      const applyAfter = getNewPosition(this.getNode(), (e as MouseEvent).clientX);

      const cover = div({ className: 'game__cover' });
      const isParent = dragging?.parentNode === this.puzzle.getNode();

      if (applyAfter) {
        if (isParent) isNull(dragging).insertAdjacentElement('beforebegin', cover.getNode());
        applyAfter.insertAdjacentElement('afterend', isNull(dragging));
      } else {
        if (isParent) isNull(dragging).insertAdjacentElement('beforebegin', cover.getNode());
        this.getNode().prepend(isNull(dragging));
      }
    });
  }

  public rowItemLengthCheck(): void {
    const rowCheck = this.getChildren().length === this.currentString.split(' ').length;
    this.root.setVisibleCheckBtn(rowCheck);
  }

  public returnPrase(): HTMLCollection {
    return this.getChildren();
  }

  public removeRow(): void {
    this.puzzle.removeChildren();
    PuzzleItem.removeAllItems();
    this.removeNode();
  }
}

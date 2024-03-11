import CreateElement from '../create-element';
import PuzzleItem from './puzzle-item';
import type Game from './game';
import { getNewPosition, isNull } from '../../utils/functions';
import { div } from '../../utils/tag-functions';
// import { setDragging } from '../../utils/functions';

export default class ActiveGame extends CreateElement {
  private currentString: string;

  private puzzle: CreateElement;

  private root: Game;

  constructor(main: CreateElement, str: string, puzzleField: CreateElement, root: Game) {
    super({ tag: 'div', className: 'game__puzzle-field' });
    main.elementAppend(this);
    this.root = root;
    this.currentString = str;
    this.puzzle = puzzleField;
    this.createFields();
  }

  private createFields() {
    const wordArray: string[] = this.currentString
      .toLowerCase()
      .split(' ')
      .sort(() => Math.random() - 0.5);

    wordArray.forEach((word: string) => {
      const elem = div({ className: 'game__cover' }, new PuzzleItem(this, this.puzzle, word));
      this.puzzle.elementAppend(elem);
    });

    this.addEventListener('dragover', (e) => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      const applyAfter = getNewPosition(this.getNode(), (e as MouseEvent).clientX);

      if (applyAfter) applyAfter.insertAdjacentElement('afterend', isNull(dragging));
      else this.getNode().prepend(isNull(dragging));
    });
    this.addEventListener('drop', (event) => {
      event.preventDefault();
      if (event.currentTarget === this.getNode()) PuzzleItem.returnDragging()?.switchRootForDragging();
    });
  }

  public rowItemLengthCheck() {
    const rowCheck = this.getChildren().length === this.currentString.split(' ').length;
    this.root.setVisibleCheckBtn(rowCheck);
  }

  public returnPrase(): HTMLCollection {
    return this.getChildren();
  }

  public removeRow() {
    this.puzzle.removeChildren();
    PuzzleItem.removeAllItems();
    this.removeNode();
  }
}

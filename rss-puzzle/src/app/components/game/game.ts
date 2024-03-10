import type App from '../../app';
import CreateElement from '../create-element';
import { main, div, button } from '../../utils/tag-functions';
import data from '../../data/wordCollectionLevel1.json';
import { type DataJson, type CurrentWord } from '../../types/interfaces';
import './game.scss';
import ActiveGame from './active-game';
import { isNull } from '../../utils/functions';
import RowItem from './row-item';

export default class Game extends CreateElement {
  private app: App;

  private container = main({ className: 'game' });

  private puzzle = div({
    className: 'game__puzzle-field',
  });

  private mainFild = div({ className: 'game__main-field' });

  private countinueBtn = button({
    className: 'game__btn',
    textContent: 'Countinue',
    onclick: () => {
      this.countinue();
    },
  });

  private checkBtn = button({
    className: 'game__btn',
    textContent: 'Check',
    onclick: () => {
      this.checkRowPhrase();
    },
  });

  private data: DataJson;

  private currentSentence: string = '';

  private activeRow: ActiveGame | undefined;

  private currentRound: CurrentWord = { round: 0, word: 2 };

  constructor(app: App) {
    super({ tag: 'div', className: 'game__fields' });
    this.app = app;
    this.data = data;
    this.currentSentence =
      this.data.rounds[this.currentRound.round].words[this.currentRound.word].textExample.toLowerCase();
  }

  public createGame(): void {
    this.container.elementAppend(this);
    this.app.elementAppend(this.container);
    const cover = div({ className: 'game__buttons' }, this.countinueBtn, this.checkBtn);
    this.appendChildren([this.mainFild, this.puzzle, cover]);
    this.activeRow = new ActiveGame(this.mainFild, this.currentSentence, this.puzzle, this);
  }

  private countinue(): void {
    this.activeRow = new ActiveGame(this.mainFild, this.currentSentence, this.puzzle, this);
    this.countinueBtn.setProperty('display', 'none');
  }

  private checkRound(): void {
    if (this.currentRound.word > 8) {
      this.currentRound.round += 1;
      this.currentRound.word = 0;
    } else {
      this.currentRound.word += 1;
    }
    this.currentSentence =
      this.data.rounds[this.currentRound.round].words[this.currentRound.word].textExample.toLowerCase();
  }

  private checkRowPhrase(): void {
    RowItem.checkMessage(this.currentSentence);
    const currentRow = isNull(this.activeRow);
    if (currentRow.checkPhrase()) {
      currentRow.removeRow();
      const recordRow = div({ className: 'game__main-field-row' });
      this.currentSentence.split(' ').forEach((word) => {
        recordRow.elementAppend(div({ className: 'game__item-store', textContent: word }));
      });
      this.mainFild.elementAppend(recordRow);
      this.checkRound();
      this.setVisibleCheckBtn(false);
      this.countinueBtn.setProperty('display', 'block');
    }
  }

  public setVisibleCheckBtn(isVisible: boolean) {
    if (isVisible) this.checkBtn.setProperty('display', 'block');
    else this.checkBtn.setProperty('display', 'none');
  }

  public clearGame(): void {
    this.container.removeNode();
    this.removeNode();
  }
}

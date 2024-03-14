import CreateElement from '../create-element';
import { div, button } from '../../utils/tag-functions';
import type { DataJson, CurrentWord, Word } from '../../types/interfaces';
import './game.scss';
import ActiveGame from './active-game';
import { getData, isNull } from '../../utils/functions';
import createSvg from '../../utils/set-svg';
import Hints from '../hints/hints';
import Levels from '../level-difficulties/level-difficulties';
import type { LevelsData } from '../../types/types';
import type App from '../../app';
import PuzzleItem from './puzzle-item';

export default class Game extends CreateElement {
  private app: App;

  private puzzle = div({
    className: 'game__puzzle-field',
  });

  private mainFild = div({ className: 'game__main-field' });

  private compliteBtn = button({
    className: 'game__btn',
    textContent: "I don't know",
    onclick: () => this.compliteSentence(),
  });

  private countinueBtn = button({
    className: 'game__btn',
    textContent: 'Countinue',
    onclick: () => this.countinue(),
  });

  private checkBtn = button({
    className: 'game__btn',
    textContent: 'Check',
    onclick: () => this.checkRowPhrase(),
  });

  private data: DataJson | undefined;

  private currentSentence: string = '';

  private activeRow: ActiveGame | undefined;

  private hints = new Hints();

  private currentRound: CurrentWord;

  private gameField: CreateElement = div({ className: 'game__fields' });

  constructor(app: App, round: CurrentWord = { level: 1, round: 0, word: 0 }) {
    super({ tag: 'main', className: 'game' });
    this.currentRound = round;
    this.compliteBtn.setProperty('display', 'block');
    this.loadData(this.currentRound.level);
    this.app = app;
  }

  private async loadData(level: LevelsData): Promise<void> {
    this.data = await getData(level);
    this.createGame();
  }

  private myData(): Word {
    return isNull(this.data).rounds[this.currentRound.round].words[this.currentRound.word];
  }

  public createGame(): void {
    // Current-sentence
    this.currentSentence = this.myData().textExample.toLowerCase();
    // Levels
    this.appendChildren([
      new Levels(this.app, this.currentRound.level, this.currentRound.round, isNull(this.data?.rounds.length)),
      this.hints,
      this.gameField,
    ]);
    // Hints
    const sentence = this.myData().textExampleTranslate;
    const path = this.myData().audioExample;
    this.hints.createHints(sentence, path);
    // Buttons
    const cover = div({ className: 'game__buttons' }, this.compliteBtn, this.countinueBtn, this.checkBtn);
    this.gameField.appendChildren([this.mainFild, this.puzzle, cover]);
    // Active game
    this.activeRow = new ActiveGame(this.mainFild, this.currentSentence, this.puzzle, this);
  }

  private countinue = (): void => {
    this.activeRow = new ActiveGame(this.mainFild, this.currentSentence, this.puzzle, this);
    this.hints.afterRound('countinue');
    const sentence = this.myData().textExampleTranslate;
    const path = this.myData().audioExample;
    this.hints.createHints(sentence, path);
    this.countinueBtn.setProperty('display', 'none');
    this.compliteBtn.setProperty('display', 'block');
  };

  private checkRound(): void {
    if (this.currentRound.word > 8) {
      this.currentRound.round += 1;
      this.currentRound.word = 0;
    } else {
      this.currentRound.word += 1;
    }
    this.currentSentence = this.myData().textExample.toLowerCase();
  }

  private checkRowPhrase = (): void => {
    const words = isNull(this.activeRow?.returnPrase());
    const str: string[] = [];
    const currentStr = this.currentSentence.split(' ');
    for (let i = 0; i < words.length; i += 1) {
      const word = words[i].textContent;
      if (word) {
        str.push(word);
        if (currentStr[i] === word) (words[i].firstChild as SVGElement).style.fill = 'green';
        else (words[i].firstChild as SVGElement).style.fill = 'red';
      }
    }
    if (str.join(' ') === this.currentSentence) this.resetRow();
  };

  private resetRow(): void {
    isNull(this.activeRow).removeRow();
    this.hints.afterRound('check');
    const recordRow = div({ className: 'game__puzzle-field' });
    const svgs = createSvg(this.currentSentence);
    svgs.forEach((item) => {
      const cover = div({ className: 'game__item' });
      cover.setProperty('width', `${item.width}px`);
      cover.getNode().append(item.svg);
      recordRow.elementAppend(cover);
    });
    this.mainFild.elementAppend(recordRow);
    this.checkRound();
    this.setVisibleCheckBtn(false);
    this.compliteBtn.setProperty('display', 'none');
    this.countinueBtn.setProperty('display', 'block');
  }

  public setVisibleCheckBtn(isVisible: boolean): void {
    if (isVisible) this.checkBtn.setProperty('display', 'block');
    else this.checkBtn.setProperty('display', 'none');
  }

  private compliteSentence = (): void => {
    this.resetRow();
  };

  public clearGame(): void {
    PuzzleItem.removeAllItems();
    this.removeNode();
  }
}

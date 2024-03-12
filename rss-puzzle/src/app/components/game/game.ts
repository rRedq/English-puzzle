import type App from '../../app';
import CreateElement from '../create-element';
import { main, div, button } from '../../utils/tag-functions';
import data from '../../data/wordCollectionLevel1.json';
import { type DataJson, type CurrentWord } from '../../types/interfaces';
import './game.scss';
import ActiveGame from './active-game';
import { isNull } from '../../utils/functions';
import createSvg from '../../utils/set-svg';

export default class Game extends CreateElement {
  private app: App;

  private container = main({ className: 'game' });

  private puzzle = div({
    className: 'game__puzzle-field',
  });

  private mainFild = div({ className: 'game__main-field' });

  private compliteBtn = button({
    className: 'game__btn',
    textContent: "I don't know",
    onclick: () => {
      this.compliteSentence();
    },
  });

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

  private currentRound: CurrentWord = { round: 0, word: 0 };

  constructor(app: App) {
    super({ tag: 'div', className: 'game__fields' });
    this.app = app;
    this.data = data;
    this.currentSentence =
      this.data.rounds[this.currentRound.round].words[this.currentRound.word].textExample.toLowerCase();
    this.compliteBtn.setProperty('display', 'block');
  }

  public createGame(): void {
    this.container.elementAppend(this);
    this.app.elementAppend(this.container);
    const cover = div({ className: 'game__buttons' }, this.compliteBtn, this.countinueBtn, this.checkBtn);
    this.appendChildren([this.mainFild, this.puzzle, cover]);
    this.activeRow = new ActiveGame(this.mainFild, this.currentSentence, this.puzzle, this);
  }

  private countinue(): void {
    this.activeRow = new ActiveGame(this.mainFild, this.currentSentence, this.puzzle, this);
    this.countinueBtn.setProperty('display', 'none');
    this.compliteBtn.setProperty('display', 'block');
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
  }

  private resetRow(): void {
    isNull(this.activeRow).removeRow();
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

  private compliteSentence(): void {
    this.resetRow();
  }

  public clearGame(): void {
    this.container.removeNode();
    this.removeNode();
  }
}

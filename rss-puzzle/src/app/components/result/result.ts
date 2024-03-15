import type App from '../../app';
import { DataJson, IsKnownWords, CurrentWord } from '../../types/interfaces';
import { LevelsData } from '../../types/types';
import { getData, getStorage, isNull } from '../../utils/functions';
import { button, div, p, span } from '../../utils/tag-functions';
import CreateElement from '../create-element';
import './result.scss';

export default class Result extends CreateElement {
  private app: App;

  private data: DataJson | undefined;

  private result: IsKnownWords;

  private countinueBtn = button({
    className: 'result__continue',
    textContent: 'Continue',
    onclick: () => this.countinueClick(),
  });

  private stats = div({ className: 'result__stat' });

  constructor(app: App) {
    super({ tag: 'div', className: 'result' });
    this.app = app;
    this.elementAppend(this.stats);
    this.result = isNull(getStorage<IsKnownWords>('result'));
    this.loadData(this.result.level);
  }

  private async loadData(level: LevelsData): Promise<void> {
    this.data = await getData(level);
    this.createResults();
  }

  private createResults() {
    const know = div({ className: 'result__field' });
    const unknow = div({ className: 'result__field' });

    know.elementAppend(span({ className: 'result__fail', textContent: "I don't know" }));
    unknow.elementAppend(span({ className: 'result__sucess', textContent: 'I know' }));

    this.stats.appendChildren([know, unknow, this.countinueBtn]);

    this.result.known.forEach((knowWord) => {
      const elem = p({ textContent: `${this.data?.rounds[this.result.round].words[knowWord].textExample}` });
      know.elementAppend(elem);
    });

    this.result.unknown.forEach((unknownWord) => {
      const elem = p({ textContent: `${this.data?.rounds[this.result.round].words[unknownWord].textExample}` });
      unknow.elementAppend(elem);
    });
  }

  private countinueClick = () => {
    this.addClass('result__fade-out');
    setTimeout(() => {
      this.removeNode();
      const game = getStorage<CurrentWord>('lastGame');
      this.app.startGame(game);
    }, 900);
  };
}

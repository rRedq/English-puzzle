import type App from '../../app';
import { DataJson, IsKnownWords, WordPosition } from '../../types/interfaces';
import { fadeOutAnimation, gitUrl } from '../../utils/constants';
import { getStorage, isNull } from '../../utils/functions';
import { button, div, p, span } from '../../utils/tag-functions';
import CreateElement from '../create-element';
import Pronounce from '../pronounce/pronounce';
import './result.scss';

export default class Result extends CreateElement {
  private app: App;

  private data: DataJson;

  private result: IsKnownWords;

  private continueBtn = button({
    className: 'result__continue',
    textContent: 'Continue',
  });

  private stats = div({ className: 'result__stat' });

  constructor(app: App, data: DataJson) {
    super({ tag: 'div', className: 'result' });
    this.app = app;
    this.data = data;
    this.elementAppend(this.stats);
    this.result = isNull(getStorage<IsKnownWords>('result'));
    this.createResults();
    this.continueBtn.addEventListener('click', this.countinueClick);
  }

  private createResults() {
    const source = this.data.rounds[this.result.round].levelData;
    const link = `${gitUrl}/images/${source.cutSrc}`;
    const art = div({ className: 'result__art' });
    art.getNode().style.backgroundImage = `url(${link})`;
    const author = div({
      className: 'result__author',
      textContent: `${source.author} - ${source.name} (${source.year})`,
    });

    const know = div({ className: 'result__field' });
    const unknow = div({ className: 'result__field' });

    know.elementAppend(div({ className: 'result__sucess', textContent: 'I know' }));
    unknow.elementAppend(span({ className: 'result__fail', textContent: "I don't know" }));

    this.stats.appendChildren([art, author, know, unknow, this.continueBtn]);

    this.createContainer(this.result.known, know);
    this.createContainer(this.result.unknown, unknow);
  }

  private createContainer(words: number[], parent: CreateElement) {
    words.forEach((word) => {
      const container = div({ className: 'result__container' });
      const pronounce = new Pronounce(this.data.rounds[this.result.round].words[word].audioExample);
      const audio = div({ className: 'result__audio' }, pronounce);
      const text = p({ textContent: `${this.data.rounds[this.result.round].words[word].textExample}` });
      container.appendChildren([audio, text]);
      parent.elementAppend(container);
    });
  }

  private countinueClick = () => {
    this.addClass('result__fade-out');
    this.continueBtn.removeEventListener('click', this.countinueClick);
    setTimeout(() => {
      this.removeNode();
      const game = getStorage<WordPosition>('lastGame');
      this.app.startGame(game);
    }, fadeOutAnimation);
  };
}

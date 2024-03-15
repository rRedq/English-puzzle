import CreateElement from '../create-element';
import './pronounce.scss';

export default class Pronounce extends CreateElement {
  private path: string;

  constructor(path: string) {
    super({ tag: 'button', className: 'pronounce' });
    this.path = path;
    this.addEventListener('click', this.onSoundHint);
    this.setAttribute('playing', 'false');
  }

  private onSoundHint = () => {
    const link = `https://github.com/rolling-scopes-school/rss-puzzle-data/raw/main/${this.path}`;
    const audio = new Audio(link);
    audio.volume = 0.1;

    if (this.getNode().getAttribute('playing') === 'false') {
      audio.play();
      this.addClass('active-sound');
      audio.addEventListener('ended', () => {
        this.setAttribute('playing', 'false');
        this.removeClass('active-sound');
      });
      this.setAttribute('playing', 'true');
    }
  };
}

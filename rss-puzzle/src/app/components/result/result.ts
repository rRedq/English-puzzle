import type App from '../../app';
import CreateElement from '../create-element';
import './result.scss';

export default class Result extends CreateElement {
  private app: App;

  constructor(app: App) {
    super({ tag: 'div', className: 'result' });
    this.app = app;
  }
}

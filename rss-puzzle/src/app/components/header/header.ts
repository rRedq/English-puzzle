import CreateElement from '../create-element';
import { button } from '../../utils/tag-functions';
import { deleteStorage } from '../../utils/functions';
import type App from '../../app';
import './header.scss';

export default class Header extends CreateElement {
  private button: CreateElement;

  private app: App;

  constructor(elem: App) {
    super({ tag: 'header', className: 'header' });
    this.app = elem;
    this.button = button({ className: 'header__btn', textContent: 'Logout' });
  }

  public startHeader(): CreateElement {
    this.button.addEventListener('click', this.loginOut);
    this.elementAppend(this.button);
    return this;
  }

  private loginOut = (): void => {
    deleteStorage();
    this.removeNode();
    this.app.appStart();
  };
}

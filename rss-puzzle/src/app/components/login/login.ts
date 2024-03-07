import CreateElement from '../create-element';
import { input } from '../../utils/tag-functions';
import LoginInput from './login-input';
import { setStorage } from '../../utils/functions';
import type App from '../../app';
import './login.scss';

export default class Login extends CreateElement {
  private firstField: LoginInput;

  private secondField: LoginInput;

  private button: CreateElement;

  private app: App;

  constructor(elem: App) {
    super({ tag: 'form', className: 'login' });
    this.app = elem;
    this.firstField = new LoginInput('First name', /^(?=.{3,60}$)[A-Z][\\-a-zA-z]+$/, 'incorrect First name');
    this.secondField = new LoginInput('Surname', /^(?=.{4,60}$)[A-Z][\\-a-zA-z]+$/, 'incorrect Surname');
    this.button = input({
      className: 'login__btn',
      value: 'Login',
      type: 'submit',
    });
  }

  public createLogin(): CreateElement {
    this.appendChildren([this.firstField, this.secondField, this.button]);
    this.button.addEventListener('click', this.accessCheck.bind(this));
    return this;
  }

  private accessCheck(e: Event): void {
    e.preventDefault();
    if (this.firstField.getAccess() && this.secondField.getAccess()) {
      setStorage('access', [this.firstField.getValue(), this.secondField.getValue()]);
      this.removeNode();
      this.app.startPage();
    }
  }
}

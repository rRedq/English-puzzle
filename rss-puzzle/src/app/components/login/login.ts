import CreateElement from '../create-element';
import { input, form } from '../../utils/tag-functions';
import LoginInput from './login-input';
import { setStorage } from '../../utils/functions';
import type App from '../../app';
import './login.scss';

export default class Login extends CreateElement {
  private firstField: LoginInput = new LoginInput(
    'First name',
    /^(?=.{3,60}$)[A-Z][\\-a-zA-z]+$/,
    'incorrect First name'
  );

  private secondField: LoginInput = new LoginInput('Surname', /^(?=.{4,60}$)[A-Z][\\-a-zA-z]+$/, 'incorrect Surname');

  private button: CreateElement = input({
    className: 'login__btn',
    value: 'Login',
    type: 'submit',
  });

  private form: CreateElement = form({ className: 'login__form' });

  private app: App;

  constructor(elem: App) {
    super({ tag: 'div', className: 'login' });
    this.app = elem;
  }

  public createLogin(): CreateElement {
    this.firstField = new LoginInput('First name', /^(?=.{3,60}$)[A-Z][\\-a-zA-z]+$/, 'incorrect First name');
    this.secondField = new LoginInput('Surname', /^(?=.{4,60}$)[A-Z][\\-a-zA-z]+$/, 'incorrect Surname');
    this.firstField.createInput();
    this.secondField.createInput();
    this.elementAppend(this.form);
    this.form.appendChildren([this.firstField, this.secondField, this.button]);
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

import CreateElement from '../create-element';
import { input } from '../../utils/tag-functions';
import LoginInput from './login-input';
import './login.scss';

export default class Login extends CreateElement {
  private firstField: LoginInput;

  private secondField: LoginInput;

  private button: CreateElement;

  constructor(elem: CreateElement) {
    super({ tag: 'form', className: 'login' });
    elem.elementAppend(this);
    this.firstField = new LoginInput('First name', /^(?=.{3,60}$)[A-Z][\\-a-zA-z]+$/, 'incorrect First name');
    this.secondField = new LoginInput('Surname', /^(?=.{4,60}$)[A-Z][\\-a-zA-z]+$/, 'incorrect Surname');
    this.button = input({
      className: 'login__btn',
      value: 'Login',
      type: 'submit',
    });
  }

  public createLogin(): void {
    this.appendChildren([this.firstField, this.secondField, this.button]);
    this.button.addEventListener('click', this.accessCheck.bind(this));
  }

  private accessCheck(e: Event): void {
    if (!(this.firstField.getAccess() && this.secondField.getAccess())) e.preventDefault();
  }
}

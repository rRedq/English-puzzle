import CreateElement from '../create-element';
import { input, form } from '../../utils/tag-functions';
import LoginInput from './login-input';
import { setStorage } from '../../utils/functions';
import type App from '../../app';
import './login.scss';
import { StorageAccess } from '../../types/interfaces';
import { fadeOutAnimation } from '../../utils/constants';

export default class Login extends CreateElement {
  private firstField: LoginInput;

  private secondField: LoginInput;

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
    this.firstField = new LoginInput(
      this,
      'First name',
      /^(?=.{3,60}$)[A-Z][\\-a-zA-z]+$/,
      'The name must consist of at least 3 letters'
    );
    this.secondField = new LoginInput(
      this,
      'Surname',
      /^(?=.{4,60}$)[A-Z][\\-a-zA-z]+$/,
      'The name must consist of at least 4 letters'
    );
    this.elementAppend(this.form);
    this.form.appendChildren([this.firstField, this.secondField, this.button]);
    this.button.addEventListener('click', this.accessCheck);
    (this.button.getNode() as HTMLInputElement).disabled = true;
  }

  public checkInputs(): void {
    if (this.firstField.getValue() && this.secondField.getValue()) {
      (this.button.getNode() as HTMLInputElement).disabled = false;
    }
  }

  private accessCheck = (e: Event): void => {
    e.preventDefault();
    if (this.firstField.getAccess() && this.secondField.getAccess()) {
      setStorage<StorageAccess>('access', {
        firstName: this.firstField.getValue(),
        surName: this.secondField.getValue(),
      });
      this.addClass('login__out');
      this.button.removeEventListener('click', this.accessCheck);
      setTimeout(() => {
        this.removeNode();
        this.app.startPage();
      }, fadeOutAnimation);
    }
  };
}

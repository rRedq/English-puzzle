import CreateElement from '../create-element';
import { label, input, span } from '../../utils/tag-functions';

export default class LoginInput extends CreateElement {
  private labelName: CreateElement;

  private inputName: CreateElement;

  private spanName: CreateElement;

  constructor(text: string) {
    super({ tag: 'div', className: 'login__field' });
    this.labelName = label({ className: 'login__label', textContent: `${text}` });
    this.inputName = input({ type: 'text', className: 'login__input', required: 'required' });
    this.spanName = span({ className: 'login__span' });
    this.elementAppend(this.labelName);
    this.createInput();
  }

  public createInput(): void {
    this.appendChildren([this.labelName, this.inputName, this.spanName]);
  }
}

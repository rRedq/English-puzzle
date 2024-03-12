import { type ElementProps } from '../types/interfaces';
import type { ElementOrNull } from '../types/types';
import { isNull } from '../utils/functions';

export default class CreateElement<T extends HTMLElement = HTMLElement> {
  private node: T;

  private children: CreateElement[] = [];

  constructor(params: ElementProps, ...children: ElementOrNull[]) {
    const node = document.createElement(params.tag) as T;
    Object.assign(node, params);
    this.node = node;
    if (children) this.appendChildren(children);
  }

  public getNode() {
    return this.node;
  }

  public elementAppend(child: CreateElement): void {
    if (child instanceof CreateElement) {
      this.children.push(child);
      this.node.append(child.getNode());
    }
  }

  public setDragable() {
    this.node.draggable = true;
  }

  public appendChildren(children: ElementOrNull[]): void {
    children.forEach((child) => {
      this.elementAppend(isNull(child));
    });
  }

  public addEventListener(text: keyof HTMLElementEventMap, handler: (e: Event) => void): void {
    this.node.addEventListener(text, handler);
  }

  public removeEventListener(text: keyof HTMLElementEventMap, handler: (e: Event) => void): void {
    this.node.removeEventListener(text, handler);
  }

  public hasChildNodes(): boolean {
    return this.node.hasChildNodes();
  }

  public setProperty(prop: keyof CSSStyleDeclaration, value: string): void {
    const formatedProp = (prop as string).replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    this.getNode().style.setProperty(formatedProp, value);
  }

  public getChildren(): HTMLCollection {
    return this.node.children;
  }

  public textContent(content: string): void {
    this.node.textContent = content;
  }

  public addClass(str: string): CreateElement {
    this.node.classList.add(str);
    return this;
  }

  public removeClass(str: string): CreateElement {
    this.node.classList.remove(str);
    return this;
  }

  public toggleClass(str: string): void {
    this.node.classList.toggle(str);
  }

  public removeChildren(): void {
    this.children.forEach((child) => {
      child.removeNode();
    });
    this.children.length = 0;
  }

  public removeNode(): void {
    this.removeChildren();
    this.getNode().remove();
  }
}

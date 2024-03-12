import CreateElement from '../components/create-element';
import type { ElementOrNull } from '../types/types';
import { type TagsProps, type InputProps } from '../types/interfaces';

const input = (props: InputProps) => new CreateElement<HTMLInputElement>({ ...props, tag: 'input' });

const label = (props: TagsProps, ...children: ElementOrNull[]) =>
  new CreateElement<HTMLLabelElement>({ ...props, tag: 'label' }, ...children);

const div = (props: TagsProps, ...children: ElementOrNull[]) =>
  new CreateElement<HTMLDivElement>({ ...props, tag: 'div' }, ...children);

const span = (props: TagsProps, ...children: ElementOrNull[]) =>
  new CreateElement<HTMLSpanElement>({ ...props, tag: 'span' }, ...children);

const form = (props: TagsProps, ...children: ElementOrNull[]) =>
  new CreateElement<HTMLFormElement>({ ...props, tag: 'form' }, ...children);

const button = (props: TagsProps) => new CreateElement<HTMLButtonElement>({ ...props, tag: 'button' });

const h2 = (props: TagsProps) => new CreateElement<HTMLHeadingElement>({ ...props, tag: 'h2' });

const p = (props: TagsProps) => new CreateElement<HTMLParagraphElement>({ ...props, tag: 'p' });

const main = (props: TagsProps, ...children: ElementOrNull[]) =>
  new CreateElement({ ...props, tag: 'main' }, ...children);

export { label, input, div, span, form, button, h2, p, main };

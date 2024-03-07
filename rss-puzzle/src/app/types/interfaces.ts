interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  className?: string;
  text?: string;
}

interface TagsProps extends Omit<ElementProps, 'tag'> {
  type?: string;
  textContent?: string;
}

interface InputProps extends TagsProps {
  required?: string;
  value?: string;
}

export { InputProps, TagsProps, ElementProps };

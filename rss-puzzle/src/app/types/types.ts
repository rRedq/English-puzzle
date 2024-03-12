import type CreateElement from '../components/create-element';

type ElementOrNull = CreateElement | null;

type Paths = {
  first: string;
  middle: string;
  last: string;
};

type CreateSvg = {
  width: number;
  svg: SVGSVGElement;
};

type Fields = {
  cover: CreateElement;
  textBtn: CreateElement;
};

export { ElementOrNull, Paths, CreateSvg, Fields };

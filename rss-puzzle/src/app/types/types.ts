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

type HintFields = {
  cover: CreateElement;
  textBtn: CreateElement;
  onSound: CreateElement;
};

export { ElementOrNull, Paths, CreateSvg, HintFields };
